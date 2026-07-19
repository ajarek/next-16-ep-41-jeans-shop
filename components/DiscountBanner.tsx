'use client';

import React from 'react';
import { useStore } from './StoreContext';
import Image from 'next/image';

interface DiscountBannerProps {
  onShopClick: () => void;
}

export default function DiscountBanner({ onShopClick }: DiscountBannerProps) {
  const { applyPromoCode } = useStore();

  const handleCopyCode = () => {
    applyPromoCode('TEES25');
    alert('Kod TEES25 został automatycznie aktywowany i dodany do Twojego koszyka! Zniżka 25% zostanie naliczona przy kasie.');
    onShopClick();
  };

  return (
    <section className="bg-[#FDFCFB] py-12 border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[400px] sm:h-[500px] w-full overflow-hidden bg-stone-100 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <Image
            src="https://images.stockcake.com/public/0/7/f/07fb565f-0a7d-46ec-aabb-b84940af6c3f_large/diverse-denim-styles-stockcake.jpg"
            alt="Denim Style Group Promo"
            className="w-full h-full object-cover"
            fill
          />

          {/* Neo-brutalist Container in Center */}
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/20">
            <div className="w-full max-w-lg bg-[#F8F7F3] border-2 border-black p-6 sm:p-10 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#2B3E50] block">
                S A L E   I S   O N !
              </span>
              
              <h2 className="text-5xl sm:text-6xl font-black text-[#1A1A1A] tracking-tighter leading-none uppercase italic">
                -25% NA WSZYSTKO
              </h2>
              
              <p className="text-xs sm:text-sm text-stone-800 font-bold uppercase tracking-wider max-w-sm leading-relaxed">
                Użyj kodu <span className="font-mono bg-[#E11D48]/10 text-[#E11D48] px-2.5 py-1 border border-[#E11D48]/20 text-xs sm:text-sm font-black">TEES25</span> przy podsumowaniu, aby otrzymać 25% zniżki na całe zamówienie
              </p>
              
              <button
                onClick={handleCopyCode}
                className="px-8 py-3.5 bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
              >
                Aktywuj kod i kupuj
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
