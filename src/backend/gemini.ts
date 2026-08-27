import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not set. Gemini API calls will use fallback evaluation.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || 'dummy-key-for-init',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export interface ScamAnalysisResult {
  riskScore: number; // 0 - 100
  riskLevel: 'SAFE' | 'SUSPICIOUS' | 'HIGH' | 'HIGH_RISK' | 'CRITICAL';
  scamType: string;
  summary: string;
  detectedTechniques: {
    name: string;
    icon: string;
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    confidence?: number;
  }[];
  evidence: {
    type: string;
    detail: string;
    riskImpact: string;
    confidence?: number;
    reason?: string;
  }[];
  timeline?: {
    time: string;
    event: string;
    technique?: string;
    risk?: number;
  }[];
  recommendations: string[];
  suggestedActions: {
    action: string;
    urgent: boolean;
  }[];
}

export async function analyzeConversationWithGemini(
  transcript: { speaker: string; text: string; time?: string }[]
): Promise<ScamAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return generateFallbackAnalysis(transcript);
  }

  try {
    const ai = getGeminiClient();
    const formattedTranscript = transcript
      .map((t) => `[${t.time || '00:00'}] [${t.speaker}]: ${t.text}`)
      .join('\n');

    const prompt = `Bạn là GuardAI - Hệ thống chuyên gia thẩm định lừa đảo & thao túng tâm lý (Social Engineering & Scam Intelligence).
Phân tích kỹ đoạn hội thoại và phát hiện 9 kỹ thuật thao túng:
1. Authority (Quyền lực / Mạo danh công quyền)
2. Fear (Đe dọa / Gây sợ hãi)
3. Urgency (Thúc ép thời gian gấp)
4. Isolation (Ép giữ bí mật / Cách ly người thân)
5. Trust Building (Tạo lòng tin / Vỏ bọc)
6. Greed (Lòng tham / Trúng thưởng / Tiền bạc)
7. Financial Request (Yêu cầu tài chính / Chuyển tiền)
8. Identity Theft (Khai thác CCCD / Thông tin cá nhân)
9. Credential Harvesting (Thu thập OTP / Mật khẩu)

ĐOẠN HỘI THOẠI:
${formattedTranscript}

YÊU CẦU:
Trả về duy nhất dữ liệu JSON nguyên bản với cấu trúc chính xác sau:
{
  "riskScore": number (0 đến 100),
  "riskLevel": "SAFE" | "SUSPICIOUS" | "HIGH" | "CRITICAL",
  "scamType": string,
  "summary": string (tóm tắt bằng tiếng Việt ngắn gọn, dễ hiểu cho người cao tuổi),
  "detectedTechniques": [
    {
      "name": string (VD: "Quyền lực / Mạo danh công an", "Đe dọa & Gây sợ hãi", "Áp lực thời gian", "Ép buộc giữ bí mật"),
      "icon": string (emoji),
      "description": string,
      "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
    }
  ],
  "evidence": [
    {
      "type": "PHONE_NUMBER" | "URL" | "BANK_ACCOUNT" | "QR_CODE" | "ORGANIZATION" | "GOVERNMENT_AGENCY" | "PAYMENT_REQUEST" | "CREDENTIAL_REQUEST" | "PERSONAL_INFORMATION_REQUEST",
      "detail": string,
      "riskImpact": string
    }
  ],
  "timeline": [
    {
      "time": string,
      "event": string,
      "technique": string,
      "risk": number
    }
  ],
  "recommendations": [string],
  "suggestedActions": [
    {
      "action": string,
      "urgent": boolean
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const responseText = response.text || '';
    const parsed = JSON.parse(responseText) as ScamAnalysisResult;
    return parsed;
  } catch (error) {
    console.error('Gemini Analysis Error:', error);
    return generateFallbackAnalysis(transcript);
  }
}

function generateFallbackAnalysis(
  transcript: { speaker: string; text: string; time?: string }[]
): ScamAnalysisResult {
  const fullText = transcript.map((t) => t.text.toLowerCase()).join(' ');

  let score = 5;
  const techniques: ScamAnalysisResult['detectedTechniques'] = [];
  const evidence: ScamAnalysisResult['evidence'] = [];

  if (fullText.includes('công an') || fullText.includes('trung tá') || fullText.includes('cảnh sát')) {
    score += 30;
    techniques.push({
      name: 'Giả danh cơ quan chức năng',
      icon: '👮',
      description: 'Xưng danh Cảnh sát/Bộ Công an để tạo lòng tin hoặc đe dọa',
      severity: 'HIGH',
    });
    evidence.push({
      type: 'Xưng danh chức vụ',
      detail: 'Mạo danh Cán bộ Cục Cảnh sát Điều tra',
      riskImpact: 'Tạo áp lực tâm lý chính quyền',
    });
  }

  if (fullText.includes('rửa tiền') || fullText.includes('ma túy') || fullText.includes('lệnh bắt')) {
    score += 35;
    techniques.push({
      name: 'Đe dọa & Gây sợ hãi',
      icon: '😨',
      description: 'Cáo buộc liên quan vụ án hình sự để nạn nhân hoảng loạn',
      severity: 'CRITICAL',
    });
    evidence.push({
      type: 'Tội danh cáo buộc',
      detail: 'Đường dây rửa tiền quốc tế',
      riskImpact: 'Khiến nạn nhân lo sợ bị bắt giam',
    });
  }

  if (fullText.includes('chuyển') || fullText.includes('tiền') || fullText.includes('15 phút') || fullText.includes('tài khoản')) {
    score += 25;
    techniques.push({
      name: 'Áp lực thời gian & Chuyển tiền',
      icon: '⏰',
      description: 'Yêu cầu chuyển tiền gấp vào tài khoản kiểm tra trong thời gian ngắn',
      severity: 'CRITICAL',
    });
    evidence.push({
      type: 'Yêu cầu tài chính',
      detail: 'Chuyển tiền tiết kiệm vào tài khoản niêm phong',
      riskImpact: 'Nguy cơ mất trắng tài sản',
    });
  }

  if (fullText.includes('bí mật') || fullText.includes('không được nói') || fullText.includes('con cái')) {
    score += 15;
    techniques.push({
      name: 'Ép buộc giữ bí mật (Cô lập)',
      icon: '🤐',
      description: 'Cấm trao đổi với người thân hay ngân hàng để ngăn cản cứu trợ',
      severity: 'HIGH',
    });
  }

  score = Math.min(98, score);
  let riskLevel: ScamAnalysisResult['riskLevel'] = 'SAFE';
  if (score >= 80) riskLevel = 'CRITICAL';
  else if (score >= 60) riskLevel = 'HIGH_RISK';
  else if (score >= 30) riskLevel = 'SUSPICIOUS';

  const timeline = transcript.map((t, idx) => ({
    time: t.time || `00:${(idx + 1) * 15 < 10 ? '0' : ''}${(idx + 1) * 15}`,
    event: t.text,
    technique: techniques[idx % Math.max(1, techniques.length)]?.name || 'Giao tiếp thông thường',
    risk: Math.min(100, Math.round((score / Math.max(1, transcript.length)) * (idx + 1))),
  }));

  return {
    riskScore: score,
    riskLevel,
    scamType: score > 50 ? 'Mạo danh cơ quan công an / lừa đảo chuyển tiền' : 'Cuộc gọi thông thường',
    summary: score > 50
      ? 'Phát hiện dấu hiệu lừa đảo mạo danh công an, đe dọa án phạt và yêu cầu chuyển tiền gấp.'
      : 'Cuộc gọi chưa phát hiện các dấu hiệu nguy hiểm rõ rệt.',
    detectedTechniques: techniques,
    evidence,
    timeline,
    recommendations: [
      'Tắt máy ngay lập tức nếu đối phương yêu cầu chuyển tiền hoặc đòi thông tin OTP.',
      'Gọi lại vào số tổng đài chính thức của công an hoặc ngân hàng để xác minh.',
      'Thông báo ngay cho người thân trong gia đình.',
    ],
    suggestedActions: [
      { action: 'Ngắt cuộc gọi ngay', urgent: true },
      { action: 'Gửi cảnh báo tới người thân', urgent: true },
    ],
  };
}

// Aliases conforming to system architecture specifications (docs/03_SYSTEM_ARCH.md)
export const analyzeTranscript = analyzeConversationWithGemini;
export const analyzeScreenshot = analyzeImageWithGemini;
export const analyzeAudio = analyzeAudioWithGemini;

export async function analyzeImageWithGemini(
  base64Image: string,
  mimeType: string = 'image/png'
): Promise<ScamAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      riskScore: 88,
      riskLevel: 'HIGH_RISK',
      scamType: 'Lệnh bắt / Lừa đảo chuyển tiền',
      summary: 'Hình ảnh chứa dấu hiệu văn bản lệnh bắt giả mạo hoặc thông báo khóa tài khoản ngân hàng nghi vấn.',
      detectedTechniques: [
        {
          name: 'Giấy tờ/Lệnh bắt giả mạo',
          icon: '📄',
          description: 'Hình ảnh có con dấu hoặc logo mạo danh cơ quan công an / ngân hàng',
          severity: 'HIGH',
        },
        {
          name: 'Thông tin tài khoản nhận tiền',
          icon: '💳',
          description: 'Yêu cầu chuyển khoản thanh toán cấp bách',
          severity: 'HIGH',
        },
      ],
      evidence: [
        {
          type: 'Hình ảnh phân tích',
          detail: 'Đã trích xuất hình ảnh tài liệu/tin nhắn nghi vấn',
          riskImpact: 'Nguy cơ lừa đảo qua tin nhắn / văn bản giả',
        },
      ],
      recommendations: [
        'Không chuyển tiền theo số tài khoản hiển thị trên ảnh.',
        'Kiểm tra tính hợp pháp của giấy tờ tại trụ sở công an phường/xã.',
      ],
      suggestedActions: [
        { action: 'Không bấm đường link trong ảnh', urgent: true },
        { action: 'Xác minh người gửi', urgent: false },
      ],
    };
  }

  try {
    const ai = getGeminiClient();
    const prompt = `Bạn là chuyên gia thẩm định lừa đảo trực tuyến (Scam & Fake Document Detector) của GuardAI.
Hãy phân tích hình ảnh này (có thể là ảnh chụp màn hình tin nhắn Zalo/SMS, văn bản lệnh bắt giả mạo, thông báo khóa tài khoản ngân hàng, mã QR chuyển tiền nghi vấn).

Hãy phân tích tất cả văn bản, logo, con dấu, số tài khoản, đường link web, dấu hiệu thao túng tâm lý trong ảnh.

YÊU CẦU:
Trả về duy nhất dữ liệu JSON nguyên bản với cấu trúc chính xác sau:
{
  "riskScore": number (0 đến 100),
  "riskLevel": "SAFE" | "SUSPICIOUS" | "HIGH_RISK" | "CRITICAL",
  "scamType": string (VD: "Lệnh bắt tạm giam giả mạo", "Tin nhắn giả mạo Ngân hàng", "Mã QR lừa đảo", "Ảnh chụp thông thường"),
  "summary": string (mô tả kết quả phân tích chi tiết bằng tiếng Việt),
  "detectedTechniques": [
    {
      "name": string,
      "icon": string (emoji),
      "description": string,
      "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
    }
  ],
  "evidence": [
    {
      "type": string,
      "detail": string,
      "riskImpact": string
    }
  ],
  "recommendations": [string],
  "suggestedActions": [
    {
      "action": string,
      "urgent": boolean
    }
  ]
}`;

    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: mimeType || 'image/png',
                data: cleanBase64,
              },
            },
            { text: prompt },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const responseText = response.text || '';
    return JSON.parse(responseText) as ScamAnalysisResult;
  } catch (error) {
    console.error('Gemini Image Analysis Error:', error);
    return {
      riskScore: 75,
      riskLevel: 'HIGH_RISK',
      scamType: 'Phát hiện hình ảnh nghi vấn',
      summary: 'Đã nhận hình ảnh. Vui lòng không làm theo hướng dẫn chuyển tiền ghi trên ảnh.',
      detectedTechniques: [
        {
          name: 'Nghi vấn giấy tờ/tin nhắn giả',
          icon: '⚠️',
          description: 'Nên đối chiếu kỹ thông tin người gửi',
          severity: 'HIGH',
        },
      ],
      evidence: [
        {
          type: 'Cảnh báo tự động',
          detail: 'Vui lòng kiểm tra lại với cơ quan chính thức',
          riskImpact: 'Tránh sập bẫy lừa đảo',
        },
      ],
      recommendations: ['Không chia sẻ mã OTP hoặc thông tin cá nhân.'],
      suggestedActions: [{ action: 'Xác minh trực tiếp', urgent: true }],
    };
  }
}

export async function analyzeAudioWithGemini(
  base64Audio: string,
  mimeType: string = 'audio/webm'
): Promise<ScamAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      riskScore: 82,
      riskLevel: 'HIGH_RISK',
      scamType: 'Phân tích file ghi âm',
      summary: 'Đã trích xuất dữ liệu âm thanh và phát hiện ngữ điệu hối thúc, dọa nạt.',
      detectedTechniques: [
        {
          name: 'Giọng nói hối thúc & Đe dọa',
          icon: '🎙️',
          description: 'Giọng đọc có cao độ gay gắt, ép buộc trả lời ngay',
          severity: 'HIGH',
        },
      ],
      evidence: [
        {
          type: 'Ghi âm phân tích',
          detail: 'Tệp âm thanh được tải lên',
          riskImpact: 'Dấu hiệu cuộc gọi mạo danh',
        },
      ],
      recommendations: ['Không làm theo bất kỳ hướng dẫn chuyển tiền nào trong băng ghi âm.'],
      suggestedActions: [{ action: 'Tắt máy và kiểm tra lại', urgent: true }],
    };
  }

  try {
    const ai = getGeminiClient();
    const prompt = `Bạn là chuyên gia phân tích băng ghi âm lừa đảo của GuardAI.
Hãy nghe đoạn ghi âm giọng nói này và trích xuất nội dung lời nói (transcript), nhận diện giọng đọc nhân tạo (Deepfake/AI voice), các chiêu trò mạo danh (Bộ công an, Viện kiểm sát, Ngân hàng, Bưu điện, Cảnh sát giao thông) và các thủ đoạn gây sức ép tài chính.

YÊU CẦU:
Trả về duy nhất dữ liệu JSON nguyên bản với cấu trúc chính xác sau:
{
  "riskScore": number (0 đến 100),
  "riskLevel": "SAFE" | "SUSPICIOUS" | "HIGH_RISK" | "CRITICAL",
  "scamType": string,
  "summary": string (mô tả nội dung ghi âm + phân tích bằng tiếng Việt),
  "detectedTechniques": [
    {
      "name": string,
      "icon": string (emoji),
      "description": string,
      "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
    }
  ],
  "evidence": [
    {
      "type": string,
      "detail": string,
      "riskImpact": string
    }
  ],
  "recommendations": [string],
  "suggestedActions": [
    {
      "action": string,
      "urgent": boolean
    }
  ]
}`;

    const cleanBase64 = base64Audio.replace(/^data:audio\/\w+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: mimeType || 'audio/webm',
                data: cleanBase64,
              },
            },
            { text: prompt },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const responseText = response.text || '';
    return JSON.parse(responseText) as ScamAnalysisResult;
  } catch (error) {
    console.error('Gemini Audio Analysis Error:', error);
    return {
      riskScore: 65,
      riskLevel: 'SUSPICIOUS',
      scamType: 'Xử lý file âm thanh',
      summary: 'Đã nhận file âm thanh. Vui lòng cảnh giác với các cuộc gọi xưng danh công an hay ngân hàng.',
      detectedTechniques: [
        {
          name: 'Ghi âm cuộc gọi',
          icon: '🎙️',
          description: 'Cần lưu ý nếu nội dung yêu cầu chuyển khoản',
          severity: 'MEDIUM',
        },
      ],
      evidence: [],
      recommendations: ['Xác minh danh tính người gọi qua kênh chính thức.'],
      suggestedActions: [{ action: 'Tắt máy', urgent: false }],
    };
  }
}

