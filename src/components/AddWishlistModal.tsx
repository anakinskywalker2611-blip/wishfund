import React, { useState } from 'react';
import { useWishfund } from '../context/WishfundContext';
import { X, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';
import { PriorityLevel, WishlistCategory } from '../types';

export const AddWishlistModal: React.FC = () => {
  const { isAddWishlistModalOpen, setIsAddWishlistModalOpen, addWishlistItem } = useWishfund();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<WishlistCategory>('Gadget');
  const [price, setPrice] = useState<number>(1500000);
  const [priority, setPriority] = useState<PriorityLevel>('Really Want');
  const [targetDate, setTargetDate] = useState('2027-01-31');
  const [notes, setNotes] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
  );

  if (!isAddWishlistModalOpen) return null;

  // Aesthetic pastel preset photo options
  const presetPhotos = [
    {
      label: 'Kamera Retro',
      url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Headphones',
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Tas Pastel',
      url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Keyboard',
      url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Skincare',
      url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Sepatu',
      url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || price <= 0) return;

    addWishlistItem({
      name: name.trim(),
      category,
      targetPrice: price,
      priority,
      targetDate,
      notes: notes.trim(),
      imageUrl: imageUrl.trim() || presetPhotos[0].url,
      storeUrl: storeUrl.trim() || undefined,
    });

    setIsAddWishlistModalOpen(false);
    setName('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl border border-[#FCE7EB] p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsAddWishlistModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8C7A70] hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center border border-pink-200">
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#4A3F35]">Tambah Wishlist Baru</h2>
            <p className="text-xs text-[#8C7A70]">
              Simpan barang impian dan buat target tabungan khususnya
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#4A3F35]">Nama Barang</label>
            <input
              type="text"
              required
              placeholder="e.g. Sony ZV-1F Vlogging Camera"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs font-medium text-[#4A3F35] focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          {/* Category & Target Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#4A3F35]">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as WishlistCategory)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs font-medium text-[#4A3F35]"
              >
                <option value="Elektronik">Elektronik</option>
                <option value="Gadget">Gadget</option>
                <option value="Fashion">Fashion</option>
                <option value="Kecantikan">Kecantikan</option>
                <option value="Hobi & Hiburan">Hobi & Hiburan</option>
                <option value="Rumah & Kamar">Rumah & Kamar</option>
                <option value="Buku & Edukasi">Buku & Edukasi</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#4A3F35]">Target Harga (Rp)</label>
              <input
                type="number"
                required
                value={price || ''}
                onChange={(e) => setPrice(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs font-bold font-mono text-[#4A3F35]"
              />
            </div>
          </div>

          {/* Priority Ranking (Section 3: Must Have, Really Want, Someday, Impulse) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#4A3F35]">Tingkat Prioritas</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Must Have', 'Really Want', 'Someday', 'Impulse Wishlist'] as PriorityLevel[]).map(
                (p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      priority === p
                        ? 'bg-pink-500 text-white border-pink-500 shadow-2xs'
                        : 'bg-[#FFFDF9] text-[#6B5B52] border-[#FCE7EB] hover:bg-pink-50'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Target Date & Store URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#4A3F35]">Target Tanggal Beli</label>
              <input
                type="date"
                required
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs text-[#4A3F35]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#4A3F35]">Tautan Toko (Opsional)</label>
              <input
                type="url"
                placeholder="https://tokopedia.com/..."
                value={storeUrl}
                onChange={(e) => setStoreUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs text-[#4A3F35]"
              />
            </div>
          </div>

          {/* Photo Preset Picker / Image URL */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#4A3F35]">Foto Barang (Pilih Template Estetis atau Masukkan URL)</label>
            <div className="grid grid-cols-6 gap-2">
              {presetPhotos.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative group ${
                    imageUrl === preset.url ? 'border-pink-500 ring-2 ring-pink-200' : 'border-gray-200 hover:border-pink-300'
                  }`}
                  title={preset.label}
                >
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <input
              type="url"
              placeholder="Atau tempel URL gambar custom di sini..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs text-[#4A3F35]"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#4A3F35]">Catatan Impian</label>
            <textarea
              rows={2}
              placeholder="Alasan menginginkan barang ini, varian warna incaran, pertimbangan khusus..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#FCE7EB] text-xs text-[#4A3F35]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Simpan ke My Wishlist</span>
          </button>
        </form>
      </div>
    </div>
  );
};
