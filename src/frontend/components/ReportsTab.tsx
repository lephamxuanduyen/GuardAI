import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Trash2,
  Eye,
  Plus,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Download,
  Printer
} from 'lucide-react';
import { InvestigationReport } from '../types';

interface ReportsTabProps {
  reports: InvestigationReport[];
  onSelectReport: (report: InvestigationReport) => void;
  onDeleteReport: (id: string) => void;
  onNewLiveSession: () => void;
}

export default function ReportsTab({
  reports,
  onSelectReport,
  onDeleteReport,
  onNewLiveSession,
}: ReportsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH_RISK' | 'SUSPICIOUS'>('ALL');

  const filteredReports = reports.filter((rep) => {
    const matchesSearch =
      rep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.victimName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.scamType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rep.callerNumber && rep.callerNumber.includes(searchTerm));

    const matchesRisk =
      selectedRiskFilter === 'ALL' || rep.riskLevel === selectedRiskFilter;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Hồ Sơ Giám Định Vụ Việc</h2>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Tổng hợp các cuộc gọi, tin nhắn và hình ảnh nghi vấn đã được phân tích bằng AI để phục vụ lưu trữ, đối chiếu và cung cấp bằng chứng cho cơ quan chức năng.
          </p>
        </div>

        <button
          onClick={onNewLiveSession}
          className="self-start md:self-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Bật phân tích cuộc gọi mới</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tiêu đề, tên người thân, loại lừa đảo, số điện thoại..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Risk Filter Buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedRiskFilter('ALL')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedRiskFilter === 'ALL'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tất cả ({reports.length})
          </button>
          <button
            onClick={() => setSelectedRiskFilter('CRITICAL')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedRiskFilter === 'CRITICAL'
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-white text-red-700 border border-red-200 hover:bg-red-50'
            }`}
          >
            Rất nguy hiểm ({reports.filter((r) => r.riskLevel === 'CRITICAL').length})
          </button>
          <button
            onClick={() => setSelectedRiskFilter('HIGH_RISK')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedRiskFilter === 'HIGH_RISK'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-white text-orange-700 border border-orange-200 hover:bg-orange-50'
            }`}
          >
            Nguy cơ cao
          </button>
        </div>
      </div>

      {/* Reports Grid / List */}
      {filteredReports.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <FileText className="w-6 h-6" />
          </div>
          <p className="font-bold text-slate-700 text-sm">Không tìm thấy hồ sơ phù hợp</p>
          <p className="text-slate-400 text-xs max-w-sm mx-auto">
            Chưa có hồ sơ nào khớp với từ khóa tìm kiếm. Bạn có thể tiến hành phân tích cuộc gọi mới ở tab "Lá Chắn Trực Tiếp".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Card Header: Risk & Timestamp */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                      report.riskScore >= 80
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : report.riskScore >= 60
                        ? 'bg-orange-100 text-orange-800 border border-orange-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    Rủi ro: {report.riskScore}%
                  </span>

                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(report.createdAt).toLocaleDateString('vi-VN')} {new Date(report.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                {/* Card Title & Victim */}
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {report.title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Nạn nhân mục tiêu: <span className="font-semibold text-slate-700">{report.victimName}</span>
                  </p>
                </div>

                {/* Summary */}
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {report.summary}
                </p>

                {/* Technique Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {report.detectedTechniques.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-medium flex items-center gap-1"
                    >
                      <span>{tech.icon}</span>
                      <span>{tech.name}</span>
                    </span>
                  ))}
                  {report.detectedTechniques.length > 3 && (
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px]">
                      +{report.detectedTechniques.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">{report.id}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDeleteReport(report.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Xóa hồ sơ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onSelectReport(report)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem biên bản</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
