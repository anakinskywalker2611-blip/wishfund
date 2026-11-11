import React from 'react';
import { useWishfund } from '../context/WishfundContext';
import { Home, Heart, Plus, History, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, openAddSavings } = useWishfund();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#FCE7EB] px-3 py-2 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-pink-600 font-bold' : 'text-[#8C7A70] hover:text-pink-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight whitespace-nowrap">Home</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'wishlist' ? 'text-pink-600 font-bold' : 'text-[#8C7A70] hover:text-pink-500'
          }`}
        >
          <Heart className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight whitespace-nowrap">Wishlist</span>
        </button>

        {/* Center Add Savings Action */}
        <button
          onClick={() => openAddSavings()}
          className="flex flex-col items-center justify-center -mt-5 cursor-pointer group"
          aria-label="Setor Tabungan"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center shadow-md shadow-pink-200 group-hover:scale-105 active:scale-95 transition-transform border-2 border-white">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-semibold text-pink-600 mt-0.5 whitespace-nowrap">Setor</span>
        </button>

        {/* History & Calendar */}
        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'history' ? 'text-pink-600 font-bold' : 'text-[#8C7A70] hover:text-pink-500'
          }`}
        >
          <History className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight whitespace-nowrap">Riwayat</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'profile' ? 'text-pink-600 font-bold' : 'text-[#8C7A70] hover:text-pink-500'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight whitespace-nowrap">Profil</span>
        </button>
      </div>
    </nav>
  );
};
