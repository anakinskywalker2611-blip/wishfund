import React, { useState } from 'react';
import { useWishfund } from '../context/WishfundContext';
import {
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  PiggyBank,
  Calculator,
  Compass,
  LayoutGrid,
  Image as ImageIcon,
  Clock,
  TrendingDown,
} from 'lucide-react';
import { PriorityLevel, ItemStatus, WishlistItem } from '../types';
import { DreamBoard } from './DreamBoard';

export const WishlistView: React.FC = () => {
  const {
    wishlist,
    setIsAddWishlistModalOpen,
    openAddSavings,
    setSelectedWishlistDetail,
    setIsBuyOrWaitOpen,
    setIsWorthItOpen,
  } = useWishfund();

  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus>('In Progress');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'dreamboard'>('grid');

  // Filter items
  const filteredItems = wishlist.filter((item) => {
    const matchesPriority =
      selectedPriority === 'all' || item.priority === selectedPriority;
    const matchesStatus = item.status === selectedStatus;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesPriority && matchesStatus && matchesSearch;
  });

  const priorityTabs: { label: string; value: string; count?: number }[] = [
    { label: 'Semua Prioritas', value: 'all' },
    { label: 'Must Have', value: 'Must Have' },
    { label: 'Really Want', value: 'Really Want' },
    { label: 'Someday', value: 'Someday' },
    { label: 'Impulse Wishlist', value: 'Impulse Wishlist' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#4A3F35] tracking-tight">Daftar Wishlist</h1>
          <p className="text-xs text-[#8C7A70] mt-0.5">
            Kelola barang impian, atur skala prioritas, dan pantau progres tabunganmu.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-white border border-[#FCE7EB] rounded-2xl shadow-2xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-pink-500 text-white shadow-2xs'
                  : 'text-[#6B5B52] hover:text-pink-600'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('dreamboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'dreamboard'
                  ? 'bg-pink-500 text-white shadow-2xs'
                  : 'text-[#6B5B52] hover:text-pink-600'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Dream Board</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddWishlistModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-pink-500 hover:bg-pink-600 rounded-2xl shadow-xs transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Wishlist</span>
          </button>
        </div>
      </div>

      {/* Dream Board View Switch */}
      {viewMode === 'dreamboard' ? (
        <DreamBoard />
      ) : (
        <>
          {/* Controls: Search, Status, & Priority Ranking Filter Tabs */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari wishlist, kategori, atau catatan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-2xl bg-white border border-[#FCE7EB] focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 text-[#4A3F35] placeholder:text-[#8C7A70]/70"
                />
              </div>

              {/* Status Segmented Control */}
              <div className="flex items-center p-1 bg-white border border-[#FCE7EB] rounded-2xl shrink-0">
                <button
                  onClick={() => setSelectedStatus('In Progress')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedStatus === 'In Progress'
                      ? 'bg-pink-100 text-pink-700 font-bold'
                      : 'text-[#6B5B52] hover:text-pink-600'
                  }`}
                >
                  Sedang Berjalan ({wishlist.filter((w) => w.status === 'In Progress').length})
                </button>
                <button
                  onClick={() => setSelectedStatus('Purchased')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedStatus === 'Purchased'
                      ? 'bg-emerald-100 text-emerald-800 font-bold'
                      : 'text-[#6B5B52] hover:text-emerald-700'
                  }`}
                >
                  Sudah Terbeli ({wishlist.filter((w) => w.status === 'Purchased').length})
                </button>
              </div>
            </div>

            {/* Priority Ranking Filter Tabs (Section 3: Priority Ranking) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {priorityTabs.map((tab) => {
                const count =
                  tab.value === 'all'
                    ? wishlist.filter((w) => w.status === selectedStatus).length
                    : wishlist.filter(
                        (w) => w.priority === tab.value && w.status === selectedStatus
                      ).length;

                return (
                  <button
                    key={tab.value}
                    onClick={() => setSelectedPriority(tab.value)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                      selectedPriority === tab.value
                        ? 'bg-pink-500 text-white border-pink-500 shadow-2xs'
                        : 'bg-white text-[#6B5B52] border-[#FCE7EB] hover:border-pink-300'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="ml-1.5 text-[10px] opacity-80 font-mono tabular-nums">
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Items Grid */}
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[#FCE7EB] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-500 mx-auto flex items-center justify-center border border-pink-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#4A3F35]">Tidak ada wishlist ditemukan</h3>
              <p className="text-xs text-[#8C7A70] max-w-sm mx-auto">
                {searchQuery
                  ? `Tidak ada barang yang cocok dengan pencarian "${searchQuery}".`
                  : 'Belum ada barang di kategori ini. Tambahkan impian barumu sekarang!'}
              </p>
              <button
                onClick={() => setIsAddWishlistModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-pink-500 hover:bg-pink-600 rounded-xl transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Wishlist Pertama</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => {
                const percentage = Math.min(100, (item.currentSaved / item.targetPrice) * 100);
                const remaining = Math.max(0, item.targetPrice - item.currentSaved);

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedWishlistDetail(item)}
                    className="p-4 rounded-3xl bg-white border border-[#FCE7EB] hover:border-pink-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      {/* Photo Thumbnail */}
                      <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-pink-50 border border-pink-100 mb-3.5">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-pink-300 font-bold bg-pink-50 -z-10">
                          {item.name.slice(0, 3)}
                        </div>

                        {/* Priority Badge */}
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-bold text-pink-700 shadow-2xs border border-pink-100">
                          {item.priority}
                        </div>

                        {/* Status Check if Purchased */}
                        {item.status === 'Purchased' ? (
                          <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-2xs flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Terbeli</span>
                          </div>
                        ) : (
                          <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold shadow-2xs font-mono tabular-nums">
                            {percentage.toFixed(0)}%
                          </div>
                        )}
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#8C7A70] mb-1">
                        <span>{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 text-[#8C7A70]">
                          <Clock className="w-3 h-3" />
                          <span>{item.targetDate}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-[#4A3F35] group-hover:text-pink-600 transition-colors line-clamp-1">
                        {item.name}
                      </h3>

                      {/* Notes snippet */}
                      {item.notes && (
                        <p className="text-xs text-[#8C7A70] line-clamp-1 mt-1">
                          {item.notes}
                        </p>
                      )}

                      {/* Price Numbers */}
                      <div className="mt-3 space-y-1">
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="text-[#8C7A70]">Terkumpul:</span>
                          <span className="font-extrabold text-[#4A3F35] font-mono tabular-nums">
                            Rp {item.currentSaved.toLocaleString('id-ID')}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="text-[#8C7A70]">Target:</span>
                          <span className="text-[#6B5B52] font-semibold font-mono tabular-nums">
                            Rp {item.targetPrice.toLocaleString('id-ID')}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-pink-100/70 h-2.5 rounded-full overflow-hidden mt-1.5">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              item.status === 'Purchased'
                                ? 'bg-emerald-500'
                                : 'bg-gradient-to-r from-pink-400 to-rose-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        {item.status === 'In Progress' && (
                          <div className="text-[11px] text-right text-pink-600 font-medium font-mono tabular-nums">
                            Kurang Rp {remaining.toLocaleString('id-ID')}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Evaluation & Deposit Buttons */}
                    <div className="mt-4 pt-3 border-t border-[#F5EBE1] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsBuyOrWaitOpen(true);
                          }}
                          title="Buy or Wait? Evaluator"
                          className="p-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors cursor-pointer border border-purple-100"
                        >
                          <Compass className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsWorthItOpen(true);
                          }}
                          title="Worth It Calculator"
                          className="p-1.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer border border-amber-100"
                        >
                          <Calculator className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.status === 'In Progress' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openAddSavings(item);
                          }}
                          className="px-3.5 py-1.5 text-xs font-bold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                        >
                          + Setor Tabungan
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Milikmu</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};
