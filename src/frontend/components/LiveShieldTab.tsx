import React, { RefObject } from 'react';
import {
  ShieldAlert,
  Mic,
  MicOff,
  Image,
  FileUp,
  RotateCcw,
  Sparkles,
  PhoneOff,
  Users,
  CheckCircle2,
  Bell,
  Send,
  Loader2,
  PhoneCall,
  User,
  Clock,
  FileText,
  Volume2,
  X,
  ArrowRight,
  Info,
  Save,
  Radio
} from 'lucide-react';
import {
  TranscriptItem,
  ScamAnalysisResult
} from '../types';

export const PRESET_SCENARIOS = [
  {
    name: 'Giả danh Cảnh sát điều tra',
    description: 'Đe dọa liên quan vụ án ma túy, rửa tiền 50 tỷ, ép chuyển tiền trong 15 phút',
    items: [
      {
        id: 'p1',
        time: new Date().toLocaleTimeString('vi-VN'),
        speaker: 'Caller' as const,
        speakerLabel: 'Người gọi (Không rõ)',
        text: 'Alo, tôi là Trung tá Nguyễn Văn Nam - Cán bộ Cục Cảnh sát Điều tra Tội phạm Bộ Công an.',
        techniqueVi: 'Giả danh cơ quan công an',
        techniqueIcon: '👮',
      },
      {
        id: 'p2',
        time: new Date().toLocaleTimeString('vi-VN'),
        speaker: 'Caller' as const,
        speakerLabel: 'Người gọi (Không rõ)',
        text: 'Căn cước công dân của anh/chị liên quan trực tiếp đến vụ án rửa tiền 50 tỷ. Lệnh bắt giam đã ký.',
        techniqueVi: 'Đe dọa & Gây sợ hãi',
        techniqueIcon: '😨',
      },
      {
        id: 'p3',
        time: new Date().toLocaleTimeString('vi-VN'),
        speaker: 'Caller' as const,
        speakerLabel: 'Người gọi (Không rõ)',
        text: 'Để phục vụ điều tra vô tội, phải chuyển ngay tiền tiết kiệm sang tài khoản niêm phong trong 15 phút.',
        techniqueVi: 'Áp lực khẩn cấp & Yêu cầu tài chính',
        techniqueIcon: '⏰',
      },
      {
        id: 'p4',
        time: new Date().toLocaleTimeString('vi-VN'),
        speaker: 'Caller' as const,
        speakerLabel: 'Người gọi (Không rõ)',
        text: 'Tuyệt đối KHÔNG được nói với con cái hay ngân hàng. Đây là hồ sơ tuyệt mật.',
        techniqueVi: 'Ép buộc giữ bí mật & Cô lập',
        techniqueIcon: '🤐',
      },
    ],
  },
  {
    name: 'Giả danh Ngân hàng khóa thẻ & Đòi OTP',
    description: 'Báo trừ tiền bất thường ở nước ngoài, lừa chiếm đoạt mã OTP bảo mật',
    items: [
      {
        id: 'b1',
        time: new Date().toLocaleTimeString('vi-VN'),
        speaker: 'Caller' as const,
        speakerLabel: 'Tổng đài viên giả mạo',
        text: 'Em chào anh, em gọi từ Trung tâm Giám sát gian lận Ngân hàng TMCP Việt Nam.',
        techniqueVi: 'Tạo vỏ bọc uy tín',
        techniqueIcon: '🏦',
      },
      {
        id: 'b2',
        time: new Date().toLocaleTimeString('vi-VN'),
        speaker: 'Caller' as const,
        speakerLabel: 'Tổng đài viên giả mạo',
        text: 'Thẻ của anh vừa phát sinh thanh toán 25 triệu tại Singapore. Cần hủy lệnh ngay.',
        techniqueVi: 'Tạo biến cố khẩn cấp',
        techniqueIcon: '💳',
      },
      {
        id: 'b3',
        time: new Date().toLocaleTimeString('vi-VN'),
        speaker: 'Caller' as const,
        speakerLabel: 'Tổng đài viên giả mạo',
        text: 'Anh vui lòng đọc mã OTP 6 số vừa gửi về tin nhắn SMS để em hủy giao dịch giúp anh.',
        techniqueVi: 'Thu thập mã xác thực OTP',
        techniqueIcon: '🔑',
      },
    ],
  },
];

interface LiveShieldTabProps {
  currentRisk: number;
  riskDetails: ScamAnalysisResult | null;
  analyzing: boolean;
  transcript: TranscriptItem[];
  useLiveMic: boolean;
  micListening: boolean;
  toggleLiveMicrophone: () => void;
  stopAllAudioCapture: () => void;
  uploadedImage: string | null;
  analyzingImage: boolean;
  imageAnalysis: any;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearImage: () => void;
  uploadedAudio: string | null;
  analyzingAudio: boolean;
  audioAnalysis: any;
  handleAudioUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearAudio: () => void;
  customText: string;
  setCustomText: (text: string) => void;
  handleAddCustomText: (e: React.FormEvent) => void;
  handleLoadPreset: (preset: typeof PRESET_SCENARIOS[0]) => void;
  handleReset: () => void;
  notifiedGuardian: boolean;
  handleNotifyGuardian: () => void;
  handleSaveReport: () => void;
  savingReport: boolean;
  reportSavedSuccess: boolean;
  imageInputRef: RefObject<HTMLInputElement>;
  audioInputRef: RefObject<HTMLInputElement>;
}

export default function LiveShieldTab({
  currentRisk,
  riskDetails,
  analyzing,
  transcript,
  useLiveMic,
  micListening,
  toggleLiveMicrophone,
  stopAllAudioCapture,
  uploadedImage,
  analyzingImage,
  imageAnalysis,
  handleImageUpload,
  clearImage,
  uploadedAudio,
  analyzingAudio,
  audioAnalysis,
  handleAudioUpload,
  clearAudio,
  customText,
  setCustomText,
  handleAddCustomText,
  handleLoadPreset,
  handleReset,
  notifiedGuardian,
  handleNotifyGuardian,
  handleSaveReport,
  savingReport,
  reportSavedSuccess,
  imageInputRef,
  audioInputRef,
}: LiveShieldTabProps) {
  // Risk tier visual helpers
  const getRiskStatus = (score: number) => {
    if (score >= 80) {
      return {
        label: 'RẤT NGUY HIỂM (BẪY LỪA ĐẢO)',
        textColor: 'text-red-700',
        badgeBg: 'bg-red-100 text-red-800 border-red-200',
        barBg: 'bg-red-600',
        cardBg: 'border-red-200 ring-4 ring-red-50',
        desc: 'Phát hiện hành vi mạo danh công an/ngân hàng, gây áp lực tâm lý và đòi chuyển tiền khẩn cấp.',
      };
    }
    if (score >= 60) {
      return {
        label: 'NGUY CƠ CAO (CẢNH BÁO)',
        textColor: 'text-orange-700',
        badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
        barBg: 'bg-orange-500',
        cardBg: 'border-orange-200 ring-2 ring-orange-50',
        desc: 'Có dấu hiệu khai thác thông tin cá nhân và thúc giục tài chính bất thường.',
      };
    }
    if (score >= 30) {
      return {
        label: 'CÓ NGHI VẤN (CẦN LƯU Ý)',
        textColor: 'text-amber-700',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
        barBg: 'bg-amber-500',
        cardBg: 'border-amber-200',
        desc: 'Đang theo dõi ngữ cảnh hội thoại để phân tích thêm dữ liệu.',
      };
    }
    return {
      label: 'AN TOÀN',
      textColor: 'text-emerald-700',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      barBg: 'bg-emerald-500',
      cardBg: 'border-slate-200',
      desc: 'Chưa phát hiện hành vi lừa đảo hoặc dấu hiệu đe dọa.',
    };
  };

  const status = getRiskStatus(currentRisk);

  return (
    <div className="space-y-6">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={audioInputRef}
        onChange={handleAudioUpload}
        accept="audio/*"
        className="hidden"
      />

      {/* Hero Control Banner */}
      <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Bảo vệ thời gian thực & Phân tích đa phương thức</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Lắng nghe cuộc gọi trực tiếp hoặc kiểm tra ảnh chụp / file ghi âm
          </h1>

          <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Bật micro để thu âm lời nói thoại gian thực, tải lên ảnh chụp màn hình tin nhắn Zalo/SMS/văn bản nghi vấn, hoặc tải file ghi âm cuộc gọi để Gemini AI phân tích ngay lập tức.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={toggleLiveMicrophone}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-lg cursor-pointer ${
                useLiveMic
                  ? 'bg-red-500 hover:bg-red-600 text-white ring-4 ring-red-400/40 animate-pulse'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white ring-4 ring-emerald-400/20'
              }`}
            >
              {useLiveMic ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{useLiveMic ? 'Tắt Micro Thu Âm' : 'Bật Micro Thu Trực Tiếp'}</span>
            </button>

            <button
              onClick={() => imageInputRef.current?.click()}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2 border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
            >
              <Image className="w-4 h-4 text-cyan-300" />
              <span>Tải ảnh chụp màn hình</span>
            </button>

            <button
              onClick={() => audioInputRef.current?.click()}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2 border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
            >
              <FileUp className="w-4 h-4 text-amber-300" />
              <span>Tải file ghi âm</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3.5 py-3 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-2xl text-xs flex items-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
              title="Đặt lại toàn bộ phiên"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại</span>
            </button>
          </div>
        </div>

        {/* Background glow */}
        <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Live Mic Waveform Indicator */}
      {useLiveMic && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950 shadow-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex items-end gap-1 h-5 w-6 shrink-0">
              <span className="w-1 bg-emerald-600 rounded-full animate-[bounce_0.8s_infinite_100ms] h-3"></span>
              <span className="w-1 bg-emerald-600 rounded-full animate-[bounce_0.8s_infinite_300ms] h-5"></span>
              <span className="w-1 bg-emerald-600 rounded-full animate-[bounce_0.8s_infinite_200ms] h-4"></span>
              <span className="w-1 bg-emerald-600 rounded-full animate-[bounce_0.8s_infinite_400ms] h-2"></span>
            </div>
            <div>
              <p className="font-bold text-emerald-900 flex items-center gap-2">
                <span>Đang thu âm microphone trực tiếp (Tiếng Việt)</span>
                <span className="bg-emerald-200 text-emerald-900 text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase">Live</span>
              </p>
              <p className="text-emerald-700 mt-0.5">Nói vào micro hoặc bật loa ngoài để AI nhận diện tức thì...</p>
            </div>
          </div>
          <button
            onClick={stopAllAudioCapture}
            className="self-end sm:self-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <MicOff className="w-3.5 h-3.5" />
            <span>Dừng thu âm ngay</span>
          </button>
        </div>
      )}

      {/* Preset Scenarios Quick Picker */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Thử nghiệm nhanh kịch bản lừa đảo thực tế:
          </span>
          <span className="text-xs text-slate-500">Bấm để tải cuộc gọi mẫu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRESET_SCENARIOS.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => handleLoadPreset(sc)}
              className="p-3.5 bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-200 rounded-xl text-left transition-all group cursor-pointer space-y-1"
            >
              <p className="font-bold text-slate-900 text-xs group-hover:text-indigo-700 flex items-center justify-between">
                <span>{sc.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
              </p>
              <p className="text-[11px] text-slate-500 leading-normal">{sc.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Risk Gauge & Emergency Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Risk Gauge Card */}
          <div className={`p-6 rounded-2xl border ${status.cardBg} bg-white shadow-sm space-y-5 transition-all duration-300 relative`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className={`w-5 h-5 ${status.textColor}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Chỉ số rủi ro cuộc gọi
                </span>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider border font-bold ${status.badgeBg}`}>
                {status.label}
              </span>
            </div>

            {/* Gauge Display */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <div className={`text-5xl sm:text-6xl font-black tracking-tight ${status.textColor}`}>
                  {currentRisk}%
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium max-w-[200px]">
                  {riskDetails?.summary || status.desc}
                </p>
              </div>

              {/* Visual Gauge Circle */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={`transition-all duration-500 ${status.textColor}`}
                    strokeDasharray={`${currentRisk}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-lg">
                    {currentRisk < 30 ? '🟢' : currentRisk < 60 ? '🟡' : currentRisk < 80 ? '🟠' : '🔴'}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>An toàn (0%)</span>
                <span>Nguy hiểm (100%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${status.barBg}`}
                  style={{ width: `${currentRisk}%` }}
                />
              </div>
            </div>

            {/* Analyzing Indicator */}
            {analyzing && (
              <div className="flex items-center gap-2 p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span className="font-medium">Gemini 3.6 Flash đang phân tích thời gian thực...</span>
              </div>
            )}

            {/* Action to Save Report */}
            {transcript.length > 0 && (
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Lưu biên bản vụ việc vào hồ sơ:</span>
                <button
                  onClick={handleSaveReport}
                  disabled={savingReport}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    reportSavedSuccess
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                  }`}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{reportSavedSuccess ? 'Đã lưu vào Hồ Sơ!' : 'Lưu hồ sơ giám định'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Emergency Recommendation Card */}
          {currentRisk >= 60 && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl space-y-4 shadow-sm animate-fade-in">
              <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <span>HÀNH ĐỘNG ĐỀ XUẤT KHẨN CẤP</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-800">
                <div className="p-3 bg-white rounded-xl border border-red-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-red-700 font-bold">
                    <PhoneOff className="w-4 h-4 text-red-600 shrink-0" />
                    <span>1. CHỦ ĐỘNG GÁC MÁY / TẮT CUỘC GỌI</span>
                  </div>
                  <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">Khuyên dùng</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2.5 text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2. KHÔNG chuyển tiền hoặc cung cấp mã OTP ngân hàng</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2.5 text-slate-700 font-medium">
                  <Users className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>3. Gọi điện ngay cho con cái/người thân để xác minh</span>
                </div>
              </div>

              <div className="pt-1 flex gap-2">
                <button
                  onClick={handleNotifyGuardian}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  <span>Báo khẩn cấp người thân</span>
                </button>
                <button
                  onClick={handleReset}
                  className="py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đặt lại</span>
                </button>
              </div>
            </div>
          )}

          {/* Family Shield Link Card */}
          <div className="p-5 bg-gradient-to-br from-indigo-50/80 to-cyan-50/80 border border-indigo-100 rounded-2xl space-y-3 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-indigo-600" />
                Bảo vệ gia đình (Family Shield)
              </span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
                Đang bật
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Người giám hộ liên kết: <span className="text-slate-900 font-bold">Con trai (0912***789)</span>
            </p>

            {notifiedGuardian ? (
              <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-red-800 text-xs flex items-center gap-2 font-medium">
                <Bell className="w-4 h-4 text-red-600 shrink-0 animate-bounce" />
                <span>Đã tự động gửi thông báo khẩn cấp tới điện thoại người thân qua API Backend!</span>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-500" />
                <span>Tự động kích hoạt thông báo khi rủi ro &ge; 85%</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Transcript Stream & Evidence */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Input Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <form onSubmit={handleAddCustomText} className="flex gap-2">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Nhập hoặc dán câu nói trực tiếp (VD: 'Tôi là công an điều tra vụ án ma túy...')"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi phân tích</span>
              </button>
            </form>
          </div>

          {/* Display Screenshot / Audio Analysis Results if present */}
          {uploadedImage && (
            <div className="bg-white border border-cyan-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b pb-2 border-slate-100">
                <span className="font-bold text-xs text-indigo-900 flex items-center gap-2">
                  <Image className="w-4 h-4 text-cyan-600" />
                  Kết quả phân tích ảnh chụp màn hình
                </span>
                <button
                  onClick={clearImage}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <img
                  src={uploadedImage}
                  alt="Uploaded screenshot"
                  className="w-32 h-32 object-cover rounded-xl border border-slate-200 shrink-0"
                />
                <div className="space-y-2 text-xs flex-1">
                  {analyzingImage ? (
                    <div className="flex items-center gap-2 text-indigo-600 py-4 font-medium">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Gemini 3.6 Flash đang thẩm định văn bản và con dấu trong ảnh...</span>
                    </div>
                  ) : imageAnalysis ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">Loại nghi vấn:</span>
                        <span className="text-red-700 font-bold bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                          {imageAnalysis.scamType}
                        </span>
                      </div>
                      <p className="text-slate-700">{imageAnalysis.summary}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {imageAnalysis.detectedTechniques?.map((tech: any, i: number) => (
                          <span key={i} className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-medium">
                            {tech.icon} {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {uploadedAudio && (
            <div className="bg-white border border-cyan-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b pb-2 border-slate-100">
                <span className="font-bold text-xs text-indigo-900 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-600" />
                  Kết quả phân tích file ghi âm
                </span>
                <button
                  onClick={clearAudio}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <audio controls src={uploadedAudio} className="w-full h-10" />
                {analyzingAudio ? (
                  <div className="flex items-center gap-2 text-indigo-600 py-2 font-medium">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gemini đang thẩm định âm thanh, ngữ điệu và trích xuất lời nói...</span>
                  </div>
                ) : audioAnalysis ? (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <p className="font-bold text-slate-900">{audioAnalysis.scamType}</p>
                    <p className="text-slate-700 leading-relaxed">{audioAnalysis.summary}</p>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {/* Live Transcript Stream */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-[420px]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${useLiveMic ? 'bg-emerald-500 animate-ping' : 'bg-slate-300'}`} />
                <span className="font-bold text-slate-900 text-sm">Nội dung cuộc gọi thời gian thực</span>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {transcript.length} câu nói
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
              {transcript.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Mic className="w-6 h-6" />
                  </div>
                  <p className="font-medium text-slate-700">Chưa có dữ liệu cuộc gọi</p>
                  <p className="max-w-xs text-slate-400">
                    Hãy bấm <span className="text-indigo-600 font-bold">"Bật Micro Thu Trực Tiếp"</span> để nói vào micro, hoặc bấm chọn một <span className="text-indigo-600 font-bold">kịch bản mẫu</span> ở trên.
                  </p>
                </div>
              ) : (
                transcript.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 transition-all ${
                      item.speaker === 'Caller'
                        ? 'bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-indigo-50/70 border-indigo-100 text-indigo-950 ml-6'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={`font-bold flex items-center gap-1.5 ${item.speaker === 'Caller' ? 'text-slate-900' : 'text-indigo-700'}`}>
                        {item.speaker === 'Caller' ? <PhoneCall className="w-3.5 h-3.5 text-red-500" /> : <User className="w-3.5 h-3.5 text-indigo-600" />}
                        {item.speakerLabel}
                      </span>
                      <span className="text-slate-400 font-mono">{item.time}</span>
                    </div>

                    <p className="text-sm text-slate-800 font-medium">{item.text}</p>

                    {item.techniqueVi && (
                      <div className="pt-1 flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-red-100 border border-red-200 text-red-800 rounded-lg text-[11px] font-bold flex items-center gap-1.5">
                          <span>{item.techniqueIcon}</span>
                          <span>{item.techniqueVi}</span>
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Attack Timeline & Extracted Evidence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Vertical Timeline Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Dòng thời gian thao túng (Timeline)</span>
                </div>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                  {riskDetails?.timeline?.length || riskDetails?.detectedTechniques?.length || 0} mốc
                </span>
              </div>

              <div className="space-y-3 text-xs pt-1 max-h-72 overflow-y-auto pr-1">
                {riskDetails?.timeline && riskDetails.timeline.length > 0 ? (
                  riskDetails.timeline.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        {idx < riskDetails.timeline!.length - 1 && (
                          <div className="w-0.5 h-8 bg-slate-200 my-0.5" />
                        )}
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex-1 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono text-indigo-600 font-bold">{item.time}</span>
                          {item.technique && (
                            <span className="px-1.5 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded text-[10px] font-bold">
                              {item.technique}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-800 font-medium text-xs">{item.event}</p>
                        {item.risk !== undefined && (
                          <div className="flex items-center gap-2 text-[10px] text-slate-500">
                            <span>Nguy cơ tích lũy:</span>
                            <span className="font-bold text-red-600">{item.risk}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : riskDetails?.detectedTechniques && riskDetails.detectedTechniques.length > 0 ? (
                  riskDetails.detectedTechniques.map((t: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        {idx < riskDetails.detectedTechniques.length - 1 && (
                          <div className="w-0.5 h-6 bg-slate-200 my-0.5" />
                        )}
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex-1 space-y-0.5">
                        <p className="font-bold text-slate-800">{t.icon} {t.name}</p>
                        <p className="text-[11px] text-slate-500">{t.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-xs py-4 text-center">Chưa ghi nhận hành vi bất thường</p>
                )}
              </div>
            </div>

            {/* Extracted Evidence Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider border-b border-slate-100 pb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Bằng chứng trích xuất</span>
              </div>

              <div className="space-y-2 text-xs pt-1 max-h-72 overflow-y-auto pr-1">
                {riskDetails?.evidence && riskDetails.evidence.length > 0 ? (
                  riskDetails.evidence.map((ev: any, idx: number) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-slate-500 text-[11px] font-bold">{ev.type}:</span>
                      <p className="font-semibold text-slate-800">{ev.detail}</p>
                      <p className="text-[10px] text-red-600 font-medium">{ev.riskImpact}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-xs py-4 text-center">Chưa có bằng chứng trích xuất</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
