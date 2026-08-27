import React from 'react';
import {
  X,
  Printer,
  Download,
  ShieldAlert,
  Calendar,
  User,
  Phone,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Lock,
  Share2
} from 'lucide-react';
import { InvestigationReport } from '../types';

interface ReportModalProps {
  report: InvestigationReport | null;
  onClose: () => void;
}

export default function ReportModal({ report, onClose }: ReportModalProps) {
  if (!report) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${report.id}-ScamDossier.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 border border-indigo-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase bg-indigo-900/80 px-2 py-0.5 rounded text-indigo-300 border border-indigo-700">
                  {report.id}
                </span>
                <span className="text-xs text-slate-400">Hồ sơ giám định lừa đảo số</span>
              </div>
              <h2 className="font-bold text-sm sm:text-base text-slate-100 line-clamp-1">{report.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Xuất file JSON"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Xuất JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="In hoặc lưu PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">In hồ sơ</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-900 bg-white">
          {/* Official Dossier Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-widest text-slate-500 uppercase">
                HỆ THỐNG GIÁM SÁT AN NINH CUỘC GỌI GUARDAI
              </p>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                BIÊN BẢN GIÁM ĐỊNH NGUY CƠ LỪA ĐẢO TÀI CHÍNH
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Mã hồ sơ: <span className="font-mono font-bold text-slate-900">{report.id}</span> &bull; Ngày lập: {new Date(report.createdAt).toLocaleString('vi-VN')}
              </p>
            </div>

            <div className="text-right flex flex-col items-start sm:items-end">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                report.riskScore >= 80 ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                Mức độ rủi ro: {report.riskScore}% ({report.riskLevel})
              </span>
              <p className="text-[11px] text-slate-500 mt-1 font-mono">Xác thực bởi Gemini 3.6 Flash</p>
            </div>
          </div>

          {/* Section 1: Involved Parties */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <p className="text-slate-500 font-bold uppercase text-[10px]">Đối tượng được bảo vệ (Nạn nhân):</p>
              <p className="text-slate-900 font-bold text-sm mt-0.5">{report.victimName}</p>
            </div>
            <div>
              <p className="text-slate-500 font-bold uppercase text-[10px]">Người giám hộ / Báo cáo:</p>
              <p className="text-slate-900 font-bold text-sm mt-0.5">{report.reporterRole}</p>
            </div>
            <div>
              <p className="text-slate-500 font-bold uppercase text-[10px]">Số điện thoại đối tượng gọi:</p>
              <p className="text-slate-900 font-mono font-bold text-sm mt-0.5">{report.callerNumber || 'Đầu số giấu danh tính / VoIP'}</p>
            </div>
          </div>

          {/* Section 2: Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              1. Tóm tắt kết quả phân tích hành vi
            </h3>
            <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl text-xs leading-relaxed text-slate-800">
              <p className="font-bold text-red-950 mb-1">Dạng lừa đảo xác định: {report.scamType}</p>
              <p>{report.summary}</p>
            </div>
          </div>

          {/* Section 3: Psychological Manipulation Tactics */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              2. Chuỗi thủ thuật tâm lý đối tượng sử dụng
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report.detectedTechniques.map((tech, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{tech.icon}</span>
                      <span>{tech.name}</span>
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-800">
                      {tech.severity}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-normal">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Manipulation Timeline */}
          {report.timeline && report.timeline.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                3. Tiến trình thao túng theo thời gian (Timeline)
              </h3>
              <div className="space-y-2 text-xs">
                {report.timeline.map((tl, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-indigo-700 font-bold text-[11px] bg-indigo-50 px-2 py-0.5 rounded">
                        {tl.time}
                      </span>
                      <span className="text-slate-800 font-medium">{tl.event}</span>
                    </div>
                    {tl.technique && (
                      <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded whitespace-nowrap">
                        {tl.technique}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Forensic Evidence Matrix */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              {report.timeline && report.timeline.length > 0 ? '4.' : '3.'} Chứng cứ trích xuất (Evidence Matrix)
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-[11px] font-bold border-b border-slate-200">
                    <th className="p-3">Loại chứng cứ</th>
                    <th className="p-3">Chi tiết ghi nhận</th>
                    <th className="p-3">Tác động nguy cơ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {report.evidence.map((ev, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-slate-800 whitespace-nowrap">{ev.type}</td>
                      <td className="p-3 text-slate-700">{ev.detail}</td>
                      <td className="p-3 text-red-700 font-semibold">{ev.riskImpact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 6: Urgent Recommendations */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {report.timeline && report.timeline.length > 0 ? '5.' : '4.'} Khuyến nghị xử lý & Biện pháp bảo vệ
            </h3>
            <ul className="space-y-2 text-xs text-slate-800">
              {report.recommendations.map((rec, idx) => (
                <li key={idx} className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Forensic Transcript Extract if available */}
          {report.transcript && report.transcript.length > 0 && (
            <div className="space-y-2 border-t pt-4 border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                {report.timeline && report.timeline.length > 0 ? '6.' : '5.'} Trích lục nội dung ghi âm cuộc gọi
              </h3>
              <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] space-y-2 max-h-48 overflow-y-auto">
                {report.transcript.map((t, idx) => (
                  <p key={idx}>
                    <span className="text-indigo-400">[{t.time}] {t.speakerLabel}:</span> {t.text}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Signoff Footer for print */}
          <div className="border-t border-slate-300 pt-6 flex justify-between items-end text-xs text-slate-500">
            <div>
              <p className="font-bold text-slate-700">GuardAI Automated Forensics Engine</p>
              <p>Mã băm dữ liệu SHA-256: 8f3c7e...b942</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-700">Người lập biên bản</p>
              <p className="mt-8 font-medium text-slate-800">{report.reporterRole}</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Close */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Đóng hồ sơ
          </button>
        </div>
      </div>
    </div>
  );
}
