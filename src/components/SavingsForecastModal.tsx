import React, { useState } from 'react';
import { useWishfund } from '../context/WishfundContext';
import { TrendingUp, X, Sparkles, Calendar, Clock, ArrowRight, Zap } from 'lucide-react';

export const SavingsForecastModal: React.FC = () => {
  const { isForecastOpen, setIsForecastOpen, wishlist, openAddSavings } = useWishfund();

  const activeItems = wishlist.filter((item) => item.status === 'In Progress');
  const [selectedItemId, setSelectedItemId] = useState<string>(activeItems[0]?.id || wishlist[0]?.id || '');
  const [depositCadence, setDepositCadence] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [depositAmount, setDepositAmount] = useState<number>(50000);

  if (!isForecastOpen) return null;

  const selectedItem = wishlist.find((w) => w.id === selectedItemId) || activeItems[0];
  const remaining = selectedItem ? Math.max(0, selectedItem.targetPrice - selectedItem.currentSaved) : 0;

  // Forecast math
  const depositsNeeded = depositAmount > 0 ? Math.ceil(remaining / depositAmount) : 0;
  let totalDays = 0;
  if (depositCadence === 'daily') {
    totalDays = depositsNeeded;
  } else if (depositCadence === 'weekly') {
    totalDays = depositsNeeded * 7;
  } else {
    totalDays = depositsNeeded * 30;
  }

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + totalDays);

  const estimatedDateStr = estimatedDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const monthsRemaining = (totalDays / 30).toFixed(1);

  // Speed up scenario
  const speedUpAmount = depositAmount * 1.3;
  const speedUpDays = speedUpAmount > 0 ? Math.ceil(remaining / speedUpAmount) * (depositCadence === 'daily' ? 1 : depositCadence === 'weekly' ? 7 : 30) : 0;
  const daysSaved = Math.max(0, totalDays - speedUpDays);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl border border-[#FCE7EB] p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsForecastOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8C7A70] hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#4A3F35]">Savings Forecast</h2>
            <p className="text-xs text-[#8C7A70]">
              Proyeksikan tanggal pencapaian target berdasarkan pola dan nominal setoranmu.
            </p>
          </div>
        </div>

        {/* Item Selector */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#4A3F35]">Pilih Target Impian</label>
          <select
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs font-semibold text-[#4A3F35] focus:outline-none focus:border-pink-400"
          >
            {wishlist.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} — Sisa: Rp {Math.max(0, item.targetPrice - item.currentSaved).toLocaleString('id-ID')}
              </option>
            ))}
          </select>
        </div>

        {/* Cadence Tabs */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#4A3F35]">Pola Rutinitas Setoran</label>
          <div className="grid grid-cols-3 gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-100">
            <button
              type="button"
              onClick={() => {
                setDepositCadence('daily');
                setDepositAmount(25000);
              }}
              className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                depositCadence === 'daily'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-[#6B5B52]'
              }`}
            >
              Harian
            </button>
            <button
              type="button"
              onClick={() => {
                setDepositCadence('weekly');
                setDepositAmount(150000);
              }}
              className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                depositCadence === 'weekly'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-[#6B5B52]'
              }`}
            >
              Mingguan
            </button>
            <button
              type="button"
              onClick={() => {
                setDepositCadence('monthly');
                setDepositAmount(500000);
              }}
              className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                depositCadence === 'monthly'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-[#6B5B52]'
              }`}
            >
              Bulanan
            </button>
          </div>
        </div>

        {/* Deposit Amount Slider / Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#4A3F35]">
            <span>Nominal Setoran per {depositCadence === 'daily' ? 'Hari' : depositCadence === 'weekly' ? 'Minggu' : 'Bulan'}</span>
            <span className="text-emerald-700 font-mono tabular-nums text-sm">
              Rp {depositAmount.toLocaleString('id-ID')}
            </span>
          </div>
          <input
            type="range"
            min={depositCadence === 'daily' ? 5000 : depositCadence === 'weekly' ? 25000 : 100000}
            max={depositCadence === 'daily' ? 250000 : depositCadence === 'weekly' ? 1500000 : 5000000}
            step={depositCadence === 'daily' ? 5000 : depositCadence === 'weekly' ? 25000 : 50000}
            value={depositAmount}
            onChange={(e) => setDepositAmount(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Big Forecast Prediction Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200 text-center space-y-2">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Estimasi Target Tercapai
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-tight font-serif">
            {estimatedDateStr}
          </div>
          <p className="text-xs text-emerald-700">
            Sekitar <strong className="font-mono tabular-nums">{totalDays} hari</strong> lagi ({monthsRemaining} bulan) dengan {depositsNeeded} kali setoran.
          </p>
        </div>

        {/* Booster Tip */}
        {daysSaved > 0 && (
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
            <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-[#6B5B52] leading-relaxed">
              <strong className="text-amber-800 font-bold">Tips Akselerasi:</strong> Jika kamu menambah setoran menjadi{' '}
              <span className="font-bold text-[#4A3F35] font-mono tabular-nums">
                Rp {Math.round(speedUpAmount).toLocaleString('id-ID')}
              </span>
              , impianmu akan tercapai <strong className="text-emerald-700 font-mono tabular-nums">{daysSaved} hari lebih cepat</strong>!
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => {
            setIsForecastOpen(false);
            if (selectedItem) openAddSavings(selectedItem);
          }}
          className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Mulai Setor Rp {depositAmount.toLocaleString('id-ID')} Sekarang</span>
        </button>
      </div>
    </div>
  );
};
