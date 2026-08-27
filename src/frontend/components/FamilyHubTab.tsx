import React, { useState } from 'react';
import {
  Users,
  Shield,
  Bell,
  Phone,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Smartphone,
  Radio,
  Clock,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import { FamilyMember, EmergencyAlert } from '../types';

interface FamilyHubTabProps {
  members: FamilyMember[];
  alerts: EmergencyAlert[];
  onAddMember: (member: Partial<FamilyMember>) => void;
  onDeleteMember: (id: string) => void;
  onTriggerSOS: (targetName: string, riskScore: number) => void;
  sosDispatched: boolean;
}

export default function FamilyHubTab({
  members,
  alerts,
  onAddMember,
  onDeleteMember,
  onTriggerSOS,
  sosDispatched,
}: FamilyHubTabProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRelationship, setNewRelationship] = useState('Mẹ');
  const [newPhone, setNewPhone] = useState('');
  const [newAge, setNewAge] = useState<number>(65);
  const [newDevice, setNewDevice] = useState('Điện thoại thông minh');

  // Family Safe Word feature
  const [safeWord, setSafeWord] = useState('HOA SEN 2026');
  const [showSafeWord, setShowSafeWord] = useState(false);
  const [editingSafeWord, setEditingSafeWord] = useState(false);
  const [tempSafeWord, setTempSafeWord] = useState(safeWord);

  const handleSubmitNewMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    onAddMember({
      name: newName.trim(),
      relationship: newRelationship,
      phoneNumber: newPhone.trim(),
      age: Number(newAge) || 60,
      deviceType: newDevice,
      isGuardian: newRelationship === 'Con trai' || newRelationship === 'Con gái',
      alertOnHighRisk: true,
      status: 'PROTECTED',
      lastActivity: 'Vừa liên kết',
    });

    setNewName('');
    setNewPhone('');
    setShowAddForm(false);
  };

  const handleSaveSafeWord = () => {
    if (tempSafeWord.trim()) {
      setSafeWord(tempSafeWord.trim().toUpperCase());
      setEditingSafeWord(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold">
            <Shield className="w-3.5 h-3.5" />
            <span>Mạng Lưới Bảo Vệ Gia Đình & Giám Hộ Từ Xa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Liên kết thiết bị của Cha Mẹ, Ông Bà & Người thân
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Khi cha mẹ hoặc người thân nhận được cuộc gọi có rủi ro cao (&ge; 85%), hệ thống sẽ tự động phát tín hiệu cảnh báo khẩn cấp và chuông báo động tới điện thoại của tất cả Người giám hộ trong gia đình.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onTriggerSOS('Mẹ (Nguyễn Thị Mai)', 95)}
              className={`font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                sosDispatched
                  ? 'bg-emerald-600 text-white animate-bounce'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>{sosDispatched ? 'Đã Phát Báo Động Thử Nghiệm!' : '🚨 Thử Nghiệm Phát Báo Động SOS'}</span>
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm thành viên cần bảo vệ</span>
            </button>
          </div>
        </div>

        {/* Decorative Circle */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Grid: Family Members & Safe Word Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Members List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Danh sách thành viên gia đình ({members.length})</span>
            </h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              {showAddForm ? 'Đóng biểu mẫu' : 'Thêm người thân'}
            </button>
          </div>

          {/* Add Member Form */}
          {showAddForm && (
            <form
              onSubmit={handleSubmitNewMember}
              className="bg-white p-5 rounded-2xl border border-indigo-200 shadow-md space-y-4 animate-fade-in"
            >
              <div className="flex items-center justify-between border-b pb-2 border-slate-100">
                <span className="font-bold text-slate-800 text-xs">Liên kết người thân mới vào hệ thống</span>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  Hủy
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Họ và tên / Biệt danh:</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="VD: Mẹ (Nguyễn Thị Mai)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Quan hệ gia đình:</label>
                  <select
                    value={newRelationship}
                    onChange={(e) => setNewRelationship(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Mẹ">Mẹ</option>
                    <option value="Bố">Bố</option>
                    <option value="Bà nội / Bà ngoại">Bà nội / Bà ngoại</option>
                    <option value="Ông nội / Ông ngoại">Ông nội / Ông ngoại</option>
                    <option value="Con trai (Người giám hộ)">Con trai (Người giám hộ)</option>
                    <option value="Con gái (Người giám hộ)">Con gái (Người giám hộ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Số điện thoại liên hệ:</label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="VD: 0903 123 456"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Thiết bị sử dụng:</label>
                  <input
                    type="text"
                    value={newDevice}
                    onChange={(e) => setNewDevice(e.target.value)}
                    placeholder="VD: Samsung Galaxy A54"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Lưu & Bật bảo vệ
                </button>
              </div>
            </form>
          )}

          {/* Members List Cards */}
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-all"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${
                      member.isGuardian
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {member.name.charAt(0)}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-sm">{member.name}</h3>
                      {member.isGuardian ? (
                        <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">
                          Người giám hộ
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Được bảo vệ
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span className="font-mono">{member.phoneNumber}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Smartphone className="w-3 h-3 text-slate-400" />
                        <span>{member.deviceType || 'Di động'}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {member.status === 'ONLINE' ? 'Trực tuyến' : 'Đang bảo vệ'}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{member.lastActivity}</p>
                  </div>

                  <button
                    onClick={() => onDeleteMember(member.id)}
                    className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Gỡ thành viên"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Family Safe Word & Emergency Hotlines */}
        <div className="lg:col-span-4 space-y-6">
          {/* Family Safe Word Card (Anti Deepfake Voice) */}
          <div className="bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 border border-amber-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
                  <KeyRound className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-slate-900">Mật khẩu an toàn gia đình</span>
              </div>
              <span className="text-[10px] font-black uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                Chống Deepfake
              </span>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed">
              Dùng để xác minh khi nhận cuộc gọi video hoặc giọng nói AI giả mạo con cái kêu cứu chuyển tiền gấp. Hãy dặn cha mẹ yêu cầu người gọi đọc đúng từ khóa này.
            </p>

            {editingSafeWord ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={tempSafeWord}
                  onChange={(e) => setTempSafeWord(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-center tracking-widest focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveSafeWord}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Lưu mật khẩu
                  </button>
                  <button
                    onClick={() => setEditingSafeWord(false)}
                    className="px-3 bg-slate-100 text-slate-600 font-medium py-1.5 rounded-lg text-xs cursor-pointer"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium uppercase">Từ khóa bí mật nội bộ:</p>
                  <p className="font-mono font-black text-sm text-slate-900 tracking-wider">
                    {showSafeWord ? safeWord : '••••••••••••'}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowSafeWord(!showSafeWord)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md cursor-pointer"
                    title={showSafeWord ? 'Ẩn' : 'Hiện'}
                  >
                    {showSafeWord ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setEditingSafeWord(true)}
                    className="text-xs text-amber-700 font-bold hover:underline px-1.5 cursor-pointer"
                  >
                    Đổi
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Emergency Hotlines Directory */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block border-b pb-2 border-slate-100">
              Đường dây nóng khẩn cấp (Việt Nam)
            </span>

            <div className="space-y-2 text-xs">
              <a
                href="tel:113"
                className="p-2.5 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-xl flex items-center justify-between transition-colors group cursor-pointer"
              >
                <div>
                  <p className="font-bold text-slate-900 group-hover:text-red-700">113 - Cảnh sát phản ứng nhanh</p>
                  <p className="text-[11px] text-slate-500">Trình báo tội phạm & đe dọa khẩn cấp</p>
                </div>
                <Phone className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
              </a>

              <a
                href="tel:156"
                className="p-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl flex items-center justify-between transition-colors group cursor-pointer"
              >
                <div>
                  <p className="font-bold text-slate-900 group-hover:text-indigo-700">156 - Tổng đài tiếp nhận phản ánh</p>
                  <p className="text-[11px] text-slate-500">Cuộc gọi rác, tin nhắn & cuộc gọi lừa đảo</p>
                </div>
                <Phone className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </a>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="font-bold text-slate-900">Cục An toàn thông tin (AIS)</p>
                <p className="text-[11px] text-slate-500">Cổng cảnh báo an toàn thông tin: khonggianmang.vn</p>
              </div>
            </div>
          </div>

          {/* Recent Alerts Log */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b pb-2 border-slate-100">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                Nhật ký phát cảnh báo ({alerts.length})
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {alerts.length === 0 ? (
                <p className="text-slate-400 py-3 text-center text-xs">Chưa có cảnh báo khẩn cấp nào</p>
              ) : (
                alerts.slice(0, 3).map((al) => (
                  <div key={al.id} className="p-2.5 bg-red-50/60 border border-red-200 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-900 text-[11px]">{al.targetMember}</span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(al.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-700">{al.scamType}</p>
                    <div className="flex items-center justify-between pt-0.5 text-[10px]">
                      <span className="text-red-700 font-bold">Rủi ro: {al.riskScore}%</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Đã báo qua điện thoại
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
