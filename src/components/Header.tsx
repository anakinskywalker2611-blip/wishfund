import React from 'react';
import { useWishfund } from '../context/WishfundContext';
import { Sparkles, Bell, PlusCircle, PiggyBank } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsAddWishlistModalOpen,
    openAddSavings,
    unreadNotificationsCount,
    setIsNotificationCenterOpen,
  } = useWishfund();

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#FCE7EB] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 transition-transform group-hover:scale-105 border border-pink-200 shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-[#4A3F35] font-['Plus_Jakarta_Sans'] whitespace-nowrap shrink-0 group-hover:text-pink-600 transition-colors">
              WISHFUND
            </span>
          </div>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#6B5B52]">
          <button
            onClick={() => setActiveTab('home')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'home'
                ? 'text-pink-600 border-pink-500 font-bold'
                : 'border-transparent hover:text-pink-600'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'wishlist'
                ? 'text-pink-600 border-pink-500 font-bold'
                : 'border-transparent hover:text-pink-600'
            }`}
          >
            Wishlist
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'history'
                ? 'text-pink-600 border-pink-500 font-bold'
                : 'border-transparent hover:text-pink-600'
            }`}
          >
            Riwayat & Kalender
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'profile'
                ? 'text-pink-600 border-pink-500 font-bold'
                : 'border-transparent hover:text-pink-600'
            }`}
          >
            Tantangan & Profil
          </button>
        </nav>

        {/* Zone 3: 1 primary action zone with notifications and quick deposit */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsNotificationCenterOpen(true)}
            aria-label="Pemberitahuan"
            className="relative p-2 rounded-xl text-[#6B5B52] hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer border border-[#FCE7EB]"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => openAddSavings()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-pink-700 bg-pink-50 border border-pink-200 rounded-xl hover:bg-pink-100 transition-all cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
          >
            <PiggyBank className="w-3.5 h-3.5" />
            <span>Setor Tabungan</span>
          </button>

          <button
            onClick={() => setIsAddWishlistModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-pink-500 hover:bg-pink-600 active:scale-98 transition-all rounded-xl shadow-xs cursor-pointer whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Wishlist</span>
          </button>
        </div>
      </div>
    </header>
  );
};
