import React, { useState } from 'react';
import { useWishfund } from '../context/WishfundContext';
import {
  X,
  ExternalLink,
  PiggyBank,
  CheckCircle2,
  Trash2,
  TrendingDown,
  Sparkles,
  Calendar,
  Tag,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export const WishlistDetailModal: React.FC = () => {
  const {
    selectedWishlistDetail,
    setSelectedWishlistDetail,
    markAsPurchased,
    deleteWishlistItem,
    openAddSavings,
    simulatePriceDrop,
    setIsBuyOrWaitOpen,
  } = useWishfund();

  const [isSimulateDropOpen, setIsSimulateDropOpen] = useState(false);
  const [dropAmountInput, setDropAmountInput] = useState<number>(200000);

  if (!selectedWishlistDetail) return null;

  const item = selectedWishlistDetail;
  const percentage = Math.min(100, (item.currentSaved / item.targetPrice) * 100);
  const remaining = Math.max(0, item.targetPrice - item.currentSaved);

  const handleSimulateDrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (dropAmountInput <= 0) return;
    const newPrice = Math.max(item.currentSaved, item.targetPrice - dropAmountInput);
    simulatePriceDrop(item.id, newPrice);
    setIsSimulateDropOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-xl border border-[#FCE7EB] p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setSelectedWishlistDetail(null)}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8C7A70] hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Photo & Badges */}
        <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-pink-50 border border-pink-100">
          <img
            src={item.imageUrl}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-pink-300 font-bold bg-pink-50 -z-10">
            {item.name.slice(0, 3)}
          </div>

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-bold text-pink-700 shadow-2xs border border-pink-100">
              {item.priority}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-xs font-medium text-[#4A3F35]">
              {item.category}
            </span>
          </div>

          {item.status === 'Purchased' ? (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-2xs flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Purchased</span>
            </div>
          ) : (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-bold font-mono tabular-nums">
              Status: {item.status}
            </div>
          )}
        </div>

        {/* Header Title & Store Link */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-extrabold text-[#4A3F35] tracking-tight">{item.name}</h2>
            {item.storeUrl && (
              <a
                href={item.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-pink-600 hover:text-pink-700 inline-flex items-center gap-1 shrink-0 bg-pink-50 px-3 py-1.5 rounded-xl border border-pink-200"
              >
                <span>Toko</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          {item.notes && <p className="text-xs text-[#6B5B52] leading-relaxed">{item.notes}</p>}
        </div>

        {/* Simulation Financial Breakdown (Matches PDF Section 9) */}
        <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#FCE7EB] space-y-3">
          <div className="text-xs font-bold text-[#4A3F35] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Rincian Tabungan (Simulasi Penggunaan)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-2.5 rounded-xl bg-white border border-[#FCE7EB]">
              <span className="text-[10px] text-[#8C7A70] block">Target Harga</span>
              <span className="text-xs font-extrabold text-[#4A3F35] font-mono tabular-nums">
                Rp {item.targetPrice.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#FCE7EB]">
              <span className="text-[10px] text-[#8C7A70] block">Tabungan Saat Ini</span>
              <span className="text-xs font-extrabold text-pink-600 font-mono tabular-nums">
                Rp {item.currentSaved.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#FCE7EB]">
              <span className="text-[10px] text-[#8C7A70] block">Sisa Target</span>
              <span className="text-xs font-extrabold text-rose-600 font-mono tabular-nums">
                Rp {remaining.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#FCE7EB]">
              <span className="text-[10px] text-[#8C7A70] block">Progres</span>
              <span className="text-xs font-extrabold text-emerald-600 font-mono tabular-nums">
                {percentage.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="w-full bg-pink-100/70 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#8C7A70]">
              <span>Dibuat: {item.createdAt}</span>
              <span>Target selesai: {item.targetDate}</span>
            </div>
          </div>
        </div>

        {/* Section 4: Price Reminder & Price History */}
        <div className="p-4 rounded-2xl bg-white border border-[#FCE7EB] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#4A3F35]">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
              <span>Price Reminder & Riwayat Harga</span>
            </div>
            <button
              onClick={() => setIsSimulateDropOpen(!isSimulateDropOpen)}
              className="text-[11px] font-semibold text-pink-600 hover:text-pink-700 cursor-pointer"
            >
              {isSimulateDropOpen ? 'Tutup Simulasi' : '+ Simulasi Diskon Promo'}
            </button>
          </div>

          {/* Simulation Price Drop Form */}
          {isSimulateDropOpen && (
            <form onSubmit={handleSimulateDrop} className="p-3 rounded-xl bg-pink-50/50 border border-pink-200/80 space-y-2">
              <span className="text-xs font-medium text-[#4A3F35] block">
                Simulasikan penurunan harga dari toko (misal Payday Sale):
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={dropAmountInput}
                  onChange={(e) => setDropAmountInput(parseInt(e.target.value, 10) || 0)}
                  placeholder="Jumlah diskon (Rp)"
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white border border-pink-200 font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold bg-pink-500 text-white rounded-xl hover:bg-pink-600 cursor-pointer"
                >
                  Terapkan Diskon
                </button>
              </div>
            </form>
          )}

          {/* Price History Timeline */}
          {item.priceHistory && item.priceHistory.length > 0 ? (
            <div className="space-y-1.5 text-xs">
              {item.priceHistory.map((ph, idx) => (
                <div key={idx} className="flex items-center justify-between text-[#6B5B52] py-1 border-b border-[#F5EBE1] last:border-0">
                  <span className="font-mono text-[#8C7A70]">{ph.date}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#8C7A70]">{ph.note || 'Pembaruan harga'}</span>
                    <span className="font-bold font-mono text-[#4A3F35]">
                      Rp {ph.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#8C7A70]">Harga stabil sejak pertama kali dicatat.</p>
          )}
        </div>

        {/* Section 4: Wishlist Match / Rekomendasi Alternatif */}
        <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-[#6B5B52] space-y-1">
          <div className="font-bold text-amber-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wishlist Match & Saran Cerdas:</span>
          </div>
          <p className="leading-relaxed">
            Ingin lebih cepat tercapai? Pertimbangkan unit open-box / official refurbished terverifikasi garansi,
            atau manfaatkan voucher tanggal kembar untuk menghemat 10-25% dari target awal.
          </p>
        </div>

        {/* Actions Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#F5EBE1]">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                deleteWishlistItem(item.id);
                setSelectedWishlistDetail(null);
              }}
              className="p-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Hapus dari Wishlist"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedWishlistDetail(null);
                setIsBuyOrWaitOpen(true);
              }}
              className="px-3.5 py-2.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Buy or Wait?</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {item.status === 'In Progress' && (
              <button
                onClick={() => {
                  markAsPurchased(item.id);
                  setSelectedWishlistDetail(null);
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Tandai Terbeli</span>
              </button>
            )}

            <button
              onClick={() => {
                const target = item;
                setSelectedWishlistDetail(null);
                openAddSavings(target);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <PiggyBank className="w-4 h-4" />
              <span>+ Setor Tabungan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
