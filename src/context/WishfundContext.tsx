import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  WishlistItem,
  Transaction,
  SavingChallenge,
  Achievement,
  AppNotification,
  NotificationSettings,
  UserProfile,
} from '../types';
import {
  initialWishlist,
  initialTransactions,
  initialChallenges,
  initialAchievements,
  initialNotifications,
  initialSettings,
  initialProfile,
} from '../data/initialData';

interface WishfundContextType {
  wishlist: WishlistItem[];
  transactions: Transaction[];
  challenges: SavingChallenge[];
  achievements: Achievement[];
  notifications: AppNotification[];
  notificationSettings: NotificationSettings;
  userProfile: UserProfile;
  activeTab: 'home' | 'wishlist' | 'add-savings' | 'history' | 'profile';
  setActiveTab: (tab: 'home' | 'wishlist' | 'add-savings' | 'history' | 'profile') => void;
  
  // Modals & Sheets
  isAddSavingsModalOpen: boolean;
  selectedWishlistForDeposit: WishlistItem | null;
  openAddSavings: (item?: WishlistItem) => void;
  closeAddSavings: () => void;
  
  isAddWishlistModalOpen: boolean;
  setIsAddWishlistModalOpen: (open: boolean) => void;
  
  isWorthItOpen: boolean;
  setIsWorthItOpen: (open: boolean) => void;
  
  isBuyOrWaitOpen: boolean;
  setIsBuyOrWaitOpen: (open: boolean) => void;
  
  isForecastOpen: boolean;
  setIsForecastOpen: (open: boolean) => void;
  
  isNotificationCenterOpen: boolean;
  setIsNotificationCenterOpen: (open: boolean) => void;
  
  selectedWishlistDetail: WishlistItem | null;
  setSelectedWishlistDetail: (item: WishlistItem | null) => void;

  // Actions
  addWishlistItem: (item: Omit<WishlistItem, 'id' | 'createdAt' | 'status' | 'currentSaved'>) => void;
  updateWishlistItem: (id: string, updates: Partial<WishlistItem>) => void;
  deleteWishlistItem: (id: string) => void;
  markAsPurchased: (id: string) => void;
  addSavingsDeposit: (amount: number, wishlistId?: string, note?: string, date?: string) => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  toggleChallengeUnit: (challengeId: string, unitIndex: number) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  simulatePriceDrop: (wishlistId: string, newPrice: number) => void;

  // Calculated stats
  totalSavedAll: number;
  totalTargetAll: number;
  totalIncomeAll: number;
  totalExpenseAll: number;
  walletBalance: number;
  savingStreak: number;
  unreadNotificationsCount: number;
}

const WishfundContext = createContext<WishfundContextType | undefined>(undefined);

export const WishfundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('wishfund_wishlist');
    return saved ? JSON.parse(saved) : initialWishlist;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('wishfund_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [challenges, setChallenges] = useState<SavingChallenge[]>(() => {
    const saved = localStorage.getItem('wishfund_challenges');
    return saved ? JSON.parse(saved) : initialChallenges;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('wishfund_achievements');
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('wishfund_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => {
    const saved = localStorage.getItem('wishfund_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('wishfund_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  // UI state
  const [activeTab, setActiveTab] = useState<'home' | 'wishlist' | 'add-savings' | 'history' | 'profile'>('home');
  const [isAddSavingsModalOpen, setIsAddSavingsModalOpen] = useState(false);
  const [selectedWishlistForDeposit, setSelectedWishlistForDeposit] = useState<WishlistItem | null>(null);
  const [isAddWishlistModalOpen, setIsAddWishlistModalOpen] = useState(false);
  const [isWorthItOpen, setIsWorthItOpen] = useState(false);
  const [isBuyOrWaitOpen, setIsBuyOrWaitOpen] = useState(false);
  const [isForecastOpen, setIsForecastOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [selectedWishlistDetail, setSelectedWishlistDetail] = useState<WishlistItem | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('wishfund_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('wishfund_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('wishfund_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('wishfund_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('wishfund_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('wishfund_settings', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  useEffect(() => {
    localStorage.setItem('wishfund_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Modals helper
  const openAddSavings = (item?: WishlistItem) => {
    if (item) {
      setSelectedWishlistForDeposit(item);
    } else {
      setSelectedWishlistForDeposit(null);
    }
    setIsAddSavingsModalOpen(true);
  };

  const closeAddSavings = () => {
    setIsAddSavingsModalOpen(false);
    setSelectedWishlistForDeposit(null);
  };

  // Check achievements helper
  const checkAchievements = (
    currentWishlist: WishlistItem[],
    currentTransactions: Transaction[]
  ) => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.unlocked) return ach;
        let shouldUnlock = false;

        if (ach.id === 'ach-first' && currentTransactions.some((t) => t.type === 'savings_deposit')) {
          shouldUnlock = true;
        } else if (
          ach.id === 'ach-halfway' &&
          currentWishlist.some((item) => (item.currentSaved / item.targetPrice) >= 0.5)
        ) {
          shouldUnlock = true;
        } else if (
          ach.id === 'ach-completed' &&
          currentWishlist.some((item) => item.status === 'Purchased')
        ) {
          shouldUnlock = true;
        } else if (ach.id === 'ach-dreamboard' && currentWishlist.length >= 4) {
          shouldUnlock = true;
        }

        if (shouldUnlock) {
          return {
            ...ach,
            unlocked: true,
            unlockedAt: new Date().toISOString().split('T')[0],
          };
        }
        return ach;
      })
    );
  };

  const addWishlistItem = (itemData: Omit<WishlistItem, 'id' | 'createdAt' | 'status' | 'currentSaved'>) => {
    const newItem: WishlistItem = {
      ...itemData,
      id: `wish-${Date.now()}`,
      currentSaved: 0,
      status: 'In Progress',
      createdAt: new Date().toISOString().split('T')[0],
      priceHistory: [{ date: new Date().toISOString().split('T')[0], price: itemData.targetPrice, note: 'Harga awal' }],
    };

    const updated = [newItem, ...wishlist];
    setWishlist(updated);
    checkAchievements(updated, transactions);

    // Smart notification
    if (notificationSettings.savingGoalUpdates) {
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        type: 'wishlist_reminder',
        title: `Wishlist Baru Ditambahkan! 🌸`,
        message: `${newItem.name} telah masuk ke dalam daftar impianmu (${newItem.priority}). Ayo mulai menabung!`,
        timestamp: 'Baru saja',
        isRead: false,
        relatedWishlistId: newItem.id,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  const updateWishlistItem = (id: string, updates: Partial<WishlistItem>) => {
    setWishlist((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...updates } : item));
      checkAchievements(updated, transactions);
      return updated;
    });
  };

  const deleteWishlistItem = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    if (selectedWishlistDetail?.id === id) {
      setSelectedWishlistDetail(null);
    }
  };

  const markAsPurchased = (id: string) => {
    const target = wishlist.find((i) => i.id === id);
    if (!target) return;

    setWishlist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Purchased' as const, currentSaved: item.targetPrice } : item
      )
    );

    // Create celebration notification
    const celebrationNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'goal_achieved',
      title: 'Wishlist Tercapai & Dibeli! 🎉✨',
      message: `Selamat! Kamu telah berhasil mewujudkan impian membeli ${target.name}. Kerja keras menabungmu membuahkan hasil!`,
      timestamp: 'Baru saja',
      isRead: false,
      relatedWishlistId: id,
    };
    setNotifications((prev) => [celebrationNotif, ...prev]);

    setAchievements((prev) =>
      prev.map((ach) =>
        ach.id === 'ach-completed'
          ? { ...ach, unlocked: true, unlockedAt: new Date().toISOString().split('T')[0] }
          : ach
      )
    );
  };

  const addSavingsDeposit = (
    amount: number,
    wishlistId?: string,
    note?: string,
    date?: string
  ) => {
    const txDate = date || new Date().toISOString().split('T')[0];
    let targetName = 'Celengan Umum';

    if (wishlistId) {
      const target = wishlist.find((w) => w.id === wishlistId);
      if (target) {
        targetName = target.name;
        const newSaved = Math.min(target.targetPrice, target.currentSaved + amount);
        const reachedTarget = newSaved >= target.targetPrice && target.currentSaved < target.targetPrice;

        setWishlist((prev) =>
          prev.map((item) =>
            item.id === wishlistId
              ? {
                  ...item,
                  currentSaved: newSaved,
                  status: reachedTarget ? 'In Progress' : item.status,
                }
              : item
          )
        );

        if (reachedTarget) {
          const reachNotif: AppNotification = {
            id: `notif-${Date.now()}-reach`,
            type: 'goal_achieved',
            title: `Target Tabungan 100% Tercapai! 🎊`,
            message: `Dana untuk ${target.name} (Rp ${target.targetPrice.toLocaleString('id-ID')}) sudah terkumpul penuh! Siap untuk dibeli.`,
            timestamp: 'Baru saja',
            isRead: false,
            relatedWishlistId: target.id,
          };
          setNotifications((prev) => [reachNotif, ...prev]);
        } else if (newSaved / target.targetPrice >= 0.5 && target.currentSaved / target.targetPrice < 0.5) {
          const halfNotif: AppNotification = {
            id: `notif-${Date.now()}-half`,
            type: 'goal_reminder',
            title: `Sudah 50% Tercapai! 🚀`,
            message: `Target ${target.name} sudah separuh jalan! Kamu sudah mengumpulkan Rp ${newSaved.toLocaleString('id-ID')}.`,
            timestamp: 'Baru saja',
            isRead: false,
            relatedWishlistId: target.id,
          };
          setNotifications((prev) => [halfNotif, ...prev]);
        }
      }
    }

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: txDate,
      type: 'savings_deposit',
      amount,
      category: 'Tabungan Wishlist',
      note: note || `Setoran untuk ${targetName}`,
      wishlistId,
      wishlistName: targetName,
    };

    const updatedTransactions = [newTx, ...transactions];
    setTransactions(updatedTransactions);
    checkAchievements(wishlist, updatedTransactions);

    // Transaction alert
    if (notificationSettings.transactionAlert) {
      const alertNotif: AppNotification = {
        id: `notif-${Date.now()}-alert`,
        type: 'transaction_alert',
        title: 'Setoran Berhasil Dicatat 💰',
        message: `Setoran sebesar Rp ${amount.toLocaleString('id-ID')} untuk ${targetName} telah berhasil disimpan.`,
        timestamp: 'Baru saja',
        isRead: false,
      };
      setNotifications((prev) => [alertNotif, ...prev]);
    }
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
    };
    const updated = [newTx, ...transactions];
    setTransactions(updated);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleChallengeUnit = (challengeId: string, unitIndex: number) => {
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.id !== challengeId) return ch;
        const exists = ch.completedUnits.includes(unitIndex);
        const newCompleted = exists
          ? ch.completedUnits.filter((u) => u !== unitIndex)
          : [...ch.completedUnits, unitIndex].sort((a, b) => a - b);
        
        const newCurrent = ch.unitAmount > 0 
          ? (ch.type === '30_days'
              ? newCompleted.reduce((acc, curr) => acc + curr * ch.unitAmount, 0)
              : newCompleted.length * ch.unitAmount)
          : 0;

        return {
          ...ch,
          completedUnits: newCompleted,
          currentAmount: newCurrent,
          streakCount: newCompleted.length,
        };
      })
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const updateNotificationSettings = (settings: Partial<NotificationSettings>) => {
    setNotificationSettings((prev) => ({ ...prev, ...settings }));
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
  };

  const simulatePriceDrop = (wishlistId: string, newPrice: number) => {
    setWishlist((prev) =>
      prev.map((item) => {
        if (item.id === wishlistId) {
          const oldPrice = item.targetPrice;
          const dropAmount = oldPrice - newPrice;
          if (dropAmount > 0) {
            const dropNotif: AppNotification = {
              id: `notif-${Date.now()}-drop`,
              type: 'price_drop',
              title: `Harga Turun! ${item.name} 🏷️`,
              message: `Harga barang turun Rp ${dropAmount.toLocaleString('id-ID')} menjadi Rp ${newPrice.toLocaleString('id-ID')}! Targetmu kini lebih cepat tercapai.`,
              timestamp: 'Baru saja',
              isRead: false,
              relatedWishlistId: item.id,
            };
            setNotifications((n) => [dropNotif, ...n]);
          }
          const history = item.priceHistory || [];
          return {
            ...item,
            originalPrice: item.originalPrice || oldPrice,
            targetPrice: newPrice,
            priceHistory: [
              ...history,
              {
                date: new Date().toISOString().split('T')[0],
                price: newPrice,
                note: `Penurunan harga (-Rp ${dropAmount.toLocaleString('id-ID')})`,
              },
            ],
          };
        }
        return item;
      })
    );
  };

  // Calculations
  const totalSavedAll = wishlist.reduce((acc, curr) => acc + curr.currentSaved, 0);
  const totalTargetAll = wishlist
    .filter((w) => w.status === 'In Progress')
    .reduce((acc, curr) => acc + curr.targetPrice, 0);

  const totalIncomeAll = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenseAll = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalSavingsDepositAll = transactions
    .filter((t) => t.type === 'savings_deposit')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const walletBalance = totalIncomeAll - totalExpenseAll - totalSavingsDepositAll;

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  // Streak calculation
  const uniqueDepositDates = Array.from(
    new Set(transactions.filter((t) => t.type === 'savings_deposit').map((t) => t.date))
  ).sort().reverse();

  const savingStreak = uniqueDepositDates.length;

  return (
    <WishfundContext.Provider
      value={{
        wishlist,
        transactions,
        challenges,
        achievements,
        notifications,
        notificationSettings,
        userProfile,
        activeTab,
        setActiveTab,
        isAddSavingsModalOpen,
        selectedWishlistForDeposit,
        openAddSavings,
        closeAddSavings,
        isAddWishlistModalOpen,
        setIsAddWishlistModalOpen,
        isWorthItOpen,
        setIsWorthItOpen,
        isBuyOrWaitOpen,
        setIsBuyOrWaitOpen,
        isForecastOpen,
        setIsForecastOpen,
        isNotificationCenterOpen,
        setIsNotificationCenterOpen,
        selectedWishlistDetail,
        setSelectedWishlistDetail,
        addWishlistItem,
        updateWishlistItem,
        deleteWishlistItem,
        markAsPurchased,
        addSavingsDeposit,
        addTransaction,
        deleteTransaction,
        toggleChallengeUnit,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        updateNotificationSettings,
        updateUserProfile,
        simulatePriceDrop,
        totalSavedAll,
        totalTargetAll,
        totalIncomeAll,
        totalExpenseAll,
        walletBalance,
        savingStreak,
        unreadNotificationsCount,
      }}
    >
      {children}
    </WishfundContext.Provider>
  );
};

export const useWishfund = () => {
  const context = useContext(WishfundContext);
  if (!context) {
    throw new Error('useWishfund must be used within a WishfundProvider');
  }
  return context;
};
