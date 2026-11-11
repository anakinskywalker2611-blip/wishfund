import React, { useState } from 'react';
import { useWishfund } from '../context/WishfundContext';
import {
  Calendar as CalendarIcon,
  PiggyBank,
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  Trash2,
  Filter,
  ChevronLeft,
  ChevronRight,
  Flame,
  Wallet,
  Sparkles,
} from 'lucide-react';
import { TransactionType, Transaction } from '../types';

export const HistoryView: React.FC = () => {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    openAddSavings,
    totalIncomeAll,
    totalExpenseAll,
    totalSavedAll,
    walletBalance,
  } = useWishfund();

  const [activeFilter, setActiveFilter] = useState<'all' | TransactionType>('all');
  const [isAddTxModalOpen, setIsAddTxModalOpen] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);

  // Calendar State
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  // Filtered transactions
  const filteredTransactions = transactions.filter((t) => {
    const matchesType = activeFilter === 'all' || t.type === activeFilter;
    const matchesDate = !selectedDateFilter || t.date === selectedDateFilter;
    return matchesType && matchesDate;
  });

  // Calendar calculations
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  // Map of date string YYYY-MM-DD -> total deposit and count
  const depositMap = transactions
    .filter((t) => t.type === 'savings_deposit')
    .reduce((acc, curr) => {
      acc[curr.date] = (acc[curr.date] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

  const handlePrevMonth = () => {
    setCurrentCalendarDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentCalendarDate(new Date(year, month + 1, 1));
  };

  // Add Income/Expense form state
  const [newTxType, setNewTxType] = useState<'income' | 'expense'>('expense');
  const [newTxAmount, setNewTxAmount] = useState<number>(30000);
  const [newTxCategory, setNewTxCategory] = useState<string>('Makanan & Minuman');
  const [newTxNote, setNewTxNote] = useState<string>('');
  const [newTxDate, setNewTxDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleCreateTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTxAmount <= 0) return;

    addTransaction({
      date: newTxDate,
      type: newTxType,
      amount: newTxAmount,
      category: newTxCategory,
      note: newTxNote || (newTxType === 'income' ? 'Pemasukan' : 'Pengeluaran harian'),
    });

    setIsAddTxModalOpen(false);
    setNewTxNote('');
  };

  const totalDepositsThisMonth = Object.keys(depositMap).filter((d) =>
    d.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)
  ).length;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#4A3F35] tracking-tight">
            Money Tracker & Saving Calendar
          </h1>
          <p className="text-xs text-[#8C7A70] mt-0.5">
            Pantau arus kas uang saku, pengeluaran harian, dan konsistensi kalender menabungmu.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddTxModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#4A3F35] bg-white border border-[#FCE7EB] hover:bg-pink-50 rounded-2xl transition-all cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-pink-500" />
            <span>+ Catat Kas / Jajan</span>
          </button>
          <button
            onClick={() => openAddSavings()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-pink-500 hover:bg-pink-600 rounded-2xl shadow-xs transition-all cursor-pointer"
          >
            <PiggyBank className="w-4 h-4" />
            <span>+ Setor Tabungan</span>
          </button>
        </div>
      </div>

      {/* Money Tracker Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Saldo Dompet */}
        <div className="p-4 rounded-2xl bg-white border border-[#FCE7EB] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#8C7A70] mb-1">
            <span>Sisa Saldo Kas</span>
            <Wallet className="w-3.5 h-3.5 text-pink-500" />
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#4A3F35] font-mono tabular-nums">
            Rp {walletBalance.toLocaleString('id-ID')}
          </div>
          <span className="text-[11px] text-[#8C7A70] mt-1 block">Tersedia di dompet</span>
        </div>

        {/* Pemasukan */}
        <div className="p-4 rounded-2xl bg-white border border-[#FCE7EB] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#8C7A70] mb-1">
            <span>Total Pemasukan</span>
            <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-emerald-600 font-mono tabular-nums">
            +Rp {totalIncomeAll.toLocaleString('id-ID')}
          </div>
          <span className="text-[11px] text-[#8C7A70] mt-1 block">Uang saku & komisi</span>
        </div>

        {/* Pengeluaran */}
        <div className="p-4 rounded-2xl bg-white border border-[#FCE7EB] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#8C7A70] mb-1">
            <span>Total Pengeluaran</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-rose-600 font-mono tabular-nums">
            -Rp {totalExpenseAll.toLocaleString('id-ID')}
          </div>
          <span className="text-[11px] text-[#8C7A70] mt-1 block">Jajan & transportasi</span>
        </div>

        {/* Total Tabungan */}
        <div className="p-4 rounded-2xl bg-white border border-[#FCE7EB] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#8C7A70] mb-1">
            <span>Disimpan ke Target</span>
            <PiggyBank className="w-3.5 h-3.5 text-pink-500" />
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-pink-600 font-mono tabular-nums">
            Rp {totalSavedAll.toLocaleString('id-ID')}
          </div>
          <span className="text-[11px] text-[#8C7A70] mt-1 block">Wishlist impian</span>
        </div>
      </div>

      {/* Saving Calendar (Section 3) */}
      <section className="p-6 rounded-3xl bg-white border border-[#FCE7EB] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-100">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#4A3F35]">Saving Calendar</h2>
              <p className="text-xs text-[#8C7A70]">
                {totalDepositsThisMonth} hari menabung tercatat di bulan {monthNames[month]} {year}
              </p>
            </div>
          </div>

          {/* Month Switcher */}
          <div className="flex items-center gap-2">
            {selectedDateFilter && (
              <button
                onClick={() => setSelectedDateFilter(null)}
                className="text-xs text-pink-600 font-bold hover:underline px-2 cursor-pointer"
              >
                Reset Filter Tanggal
              </button>
            )}
            <div className="flex items-center gap-1 p-1 bg-[#FFFDF9] border border-[#FCE7EB] rounded-2xl">
              <button
                onClick={handlePrevMonth}
                aria-label="Bulan sebelumnya"
                className="p-1.5 rounded-xl hover:bg-pink-100 text-[#6B5B52] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-[#4A3F35] px-2 whitespace-nowrap">
                {monthNames[month]} {year}
              </span>
              <button
                onClick={handleNextMonth}
                aria-label="Bulan berikutnya"
                className="p-1.5 rounded-xl hover:bg-pink-100 text-[#6B5B52] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[320px]">
            {/* Weekday labels */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#8C7A70] mb-2">
              <span>Min</span>
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
            </div>

            {/* Day Cells */}
            <div className="grid grid-cols-7 gap-1.5">
              {/* Padding empty days */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-14 sm:h-16 rounded-xl bg-gray-50/50" />
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(
                  dayNum
                ).padStart(2, '0')}`;
                const hasDeposit = depositMap[dateKey] !== undefined;
                const depositTotal = depositMap[dateKey] || 0;
                const isSelected = selectedDateFilter === dateKey;

                return (
                  <button
                    key={dateKey}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedDateFilter(null);
                      } else {
                        setSelectedDateFilter(dateKey);
                      }
                    }}
                    className={`h-14 sm:h-16 p-1.5 rounded-2xl flex flex-col justify-between text-left transition-all border cursor-pointer relative group ${
                      isSelected
                        ? 'ring-2 ring-pink-500 bg-pink-100/70 border-pink-400'
                        : hasDeposit
                        ? 'bg-gradient-to-br from-pink-50 to-rose-50/70 border-pink-200 hover:border-pink-300 shadow-2xs'
                        : 'bg-[#FFFDF9] border-[#FCE7EB] hover:bg-pink-50/30'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-xs font-bold font-mono tabular-nums ${
                          hasDeposit ? 'text-pink-700' : 'text-[#8C7A70]'
                        }`}
                      >
                        {dayNum}
                      </span>
                      {hasDeposit && (
                        <span className="w-2 h-2 rounded-full bg-pink-500" />
                      )}
                    </div>

                    {hasDeposit ? (
                      <div className="text-[10px] font-extrabold text-pink-600 font-mono tabular-nums truncate">
                        +{depositTotal >= 1000 ? `${Math.round(depositTotal / 1000)}k` : depositTotal}
                      </div>
                    ) : (
                      <div className="text-[10px] text-transparent group-hover:text-pink-300">
                        +
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Calendar Legend */}
        <div className="flex items-center justify-between pt-2 border-t border-[#F5EBE1] text-xs text-[#8C7A70]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
              <span>Hari Ada Setoran Tabungan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
              <span>Tanpa Setoran</span>
            </div>
          </div>
          <span className="hidden sm:inline">Klik tanggal untuk memfilter riwayat transaksi</span>
        </div>
      </section>

      {/* Transactions List */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#4A3F35]">Riwayat Transaksi</h2>
            <p className="text-xs text-[#8C7A70]">
              {selectedDateFilter ? `Menampilkan transaksi pada ${selectedDateFilter}` : 'Seluruh catatan transaksi'}
            </p>
          </div>

          {/* Filter Segmented Buttons */}
          <div className="flex items-center p-1 bg-white border border-[#FCE7EB] rounded-2xl overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeFilter === 'all'
                  ? 'bg-pink-500 text-white shadow-2xs'
                  : 'text-[#6B5B52] hover:text-pink-600'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveFilter('savings_deposit')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeFilter === 'savings_deposit'
                  ? 'bg-pink-500 text-white shadow-2xs'
                  : 'text-[#6B5B52] hover:text-pink-600'
              }`}
            >
              Setoran Tabungan
            </button>
            <button
              onClick={() => setActiveFilter('income')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeFilter === 'income'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-[#6B5B52] hover:text-emerald-600'
              }`}
            >
              Pemasukan
            </button>
            <button
              onClick={() => setActiveFilter('expense')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeFilter === 'expense'
                  ? 'bg-rose-500 text-white shadow-2xs'
                  : 'text-[#6B5B52] hover:text-rose-600'
              }`}
            >
              Pengeluaran
            </button>
          </div>
        </div>

        {/* List Cards */}
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-white border border-[#FCE7EB] text-xs text-[#8C7A70]">
            Tidak ada transaksi pada kategori ini.
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredTransactions.map((tx) => {
              const isDeposit = tx.type === 'savings_deposit';
              const isIncome = tx.type === 'income';
              const isExpense = tx.type === 'expense';

              return (
                <div
                  key={tx.id}
                  className="p-4 rounded-2xl bg-white border border-[#FCE7EB] flex items-center justify-between gap-4 hover:border-pink-200 transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                        isDeposit
                          ? 'bg-pink-50 text-pink-600 border-pink-200'
                          : isIncome
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          : 'bg-rose-50 text-rose-600 border-rose-200'
                      }`}
                    >
                      {isDeposit ? (
                        <PiggyBank className="w-5 h-5" />
                      ) : isIncome ? (
                        <ArrowDownLeft className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-[#8C7A70]">
                        <span>{tx.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{tx.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#4A3F35] truncate">{tx.note}</h4>
                      {tx.wishlistName && (
                        <span className="text-[11px] text-pink-600 font-semibold truncate block">
                          Untuk: {tx.wishlistName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div
                      className={`text-sm sm:text-base font-extrabold font-mono tabular-nums ${
                        isDeposit
                          ? 'text-pink-600'
                          : isIncome
                          ? 'text-emerald-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {isIncome ? '+' : isExpense ? '-' : ''}Rp {tx.amount.toLocaleString('id-ID')}
                    </div>
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="p-1.5 rounded-lg text-[#8C7A70] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Hapus transaksi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Add Custom Income / Expense Transaction Modal */}
      {isAddTxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#FCE7EB] p-6 space-y-4">
            <h3 className="text-base font-bold text-[#4A3F35]">Catat Arus Kas Dompet</h3>

            <form onSubmit={handleCreateTx} className="space-y-4">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-100">
                <button
                  type="button"
                  onClick={() => setNewTxType('expense')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    newTxType === 'expense'
                      ? 'bg-rose-500 text-white shadow-2xs'
                      : 'text-[#6B5B52]'
                  }`}
                >
                  Pengeluaran (Jajan)
                </button>
                <button
                  type="button"
                  onClick={() => setNewTxType('income')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    newTxType === 'income'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-[#6B5B52]'
                  }`}
                >
                  Pemasukan
                </button>
              </div>

              {/* Amount */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#4A3F35]">Nominal (Rp)</label>
                <input
                  type="number"
                  value={newTxAmount || ''}
                  onChange={(e) => setNewTxAmount(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border border-[#FCE7EB] text-sm font-bold font-mono tabular-nums focus:outline-none focus:border-pink-400"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#4A3F35]">Kategori</label>
                <select
                  value={newTxCategory}
                  onChange={(e) => setNewTxCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs font-medium text-[#4A3F35]"
                >
                  {newTxType === 'expense' ? (
                    <>
                      <option value="Makanan & Minuman">Makanan & Minuman</option>
                      <option value="Transportasi">Transportasi</option>
                      <option value="Kebutuhan Belajar">Kebutuhan Belajar</option>
                      <option value="Skincare & Hiburan">Skincare & Hiburan</option>
                      <option value="Lainnya">Lainnya</option>
                    </>
                  ) : (
                    <>
                      <option value="Uang Saku">Uang Saku</option>
                      <option value="Pendapatan Tambahan">Pendapatan Tambahan / Freelance</option>
                      <option value="Hadiah / Angpao">Hadiah / Angpao</option>
                      <option value="Cashback">Cashback & Diskon</option>
                      <option value="Lainnya">Lainnya</option>
                    </>
                  )}
                </select>
              </div>

              {/* Note */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#4A3F35]">Keterangan / Catatan</label>
                <input
                  type="text"
                  value={newTxNote}
                  onChange={(e) => setNewTxNote(e.target.value)}
                  placeholder="e.g. Kopi susu sore, print tugas"
                  className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs text-[#4A3F35]"
                />
              </div>

              {/* Date */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#4A3F35]">Tanggal</label>
                <input
                  type="date"
                  value={newTxDate}
                  onChange={(e) => setNewTxDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs text-[#4A3F35]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTxModalOpen(false)}
                  className="flex-1 py-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-[#6B5B52] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-xs font-bold text-white shadow-2xs cursor-pointer"
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
