import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  Award
} from 'lucide-react';
import { ScamKnowledgeItem, QuizQuestion } from '../types';

interface HandbookTabProps {
  knowledgeBase: ScamKnowledgeItem[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenario: 'Bạn nhận được cuộc gọi từ số lạ, người nói xưng là "Cán bộ Cục Cảnh sát Điều tra Bộ Công an", thông báo CCCD của bạn liên quan đường dây rửa tiền 50 tỷ và yêu cầu chuyển 100 triệu vào "tài khoản thẩm định của Bộ". Bạn nên làm gì?',
    callerQuote: '"Chúng tôi đã có lệnh bắt giam bà. Muốn chứng minh vô tội phải chuyển tiền vào tài khoản này trong 15 phút, cấm nói với con cái!"',
    options: [
      { text: 'Chuyển ngay tiền để công an kiểm tra tính trong sạch rồi lấy lại sau.', isCorrect: false },
      { text: 'Lập tức cúp máy. Công an Việt Nam không làm việc qua điện thoại và không có "tài khoản niêm phong" nào.', isCorrect: true },
      { text: 'Xin đối tượng giảm số tiền chuyển xuống 20 triệu.', isCorrect: false },
    ],
    explanation: 'Cơ quan Công an, Viện Kiểm sát, Tòa án KHÔNG BAO GIỜ làm việc qua điện thoại hay mạng xã hội, và tuyệt đối KHÔNG yêu cầu người dân chuyển tiền vào tài khoản cá nhân để "chứng minh vô tội".',
  },
  {
    id: 2,
    scenario: 'Một tin nhắn tự xưng từ "Tổng đài Ngân hàng" báo thẻ của bạn vừa bị trừ 25 triệu tại nước ngoài. Tin nhắn yêu cầu đọc mã OTP gửi về SMS để hủy lệnh trừ tiền. Bạn xử lý thế nào?',
    callerQuote: '"Nếu quý khách không thực hiện giao dịch, hãy đọc ngay mã OTP 6 chữ số để hệ thống hoàn tiền."',
    options: [
      { text: 'Đọc ngay mã OTP để tránh bị mất 25 triệu.', isCorrect: false },
      { text: 'Chụp ảnh màn hình mã OTP gửi qua Zalo cho họ.', isCorrect: false },
      { text: 'Tuyệt đối KHÔNG cung cấp OTP cho bất kỳ ai, tự mở app ngân hàng chính thống hoặc gọi hotline ngân hàng.', isCorrect: true },
    ],
    explanation: 'Mã OTP là chìa khóa mở két sắt tài khoản. Ngân hàng KHÔNG BAO GIỜ yêu cầu khách hàng cung cấp mã OTP dưới bất kỳ hình thức nào.',
  },
  {
    id: 3,
    scenario: 'Bạn nhận được cuộc gọi video từ con trai đang ở xa, hình ảnh hơi mờ và giật lag, tiếng con khóc lóc bảo bị tai nạn gấp và xin chuyển 30 triệu vào số tài khoản của "bác sĩ". Bạn nên làm gì?',
    callerQuote: '"Mẹ ơi con bị đâm xe gãy chân đang ở phòng mổ, chuyển gấp tiền vào STK này cho bác sĩ mổ cấp cứu!"',
    options: [
      { text: 'Hỏi lại "Mật khẩu an toàn gia đình" hoặc cúp máy gọi lại trực tiếp vào số điện thoại thường ngày của con.', isCorrect: true },
      { text: 'Chuyển tiền ngay lập tức vì thấy mặt và giọng nói của con trong video.', isCorrect: false },
      { text: 'Gửi mật khẩu ngân hàng cho tài khoản lạ.', isCorrect: false },
    ],
    explanation: 'Kẻ gian hiện nay sử dụng công nghệ Deepfake AI để cắt ghép khuôn mặt và sao chép giọng nói người thân. Luôn có câu hỏi bí mật gia đình hoặc cúp máy gọi trực tiếp xác minh.',
  },
  {
    id: 4,
    scenario: 'Có người tự xưng là Cán bộ Công an phường gọi điện bảo hồ sơ Định danh điện tử VNeID của bạn bị lỗi, yêu cầu bạn bấm vào link lạ để tải file ".APK" cài vào máy điện thoại Android. Bạn làm gì?',
    callerQuote: '"Bác bấm vào link dichvucong-gov.cc này tải app về cài để cán bộ kích hoạt mức 2 giúp bác."',
    options: [
      { text: 'Bấm vào tải ngay để không phải ra phường xếp hàng.', isCorrect: false },
      { text: 'Tuyệt đối KHÔNG tải file APK qua link lạ. Cần hỗ trợ thì ra thẳng trụ sở Công an phường.', isCorrect: true },
      { text: 'Nhờ hàng xóm bấm link tải giúp.', isCorrect: false },
    ],
    explanation: 'File .APK từ đường link lạ chứa mã độc gián điệp (Spyware), khi cài vào sẽ chiếm quyền điều khiển điện thoại (Accessibility Service) và tự động rút hết tiền trong tài khoản ngân hàng.',
  },
];

export default function HandbookTab({ knowledgeBase }: HandbookTabProps) {
  const [activeSubView, setActiveSubView] = useState<'handbook' | 'quiz'>('handbook');
  const [expandedScamId, setExpandedScamId] = useState<string | null>('kb-1');

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<{ [questionId: number]: number }>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (submittedQuiz) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      const selectedIdx = quizAnswers[q.id];
      if (selectedIdx !== undefined && q.options[selectedIdx]?.isCorrect) {
        score += 1;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setSubmittedQuiz(false);
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation Switcher */}
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubView('handbook')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubView === 'handbook'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Cẩm Nang 4 Thủ Đoạn Lừa Đảo Phổ Biến</span>
          </button>
          <button
            onClick={() => setActiveSubView('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubView === 'quiz'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Trắc Nghiệm Phản Xạ An Toàn ({QUIZ_QUESTIONS.length} câu)</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 hidden sm:block">
          Cập nhật quy chuẩn phòng chống lừa đảo Bộ Công an & Cục ATTT
        </span>
      </div>

      {/* VIEW 1: SCAM HANDBOOK */}
      {activeSubView === 'handbook' && (
        <div className="space-y-4">
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5 text-xs text-indigo-950 flex items-start gap-3 shadow-sm">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-indigo-900">Bí quyết "3 KHÔNG & 2 PHẢI" khi nghe điện thoại từ số lạ:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 font-medium">
                <p>❌ <strong>1. KHÔNG</strong> hoảng sợ hay tin lời đe dọa từ số lạ.</p>
                <p>❌ <strong>2. KHÔNG</strong> cung cấp mã OTP hay chuyển tiền theo hướng dẫn.</p>
                <p>❌ <strong>3. KHÔNG</strong> bấm vào link lạ hoặc cài file .APK lạ.</p>
                <p>✅ <strong>4. PHẢI</strong> chủ động gác máy và trao đổi ngay với người thân.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {knowledgeBase.map((item) => {
              const isExpanded = expandedScamId === item.id;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden ${
                    isExpanded ? 'border-indigo-300 ring-2 ring-indigo-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Card Header */}
                  <button
                    onClick={() => setExpandedScamId(isExpanded ? null : item.id)}
                    className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase bg-red-100 text-red-800 px-2 py-0.5 rounded">
                          {item.badge}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">{item.category}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">{item.title}</h3>
                    </div>

                    <div className="p-2 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {/* Card Expanded Content */}
                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-slate-100 space-y-4 text-xs">
                      {/* Description */}
                      <p className="text-slate-700 leading-relaxed pt-3">{item.description}</p>

                      {/* Attacker Scripts */}
                      <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-2 font-mono text-[11px]">
                        <p className="text-indigo-400 font-bold uppercase tracking-wider text-[10px]">
                          Kịch bản thoại kẻ lừa đảo thường dùng:
                        </p>
                        {item.attackerScripts.map((script, idx) => (
                          <p key={idx} className="pl-3 border-l-2 border-red-500">
                            "{script}"
                          </p>
                        ))}
                      </div>

                      {/* Red Flags & Defense Advice */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl space-y-2">
                          <p className="font-bold text-red-900 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            Dấu hiệu nhận diện (Red Flags)
                          </p>
                          <ul className="space-y-1.5 text-slate-700">
                            {item.redFlags.map((flag, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-red-500 font-bold">&bull;</span>
                                <span>{flag}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                          <p className="font-bold text-emerald-900 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            Biện pháp xử lý an toàn
                          </p>
                          <ul className="space-y-1.5 text-slate-700">
                            {item.defenseAdvice.map((adv, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{adv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Real case */}
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 italic">
                        <strong>Vụ việc thực tế:</strong> {item.realCaseExample}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: INTERACTIVE QUIZ */}
      {activeSubView === 'quiz' && (
        <div className="space-y-6">
          {/* Quiz Intro Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                Kiểm tra phản xạ nhận diện bẫy lừa đảo
              </h2>
              <p className="text-xs text-slate-500">
                Hãy cùng người thân trả lời 4 tình huống giả định thực tế để trang bị phản xạ phòng thủ an toàn.
              </p>
            </div>

            {submittedQuiz && (
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-center">
                  <p className="text-[10px] text-indigo-600 font-bold uppercase">Điểm số an toàn</p>
                  <p className="text-xl font-black text-indigo-900">{calculateScore()}/{QUIZ_QUESTIONS.length}</p>
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  title="Làm lại"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Questions Stream */}
          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, qIndex) => {
              const selectedOptIdx = quizAnswers[q.id];
              return (
                <div
                  key={q.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase text-indigo-600">
                      Tình huống {qIndex + 1}/{QUIZ_QUESTIONS.length}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm leading-relaxed">{q.scenario}</h3>
                  </div>

                  {/* Caller Quote */}
                  <div className="p-3 bg-slate-50 border-l-4 border-amber-500 rounded-r-xl text-xs text-slate-700 italic">
                    Lời đối tượng nói trong điện thoại: {q.callerQuote}
                  </div>

                  {/* Options */}
                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOptIdx === optIdx;
                      let optionStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                      if (submittedQuiz) {
                        if (opt.isCorrect) {
                          optionStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                        } else if (isSelected && !opt.isCorrect) {
                          optionStyle = 'bg-red-50 border-red-300 text-red-900 line-through';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-indigo-50 border-indigo-400 text-indigo-900 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start justify-between gap-3 cursor-pointer ${optionStyle}`}
                        >
                          <span>{opt.text}</span>
                          {submittedQuiz && opt.isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {submittedQuiz && isSelected && !opt.isCorrect && (
                            <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {submittedQuiz && (
                    <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl text-xs text-slate-800 space-y-1 animate-fade-in">
                      <p className="font-bold text-indigo-900">💡 Lời khuyên an toàn từ chuyên gia:</p>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Quiz Bar */}
          {!submittedQuiz ? (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setSubmittedQuiz(true)}
                disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                className={`font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer ${
                  Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Hoàn thành & Xem kết quả ({Object.keys(quizAnswers).length}/{QUIZ_QUESTIONS.length} câu)
              </button>
            </div>
          ) : (
            <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl text-center space-y-3 shadow-lg">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">
                {calculateScore() === QUIZ_QUESTIONS.length
                  ? 'Tuyệt vời! Bạn có phản xạ phòng thủ lừa đảo xuất sắc.'
                  : 'Hãy chia sẻ cẩm nang này cho cha mẹ và người thân cùng đọc!'}
              </h3>
              <p className="text-xs text-emerald-100 max-w-md mx-auto">
                Hệ thống GuardAI Voice Shield luôn sẵn sàng lắng nghe và bảo vệ gia đình bạn 24/7.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
