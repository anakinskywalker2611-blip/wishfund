import React, { useState } from 'react';
import { useWishfund } from '../context/WishfundContext';
import { Compass, X, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

export const BuyOrWaitModal: React.FC = () => {
  const { isBuyOrWaitOpen, setIsBuyOrWaitOpen, wishlist, openAddSavings } = useWishfund();

  const [selectedItemId, setSelectedItemId] = useState<string>(wishlist[0]?.id || '');
  
  // Quiz states
  const [urgency, setUrgency] = useState<'need' | 'want' | 'impulse'>('want');
  const [hasEmergencyFund, setHasEmergencyFund] = useState<boolean>(true);
  const [consideredDays, setConsideredDays] = useState<'fresh' | 'few_days' | 'month'>('few_days');
  const [affectsOtherGoals, setAffectsOtherGoals] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);

  if (!isBuyOrWaitOpen) return null;

  const selectedItem = wishlist.find((w) => w.id === selectedItemId) || wishlist[0];
  const progress = selectedItem ? (selectedItem.currentSaved / selectedItem.targetPrice) * 100 : 0;

  // Evaluation logic
  const calculateResult = () => {
    let score = 0;

    // Urgency
    if (urgency === 'need') score += 35;
    else if (urgency === 'want') score += 20;
    else score += 5;

    // Progress
    if (progress >= 100) score += 40;
    else if (progress >= 75) score += 30;
    else if (progress >= 50) score += 20;
    else score += 5;

    // Emergency fund
    if (hasEmergencyFund) score += 15;

    // Consideration period
    if (consideredDays === 'month') score += 15;
    else if (consideredDays === 'few_days') score += 10;
    else score += 0;

    // Impact
    if (!affectsOtherGoals) score += 10;

    return score;
  };

  const score = calculateResult();

  let recommendation = {
    title: 'Tunggu 30 Hari (Cooling-off Period)',
    color: 'text-amber-700 bg-amber-50 border-amber-200',
    icon: AlertTriangle,
    summary: 'Keinginanmu masih dalam tahap pertimbangan awal atau tabungan belum mencukupi. Beri waktu 30 hari untuk mengevaluasi apakah barang ini benar-benar esensial.',
    actionText: 'Lanjutkan Menabung',
  };

  if (score >= 80 && progress >= 90) {
    recommendation = {
      title: 'Beli Sekarang (Safe to Buy! 🌸)',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: CheckCircle2,
      summary: 'Dana tabungan sudah mencukupi, tidak mengganggu target lain, dan telah kamu pertimbangkan secara matang. Selamat menikmati hasil menabungmu!',
      actionText: 'Tandai Sebagai Terbeli',
    };
  } else if (score < 50 || urgency === 'impulse') {
    recommendation = {
      title: 'Tunda Dulu & Fokuskan ke Target Utama',
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      icon: AlertTriangle,
      summary: 'Pembelian ini berpotensi menjadi belanja impulsif yang menguras keuanganmu. Sebaiknya fokuskan uang saku ke wishlist dengan prioritas "Must Have".',
      actionText: 'Review Wishlist Lain',
    };
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl border border-[#FCE7EB] p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            setShowResult(false);
            setIsBuyOrWaitOpen(false);
          }}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8C7A70] hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#4A3F35]">Buy or Wait? Evaluator</h2>
            <p className="text-xs text-[#8C7A70]">
              Pertimbangan cerdas anti-impulsive buying sebelum kamu checkout.
            </p>
          </div>
        </div>

        {/* Selected item preview */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#4A3F35]">Barang yang Sedang Dipertimbangkan</label>
          <select
            value={selectedItemId}
            onChange={(e) => {
              setSelectedItemId(e.target.value);
              setShowResult(false);
            }}
            className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs font-semibold text-[#4A3F35] focus:outline-none focus:border-pink-400"
          >
            {wishlist.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} — Rp {item.targetPrice.toLocaleString('id-ID')} (Terkumpul {((item.currentSaved / item.targetPrice) * 100).toFixed(0)}%)
              </option>
            ))}
          </select>
        </div>

        {!showResult ? (
          <div className="space-y-4">
            {/* Question 1: Urgency */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#4A3F35]">
                1. Apa fungsi barang ini bagi kehidupanmu?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency('need')}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                    urgency === 'need'
                      ? 'bg-purple-500 text-white border-purple-500 shadow-2xs'
                      : 'bg-[#FFFDF9] text-[#6B5B52] border-[#FCE7EB] hover:bg-pink-50'
                  }`}
                >
                  <span className="font-bold block">Kebutuhan</span>
                  <span className="text-[10px] opacity-80">Kuliah / Kerja</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('want')}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                    urgency === 'want'
                      ? 'bg-purple-500 text-white border-purple-500 shadow-2xs'
                      : 'bg-[#FFFDF9] text-[#6B5B52] border-[#FCE7EB] hover:bg-pink-50'
                  }`}
                >
                  <span className="font-bold block">Keinginan</span>
                  <span className="text-[10px] opacity-80">Hobi & Gaya</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('impulse')}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                    urgency === 'impulse'
                      ? 'bg-purple-500 text-white border-purple-500 shadow-2xs'
                      : 'bg-[#FFFDF9] text-[#6B5B52] border-[#FCE7EB] hover:bg-pink-50'
                  }`}
                >
                  <span className="font-bold block">Spontan</span>
                  <span className="text-[10px] opacity-80">Lagi Tren / Promo</span>
                </button>
              </div>
            </div>

            {/* Question 2: Consideration Period */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#4A3F35]">
                2. Berapa lama kamu sudah menginginkan barang ini?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setConsideredDays('fresh')}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                    consideredDays === 'fresh'
                      ? 'bg-purple-500 text-white border-purple-500 shadow-2xs'
                      : 'bg-[#FFFDF9] text-[#6B5B52] border-[#FCE7EB] hover:bg-pink-50'
                  }`}
                >
                  &lt; 3 Hari
                </button>
                <button
                  type="button"
                  onClick={() => setConsideredDays('few_days')}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                    consideredDays === 'few_days'
                      ? 'bg-purple-500 text-white border-purple-500 shadow-2xs'
                      : 'bg-[#FFFDF9] text-[#6B5B52] border-[#FCE7EB] hover:bg-pink-50'
                  }`}
                >
                  1 - 2 Minggu
                </button>
                <button
                  type="button"
                  onClick={() => setConsideredDays('month')}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                    consideredDays === 'month'
                      ? 'bg-purple-500 text-white border-purple-500 shadow-2xs'
                      : 'bg-[#FFFDF9] text-[#6B5B52] border-[#FCE7EB] hover:bg-pink-50'
                  }`}
                >
                  &gt; 1 Bulan
                </button>
              </div>
            </div>

            {/* Question 3: Emergency Fund & Target Impact */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#4A3F35]">
                3. Kondisi Finansial Pendukung:
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] cursor-pointer text-xs text-[#6B5B52]">
                  <input
                    type="checkbox"
                    checked={hasEmergencyFund}
                    onChange={(e) => setHasEmergencyFund(e.target.checked)}
                    className="rounded text-pink-500 focus:ring-pink-300"
                  />
                  <span>Saya masih memiliki uang cadangan darurat yang aman</span>
                </label>
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] cursor-pointer text-xs text-[#6B5B52]">
                  <input
                    type="checkbox"
                    checked={affectsOtherGoals}
                    onChange={(e) => setAffectsOtherGoals(e.target.checked)}
                    className="rounded text-pink-500 focus:ring-pink-300"
                  />
                  <span>Membeli ini akan menunda pencapaian target tabungan penting lainnya</span>
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowResult(true)}
              className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Lihat Hasil Analisis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in zoom-in-95 duration-200">
            {/* Result Box */}
            <div className={`p-5 rounded-3xl border ${recommendation.color} space-y-2 text-center`}>
              <div className="w-12 h-12 rounded-2xl bg-white/90 mx-auto flex items-center justify-center shadow-2xs">
                <recommendation.icon className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-extrabold">{recommendation.title}</h3>
              <p className="text-xs leading-relaxed opacity-90">{recommendation.summary}</p>
            </div>

            {/* Breakdown Highlights */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#FCE7EB] space-y-2 text-xs">
              <div className="font-bold text-[#4A3F35]">Ringkasan Faktor Penentu:</div>
              <div className="space-y-1.5 text-[#6B5B52]">
                <div className="flex justify-between">
                  <span>Progres Tabungan Saat Ini:</span>
                  <span className="font-bold text-pink-600 font-mono tabular-nums">
                    {progress.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Kategori Urgensi:</span>
                  <span className="font-semibold capitalize">{urgency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Masa Pertimbangan:</span>
                  <span className="font-semibold">{consideredDays === 'fresh' ? '< 3 Hari' : consideredDays === 'few_days' ? '1-2 Minggu' : '> 1 Bulan'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResult(false)}
                className="flex-1 py-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-[#6B5B52] cursor-pointer"
              >
                Ulangi Kuis
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsBuyOrWaitOpen(false);
                  setShowResult(false);
                  if (selectedItem) openAddSavings(selectedItem);
                }}
                className="flex-1 py-2.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-xs font-bold text-white shadow-xs cursor-pointer"
              >
                + Setor ke Target Ini
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
