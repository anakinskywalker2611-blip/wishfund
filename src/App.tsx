import React from 'react';
import { WishfundProvider, useWishfund } from './context/WishfundContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { WishlistView } from './components/WishlistView';
import { HistoryView } from './components/HistoryView';
import { ProfileView } from './components/ProfileView';

// Modals
import { AddSavingsModal } from './components/AddSavingsModal';
import { AddWishlistModal } from './components/AddWishlistModal';
import { WishlistDetailModal } from './components/WishlistDetailModal';
import { WorthItCalculatorModal } from './components/WorthItCalculatorModal';
import { BuyOrWaitModal } from './components/BuyOrWaitModal';
import { SavingsForecastModal } from './components/SavingsForecastModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';

const MainContent: React.FC = () => {
  const { activeTab } = useWishfund();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20 md:pb-12 min-h-[calc(100vh-8rem)]">
      {activeTab === 'home' && <HomeView />}
      {activeTab === 'wishlist' && <WishlistView />}
      {activeTab === 'history' && <HistoryView />}
      {activeTab === 'profile' && <ProfileView />}
    </main>
  );
};

export default function App() {
  return (
    <WishfundProvider>
      <div className="min-h-screen bg-[#FFFDF9] text-[#4A3F35] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Clean 3-zone Header */}
        <Header />

        {/* Dynamic Main View */}
        <div className="flex-1">
          <MainContent />
        </div>

        {/* Quiet Editorial Footer */}
        <footer className="border-t border-[#FCE7EB] bg-white/70 py-6 text-center text-xs text-[#8C7A70] hidden md:block">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="font-bold text-[#4A3F35]">
              WISHFUND <span className="font-normal text-[#8C7A70]">· Konsep Aplikasi Wishlist dan Menabung</span>
            </span>
            <span className="text-[11px] text-[#8C7A70]">
              Dream it. Plan it. Save it. 🌸
            </span>
          </div>
        </footer>

        {/* Mobile 5-Menu Navigation Bar (Section 10) */}
        <BottomNav />

        {/* Global Modals & Feature Tools (Section 3, 4, 5) */}
        <AddSavingsModal />
        <AddWishlistModal />
        <WishlistDetailModal />
        <WorthItCalculatorModal />
        <BuyOrWaitModal />
        <SavingsForecastModal />
        <NotificationCenterModal />
      </div>
    </WishfundProvider>
  );
}
