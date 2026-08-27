import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  PhoneOff,
  Mic,
  ShieldCheck,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

interface SimulationStep {
  callerPrompt: string;
  callerAudioText: string;
  technique: string;
  techniqueIcon: string;
  recommendedAction: string;
  userOptions: {
    text: string;
    isSafe: boolean;
    feedback: string;
    points: number;
  }[];
}

interface SimulationScenario {
  id: string;
  title: string;
  callerIdentity: string;
  difficulty: 'CƠ BẢN' | 'NÂNG CAO' | 'TINH VI';
  badgeColor: string;
  description: string;
  steps: SimulationStep[];
}

const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'sim-police',
    title: 'Mạo danh Trung tá Công an C02 dọa bắt giam',
    callerIdentity: 'Trung tá Nguyễn Văn Nam - Điều tra viên Bộ Công an',
    difficulty: 'NÂNG CAO',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    description: 'Đối tượng gọi điện thông báo CCCD của bạn đứng tên tài khoản rửa tiền 50 tỷ, gửi lệnh bắt giam và ép chuyển 200 triệu trong 15 phút.',
    steps: [
      {
        callerPrompt: 'Alo! Tôi là Trung tá Nguyễn Văn Nam, Cục Cảnh sát Điều tra Bộ Công an. Số CCCD của bà đang liên quan đến đường dây buôn ma túy và rửa tiền 50 tỷ đồng. Chúng tôi đã có lệnh bắt tạm giam bà!',
        callerAudioText: 'Giọng nam đanh thép, quát lớn, kèm âm thanh bộ đàm radio giả lập ở hậu cảnh.',
        technique: 'Gây sợ hãi & Uy hiếp quyền lực',
        techniqueIcon: '👮',
        recommendedAction: 'Giữ bình tĩnh, không hoảng loạn. Công an không làm việc qua điện thoại.',
        userOptions: [
          {
            text: 'Dạ... tôi oan lắm cán bộ ơi, tôi không làm gì sai cả, xin cán bộ đừng bắt tôi!',
            isSafe: false,
            feedback: 'Bộc lộ sự sợ hãi giúp kẻ lừa đảo nắm được thóp và tiếp tục leo thang đe dọa.',
            points: 0,
          },
          {
            text: 'Công an không làm việc qua điện thoại. Nếu có giấy triệu tập, tôi sẽ trực tiếp ra trụ sở Công an phường gần nhất làm việc.',
            isSafe: true,
            feedback: 'Phản ứng chuẩn xác! Khẳng định nguyên tắc làm việc theo pháp luật của lực lượng Công an.',
            points: 30,
          },
          {
            text: 'Tôi có quen Thiếu tướng ở Bộ, anh là ai mà dám dọa tôi?',
            isSafe: false,
            feedback: 'Tranh cãi hoặc khoe quan hệ chỉ khiến kẻ gian tìm cách biến tấu kịch bản thêm phức tạp.',
            points: 10,
          },
        ],
      },
      {
        callerPrompt: 'Bà im ngay! Đây là chuyên án tuyệt mật. Muốn chứng minh mình vô tội, bà phải chuyển toàn bộ 200 triệu tiết kiệm vào "Tài khoản niêm phong thẩm định" của Bộ Công an trong 15 phút. Cấm được nói cho con cái hay nhân viên ngân hàng!',
        callerAudioText: 'Thúc ép thời gian dồn dập, gõ bàn côm cốp để gây sức ép thần kinh.',
        technique: 'Ép buộc chuyển tiền & Cách ly nạn nhân',
        techniqueIcon: '⏰',
        recommendedAction: 'Gác máy ngay lập tức. Nhà nước không có bất kỳ tài khoản niêm phong cá nhân nào.',
        userOptions: [
          {
            text: 'Cúp máy ngay lập tức, không đôi co và gọi ngay cho con cái hoặc Cảnh sát 113.',
            isSafe: true,
            feedback: 'Hành động xuất sắc! Cắt đứt cuộc gọi là cách an toàn nhất để vô hiệu hóa bẫy tâm lý.',
            points: 40,
          },
          {
            text: 'Đọc số tài khoản đi, tôi chạy ra ngân hàng chuyển gấp 50 triệu trước được không?',
            isSafe: false,
            feedback: 'Rất nguy hiểm! Bạn sắp chuyển tiền cho tài khoản rác của nhóm tội phạm xuyên quốc gia.',
            points: 0,
          },
          {
            text: 'Gửi ảnh Lệnh bắt giam và Thẻ ngành Công an qua Zalo cho tôi xem trước đã.',
            isSafe: false,
            feedback: 'Sai lầm! Kẻ gian luôn có sẵn con dấu đỏ và lệnh bắt Photoshop giả mạo để lừa bạn.',
            points: 5,
          },
        ],
      },
    ],
  },
  {
    id: 'sim-bank',
    title: 'Giả mạo Tổng đài viên Ngân hàng chiếm đoạt mã OTP',
    callerIdentity: 'Nhân viên Chăm sóc khách hàng Vietcombank',
    difficulty: 'CƠ BẢN',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Đối tượng thông báo tài khoản ngân hàng của bạn vừa bị trừ 35 triệu ở nước ngoài và yêu cầu đọc mã OTP gửi về SMS để hủy lệnh.',
    steps: [
      {
        callerPrompt: 'Dạ em chào anh/chị, em gọi từ Trung tâm An ninh Ngân hàng. Hệ thống phát hiện thẻ của anh/chị vừa thanh toán 35.000.000 VNĐ tại trung tâm thương mại ở Singapore. Có phải anh/chị đang thực hiện giao dịch này không ạ?',
        callerAudioText: 'Giọng nữ nhẹ nhàng, lịch thiệp, xưng danh ngân hàng chính xác.',
        technique: 'Tạo vỏ bọc uy tín & Tình huống khẩn cấp giả',
        techniqueIcon: '💳',
        recommendedAction: 'Xác nhận không thực hiện nhưng cảnh giác không cung cấp thông tin tài khoản qua điện thoại.',
        userOptions: [
          {
            text: 'Tôi không ở Singapore! Ai đã trừ tiền của tôi? Hủy ngay giúp tôi với!',
            isSafe: false,
            feedback: 'Hoảng sợ là bước đầu tiên khiến bạn dễ dàng rơi vào bẫy cung cấp mã OTP tiếp theo.',
            points: 5,
          },
          {
            text: 'Tôi không thực hiện giao dịch. Tôi sẽ tự mở app ngân hàng chính thống để kiểm tra và khóa thẻ.',
            isSafe: true,
            feedback: 'Chính xác! Luôn tự chủ động kiểm tra trên ứng dụng chính thống của ngân hàng.',
            points: 30,
          },
        ],
      },
      {
        callerPrompt: 'Dạ để hỗ trợ hủy giao dịch và hoàn tiền 35 triệu ngay lập tức, tổng đài vừa gửi một mã xác thực 6 số về tin nhắn của anh/chị. Anh/chị vui lòng đọc mã đó để em hoàn tất lệnh hủy trên hệ thống ạ!',
        callerAudioText: 'Giục giã đọc mã nhanh vì "mã chỉ có hiệu lực trong 60 giây".',
        technique: 'Chiếm đoạt mã OTP bảo mật',
        techniqueIcon: '🔑',
        recommendedAction: 'Mã OTP là chìa khóa tài khoản. Ngân hàng không bao giờ hỏi OTP.',
        userOptions: [
          {
            text: 'Đọc mã OTP 6 số để nhân viên kịp hoàn tiền hủy giao dịch.',
            isSafe: false,
            feedback: 'Mất toàn bộ tiền! Đọc mã OTP đồng nghĩa bạn đã cấp quyền cho kẻ gian chuyển sạch tiền trong tài khoản.',
            points: 0,
          },
          {
            text: 'Ngân hàng không bao giờ hỏi mã OTP của khách hàng. Tôi cúp máy và tự gọi hotline sau lưng thẻ ATM.',
            isSafe: true,
            feedback: 'Xuất sắc! Nguyên tắc vàng: Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai, kể cả nhân viên ngân hàng.',
            points: 40,
          },
        ],
      },
    ],
  },
  {
    id: 'sim-deepfake',
    title: 'Deepfake Video AI con cái khóc lóc kêu cứu chuyển viện',
    callerIdentity: 'Giọng nói & Hình ảnh AI giả dạng Con trai',
    difficulty: 'TINH VI',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Cuộc gọi video ngắn, hình ảnh con trai bị thương chập chờn, khóc lóc giục bố mẹ chuyển gấp 40 triệu vào tài khoản bác sĩ cấp cứu.',
    steps: [
      {
        callerPrompt: 'Mẹ ơi... con bị tai nạn giao thông gãy chân đang ở phòng mổ cấp cứu gấp... Mẹ chuyển ngay 40 triệu vào số tài khoản của Bác sĩ này giúp con với, họ bảo có tiền mới mổ!',
        callerAudioText: 'Giọng con trai hốt hoảng khóc lóc, video mờ, nhấp nháy rồi ngắt kết nối chuyển sang gọi thoại.',
        technique: 'Deepfake AI & Khai thác tình cảm gia đình',
        techniqueIcon: '🎭',
        recommendedAction: 'Hỏi câu hỏi bảo mật gia đình hoặc cúp máy gọi lại số điện thoại thường ngày của con.',
        userOptions: [
          {
            text: 'Hốt hoảng chuyển ngay 40 triệu vào STK lạ vì sợ con gặp nguy hiểm tính mạng.',
            isSafe: false,
            feedback: 'Kẻ lừa đảo đã đánh trúng điểm yếu tâm lý lo lắng cho con cái của cha mẹ.',
            points: 0,
          },
          {
            text: 'Hỏi ngay "Mật khẩu an toàn gia đình là gì?" hoặc cúp máy gọi lại trực tiếp vào số di động của con và bạn bè con.',
            isSafe: true,
            feedback: 'Phản ứng tuyệt vời! "Mật khẩu gia đình" và gọi lại số chính thức là vũ khí diệt Deepfake hiệu quả nhất.',
            points: 40,
          },
        ],
      },
    ],
  },
];

export default function SimulationArena() {
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(SIMULATION_SCENARIOS[0]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentStep = selectedScenario.steps[currentStepIdx];

  const handleSelectScenario = (sc: SimulationScenario) => {
    setSelectedScenario(sc);
    setCurrentStepIdx(0);
    setUserScore(0);
    setSelectedOptionIdx(null);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  const handleAnswer = (optionIdx: number) => {
    if (selectedOptionIdx !== null) return;

    setSelectedOptionIdx(optionIdx);
    const chosen = currentStep.userOptions[optionIdx];
    setUserScore((prev) => prev + chosen.points);
    setShowExplanation(true);
  };

  const handleNextStep = () => {
    if (currentStepIdx < selectedScenario.steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentStepIdx(0);
    setUserScore(0);
    setSelectedOptionIdx(null);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  const maxScore = selectedScenario.steps.reduce((acc, step) => {
    const maxOpt = Math.max(...step.userOptions.map((o) => o.points));
    return acc + maxOpt;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Đấu Trường Giả Lập Ứng Biến (AI Simulation)</h2>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Không gian luyện tập tương tác trực tiếp với các kịch bản lừa đảo thực chiến, giúp người dùng và gia đình xây dựng phản xạ bảo vệ tài sản vững chắc.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-2 bg-indigo-50 border border-indigo-200 rounded-xl text-center">
            <p className="text-[10px] text-indigo-600 font-bold uppercase">Điểm Phòng Thủ</p>
            <p className="text-lg font-black text-indigo-900">{userScore} / {maxScore}</p>
          </div>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SIMULATION_SCENARIOS.map((sc) => {
          const isSelected = selectedScenario.id === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-indigo-500 ring-2 ring-indigo-100 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${sc.badgeColor}`}>
                    {sc.difficulty}
                  </span>
                  {isSelected && <span className="text-[10px] font-bold text-indigo-600">Đang luyện tập</span>}
                </div>
                <h3 className="font-bold text-slate-900 text-xs leading-snug">{sc.title}</h3>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2">{sc.description}</p>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Call Screen */}
      {!isCompleted ? (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden">
          {/* Simulated In-Call Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-600/30 animate-pulse">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-100">{selectedScenario.callerIdentity}</span>
                  <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                    Cuộc gọi nghi vấn
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Bước {currentStepIdx + 1} / {selectedScenario.steps.length} &bull; 00:42</span>
                </p>
              </div>
            </div>

            {/* Technique Badge */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <span className="text-base">{currentStep.techniqueIcon}</span>
              <span className="text-xs font-bold text-slate-300">{currentStep.technique}</span>
            </div>
          </div>

          {/* Incoming Voice Box */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-bold uppercase tracking-wider">
              <Volume2 className="w-4 h-4 text-indigo-400" />
              <span>Đối tượng đang nói vào điện thoại:</span>
            </div>

            <blockquote className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed pl-3 border-l-4 border-red-500">
              "{currentStep.callerPrompt}"
            </blockquote>

            <p className="text-xs text-slate-400 italic">
              🔊 Âm thanh bối cảnh: {currentStep.callerAudioText}
            </p>
          </div>

          {/* AI Coach Hint */}
          <div className="bg-indigo-950/60 border border-indigo-800/50 rounded-2xl p-4 flex items-start gap-3 text-xs text-indigo-200">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-indigo-300">Gợi ý phản xạ an toàn:</p>
              <p className="text-indigo-200/90 mt-0.5">{currentStep.recommendedAction}</p>
            </div>
          </div>

          {/* User Decision Options */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Hãy chọn câu trả lời hoặc hành động của bạn:
            </p>

            <div className="space-y-2.5">
              {currentStep.userOptions.map((opt, idx) => {
                const isSelected = selectedOptionIdx === idx;
                let btnStyle = 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-200';

                if (selectedOptionIdx !== null) {
                  if (opt.isSafe) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 font-bold ring-2 ring-emerald-500/30';
                  } else if (isSelected && !opt.isSafe) {
                    btnStyle = 'bg-red-950/80 border-red-500 text-red-100 font-bold ring-2 ring-red-500/30';
                  } else {
                    btnStyle = 'bg-slate-800/40 border-slate-700/40 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOptionIdx !== null}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {selectedOptionIdx !== null && opt.isSafe && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {selectedOptionIdx !== null && isSelected && !opt.isSafe && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Card & Next Step Button */}
          {showExplanation && selectedOptionIdx !== null && (
            <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-4 animate-fade-in">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {currentStep.userOptions[selectedOptionIdx].isSafe ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Phản xạ chính xác (+{currentStep.userOptions[selectedOptionIdx].points} điểm)
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Phản xạ nguy hiểm (+{currentStep.userOptions[selectedOptionIdx].points} điểm)
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentStep.userOptions[selectedOptionIdx].feedback}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextStep}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  {currentStepIdx < selectedScenario.steps.length - 1 ? 'Tiếp tục cuộc gọi ➔' : 'Xem kết quả phản xạ ➔'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Completion Screen */
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl border border-indigo-900/50">
          <div className="w-20 h-20 rounded-3xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mx-auto text-indigo-300 shadow-xl">
            <Award className="w-10 h-10 text-indigo-400" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black">
              {userScore >= maxScore * 0.8
                ? 'Xuất Sắc! Bạn Đã Vô Hiệu Hóa Kịch Bản Lừa Đảo'
                : 'Bạn Cần Nâng Cao Thêm Cảnh Giác'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Bạn đạt được <strong className="text-white text-base">{userScore} / {maxScore} điểm</strong> phòng thủ trong kịch bản "{selectedScenario.title}".
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Luyện tập lại kịch bản này</span>
            </button>
            <button
              onClick={() => {
                const nextIdx = (SIMULATION_SCENARIOS.findIndex((s) => s.id === selectedScenario.id) + 1) % SIMULATION_SCENARIOS.length;
                handleSelectScenario(SIMULATION_SCENARIOS[nextIdx]);
              }}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              Chuyển sang kịch bản tiếp theo ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
