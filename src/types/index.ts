export type PriorityLevel = 'Must Have' | 'Really Want' | 'Someday' | 'Impulse Wishlist';

export type WishlistCategory =
  | 'Elektronik'
  | 'Gadget'
  | 'Fashion'
  | 'Kecantikan'
  | 'Hobi & Hiburan'
  | 'Rumah & Kamar'
  | 'Buku & Edukasi'
  | 'Lainnya';

export type ItemStatus = 'In Progress' | 'Purchased';

export interface PricePoint {
  date: string;
  price: number;
  note?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  category: WishlistCategory;
  targetPrice: number;
  currentSaved: number;
  priority: PriorityLevel;
  imageUrl: string;
  storeUrl?: string;
  notes?: string;
  targetDate: string; // YYYY-MM-DD
  status: ItemStatus;
  createdAt: string;
  priceHistory?: PricePoint[];
  originalPrice?: number;
}

export type TransactionType = 'income' | 'expense' | 'savings_deposit';

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  type: TransactionType;
  amount: number;
  category: string;
  note: string;
  wishlistId?: string;
  wishlistName?: string;
}

export interface SavingChallenge {
  id: string;
  name: string;
  type: '30_days' | 'daily_5k' | 'no_spending' | 'weekly';
  description: string;
  targetAmount: number;
  currentAmount: number;
  unitAmount: number;
  totalUnits: number;
  completedUnits: number[]; // e.g. [1, 2, 5] for days checked
  streakCount: number;
  isActive: boolean;
  startDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  badgeColor: string;
  requirement: string;
}

export type NotificationType =
  | 'daily_reminder'
  | 'goal_reminder'
  | 'goal_achieved'
  | 'wishlist_reminder'
  | 'price_drop'
  | 'saving_streak'
  | 'budget_reminder'
  | 'target_deadline'
  | 'transaction_alert'
  | 'weekly_report';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedWishlistId?: string;
}

export interface NotificationSettings {
  dailySavingReminder: boolean;
  reminderTime: string; // e.g. "19:00"
  wishlistReminder: boolean;
  savingGoalUpdates: boolean;
  priceDropAlert: boolean;
  savingStreak: boolean;
  weeklyReport: boolean;
  budgetReminder: boolean;
  transactionAlert: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  dailyAllowance: number; // Uang saku per hari
  monthlyBudget: number; // Anggaran bulanan
  currency: string;
}
