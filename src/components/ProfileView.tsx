import React, { useState } from 'react';
import { useWishfund } from '../context/WishfundContext';
import {
  User,
  Flame,
  Award,
  Bell,
  Clock,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  Edit3,
  Calendar,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { SavingChallenge } from '../types';

export const ProfileView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    challenges,
    toggleChallengeUnit,
    achievements,
    notificationSettings,
    updateNotificationSettings,
    setIsNotificationCenterOpen,
    unreadNotificationsCount,
    savingStreak,
  } = useWishfund();

  const [activeProfileTab, setActiveProfileTab] = useState<'challenges' | 'achievements' | 'notifications' | 'account'>('challenges');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [allowanceInput, setAllowanceInput] = useState(userProfile.dailyAllowance.toString());
  const [budgetInput, setBudgetInput] = useState(userProfile.monthlyBudget.toString());

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: nameInput,
      dailyAllowance: parseInt(allowanceInput, 10) || 50000,
      monthlyBudget: parseInt(budgetInput, 10) || 1800000,
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Profile Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-100/80 via-[#FFF7F2] to-amber-50 border border-pink-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-white border-2 border-pink-200 flex items-center justify-center text-3xl shadow-xs shrink-0">
            {userProfile.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-[#4A3F35]">{userProfile.name}</h1>
              <span className="text-xs bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full border border-pink-200 font-semibold">
                Wishfund Saver
              </span>
            </div>
            <p className="text-xs text-[#6B5B52] mt-0.5">{userProfile.email}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-[#8C7A70]">
              <span className="font-semibold text-pink-600 font-mono tabular-nums">
                Uang Saku: Rp {userProfile.dailyAllowance.toLocaleString('id-ID')}/hari
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                Budget: Rp {userProfile.monthlyBudget.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNotificationCenterOpen(true)}
            className="px-3.5 py-2 rounded-2xl bg-white border border-[#FCE7EB] hover:bg-pink-50 text-xs font-semibold text-[#6B5B52] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <Bell className="w-4 h-4 text-pink-500" />
            <span>Pemberitahuan</span>
            {unreadNotificationsCount > 0 && (
              <span className="px-1.5 py-0.2 bg-pink-500 text-white rounded-full text-[10px] font-bold">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsEditingProfile(true)}
            className="px-3.5 py-2 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profil</span>
          </button>
        </div>
      </div>

      {/* Profile Section Navigation Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white border border-[#FCE7EB] rounded-2xl overflow-x-auto scrollbar-none shadow-2xs">
        <button
          onClick={() => setActiveProfileTab('challenges')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
            activeProfileTab === 'challenges'
              ? 'bg-pink-500 text-white shadow-2xs'
              : 'text-[#6B5B52] hover:text-pink-600'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Saving Challenges</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('achievements')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
            activeProfileTab === 'achievements'
              ? 'bg-pink-500 text-white shadow-2xs'
              : 'text-[#6B5B52] hover:text-pink-600'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Achievement & Rewards</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
            activeProfileTab === 'notifications'
              ? 'bg-pink-500 text-white shadow-2xs'
              : 'text-[#6B5B52] hover:text-pink-600'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Pengaturan Notifikasi</span>
        </button>
      </div>

      {/* Tab 1: Saving Challenges (Section 3: 30 Days, Save 5K Every Day, No-Spending, Weekly) */}
      {activeProfileTab === 'challenges' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#4A3F35]">Tantangan Menabung (Saving Challenge)</h2>
            <p className="text-xs text-[#8C7A70]">
              Tantang dirimu untuk menabung secara teratur dengan metode interaktif yang menyenangkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {challenges.map((ch) => {
              const progressPct =
                ch.totalUnits > 0 ? (ch.completedUnits.length / ch.totalUnits) * 100 : 0;

              return (
                <div
                  key={ch.id}
                  className="p-5 rounded-3xl bg-white border border-[#FCE7EB] shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
                          <Flame className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-bold text-[#4A3F35]">{ch.name}</h3>
                      </div>
                      <span className="text-xs font-semibold text-orange-600 font-mono tabular-nums">
                        {ch.streakCount} streak
                      </span>
                    </div>

                    <p className="text-xs text-[#6B5B52] leading-relaxed">{ch.description}</p>

                    {/* Progress Bar & Amount */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#8C7A70]">
                          Terkumpul: Rp {ch.currentAmount.toLocaleString('id-ID')}
                        </span>
                        <span className="font-bold text-pink-600 font-mono tabular-nums">
                          {progressPct.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-pink-100/70 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Grid of Days to Check / Deposit */}
                  <div className="pt-2 border-t border-[#F5EBE1]">
                    <div className="text-[11px] font-semibold text-[#8C7A70] mb-2 flex justify-between items-center">
                      <span>Centang hari yang sudah kamu selesaikan:</span>
                      <span className="text-pink-600 font-mono tabular-nums">
                        {ch.completedUnits.length} / {ch.totalUnits} hari
                      </span>
                    </div>

                    <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5">
                      {Array.from({ length: ch.totalUnits }).map((_, i) => {
                        const dayNum = i + 1;
                        const isDone = ch.completedUnits.includes(dayNum);

                        return (
                          <button
                            key={dayNum}
                            type="button"
                            onClick={() => toggleChallengeUnit(ch.id, dayNum)}
                            className={`h-7 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer flex items-center justify-center border ${
                              isDone
                                ? 'bg-pink-500 text-white border-pink-500 shadow-2xs'
                                : 'bg-[#FFFDF9] text-[#8C7A70] border-[#FCE7EB] hover:bg-pink-50 hover:text-pink-600'
                            }`}
                            title={`Hari ke-${dayNum} (${isDone ? 'Selesai' : 'Klik untuk tandai selesai'})`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Achievement & Rewards (Section 3: First Savings, 7 Days, Halfway, Wishlist Completed) */}
      {activeProfileTab === 'achievements' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#4A3F35]">Pencapaian & Lencana (Achievements)</h2>
            <p className="text-xs text-[#8C7A70]">
              Rayakan konsistensi dan kemajuan menabungmu dengan medali penghargaan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-5 rounded-3xl border transition-all ${
                  ach.unlocked
                    ? 'bg-white border-pink-200 shadow-xs'
                    : 'bg-gray-50/70 border-gray-200/80 opacity-75'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                      ach.unlocked
                        ? 'bg-gradient-to-tr from-pink-100 to-rose-50 text-pink-600 border-pink-200 shadow-2xs'
                        : 'bg-gray-100 text-gray-400 border-gray-200'
                    }`}
                  >
                    {ach.unlocked ? (
                      <Sparkles className="w-6 h-6 stroke-[2]" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#4A3F35] truncate">{ach.title}</h3>
                      {ach.unlocked && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-bold border border-emerald-200">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B5B52] mt-1 leading-snug">{ach.description}</p>
                    <div className="mt-2.5 pt-2 border-t border-[#F5EBE1] flex items-center justify-between text-[11px] text-[#8C7A70]">
                      <span>Syarat: {ach.requirement}</span>
                      {ach.unlockedAt && <span>{ach.unlockedAt}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Notification Settings (Section 5 & 6) */}
      {activeProfileTab === 'notifications' && (
        <div className="p-6 rounded-3xl bg-white border border-[#FCE7EB] shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#4A3F35]">Pengaturan Notifikasi & Pengingat</h2>
            <p className="text-xs text-[#8C7A70]">
              Atur waktu dan jenis notifikasi agar sesuai dengan kenyamanan dan rutinitasmu.
            </p>
          </div>

          <div className="space-y-4 divide-y divide-[#F5EBE1]">
            {/* Daily Saving Reminder with Time */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-[#4A3F35]">Daily Saving Reminder</h4>
                <p className="text-xs text-[#8C7A70]">
                  Pengingat lembut setiap hari untuk menyisihkan uang saku ke wishlist impian.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="time"
                  value={notificationSettings.reminderTime}
                  onChange={(e) => updateNotificationSettings({ reminderTime: e.target.value })}
                  className="px-2.5 py-1 text-xs rounded-xl border border-[#FCE7EB] bg-[#FFFDF9] text-[#4A3F35] font-mono"
                />
                <button
                  type="button"
                  onClick={() =>
                    updateNotificationSettings({
                      dailySavingReminder: !notificationSettings.dailySavingReminder,
                    })
                  }
                  className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative ${
                    notificationSettings.dailySavingReminder ? 'bg-pink-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform ${
                      notificationSettings.dailySavingReminder ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Saving Goal Updates */}
            <div className="pt-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#4A3F35]">Saving Goal Updates & 50% Milestone</h4>
                <p className="text-xs text-[#8C7A70]">
                  Pemberitahuan ketika target tabungan mencapai 50% atau hampir selesai.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateNotificationSettings({
                    savingGoalUpdates: !notificationSettings.savingGoalUpdates,
                  })
                }
                className={`w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 relative ${
                  notificationSettings.savingGoalUpdates ? 'bg-pink-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform ${
                    notificationSettings.savingGoalUpdates ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Wishlist Reminder */}
            <div className="pt-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#4A3F35]">Wishlist Review Reminder</h4>
                <p className="text-xs text-[#8C7A70]">
                  Mengingatkan pengguna untuk meninjau dan mengevaluasi wishlist secara berkala.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateNotificationSettings({
                    wishlistReminder: !notificationSettings.wishlistReminder,
                  })
                }
                className={`w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 relative ${
                  notificationSettings.wishlistReminder ? 'bg-pink-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform ${
                    notificationSettings.wishlistReminder ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Price Drop Alert */}
            <div className="pt-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#4A3F35]">Price Drop Alert (Peringatan Harga Turun)</h4>
                <p className="text-xs text-[#8C7A70]">
                  Notifikasi ketika toko menurunkan harga barang impianmu.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateNotificationSettings({
                    priceDropAlert: !notificationSettings.priceDropAlert,
                  })
                }
                className={`w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 relative ${
                  notificationSettings.priceDropAlert ? 'bg-pink-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform ${
                    notificationSettings.priceDropAlert ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Saving Streak Alert */}
            <div className="pt-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#4A3F35]">Saving Streak Celebration</h4>
                <p className="text-xs text-[#8C7A70]">
                  Apresiasi pencapaian konsistensi menabung (misal 7 hari, 14 hari, 30 hari).
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateNotificationSettings({
                    savingStreak: !notificationSettings.savingStreak,
                  })
                }
                className={`w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 relative ${
                  notificationSettings.savingStreak ? 'bg-pink-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform ${
                    notificationSettings.savingStreak ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Weekly Report */}
            <div className="pt-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#4A3F35]">Weekly Savings Report</h4>
                <p className="text-xs text-[#8C7A70]">
                  Ringkasan aktivitas menabung dan pengeluaran selama satu minggu setiap hari Minggu.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateNotificationSettings({
                    weeklyReport: !notificationSettings.weeklyReport,
                  })
                }
                className={`w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 relative ${
                  notificationSettings.weeklyReport ? 'bg-pink-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform ${
                    notificationSettings.weeklyReport ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#FCE7EB] p-6 space-y-4">
            <h3 className="text-base font-bold text-[#4A3F35]">Perbarui Informasi Profil & Finansial</h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#4A3F35]">Nama Pengguna</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs font-medium focus:outline-none focus:border-pink-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#4A3F35]">Uang Saku Harian (Rp)</label>
                <input
                  type="number"
                  value={allowanceInput}
                  onChange={(e) => setAllowanceInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs font-bold font-mono focus:outline-none focus:border-pink-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#4A3F35]">Batas Anggaran Bulanan (Rp)</label>
                <input
                  type="number"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs font-bold font-mono focus:outline-none focus:border-pink-400"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 py-2.5 rounded-2xl bg-gray-100 text-xs font-semibold text-[#6B5B52] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
