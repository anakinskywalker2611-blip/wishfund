import React, { useState } from 'react';
import { useWishfund } from '../context/WishfundContext';
import {
  Bell,
  X,
  CheckCheck,
  Sparkles,
  TrendingDown,
  Target,
  Flame,
  Receipt,
  FileText,
  Clock,
} from 'lucide-react';
import { NotificationType } from '../types';

export const NotificationCenterModal: React.FC = () => {
  const {
    isNotificationCenterOpen,
    setIsNotificationCenterOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setSelectedWishlistDetail,
    wishlist,
    setActiveTab,
  } = useWishfund();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');

  if (!isNotificationCenterOpen) return null;

  const filtered = notifications.filter((n) => {
    if (activeFilter === 'unread') return !n.isRead;
    return true;
  });

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case 'price_drop':
        return <TrendingDown className="w-4 h-4 text-emerald-600" />;
      case 'goal_reminder':
      case 'goal_achieved':
        return <Target className="w-4 h-4 text-pink-600" />;
      case 'saving_streak':
        return <Flame className="w-4 h-4 text-orange-600" />;
      case 'transaction_alert':
        return <Receipt className="w-4 h-4 text-blue-600" />;
      case 'weekly_report':
        return <FileText className="w-4 h-4 text-purple-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-pink-500" />;
    }
  };

  const handleNotificationClick = (item: (typeof notifications)[0]) => {
    markNotificationAsRead(item.id);
    if (item.relatedWishlistId) {
      const targetWish = wishlist.find((w) => w.id === item.relatedWishlistId);
      if (targetWish) {
        setIsNotificationCenterOpen(false);
        setSelectedWishlistDetail(targetWish);
        setActiveTab('wishlist');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl border border-[#FCE7EB] p-6 sm:p-7 space-y-5 max-h-[85vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setIsNotificationCenterOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8C7A70] hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between pr-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-200">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#4A3F35]">Pusat Notifikasi</h2>
              <p className="text-xs text-[#8C7A70]">
                Pengingat tabungan, update target, dan apresiasi konsistensi
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls & Mark All Read */}
        <div className="flex items-center justify-between pt-1 border-t border-[#F5EBE1]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                activeFilter === 'all'
                  ? 'bg-pink-100 text-pink-700 font-bold'
                  : 'text-[#6B5B52] hover:text-pink-600'
              }`}
            >
              Semua ({notifications.length})
            </button>
            <button
              onClick={() => setActiveFilter('unread')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                activeFilter === 'unread'
                  ? 'bg-pink-100 text-pink-700 font-bold'
                  : 'text-[#6B5B52] hover:text-pink-600'
              }`}
            >
              Belum Dibaca ({notifications.filter((n) => !n.isRead).length})
            </button>
          </div>

          <button
            onClick={markAllNotificationsAsRead}
            className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Tandai Semua Dibaca</span>
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#8C7A70]">
              Tidak ada notifikasi saat ini.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  item.isRead
                    ? 'bg-[#FFFDF9] border-[#FCE7EB] opacity-80 hover:opacity-100'
                    : 'bg-pink-50/60 border-pink-200/90 shadow-2xs'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-white border border-[#FCE7EB] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  {getIconForType(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-[#4A3F35] truncate">{item.title}</h4>
                    <span className="text-[10px] text-[#8C7A70] font-mono whitespace-nowrap">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B5B52] mt-0.5 leading-relaxed">{item.message}</p>
                  {item.relatedWishlistId && (
                    <span className="text-[10px] text-pink-600 font-semibold mt-1 inline-block">
                      Lihat Detail Target →
                    </span>
                  )}
                </div>

                {!item.isRead && (
                  <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0 mt-2" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
