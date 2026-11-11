import React from 'react';
import { useWishfund } from '../context/WishfundContext';
import { Sparkles, Heart, ExternalLink, PiggyBank, Pin } from 'lucide-react';
import { WishlistItem } from '../types';

export const DreamBoard: React.FC = () => {
  const { wishlist, openAddSavings, setSelectedWishlistDetail } = useWishfund();
  const activeItems = wishlist.filter((item) => item.status === 'In Progress');

  return (
    <div className="space-y-6">
      {/* Dream Board Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-100/70 via-rose-50 to-amber-50 border border-pink-200 text-center relative overflow-hidden">
        <div className="max-w-md mx-auto space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 bg-white/80 px-3 py-1 rounded-full shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Vision Board</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#4A3F35]">Papan Impian Estetis</h2>
          <p className="text-xs text-[#6B5B52]">
            Visualisasikan barang yang ingin kamu capai. Setiap impian dimulai dari niat dan langkah kecil!
          </p>
        </div>
      </div>

      {/* Grid of Aesthetic Dream Pins */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeItems.map((item, idx) => {
          const percentage = Math.min(100, (item.currentSaved / item.targetPrice) * 100);
          // subtle pastel rotation for scrapbook vision board vibe
          const rotations = ['rotate-0', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-2'];
          const rotClass = rotations[idx % rotations.length];

          return (
            <div
              key={item.id}
              onClick={() => setSelectedWishlistDetail(item)}
              className={`group relative bg-white p-4 rounded-3xl shadow-sm border border-[#FCE7EB] hover:shadow-md hover:border-pink-300 transition-all cursor-pointer transform ${rotClass} hover:rotate-0 hover:-translate-y-1`}
            >
              {/* Scrapbook Cute Pin Icon */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-7 h-7 rounded-full bg-pink-400 text-white flex items-center justify-center shadow-xs border-2 border-white">
                <Pin className="w-3.5 h-3.5" />
              </div>

              {/* Photo Area */}
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-pink-50 border border-pink-100 mb-3 mt-1">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-pink-300 font-bold bg-pink-50 -z-10">
                  {item.name.slice(0, 3)}
                </div>

                {/* Tag Priority Floating Badge */}
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-pink-700 shadow-2xs border border-pink-100">
                  {item.priority}
                </div>

                {/* Progress Percentage Badge */}
                <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-pink-600/90 backdrop-blur-xs text-[10px] font-bold text-white shadow-2xs font-mono tabular-nums">
                  {percentage.toFixed(0)}%
                </div>
              </div>

              {/* Title & Notes */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#4A3F35] line-clamp-1 group-hover:text-pink-600 transition-colors">
                  {item.name}
                </h3>
                {item.notes && (
                  <p className="text-xs text-[#8C7A70] line-clamp-2 italic font-serif">
                    &ldquo;{item.notes}&rdquo;
                  </p>
                )}
              </div>

              {/* Progress & Target Details */}
              <div className="mt-3 pt-2.5 border-t border-[#F5EBE1]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#8C7A70]">Terkumpul</span>
                  <span className="font-bold text-[#4A3F35] font-mono tabular-nums">
                    Rp {item.currentSaved.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="w-full bg-pink-100/70 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-[11px] text-[#8C7A70]">
                  <span>Target: Rp {item.targetPrice.toLocaleString('id-ID')}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openAddSavings(item);
                    }}
                    className="font-bold text-pink-600 hover:text-pink-700 underline"
                  >
                    + Setor
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
