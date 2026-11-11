import React from 'react';
import { useWishfund } from '../context/WishfundContext';
import {
  Sparkles,
  Target,
  PiggyBank,
  Wallet,
  Calculator,
  Compass,
  TrendingUp,
  Image as ImageIcon,
  Flame,
  ArrowRight,
  Plus,
  CheckCircle,
  Clock,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { WishlistItem } from '../types';

export const HomeView: React.FC = () => {
  const {
    wishlist,
    totalSavedAll,
    totalTargetAll,
    walletBalance,
    savingStreak,
    openAddSavings,
    setIsAddWishlistModalOpen,
    setIsWorthItOpen,
    setIsBuyOrWaitOpen,
    setIsForecastOpen,
    setActiveTab,
    setSelectedWishlistDetail,
    notifications,
  } = useWishfund();

  const activeGoals = wishlist.filter((item) => item.status === 'In Progress');
  const purchasedGoals = wishlist.filter((item) => item.status === 'Purchased');
  const overallProgress = totalTargetAll > 0 ? (totalSavedAll / (totalSavedAll + totalTargetAll)) * 100 : 0;

  // Unread or latest high priority smart reminder
  const latestReminder = notifications[0];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Hero Banner with Coquette Pastel Charm */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF0F4] via-[#FFF7F2] to-[#FFFDF9] border border-[#FCE7EB] p-6 sm:p-8 shadow-xs">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-40 h-40 bg-rose-100/50 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-pink-600 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tagline</span>
              <span aria-hidden="true">·</span>
              <span className="font-bold tracking-normal normal-case text-pink-700">Dream it. Plan it. Save it.</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#4A3F35] tracking-tight text-balance">
              Wujudkan Barang Impian Tanpa Beban Finansial
            </h1>
            <p className="text-sm sm:text-base text-[#6B5B52] leading-relaxed">
              Gabungkan rencana wishlist barang dan alokasi tabungan harianmu secara teratur.
              Atur prioritas cerdas, pantau perkembangan, dan rayakan setiap pencapaian.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={() => openAddSavings()}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-pink-500 hover:bg-pink-600 rounded-2xl shadow-sm transition-all cursor-pointer active:scale-98"
            >
              <PiggyBank className="w-4 h-4" />
              <span>Setor Tabungan</span>
            </button>
            <button
              onClick={() => setIsAddWishlistModalOpen(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#4A3F35] bg-white border border-[#FCE7EB] hover:bg-pink-50/50 rounded-2xl transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-pink-500" />
              <span>Tambah Wishlist</span>
            </button>
          </div>
        </div>
      </section>

      {/* Financial Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Tabungan Terkumpul */}
        <div className="p-5 rounded-2xl bg-white border border-[#FCE7EB] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#8C7A70]">Total Tabungan Terkumpul</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#4A3F35] font-mono tabular-nums tracking-tight">
              Rp {totalSavedAll.toLocaleString('id-ID')}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-[#8C7A70]">
              <span>{activeGoals.length} target aktif</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-600 font-semibold">{purchasedGoals.length} terbeli</span>
            </div>
          </div>
          {/* Progress Mini Bar */}
          <div className="mt-4 pt-3 border-t border-[#F5EBE1]">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#8C7A70]">Rasio Target Tercapai</span>
              <span className="font-semibold text-pink-600 font-mono tabular-nums">{overallProgress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-pink-100/70 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, overallProgress)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Sisa Target Yang Diperlukan */}
        <div className="p-5 rounded-2xl bg-white border border-[#FCE7EB] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#8C7A70]">Sisa Kebutuhan Dana</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#4A3F35] font-mono tabular-nums tracking-tight">
              Rp {Math.max(0, totalTargetAll - totalSavedAll).toLocaleString('id-ID')}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-[#8C7A70]">
              <span>Total nilai impian:</span>
              <span className="font-semibold text-[#4A3F35] font-mono tabular-nums">
                Rp {totalTargetAll.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F5EBE1] flex items-center justify-between text-xs text-[#8C7A70]">
            <span>Estimasi rata-rata</span>
            <span className="text-pink-600 font-medium">±3-5 bulan tercapai</span>
          </div>
        </div>

        {/* Saving Streak & Konsistensi */}
        <div className="p-5 rounded-2xl bg-white border border-[#FCE7EB] shadow-xs flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#8C7A70]">Konsistensi Menabung</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#4A3F35] font-mono tabular-nums">{savingStreak}</span>
              <span className="text-sm font-bold text-orange-600">Hari Berturut-turut</span>
            </div>
            <p className="text-xs text-[#8C7A70] mt-1.5 leading-snug">
              Kebiasaan baik terbangun dari nominal kecil yang konsisten setiap hari!
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F5EBE1] flex items-center justify-between">
            <button
              onClick={() => setActiveTab('profile')}
              className="text-xs font-semibold text-pink-600 hover:text-pink-700 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Tantangan & Badge</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Smart Reminder Callout (Section 7) */}
      {latestReminder && (
        <div className="p-4 rounded-2xl bg-[#FFF5F8] border border-pink-200/80 flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#4A3F35]">{latestReminder.title}</h4>
              <p className="text-xs text-[#6B5B52] mt-0.5">{latestReminder.message}</p>
            </div>
          </div>
          <button
            onClick={() => openAddSavings()}
            className="text-xs font-semibold text-pink-700 bg-white border border-pink-200 px-3 py-1.5 rounded-xl hover:bg-pink-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Nabung Sekarang
          </button>
        </div>
      )}

      {/* Quick Access Tools (Section 4: Fitur Tambahan) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#4A3F35]">Fitur Tambahan & Akses Cepat</h2>
          <span className="text-xs text-[#8C7A70]">Alat bantu finansial cerdas</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Worth It Calculator */}
          <button
            onClick={() => setIsWorthItOpen(true)}
            className="p-4 rounded-2xl bg-white border border-[#FCE7EB] hover:border-pink-300 hover:bg-pink-50/30 transition-all text-left flex flex-col justify-between group cursor-pointer shadow-2xs"
          >
            <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-pink-100">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#4A3F35] group-hover:text-pink-600 transition-colors">
                Worth It Calculator
              </h3>
              <p className="text-[11px] text-[#8C7A70] mt-1 line-clamp-2">
                Bandingkan harga barang dengan uang saku & jam kerja.
              </p>
            </div>
          </button>

          {/* Buy or Wait? */}
          <button
            onClick={() => setIsBuyOrWaitOpen(true)}
            className="p-4 rounded-2xl bg-white border border-[#FCE7EB] hover:border-pink-300 hover:bg-pink-50/30 transition-all text-left flex flex-col justify-between group cursor-pointer shadow-2xs"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-purple-100">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#4A3F35] group-hover:text-purple-600 transition-colors">
                Buy or Wait?
              </h3>
              <p className="text-[11px] text-[#8C7A70] mt-1 line-clamp-2">
                Kuis pertimbangan analitis sebelum berbelanja.
              </p>
            </div>
          </button>

          {/* Savings Forecast */}
          <button
            onClick={() => setIsForecastOpen(true)}
            className="p-4 rounded-2xl bg-white border border-[#FCE7EB] hover:border-pink-300 hover:bg-pink-50/30 transition-all text-left flex flex-col justify-between group cursor-pointer shadow-2xs"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-emerald-100">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#4A3F35] group-hover:text-emerald-600 transition-colors">
                Savings Forecast
              </h3>
              <p className="text-[11px] text-[#8C7A70] mt-1 line-clamp-2">
                Perkirakan tanggal target tercapai berdasarkan pola setoran.
              </p>
            </div>
          </button>

          {/* Dream Board */}
          <button
            onClick={() => setActiveTab('wishlist')}
            className="p-4 rounded-2xl bg-white border border-[#FCE7EB] hover:border-pink-300 hover:bg-pink-50/30 transition-all text-left flex flex-col justify-between group cursor-pointer shadow-2xs"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-amber-100">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#4A3F35] group-hover:text-amber-600 transition-colors">
                Dream Board
              </h3>
              <p className="text-[11px] text-[#8C7A70] mt-1 line-clamp-2">
                Kolase visual estetis dari barang impianmu.
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* Active Saving Goals (Section 3 & Section 9: Contoh Simulasi Kamera Canon EOS M50) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#4A3F35]">Target Tabungan Aktif</h2>
            <p className="text-xs text-[#8C7A70]">Setiap wishlist memiliki progres dan estimasi tersendiri</p>
          </div>
          <button
            onClick={() => setActiveTab('wishlist')}
            className="text-xs font-semibold text-pink-600 hover:text-pink-700 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Semua Wishlist ({wishlist.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeGoals.map((item) => {
            const percentage = Math.min(100, (item.currentSaved / item.targetPrice) * 100);
            const remaining = Math.max(0, item.targetPrice - item.currentSaved);

            return (
              <div
                key={item.id}
                onClick={() => setSelectedWishlistDetail(item)}
                className="p-5 rounded-2xl bg-white border border-[#FCE7EB] hover:border-pink-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start gap-4">
                    {/* Thumbnail with fallback */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-pink-50 border border-pink-100 shrink-0 relative">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center text-pink-300 font-bold text-xs bg-pink-50 absolute inset-0 -z-10">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-[#8C7A70] mb-1">
                        <span>{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-pink-600">{item.priority}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#4A3F35] truncate group-hover:text-pink-600 transition-colors">
                        {item.name}
                      </h3>
                      <div className="mt-1 flex items-baseline gap-1.5 text-xs">
                        <span className="text-[#8C7A70]">Terkumpul:</span>
                        <span className="font-bold text-[#4A3F35] font-mono tabular-nums">
                          Rp {item.currentSaved.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[#8C7A70]">/ Rp {item.targetPrice.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-pink-600 font-mono tabular-nums">{percentage.toFixed(1)}%</span>
                      <span className="text-[#8C7A70] font-mono tabular-nums">
                        Sisa: Rp {remaining.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="w-full bg-pink-100/70 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="mt-4 pt-3 border-t border-[#F5EBE1] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#8C7A70]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Target: {item.targetDate}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openAddSavings(item);
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-xl transition-colors cursor-pointer"
                  >
                    + Setor
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
