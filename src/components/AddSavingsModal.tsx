import React, { useState, useEffect } from 'react';
import { useWishfund } from '../context/WishfundContext';
import { PiggyBank, X, Sparkles, Check, ArrowRight, Calendar } from 'lucide-react';

export const AddSavingsModal: React.FC = () => {
  const {
    isAddSavingsModalOpen,
    closeAddSavings,
    selectedWishlistForDeposit,
    wishlist,
    addSavingsDeposit,
  } = useWishfund();

  const activeItems = wishlist.filter((item) => item.status === 'In Progress');

  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [amount, setAmount] = useState<number>(50000);
  const [customAmountStr, setCustomAmountStr] = useState<string>('50000');
  const [note, setNote] = useState<string>('Setoran harian celengan impian');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (selectedWishlistForDeposit) {
      setSelectedItemId(selectedWishlistForDeposit.id);
    } else if (activeItems.length > 0 && !selectedItemId) {
      setSelectedItemId(activeItems[0].id);
    }
  }, [selectedWishlistForDeposit, activeItems]);

  if (!isAddSavingsModalOpen) return null;

  const currentItem = wishlist.find((w) => w.id === selectedItemId);

  const presetAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

  const handlePresetSelect = (val: number) => {
    setAmount(val);
    setCustomAmountStr(val.toString());
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const num = parseInt(raw, 10) || 0;
    setCustomAmountStr(raw);
    setAmount(num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;

    addSavingsDeposit(amount, selectedItemId || undefined, note, date);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      closeAddSavings();
    }, 1100);
  };

  // Live progress simulation
  const currentSaved = currentItem ? currentItem.currentSaved : 0;
  const targetPrice = currentItem ? currentItem.targetPrice : 1;
  const oldPercentage = currentItem ? (currentSaved / targetPrice) * 100 : 0;
  const newSaved = Math.min(targetPrice, currentSaved + amount);
  const newPercentage = currentItem ? (newSaved / targetPrice) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl border border-[#FCE7EB] overflow-hidden p-6 sm:p-7">
        {/* Close Button */}
        <button
          onClick={closeAddSavings}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8C7A70] hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-extrabold text-[#4A3F35]">Setoran Berhasil! 🌸</h3>
            <p className="text-sm text-[#6B5B52]">
              Rp {amount.toLocaleString('id-ID')} telah ditambahkan ke {currentItem?.name || 'Celengan Umum'}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Modal Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center border border-pink-200">
                <PiggyBank className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#4A3F35]">Setor Tabungan</h2>
                <p className="text-xs text-[#8C7A70]">
                  Sisihkan uang saku untuk mendekatkan barang impianmu
                </p>
              </div>
            </div>

            {/* Target Item Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#4A3F35]">Pilih Target Wishlist</label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs font-medium text-[#4A3F35] focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              >
                <option value="">Celengan Umum (Belum Ditentukan)</option>
                {activeItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} — Rp {item.currentSaved.toLocaleString('id-ID')} / Rp{' '}
                    {item.targetPrice.toLocaleString('id-ID')}
                  </option>
                ))}
              </select>
            </div>

            {/* Preset Amount Chips */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#4A3F35]">Pilih Nominal Cepat</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      amount === preset
                        ? 'bg-pink-500 text-white border-pink-500 shadow-2xs'
                        : 'bg-[#FFFDF9] text-[#6B5B52] border-[#FCE7EB] hover:bg-pink-50 hover:border-pink-300'
                    }`}
                  >
                    {preset >= 1000 ? `${preset / 1000}k` : preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#4A3F35]">Nominal Lainnya (Rp)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C7A70]">
                  Rp
                </span>
                <input
                  type="text"
                  value={customAmountStr ? parseInt(customAmountStr, 10).toLocaleString('id-ID') : ''}
                  onChange={handleCustomChange}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FFFDF9] border border-[#FCE7EB] text-sm font-bold font-mono tabular-nums text-[#4A3F35] focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                />
              </div>
            </div>

            {/* Live Progress Simulation (if item selected) */}
            {currentItem && (
              <div className="p-3.5 rounded-2xl bg-pink-50/50 border border-pink-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#4A3F35]">
                  <span>Progres Baru: {currentItem.name}</span>
                  <span className="text-pink-600 font-mono tabular-nums">
                    {oldPercentage.toFixed(1)}% → {newPercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-pink-200">
                  <div
                    className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, newPercentage)}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#8C7A70] flex justify-between">
                  <span>Terkumpul: Rp {newSaved.toLocaleString('id-ID')}</span>
                  <span>Target: Rp {currentItem.targetPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
            )}

            {/* Notes & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#4A3F35]">Catatan</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Sisa jajan hari ini"
                  className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs text-[#4A3F35] focus:outline-none focus:border-pink-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#4A3F35]">Tanggal</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs text-[#4A3F35] focus:outline-none focus:border-pink-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={amount <= 0}
              className="w-full py-3 rounded-2xl bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-bold text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simpan Setoran Tabungan</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
