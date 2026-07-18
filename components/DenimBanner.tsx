'use client';

import React from 'react';
import { useStore } from './StoreContext';

interface DenimBannerProps {
  onShopClick: () => void;
}

export default function DenimBanner({ onShopClick }: DenimBannerProps) {
  const { setSelectedCategory } = useStore();

  const handleAction = () => {
    setSelectedCategory('all');
    onShopClick();
  };

  return (
    <section className="bg-[#FDFCFB] py-8 border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="relative overflow-hidden bg-[#2B3E50] border-2 border-black py-12 px-6 sm:px-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px),
              linear-gradient(135deg, #1A2836 0%, #2B3E50 100%)
            `,
          }}
        >
          {/* Subtle watermark background text "HELLO DENIM" */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
            <span className="text-8xl sm:text-9xl font-black tracking-widest text-white whitespace-nowrap uppercase italic">
              HELLO DENIM
            </span>
          </div>

          <div className="relative z-10 space-y-2 max-w-2xl">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-tight uppercase italic">
              Witaj Denim, Żegnaj Dresie
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-bold uppercase tracking-wider">
              Nadchodzą lepsze dni, przywitaj je w bezkompromisowym stylu.
            </p>
          </div>

          <div className="relative z-10 shrink-0 mt-4 lg:mt-0">
            <button
              onClick={handleAction}
              className="px-6 py-3.5 bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              Zobacz Kolekcję
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
