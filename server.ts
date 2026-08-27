import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  analyzeConversationWithGemini,
  analyzeImageWithGemini,
  analyzeAudioWithGemini
} from './src/backend/gemini.js';

// In-Memory Database State
let mockReports = [
  {
    id: 'REP-2026-081',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    title: 'Hồ sơ: Mạo danh Cán bộ Cục Cảnh sát Điều tra C02',
    victimName: 'Mẹ (Nguyễn Thị Mai - 65 tuổi)',
    reporterRole: 'Con trai (Người bảo hộ)',
    callerNumber: '024 7779 xxxx (Đầu số giả lập SIP Trunk)',
    riskScore: 98,
    riskLevel: 'CRITICAL',
    scamType: 'Mạo danh Cơ quan Cảnh sát điều tra',
    summary: 'Đối tượng xưng danh Trung tá điều tra Bộ Công an, đe dọa nạn nhân liên quan đường dây rửa tiền 50 tỷ và yêu cầu chuyển 200 triệu tiền tiết kiệm sang tài khoản niêm phong trong 15 phút.',
    detectedTechniques: [
      { name: 'Mạo danh cơ quan công quyền', icon: '👮', description: 'Xưng danh Cán bộ C02 Bộ Công an', severity: 'CRITICAL' },
      { name: 'Đe dọa & Gây sợ hãi cực độ', icon: '😨', description: 'Đe dọa bắt tạm giam 4 tháng', severity: 'CRITICAL' },
      { name: 'Ép buộc chuyển tiền khẩn cấp', icon: '⏰', description: 'Giới hạn 15 phút để nạn nhân không kịp suy nghĩ', severity: 'HIGH' },
      { name: 'Cách ly & Giữ bí mật', icon: '🤐', description: 'Nghiêm cấm nói với người thân hay nhân viên ngân hàng', severity: 'HIGH' },
    ],
    evidence: [
      { type: 'Số máy gọi đến', detail: 'Đầu số 0247779xxxx giả lập tổng đài', riskImpact: 'Khó truy vết vị trí địa lý' },
      { type: 'Tài khoản yêu cầu nạp', detail: 'Ngân hàng TMCP MB Bank - STK: 0988776655 (Tên ảo)', riskImpact: 'Tài khoản rác dùng để tẩu tán' },
      { type: 'Lệnh bắt giam giả', detail: 'Gửi ảnh chụp Lệnh bắt giam có dấu đỏ giả mạo qua Zalo', riskImpact: 'Thủ đoạn làm giả con dấu nhà nước' },
    ],
    recommendations: [
      'Gác máy ngay lập tức, không thực hiện bất kỳ lệnh chuyển khoản nào.',
      'Công an Việt Nam KHÔNG BAO GIỜ làm việc qua điện thoại hay yêu cầu chuyển tiền bảo lãnh.',
      'Báo ngay cho Cảnh sát khu vực hoặc gọi 113.',
    ],
  },
  {
    id: 'REP-2026-079',
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    title: 'Hồ sơ: Giả mạo Tổng đài Ngân hàng khóa thẻ',
    victimName: 'Bố (Trần Văn Hưng - 68 tuổi)',
    reporterRole: 'Con gái (Người bảo hộ)',
    callerNumber: '028 9998 xxxx',
    riskScore: 88,
    riskLevel: 'CRITICAL',
    scamType: 'Giả mạo ngân hàng đánh cắp mã OTP',
    summary: 'Kẻ gian thông báo tài khoản vừa phát sinh giao dịch 25 triệu tại Hà Nội và yêu cầu đọc mã OTP gửi về SMS để hủy giao dịch khẩn cấp.',
    detectedTechniques: [
      { name: 'Tạo tình huống khẩn cấp giả', icon: '💳', description: 'Báo trừ tiền tài khoản ngân hàng', severity: 'HIGH' },
      { name: 'Thu thập mã OTP trái phép', icon: '🔑', description: 'Dụ dỗ nạn nhân cung cấp mã OTP để chiếm quyền tài khoản', severity: 'CRITICAL' },
    ],
    evidence: [
      { type: 'Mã xác thực OTP', detail: 'Yêu cầu đọc mã OTP 6 số', riskImpact: 'Mất quyền kiểm soát toàn bộ tiền trong tài khoản' },
    ],
    recommendations: [
      'Tuyệt đối không đọc mã OTP/Smart OTP cho bất kỳ ai, kể cả nhân viên ngân hàng.',
      'Khóa thẻ tạm thời trên ứng dụng ngân hàng chính thống.',
    ],
  },
];

let mockFamilyMembers = [
  {
    id: 'fam-1',
    name: 'Mẹ (Nguyễn Thị Mai)',
    relationship: 'Mẹ',
    phoneNumber: '0903 123 456',
    age: 65,
    deviceType: 'Samsung Galaxy A54',
    isGuardian: false,
    alertOnHighRisk: true,
    status: 'ONLINE',
    lastActivity: 'Vừa kích hoạt micro 5 phút trước',
  },
  {
    id: 'fam-2',
    name: 'Bố (Nguyễn Văn Hùng)',
    relationship: 'Bố',
    phoneNumber: '0908 654 321',
    age: 68,
    deviceType: 'iPhone 13',
    isGuardian: false,
    alertOnHighRisk: true,
    status: 'PROTECTED',
    lastActivity: 'Hoạt động 1 giờ trước',
  },
  {
    id: 'fam-3',
    name: 'Con trai (Tuấn Minh - Bạn)',
    relationship: 'Con trai',
    phoneNumber: '0912 345 789',
    age: 32,
    deviceType: 'MacBook & iPhone 15 Pro',
    isGuardian: true,
    alertOnHighRisk: true,
    status: 'ONLINE',
    lastActivity: 'Đang trực giám sát',
  },
];

let mockAlerts = [
  {
    id: 'ALT-101',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    targetMember: 'Mẹ (Nguyễn Thị Mai)',
    guardianName: 'Con trai (Tuấn Minh)',
    riskScore: 98,
    scamType: 'Giả danh Cơ quan Cảnh sát điều tra',
    status: 'DISPATCHED',
  },
];

const mockKnowledgeBase = [
  {
    id: 'kb-1',
    category: 'Mạo danh chính quyền',
    title: 'Giả danh Cảnh sát, Viện Kiểm Sát, Tòa Án',
    badge: 'Đặc biệt nguy hiểm',
    description: 'Kẻ gian thông báo nạn nhân liên quan đến đường dây buôn ma túy, rửa tiền 50 tỷ, gửi lệnh bắt giam giả và ép chuyển tiền sang "tài khoản tạm giữ của cơ quan điều tra".',
    attackerScripts: [
      'Tôi là Thiếu tá Nguyễn Văn A, Cục Cảnh sát Hình sự...',
      'Căn cước công dân của bà đang đứng tên mở tài khoản nhận 50 tỷ tiền buôn lậu.',
      'Muốn chứng minh vô tội, phải nộp 100 triệu vào tài khoản thẩm định này ngay trong 30 phút.',
      'Yêu cầu giữ tuyệt mật, nếu nói cho gia đình sẽ bị bắt ngay tại chỗ.',
    ],
    redFlags: [
      'Công an KHÔNG BAO GIỜ làm việc qua điện thoại hay gửi lệnh bắt qua Zalo/Facebook.',
      'KHÔNG CÓ tài khoản ngân hàng nào là "tài khoản niêm phong/tạm giữ" của cơ quan công an.',
      'Luôn ép buộc giữ bí mật và thúc giục thời gian gấp gáp.',
    ],
    defenseAdvice: [
      'Lập tức gác máy.',
      'Gọi cho người thân hoặc đến trụ sở Công an phường gần nhất để xác minh.',
    ],
    realCaseExample: 'Bà H. (65 tuổi, Hà Nội) suýt chuyển 500 triệu tiết kiệm dưỡng già sau khi nhận cuộc gọi đe dọa của đối tượng giả danh công an.',
  },
  {
    id: 'kb-2',
    category: 'Tài chính - Ngân hàng',
    title: 'Giả mạo Ngân hàng dọa khóa thẻ & chiếm đoạt OTP',
    badge: 'Phổ biến',
    description: 'Đối tượng báo có giao dịch trừ tiền bất thường ở nước ngoài hoặc thẻ ngân hàng bị khóa, yêu cầu đọc mã OTP hoặc bấm vào link giả mạo giao diện ngân hàng để hủy.',
    attackerScripts: [
      'Hệ thống ghi nhận thẻ tín dụng của anh vừa thanh toán 35 triệu tại Singapore.',
      'Vui lòng đọc mã OTP 6 số vừa gửi về để hệ thống hoàn tiền hủy lệnh.',
      'Nhấn vào đường link m-vietcombank.info để cập nhật sinh trắc học khuôn mặt.',
    ],
    redFlags: [
      'Ngân hàng KHÔNG BAO GIỜ yêu cầu khách hàng cung cấp mã OTP dưới mọi hình thức.',
      'Tên miền giả mạo thường chứa ký tự lạ (VD: vietcombank-chinhthuc.com, bidv-smart.cc).',
    ],
    defenseAdvice: [
      'Không bao giờ chia sẻ mã OTP/Smart OTP với bất kỳ ai.',
      'Khóa tài khoản trên app ngân hàng nếu lỡ nhập thông tin.',
    ],
    realCaseExample: 'Anh T. (TP.HCM) bị mất 120 triệu trong tài khoản chỉ 1 phút sau khi đọc mã OTP cho đối tượng tự xưng nhân viên tổng đài ngân hàng.',
  },
  {
    id: 'kb-3',
    category: 'Công nghệ cao - AI',
    title: 'Deepfake Video & Giả giọng nói AI người thân',
    badge: 'Mới & Tinh vi',
    description: 'Sử dụng AI thu thập giọng nói và video của con cái trên mạng xã hội để tạo video/cuộc gọi gấp rút kêu cứu vì tai nạn, nợ nần, cần tiền chuyển viện.',
    attackerScripts: [
      'Mẹ ơi, con bị tai nạn giao thông gãy chân đang ở bệnh viện cấp cứu gấp...',
      'Bố chuyển ngay 30 triệu vào số tài khoản bác sĩ này giúp con với, con đang cấp cứu!',
    ],
    redFlags: [
      'Cuộc gọi video thường bị mờ, chập chờn, hình giật lag hoặc tắt rất nhanh.',
      'Hối thúc chuyển tiền vào tài khoản người lạ (lý do: tài khoản bác sĩ/bạn bè).',
    ],
    defenseAdvice: [
      'Thiết lập "Mật khẩu an toàn gia đình" (chỉ người nhà mới biết) để hỏi lại người gọi.',
      'Gác máy và gọi lại trực tiếp vào số điện thoại thường dùng của con cái.',
    ],
    realCaseExample: 'Bà N. (Đà Nẵng) nhận được cuộc gọi video mặt con trai khóc lóc kêu cứu, nhưng may mắn kịp hỏi câu hỏi gia đình nên nhận ra kẻ lừa đảo.',
  },
  {
    id: 'kb-4',
    category: 'Dịch vụ công & Mã độc',
    title: 'Cài đặt App giả mạo Dịch vụ công / Căn cước VNeID',
    badge: 'Nguy hiểm cao',
    description: 'Giả danh cán bộ Công an khu vực hướng dẫn cài đặt phần mềm VNeID hoặc kê khai Dịch vụ công qua file .APK lạ, từ đó chiếm toàn quyền điều khiển điện thoại.',
    attackerScripts: [
      'Hồ sơ định danh mức 2 của anh bị lỗi, cần cài phần mềm Dịch vụ công để sửa.',
      'Anh bấm vào link dichvucong.gov-vn.cc tải file cài đặt về điện thoại Android.',
    ],
    redFlags: [
      'Cơ quan nhà nước KHÔNG BAO GIỜ gửi file cài đặt .APK qua Zalo hay đường link lạ.',
      'Ứng dụng yêu cầu cấp quyền "Trợ năng" (Accessibility Service) và quyền SMS.',
    ],
    defenseAdvice: [
      'Chỉ cài ứng dụng qua Google Play Store hoặc Apple App Store chính thức.',
      'Tuyệt đối không cấp quyền Trợ năng cho các ứng dụng không rõ nguồn gốc.',
    ],
    realCaseExample: 'Ông K. (Bình Dương) bị chiếm quyền điều khiển điện thoại và tự động chuyển mất 800 triệu trong đêm sau khi cài file APK giả mạo Dịch vụ công.',
  },
];

// Active Sessions In-Memory Store
interface ActiveSession {
  id: string;
  userId: string;
  status: 'ACTIVE' | 'PAUSED' | 'ENDED';
  startedAt: string;
  endedAt?: string;
  transcript: { id: string; speaker: string; text: string; time: string }[];
  currentRisk: number;
  lastAnalysis?: any;
}

const activeSessions: Record<string, ActiveSession> = {};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '15mb' }));

  // API Routes
  app.get(['/api/health', '/api/v1/health'], (_req, res) => {
    res.json({
      status: 'ok',
      service: 'GuardAI Voice Shield Backend Service',
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // Create Session API (docs/02_BUILD_SPEC.md)
  app.post(['/api/sessions', '/api/v1/sessions'], (req, res) => {
    const { userId = 'user-default', callerNumber } = req.body;
    const sessionId = `ses_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const session: ActiveSession = {
      id: sessionId,
      userId,
      status: 'ACTIVE',
      startedAt: new Date().toISOString(),
      transcript: [],
      currentRisk: 0,
    };
    activeSessions[sessionId] = session;
    res.json({
      success: true,
      sessionId,
      session,
      message: 'Protection session started',
    });
  });

  // Append Transcript Chunk to Session
  app.post(['/api/sessions/:id/transcript', '/api/v1/sessions/:id/transcript'], (req, res) => {
    const id = String(req.params.id);
    const { speaker = 'Caller', text, time = new Date().toLocaleTimeString('vi-VN') } = req.body;

    if (!activeSessions[id]) {
      // Auto-instantiate if not exists
      activeSessions[id] = {
        id,
        userId: 'user-default',
        status: 'ACTIVE',
        startedAt: new Date().toISOString(),
        transcript: [],
        currentRisk: 0,
      };
    }

    const chunk = {
      id: `chunk-${Date.now()}`,
      speaker,
      text: text || '',
      time,
    };
    activeSessions[id].transcript.push(chunk);

    res.json({
      success: true,
      sessionId: id,
      transcriptCount: activeSessions[id].transcript.length,
      item: chunk,
    });
  });

  // Analyze Session API
  app.post(['/api/sessions/:id/analyze', '/api/v1/sessions/:id/analyze'], async (req, res) => {
    const id = String(req.params.id);
    const session = activeSessions[id];

    try {
      const transcriptToAnalyze = session?.transcript?.length
        ? session.transcript
        : req.body.transcript || [];

      const analysis = await analyzeConversationWithGemini(transcriptToAnalyze);
      if (session) {
        session.currentRisk = analysis.riskScore;
        session.lastAnalysis = analysis;
      }

      res.json({
        success: true,
        sessionId: id,
        data: analysis,
      });
    } catch (err: any) {
      console.error(`Session ${id} analysis error:`, err);
      res.status(500).json({ error: 'Session analysis failed', details: err?.message || String(err) });
    }
  });

  // End Session API and Generate Final Report
  app.post(['/api/sessions/:id/end', '/api/v1/sessions/:id/end'], async (req, res) => {
    const id = String(req.params.id);
    const session = activeSessions[id];
    if (session) {
      session.status = 'ENDED';
      session.endedAt = new Date().toISOString();
    }

    const reportId = `REP-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 900 + 100)}`;
    const finalAnalysis = session?.lastAnalysis || {
      riskScore: session?.currentRisk || 0,
      riskLevel: 'SAFE',
      scamType: 'Cuộc gọi kết thúc bình thường',
      summary: 'Phiên bảo vệ đã hoàn tất và kết thúc an toàn.',
      detectedTechniques: [],
      evidence: [],
      recommendations: ['Lưu hồ sơ nếu cần đối chiếu về sau.'],
    };

    const finalReport = {
      id: reportId,
      sessionId: id,
      createdAt: new Date().toISOString(),
      title: `Hồ sơ phiên bảo vệ: ${finalAnalysis.scamType || 'Tổng kết cuộc gọi'}`,
      victimName: req.body.victimName || 'Mẹ (Nguyễn Thị Mai)',
      reporterRole: req.body.reporterRole || 'GuardAI Tự động',
      callerNumber: req.body.callerNumber || 'Số lạ / Cuộc gọi trực tiếp',
      riskScore: finalAnalysis.riskScore || 0,
      riskLevel: finalAnalysis.riskLevel || 'SAFE',
      scamType: finalAnalysis.scamType || 'Tổng kết cuộc gọi',
      summary: finalAnalysis.summary || 'Phiên bảo vệ kết thúc.',
      detectedTechniques: finalAnalysis.detectedTechniques || [],
      evidence: finalAnalysis.evidence || [],
      timeline: finalAnalysis.timeline || [],
      recommendations: finalAnalysis.recommendations || [],
      transcript: session?.transcript || [],
    };

    mockReports.unshift(finalReport);

    res.json({
      success: true,
      sessionId: id,
      reportId,
      report: finalReport,
    });
  });

  // Real-time Conversation Scam Analysis API
  app.post('/api/analyze', async (req, res) => {
    try {
      const { transcript } = req.body;
      if (!Array.isArray(transcript)) {
        res.status(400).json({ error: 'transcript array is required' });
        return;
      }

      const result = await analyzeConversationWithGemini(transcript);
      res.json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      console.error('Error handling /api/analyze:', err);
      res.status(500).json({
        error: 'Failed to analyze conversation',
        details: err?.message || String(err),
      });
    }
  });

  // Multimodal Screenshot / Image Analysis API
  app.post('/api/analyze-image', async (req, res) => {
    try {
      const { image, mimeType } = req.body;
      if (!image) {
        res.status(400).json({ error: 'image base64 string is required' });
        return;
      }

      const result = await analyzeImageWithGemini(image, mimeType || 'image/png');
      res.json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      console.error('Error handling /api/analyze-image:', err);
      res.status(500).json({
        error: 'Failed to analyze image',
        details: err?.message || String(err),
      });
    }
  });

  // Multimodal Audio Recording Analysis API
  app.post('/api/analyze-audio', async (req, res) => {
    try {
      const { audio, mimeType } = req.body;
      if (!audio) {
        res.status(400).json({ error: 'audio base64 string is required' });
        return;
      }

      const result = await analyzeAudioWithGemini(audio, mimeType || 'audio/webm');
      res.json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      console.error('Error handling /api/analyze-audio:', err);
      res.status(500).json({
        error: 'Failed to analyze audio',
        details: err?.message || String(err),
      });
    }
  });

  // Get Reports List
  app.get(['/api/reports', '/api/v1/reports'], (_req, res) => {
    res.json({
      success: true,
      data: mockReports,
    });
  });

  // Get Single Report by ID
  app.get(['/api/reports/:id', '/api/v1/reports/:id'], (req, res) => {
    const id = String(req.params.id);
    const report = mockReports.find((r) => r.id === id);
    if (!report) {
      res.status(404).json({ error: 'Report not found' });
      return;
    }
    res.json({
      success: true,
      data: report,
    });
  });

  // Save / Generate Investigation Report API
  app.post(['/api/reports', '/api/v1/reports'], (req, res) => {
    const reportData = req.body;
    const reportId = `REP-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 900 + 100)}`;
    const newReport = {
      id: reportId,
      createdAt: new Date().toISOString(),
      ...reportData,
    };
    mockReports.unshift(newReport);

    res.json({
      success: true,
      reportId,
      report: newReport,
    });
  });

  // Delete Report API
  app.delete(['/api/reports/:id', '/api/v1/reports/:id'], (req, res) => {
    const id = String(req.params.id);
    mockReports = mockReports.filter((r) => r.id !== id);
    res.json({ success: true, message: `Report ${id} deleted` });
  });

  // Get Family Members / Guardians API
  app.get(['/api/family/members', '/api/guardians', '/api/v1/guardians'], (_req, res) => {
    res.json({
      success: true,
      data: mockFamilyMembers,
    });
  });

  // Add Family Member / Guardian API
  app.post(['/api/family/members', '/api/guardians', '/api/v1/guardians'], (req, res) => {
    const memberData = req.body;
    const newMember = {
      id: `fam-${Date.now()}`,
      name: memberData.name || 'Thành viên mới',
      relationship: memberData.relationship || 'Người thân',
      phoneNumber: memberData.phoneNumber || memberData.phone || '0900 000 000',
      age: memberData.age || 60,
      deviceType: memberData.deviceType || 'Smartphone',
      isGuardian: memberData.isGuardian !== undefined ? Boolean(memberData.isGuardian) : true,
      alertOnHighRisk: true,
      status: 'PROTECTED',
      lastActivity: 'Vừa liên kết',
    };
    mockFamilyMembers.push(newMember);
    res.json({
      success: true,
      data: newMember,
    });
  });

  // Delete Family Member / Guardian API
  app.delete(['/api/family/members/:id', '/api/guardians/:id', '/api/v1/guardians/:id'], (req, res) => {
    const id = String(req.params.id);
    mockFamilyMembers = mockFamilyMembers.filter((m) => m.id !== id);
    res.json({ success: true });
  });

  // Get Family Alerts History
  app.get('/api/family/alerts', (_req, res) => {
    res.json({
      success: true,
      data: mockAlerts,
    });
  });

  // Trigger Family Guardian Alert Notification API
  app.post('/api/family/notify', (req, res) => {
    const { guardianName, targetMember, riskScore, scamType } = req.body;

    const alertDetails = {
      id: `ALT-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      targetMember: targetMember || 'Mẹ (Nguyễn Thị Mai)',
      guardianName: guardianName || 'Con trai (Người bảo hộ)',
      riskScore: riskScore || 98,
      scamType: scamType || 'Mạo danh đe dọa lừa đảo',
      status: 'DISPATCHED' as const,
    };

    mockAlerts.unshift(alertDetails);

    res.json({
      success: true,
      message: `Emergency notification successfully dispatched to ${guardianName || 'Guardian'}`,
      details: alertDetails,
    });
  });

  // Get Knowledge Base API
  app.get('/api/knowledge-base', (_req, res) => {
    res.json({
      success: true,
      data: mockKnowledgeBase,
    });
  });

  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GuardAI Backend & Frontend Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
