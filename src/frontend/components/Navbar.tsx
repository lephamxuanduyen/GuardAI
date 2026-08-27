import React from 'react';
import {
  Shield,
  FileText,
  Users,
  BookOpen,
  Bell,
  Activity,
  AlertTriangle,
  Radio,
  Gamepad2
} from 'lucide-react';

export type TabType = 'shield' | 'simulation' | 'reports' | 'family' | 'handbook';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  backendConnected: boolean;
  activeRisk: number;
  onQuickSOS: () => void;
  sosDispatched: boolean;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  backendConnected,
  activeRisk,
  onQuickSOS,
  sosDispatched,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900">
                  GuardAI
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 tracking-wider">
                  Voice Shield
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Lá chắn AI bảo vệ người cao tuổi & gia đình trước cuộc gọi lừa đảo
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => setActiveTab('shield')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'shield'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Radio className="w-4 h-4 text-indigo-600" />
              <span>Lá Chắn Trực Tiếp</span>
              {activeRisk > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeRisk >= 80 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                }`}>
                  {activeRisk}%
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('simulation')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'simulation'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-indigo-600" />
              <span>Giả Lập Thực Chiến</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Hồ Sơ Vụ Việc</span>
            </button>

            <button
              onClick={() => setActiveTab('family')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'family'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Bảo Vệ Gia Đình</span>
            </button>

            <button
              onClick={() => setActiveTab('handbook')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'handbook'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Cẩm Nang & Trắc Nghiệm</span>
            </button>
          </nav>

          {/* Right Actions: Backend Status & SOS Button */}
          <div className="flex items-center gap-3">
            {/* Backend connection status */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-600">
              <span className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              <span>{backendConnected ? 'Gemini 3.6 Sẵn sàng' : 'Khởi động API'}</span>
            </div>

            {/* Quick SOS Trigger Button */}
            <button
              onClick={onQuickSOS}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                sosDispatched
                  ? 'bg-emerald-600 text-white animate-bounce'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/20'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>{sosDispatched ? 'Đã Phát Tín Hiệu SOS!' : 'Báo Động SOS'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('shield')}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold ${
              activeTab === 'shield' ? 'text-indigo-600' : 'text-slate-500'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Lá Chắn</span>
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold ${
              activeTab === 'simulation' ? 'text-indigo-600' : 'text-slate-500'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Giả Lập</span>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold ${
              activeTab === 'reports' ? 'text-indigo-600' : 'text-slate-500'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Hồ Sơ</span>
          </button>
          <button
            onClick={() => setActiveTab('family')}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold ${
              activeTab === 'family' ? 'text-indigo-600' : 'text-slate-500'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Gia Đình</span>
          </button>
          <button
            onClick={() => setActiveTab('handbook')}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold ${
              activeTab === 'handbook' ? 'text-indigo-600' : 'text-slate-500'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Cẩm Nang</span>
          </button>
        </div>
      </div>
    </header>
  );
}
