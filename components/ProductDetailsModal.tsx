'use client';

import React, { useState } from 'react';
import { useStore } from './StoreContext';
import { Product, SIZES } from '@/lib/store-data';
import { X, ShoppingBag, Heart, Shield, RotateCcw, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  const { addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState<Product['sizes'][0] | ''>('');
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Proszę wybrać rozmiar przed dodaniem do koszyka!');
      return;
    }
    addToCart(product, selectedSize, quantity);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl overflow-hidden bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 border-2 border-black bg-white hover:bg-black hover:text-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors rounded-none cursor-pointer"
          >
            <X size={16} />
          </button>

          {/* Left Column: Product Photo */}
          <div className="w-full md:w-1/2 relative bg-stone-50 h-[320px] md:h-auto aspect-square md:aspect-auto border-b-2 md:border-b-0 md:border-r-2 border-black">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#E11D48] text-white text-[10px] font-black uppercase px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] tracking-widest rounded-none">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right Column: Specifications & Add Action */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[50vh] md:max-h-[90vh] space-y-6 bg-[#FDFCFB]">
            
            {/* Title & Brand */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#2B3E50]">
                KOLEKCJA {product.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight uppercase italic tracking-tighter">
                {product.name}
              </h2>
              
              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-black text-stone-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-stone-400 line-through font-bold">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-[10px] bg-rose-100 text-[#E11D48] px-2.5 py-1 font-black border border-[#E11D48]/30 uppercase tracking-wide">
                  Zaoszczędź ${(product.originalPrice - product.price).toFixed(2)}!
                </span>
              </div>
            </div>

            <hr className="border-black border-t-2" />

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-stone-900">Opis produktu</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-semibold">
                {product.description}
              </p>
            </div>

            {/* Selector: Choose Size (Strict Requirement) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <h4 className="text-xs font-black uppercase tracking-widest text-stone-900">Wybierz Rozmiar *</h4>
                <button
                  type="button"
                  onClick={() => alert('Przewodnik po rozmiarach:\nXS: pas 64-68cm\nS: pas 68-72cm\nM: pas 72-76cm\nL: pas 76-80cm\nXL: pas 80-86cm\nXXL: pas 86-92cm')}
                  className="text-[10px] text-[#E11D48] font-black uppercase tracking-widest hover:underline cursor-pointer"
                >
                  Tabela rozmiarów
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => {
                  const isAvailable = product.sizes.includes(size as any);
                  return (
                    <button
                      key={size}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 border-2 text-xs font-mono font-black flex items-center justify-center transition-all rounded-none ${
                        !isAvailable
                          ? 'opacity-20 bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed line-through'
                          : selectedSize === size
                          ? 'bg-[#E11D48] text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] scale-102 cursor-pointer'
                          : 'bg-white text-stone-700 border-black hover:bg-[#F8F7F3] cursor-pointer'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-stone-900">Ilość</h4>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-black rounded-none overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-stone-900 hover:bg-[#F8F7F3] font-black transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-mono font-black text-stone-800 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-stone-900 hover:bg-[#F8F7F3] font-black transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Favorite toggle */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2.5 border-2 border-black transition-all rounded-none cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                    isLiked
                      ? 'bg-rose-50 text-[#E11D48]'
                      : 'bg-white text-stone-400 hover:text-red-500'
                  }`}
                  title="Dodaj do listy życzeń"
                >
                  <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Add to Cart Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all py-3.5 text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2.5 rounded-none"
              >
                <ShoppingBag size={16} />
                <span>Dodaj do koszyka</span>
              </button>

              {/* Added success toast feedback */}
              <AnimatePresence>
                {addedMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="p-3 bg-emerald-50 text-emerald-800 rounded-none text-xs font-bold text-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider"
                  >
                    Produkt pomyślnie dodany do koszyka! (Rozmiar: {selectedSize}, Ilość: {quantity})
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping guarantees section */}
            <div className="grid grid-cols-3 gap-2.5 pt-4 text-[10px] text-stone-500 font-bold uppercase tracking-wider border-t-2 border-black">
              <div className="flex flex-col items-center text-center space-y-1">
                <Truck size={14} className="text-[#2B3E50]" />
                <span className="font-black text-stone-800">Szybka dostawa</span>
                <span>Wysyłka w 24h</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-1">
                <RotateCcw size={14} className="text-[#2B3E50]" />
                <span className="font-black text-stone-800">Darmowy zwrot</span>
                <span>Do 30 dni</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-1">
                <Shield size={14} className="text-[#2B3E50]" />
                <span className="font-black text-stone-800">Bezpieczny zakup</span>
                <span>Szyfrowanie SSL</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
