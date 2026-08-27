import React, { useState, useEffect, useRef } from 'react';
import Navbar, { TabType } from './components/Navbar';
import LiveShieldTab, { PRESET_SCENARIOS } from './components/LiveShieldTab';
import SimulationArena from './components/SimulationArena';
import ReportsTab from './components/ReportsTab';
import ReportModal from './components/ReportModal';
import FamilyHubTab from './components/FamilyHubTab';
import HandbookTab from './components/HandbookTab';
import {
  TranscriptItem,
  ScamAnalysisResult,
  InvestigationReport,
  FamilyMember,
  EmergencyAlert,
  ScamKnowledgeItem
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('shield');

  // Backend Health & Status
  const [backendStatus, setBackendStatus] = useState<{ connected: boolean }>({ connected: false });

  // Live Conversation State
  const [isProtectionActive, setIsProtectionActive] = useState<boolean>(false);
  const [useLiveMic, setUseLiveMic] = useState<boolean>(false);
  const [micListening, setMicListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [currentRisk, setCurrentRisk] = useState<number>(0);
  const [riskDetails, setRiskDetails] = useState<ScamAnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>('');

  // Multimodal Image & Audio Analysis States
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzingImage, setAnalyzingImage] = useState<boolean>(false);
  const [imageAnalysis, setImageAnalysis] = useState<any>(null);

  const [uploadedAudio, setUploadedAudio] = useState<string | null>(null);
  const [analyzingAudio, setAnalyzingAudio] = useState<boolean>(false);
  const [audioAnalysis, setAudioAnalysis] = useState<any>(null);

  // Reports State
  const [reports, setReports] = useState<InvestigationReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<InvestigationReport | null>(null);
  const [savingReport, setSavingReport] = useState<boolean>(false);
  const [reportSavedSuccess, setReportSavedSuccess] = useState<boolean>(false);

  // Family Shield State
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [familyAlerts, setFamilyAlerts] = useState<EmergencyAlert[]>([]);
  const [notifiedGuardian, setNotifiedGuardian] = useState<boolean>(false);
  const [sosDispatched, setSosDispatched] = useState<boolean>(false);

  // Knowledge Base State
  const [knowledgeBase, setKnowledgeBase] = useState<ScamKnowledgeItem[]>([]);

  // Refs
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const isListeningRef = useRef<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  // Load Initial Data from Backend
  useEffect(() => {
    // Health check
    fetch('/api/health')
      .then((res) => res.json())
      .then(() => setBackendStatus({ connected: true }))
      .catch(() => setBackendStatus({ connected: false }));

    // Load Reports
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setReports(data.data);
        }
      })
      .catch((err) => console.warn('Failed to fetch reports:', err));

    // Load Family Members
    fetch('/api/family/members')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setFamilyMembers(data.data);
        }
      })
      .catch((err) => console.warn('Failed to fetch family members:', err));

    // Load Family Alerts
    fetch('/api/family/alerts')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setFamilyAlerts(data.data);
        }
      })
      .catch((err) => console.warn('Failed to fetch alerts:', err));

    // Load Knowledge Base
    fetch('/api/knowledge-base')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setKnowledgeBase(data.data);
        }
      })
      .catch((err) => console.warn('Failed to fetch knowledge base:', err));
  }, []);

  // Safely stop all active microphone tracks and recognition instances immediately
  const stopAllAudioCapture = () => {
    isListeningRef.current = false;
    setUseLiveMic(false);
    setMicListening(false);

    // Stop and abort Speech Recognition completely
    if (recognitionRef.current) {
      const rec = recognitionRef.current;
      rec.onend = null;
      rec.onerror = null;
      rec.onresult = null;
      rec.onstart = null;
      rec.onspeechstart = null;
      rec.onspeechend = null;
      rec.onaudiostart = null;
      rec.onaudioend = null;

      try {
        rec.abort();
      } catch (e) {
        console.warn('SpeechRecognition abort warning:', e);
      }
      try {
        rec.stop();
      } catch (e) {
        console.warn('SpeechRecognition stop warning:', e);
      }
      recognitionRef.current = null;
    }

    // Stop all hardware media stream tracks
    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
      } catch (e) {
        console.warn('Error stopping media tracks:', e);
      }
      mediaStreamRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllAudioCapture();
    };
  }, []);

  // Toggle Live Microphone
  const toggleLiveMicrophone = async () => {
    if (useLiveMic || micListening || isListeningRef.current) {
      stopAllAudioCapture();
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ Web Speech API nhận diện giọng nói trực tiếp. Bạn có thể sử dụng tính năng tải file ghi âm hoặc chọn kịch bản giả lập.');
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'vi-VN';

      rec.onstart = () => {
        isListeningRef.current = true;
        setMicListening(true);
      };

      rec.onresult = (event: any) => {
        let finalSentence = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalSentence += event.results[i][0].transcript;
          }
        }

        if (finalSentence.trim()) {
          const newItem: TranscriptItem = {
            id: `speech-${Date.now()}`,
            time: new Date().toLocaleTimeString('vi-VN'),
            speaker: 'Caller',
            speakerLabel: 'Giọng nói thu âm trực tiếp',
            text: finalSentence.trim(),
          };

          setTranscript((prev) => {
            const next = [...prev, newItem];
            analyzeTranscriptWithBackend(next);
            return next;
          });
        }
      };

      rec.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        if (err.error === 'not-allowed' || err.error === 'service-not-allowed' || err.error === 'audio-capture') {
          stopAllAudioCapture();
        }
      };

      rec.onend = () => {
        if (isListeningRef.current && recognitionRef.current) {
          try {
            rec.start();
          } catch {
            setMicListening(false);
          }
        } else {
          setMicListening(false);
        }
      };

      recognitionRef.current = rec;
      isListeningRef.current = true;
      setUseLiveMic(true);
      setIsProtectionActive(true);
      rec.start();
    } catch (e) {
      console.error('Failed to start microphone:', e);
      stopAllAudioCapture();
      alert('Không thể khởi động Microphone. Vui lòng cho phép quyền truy cập micro trong trình duyệt.');
    }
  };

  // Analyze Conversation with Backend Gemini API
  const analyzeTranscriptWithBackend = async (currentItems: TranscriptItem[]) => {
    if (!currentItems || currentItems.length === 0) return;

    setAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: currentItems }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const resData = await response.json();
      if (resData.success && resData.data) {
        const data: ScamAnalysisResult = resData.data;
        setCurrentRisk(data.riskScore || 0);
        setRiskDetails(data);

        // Hardware Vibration Feedback for Critical Risk Alert (docs/01_PRODUCT_SPEC.md & 07_UI_GUIDELINE.md)
        if (data.riskScore >= 80 || data.riskLevel === 'CRITICAL') {
          if (typeof window !== 'undefined' && 'vibrate' in navigator) {
            try {
              navigator.vibrate([400, 150, 400, 150, 400]);
            } catch (vErr) {
              console.warn('Vibration API error:', vErr);
            }
          }
        }

        // Auto Notify Family Guardian if critical (>= 85%) and not notified yet
        if (data.riskScore >= 85 && !notifiedGuardian) {
          triggerEmergencyNotification(data);
        }
      }
    } catch (error) {
      console.warn('Backend analysis failed, applying local baseline fallback:', error);
      evaluateBaselineLocally(currentItems);
    } finally {
      setAnalyzing(false);
    }
  };

  // Baseline Fallback Evaluation
  const evaluateBaselineLocally = (items: TranscriptItem[]) => {
    const fullText = items.map((i) => i.text.toLowerCase()).join(' ');
    let score = 10;
    const detected: any[] = [];
    const evidence: any[] = [];

    if (fullText.includes('công an') || fullText.includes('cảnh sát') || fullText.includes('điều tra')) {
      score += 35;
      detected.push({
        name: 'Giả danh Cơ quan Công quyền',
        icon: '👮',
        description: 'Xưng danh công an/cán bộ điều tra đe dọa người nghe',
        severity: 'CRITICAL',
      });
      evidence.push({
        type: 'Xưng danh cơ quan chức năng',
        detail: 'Cán bộ điều tra tội phạm Bộ Công an',
        riskImpact: 'Tạo áp lực sợ hãi pháp lý',
      });
    }

    if (fullText.includes('rửa tiền') || fullText.includes('lệnh bắt') || fullText.includes('ma túy')) {
      score += 35;
      detected.push({
        name: 'Đe dọa & Gây sợ hãi cực độ',
        icon: '😨',
        description: 'Cáo buộc liên quan trọng án để nạn nhân mất bình tĩnh',
        severity: 'CRITICAL',
      });
      evidence.push({
        type: 'Tội danh nghiêm trọng',
        detail: 'Vụ án ma túy & rửa tiền 50 tỷ',
        riskImpact: 'Làm tê liệt phản xạ phản biện',
      });
    }

    if (fullText.includes('chuyển') || fullText.includes('tiền') || fullText.includes('otp') || fullText.includes('phút')) {
      score += 20;
      detected.push({
        name: 'Gây áp lực khẩn cấp & Đòi tài chính',
        icon: '⏰',
        description: 'Ép buộc chuyển tiền trong thời gian rất ngắn',
        severity: 'HIGH',
      });
      evidence.push({
        type: 'Yêu cầu tài chính',
        detail: 'Chuyển tiền vào tài khoản niêm phong trong 15 phút',
        riskImpact: 'Nguy cơ mất trắng tài sản ngay lập tức',
      });
    }

    const calculatedRisk = Math.min(100, score);
    setCurrentRisk(calculatedRisk);
    const mockRes: ScamAnalysisResult = {
      riskScore: calculatedRisk,
      riskLevel: calculatedRisk >= 80 ? 'CRITICAL' : calculatedRisk >= 60 ? 'HIGH_RISK' : 'SUSPICIOUS',
      scamType: 'Nghi vấn lừa đảo mạo danh cơ quan công quyền',
      summary: 'Đối tượng sử dụng thủ thuật đe dọa bắt giữ, yêu cầu giữ bí mật và ép chuyển tiền gấp.',
      detectedTechniques: detected,
      evidence,
      recommendations: [
        'Lập tức cúp máy.',
        'Tuyệt đối không chuyển tiền vào bất kỳ tài khoản nào.',
        'Báo ngay cho con cái hoặc người thân gần nhất.',
      ],
    };
    setRiskDetails(mockRes);

    if (calculatedRisk >= 85 && !notifiedGuardian) {
      triggerEmergencyNotification(mockRes);
    }
  };

  // Trigger Emergency Notification via API
  const triggerEmergencyNotification = async (data?: ScamAnalysisResult | null) => {
    const analysis = data || riskDetails;
    try {
      const res = await fetch('/api/family/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guardianName: 'Con trai (Người bảo hộ)',
          targetMember: 'Mẹ (Nguyễn Thị Mai)',
          riskScore: analysis?.riskScore || currentRisk || 95,
          scamType: analysis?.scamType || 'Mạo danh đe dọa lừa đảo',
        }),
      });
      const result = await res.json();
      if (result.success && result.details) {
        setFamilyAlerts((prev) => [result.details, ...prev]);
        setNotifiedGuardian(true);
        setSosDispatched(true);
        setTimeout(() => setSosDispatched(false), 5000);
      }
    } catch (err) {
      console.warn('Failed to send notification via API:', err);
      setNotifiedGuardian(true);
      setSosDispatched(true);
      setTimeout(() => setSosDispatched(false), 5000);
    }
  };

  // Save Current Session as an Investigation Dossier Report
  const handleSaveReport = async () => {
    if (transcript.length === 0 && !imageAnalysis && !audioAnalysis) return;

    setSavingReport(true);
    const newReportData: Partial<InvestigationReport> = {
      title: riskDetails?.scamType
        ? `Hồ sơ: ${riskDetails.scamType}`
        : 'Hồ sơ giám định cuộc gọi nghi vấn',
      victimName: 'Mẹ (Nguyễn Thị Mai)',
      reporterRole: 'Con trai (Người bảo hộ)',
      callerNumber: '024 7779 xxxx (Đầu số giả lập)',
      riskScore: currentRisk,
      riskLevel: currentRisk >= 80 ? 'CRITICAL' : currentRisk >= 60 ? 'HIGH_RISK' : 'SUSPICIOUS',
      scamType: riskDetails?.scamType || 'Nghi vấn lừa đảo mạo danh',
      summary: riskDetails?.summary || 'Ghi nhận chuỗi đe dọa và yêu cầu chuyển tiền khẩn cấp.',
      detectedTechniques: riskDetails?.detectedTechniques || [],
      evidence: riskDetails?.evidence || [],
      recommendations: riskDetails?.recommendations || ['Gác máy ngay', 'Không chuyển tiền'],
      transcript: transcript,
    };

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReportData),
      });
      const data = await res.json();
      if (data.success && data.report) {
        setReports((prev) => [data.report, ...prev]);
        setReportSavedSuccess(true);
        setTimeout(() => setReportSavedSuccess(false), 4000);
      }
    } catch (e) {
      console.error('Failed to save report:', e);
    } finally {
      setSavingReport(false);
    }
  };

  // Delete Report
  const handleDeleteReport = async (id: string) => {
    try {
      await fetch(`/api/reports/${id}`, { method: 'DELETE' });
      setReports((prev) => prev.filter((r) => r.id !== id));
      if (selectedReport?.id === id) {
        setSelectedReport(null);
      }
    } catch (e) {
      console.error('Failed to delete report:', e);
    }
  };

  // Add Family Member
  const handleAddFamilyMember = async (member: Partial<FamilyMember>) => {
    try {
      const res = await fetch('/api/family/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setFamilyMembers((prev) => [...prev, data.data]);
      }
    } catch (e) {
      console.error('Failed to add family member:', e);
    }
  };

  // Delete Family Member
  const handleDeleteFamilyMember = async (id: string) => {
    try {
      await fetch(`/api/family/members/${id}`, { method: 'DELETE' });
      setFamilyMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      console.error('Failed to delete family member:', e);
    }
  };

  // Handle Custom Text Submit
  const handleAddCustomText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    setIsProtectionActive(true);
    const newItem: TranscriptItem = {
      id: `custom-${Date.now()}`,
      time: new Date().toLocaleTimeString('vi-VN'),
      speaker: 'Caller',
      speakerLabel: 'Người gọi (Không rõ)',
      text: customText.trim(),
    };

    setTranscript((prev) => {
      const next = [...prev, newItem];
      analyzeTranscriptWithBackend(next);
      return next;
    });

    setCustomText('');
  };

  // Handle Loading Preset Scenarios
  const handleLoadPreset = (scenario: typeof PRESET_SCENARIOS[0]) => {
    setIsProtectionActive(true);
    setTranscript(scenario.items);
    analyzeTranscriptWithBackend(scenario.items);
  };

  // Handle Screenshot Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      setUploadedImage(base64Data);
      setAnalyzingImage(true);
      setIsProtectionActive(true);

      try {
        const rawBase64 = base64Data.split(',')[1] || base64Data;
        const res = await fetch('/api/analyze-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: rawBase64,
            mimeType: file.type || 'image/png',
          }),
        });
        const result = await res.json();
        if (result.success && result.data) {
          setImageAnalysis(result.data);
          if (result.data.riskScore > currentRisk) {
            setCurrentRisk(result.data.riskScore);
            setRiskDetails(result.data);
          }
        }
      } catch (err) {
        console.error('Image analysis error:', err);
      } finally {
        setAnalyzingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Audio File Upload
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      setUploadedAudio(base64Data);
      setAnalyzingAudio(true);
      setIsProtectionActive(true);

      try {
        const rawBase64 = base64Data.split(',')[1] || base64Data;
        const res = await fetch('/api/analyze-audio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audio: rawBase64,
            mimeType: file.type || 'audio/webm',
          }),
        });
        const result = await res.json();
        if (result.success && result.data) {
          setAudioAnalysis(result.data);
          if (result.data.riskScore > currentRisk) {
            setCurrentRisk(result.data.riskScore);
            setRiskDetails(result.data);
          }
        }
      } catch (err) {
        console.error('Audio analysis error:', err);
      } finally {
        setAnalyzingAudio(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Reset Session
  const handleReset = () => {
    stopAllAudioCapture();
    setIsProtectionActive(false);
    setTranscript([]);
    setCurrentRisk(0);
    setRiskDetails(null);
    setUploadedImage(null);
    setImageAnalysis(null);
    setUploadedAudio(null);
    setAudioAnalysis(null);
    setNotifiedGuardian(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans flex flex-col antialiased">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendConnected={backendStatus.connected}
        activeRisk={currentRisk}
        onQuickSOS={() => triggerEmergencyNotification()}
        sosDispatched={sosDispatched}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'shield' && (
          <LiveShieldTab
            currentRisk={currentRisk}
            riskDetails={riskDetails}
            analyzing={analyzing}
            transcript={transcript}
            useLiveMic={useLiveMic}
            micListening={micListening}
            toggleLiveMicrophone={toggleLiveMicrophone}
            stopAllAudioCapture={stopAllAudioCapture}
            uploadedImage={uploadedImage}
            analyzingImage={analyzingImage}
            imageAnalysis={imageAnalysis}
            handleImageUpload={handleImageUpload}
            clearImage={() => { setUploadedImage(null); setImageAnalysis(null); }}
            uploadedAudio={uploadedAudio}
            analyzingAudio={analyzingAudio}
            audioAnalysis={audioAnalysis}
            handleAudioUpload={handleAudioUpload}
            clearAudio={() => { setUploadedAudio(null); setAudioAnalysis(null); }}
            customText={customText}
            setCustomText={setCustomText}
            handleAddCustomText={handleAddCustomText}
            handleLoadPreset={handleLoadPreset}
            handleReset={handleReset}
            notifiedGuardian={notifiedGuardian}
            handleNotifyGuardian={() => triggerEmergencyNotification()}
            handleSaveReport={handleSaveReport}
            savingReport={savingReport}
            reportSavedSuccess={reportSavedSuccess}
            imageInputRef={imageInputRef}
            audioInputRef={audioInputRef}
          />
        )}

        {activeTab === 'simulation' && (
          <SimulationArena />
        )}

        {activeTab === 'reports' && (
          <ReportsTab
            reports={reports}
            onSelectReport={(rep) => setSelectedReport(rep)}
            onDeleteReport={handleDeleteReport}
            onNewLiveSession={() => setActiveTab('shield')}
          />
        )}

        {activeTab === 'family' && (
          <FamilyHubTab
            members={familyMembers}
            alerts={familyAlerts}
            onAddMember={handleAddFamilyMember}
            onDeleteMember={handleDeleteFamilyMember}
            onTriggerSOS={(target, score) => {
              triggerEmergencyNotification({
                riskScore: score,
                riskLevel: 'CRITICAL',
                scamType: 'Báo động thử nghiệm khẩn cấp từ Family Hub',
                summary: `Yêu cầu xác minh an toàn cho ${target}`,
                detectedTechniques: [],
                evidence: [],
                recommendations: ['Gọi lại cho người thân ngay'],
              });
            }}
            sosDispatched={sosDispatched}
          />
        )}

        {activeTab === 'handbook' && (
          <HandbookTab knowledgeBase={knowledgeBase} />
        )}
      </main>

      {/* Report Modal */}
      {selectedReport && (
        <ReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}

      {/* Global Footer */}
      <footer className="border-t border-slate-200 bg-white py-5 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            <strong>GuardAI Voice Shield</strong> &bull; Hệ thống trợ lý AI phòng vệ lừa đảo & bảo vệ gia đình
          </span>
          <span className="text-slate-400">
            Powered by Google Gemini 3.6 Flash &bull; Bộ Công an & Cục An toàn thông tin
          </span>
        </div>
      </footer>
    </div>
  );
}
