import React, { useState } from 'react';
import { useWishfund } from '../context/WishfundContext';
import { Calculator, X, Sparkles, Coffee, Clock, Calendar, CheckCircle } from 'lucide-react';

export const WorthItCalculatorModal: React.FC = () => {
  const { isWorthItOpen, setIsWorthItOpen, wishlist, userProfile } = useWishfund();

  const [selectedItemId, setSelectedItemId] = useState<string>(wishlist[0]?.id || '');
  const [customPrice, setCustomPrice] = useState<number>(wishlist[0]?.targetPrice || 8000000);
  const [dailyAllowance, setDailyAllowance] = useState<number>(userProfile.dailyAllowance || 50000);
  const [coffeeCost, setCoffeeCost] = useState<number>(30000); // 1 cup kopi

  if (!isWorthItOpen) return null;

  const handleItemSelect = (id: string) => {
    setSelectedItemId(id);
    const item = wishlist.find((w) => w.id === id);
    if (item) {
      setCustomPrice(item.targetPrice);
    }
  };

  // Calculations
  const daysOfAllowance = dailyAllowance > 0 ? (customPrice / dailyAllowance).toFixed(1) : '0';
  const cupsOfCoffee = coffeeCost > 0 ? (customPrice / coffeeCost).toFixed(0) : '0';
  const hoursOfWork = Math.max(1, Math.round(customPrice / (dailyAllowance / 8)));

  let worthItScore = 'Sedang';
  let worthItAdvice = 'Barang ini membutuhkan komitmen menabung yang terukur. Alokasikan 20-30% uang saku agar tidak mengorbankan kebutuhan harian.';
  let scoreBadgeColor = 'bg-amber-100 text-amber-700 border-amber-200';

  if (parseFloat(daysOfAllowance) <= 7) {
    worthItScore = 'Sangat Layak (Worth It!)';
    worthItAdvice = 'Harga sangat terjangkau dibandingkan kemampuan harianmu. Bisa dicapai dalam waktu singkat tanpa beban berat.';
    scoreBadgeColor = 'bg-emerald-100 text-emerald-700 border-emerald-200';
  } else if (parseFloat(daysOfAllowance) > 60) {
    worthItScore = 'Perlu Pertimbangan Matang';
    worthItAdvice = 'Harga setara lebih dari 2 bulan total uang sakumu. Pastikan masuk kategori prioritas tinggi (Must Have) dan buat jadwal setoran bertahap.';
    scoreBadgeColor = 'bg-rose-100 text-rose-700 border-rose-200';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl border border-[#FCE7EB] p-6 sm:p-7 space-y-5">
        {/* Close Button */}
        <button
          onClick={() => setIsWorthItOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8C7A70] hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#4A3F35]">Worth It Calculator</h2>
            <p className="text-xs text-[#8C7A70]">
              Bandingkan harga barang dengan kemampuan riil dan pengorbanan harianmu.
            </p>
          </div>
        </div>

        {/* Wishlist item picker */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#4A3F35]">Pilih Wishlist atau Masukkan Harga</label>
          <select
            value={selectedItemId}
            onChange={(e) => handleItemSelect(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs font-medium text-[#4A3F35] focus:outline-none focus:border-pink-400"
          >
            {wishlist.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} (Rp {item.targetPrice.toLocaleString('id-ID')})
              </option>
            ))}
          </select>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#4A3F35]">Harga Barang (Rp)</label>
            <input
              type="number"
              value={customPrice || ''}
              onChange={(e) => setCustomPrice(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs font-bold font-mono focus:outline-none focus:border-pink-400"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#4A3F35]">Uang Saku Harian (Rp)</label>
            <input
              type="number"
              value={dailyAllowance || ''}
              onChange={(e) => setDailyAllowance(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs font-bold font-mono focus:outline-none focus:border-pink-400"
            />
          </div>
        </div>

        {/* Equivalence Visual Metrics */}
        <div className="grid grid-cols-3 gap-2.5 pt-2">
          {/* Days of allowance */}
          <div className="p-3 rounded-2xl bg-pink-50/60 border border-pink-100 text-center">
            <Calendar className="w-4 h-4 text-pink-500 mx-auto mb-1" />
            <div className="text-base font-extrabold text-[#4A3F35] font-mono tabular-nums">
              {daysOfAllowance}
            </div>
            <span className="text-[10px] text-[#8C7A70] block">Hari Uang Saku</span>
          </div>

          {/* Coffee sacrifice */}
          <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-100 text-center">
            <Coffee className="w-4 h-4 text-amber-600 mx-auto mb-1" />
            <div className="text-base font-extrabold text-[#4A3F35] font-mono tabular-nums">
              {cupsOfCoffee}
            </div>
            <span className="text-[10px] text-[#8C7A70] block">Cup Kopi/Boba</span>
          </div>

          {/* Hours of work */}
          <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 text-center">
            <Clock className="w-4 h-4 text-purple-600 mx-auto mb-1" />
            <div className="text-base font-extrabold text-[#4A3F35] font-mono tabular-nums">
              ~{hoursOfWork}
            </div>
            <span className="text-[10px] text-[#8C7A70] block">Jam Aktivitas</span>
          </div>
        </div>

        {/* Verdict Box */}
        <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#FCE7EB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C7A70]">Analisis Kelayakan</span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${scoreBadgeColor}`}>
              {worthItScore}
            </span>
          </div>
          <p className="text-xs text-[#6B5B52] leading-relaxed">
            {worthItAdvice}
          </p>
        </div>

        <button
          onClick={() => setIsWorthItOpen(false)}
          className="w-full py-2.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
        >
          Mengerti, Tutup Kalkulator
        </button>
      </div>
    </div>
  );
};
