'use client';

import React from 'react';
import { useStore } from './StoreContext';
import { motion } from 'motion/react';

interface CategoryGridProps {
  onShopClick: () => void;
}

export default function CategoryGrid({ onShopClick }: CategoryGridProps) {
  const { setSelectedCategory } = useStore();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onShopClick();
  };

  return (
    <section className="bg-[#FDFCFB] py-16 border-b border-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 gap-4">
          <div className="space-y-1">
            <h2 className="text-4xl sm:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase italic">
              Kategorie Denim
            </h2>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Odkryj najnowsze trendy denimowe stworzone specjalnie dla Ciebie.
            </p>
          </div>
          <button
            onClick={() => handleCategorySelect('all')}
            className="bg-[#2B3E50] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all px-6 py-3 text-xs font-bold uppercase tracking-widest cursor-pointer"
          >
            Zobacz cały asortyment
          </button>
        </div>

        {/* Visual overlap category cards - inspired by Image 2 */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-10 py-10">
          
          {/* Card 1: JACKETS (Peach background, top left shifted) */}
          <motion.div
            whileHover={{ y: -5 }}
            onClick={() => handleCategorySelect('jackets')}
            className="w-full max-w-[280px] aspect-square bg-[#fff0e6] p-6 flex flex-col items-center justify-between relative cursor-pointer border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <span className="text-sm font-black tracking-widest text-stone-900 mt-2 uppercase">
              KURTKI / JACKETS
            </span>
            <div className="w-full h-[70%] relative flex items-center justify-center border border-black bg-white/85 p-1">
              <img
                src="https://www.byrdie.com/thmb/uQCpMZOtOtAVb30kufDxdwZOW8Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/373071888_18388981792028967_6736654194153210606_n1-425cd310567b4d36922a01f20672af5a.jpg"
                alt="Kurtki Jeansowe"
                className="max-h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Card 2: SHORTS (Light beige background, shifted downwards) */}
          <motion.div
            whileHover={{ y: -5 }}
            onClick={() => handleCategorySelect('shorts')}
            className="w-full max-w-[280px] aspect-square bg-[#f5f2f0] p-6 flex flex-col items-center justify-between relative cursor-pointer md:translate-y-8 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <span className="text-sm font-black tracking-widest text-stone-900 mt-2 uppercase">
              SZORTY / SHORTS
            </span>
            <div className="w-full h-[70%] relative flex items-center justify-center border border-black bg-white/85 p-1">
              <img
                src="https://images.napali.app/global/roxy-products/all/default/xlarge/urjds03022_roxy,w_bsbw_frt1.jpg"
                alt="Szorty Jeansowe"
                className="max-h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Card 3: JEANS (Soft blue background, top right shifted) */}
          <motion.div
            whileHover={{ y: -5 }}
            onClick={() => handleCategorySelect('jeans')}
            className="w-full max-w-[280px] aspect-square bg-[#e3f2fd] p-6 flex flex-col items-center justify-between relative cursor-pointer border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <span className="text-sm font-black tracking-widest text-stone-900 mt-2 uppercase">
              JEANSY / JEANS
            </span>
            <div className="w-full h-[70%] relative flex items-center justify-center border border-black bg-white/85 p-1">
              <img
                src="https://img2.ans-media.com/i/840x1260/SS26-SJM015-57X_F1.webp?v=1764762921"
                alt="Jeansy Klasyczne"
                className="max-h-full object-contain"
              />
            </div>
          </motion.div>

        </div>

        {/* Space spacing helper for md screen layout overlap */}
        <div className="hidden md:block h-10" />
      </div>
    </section>
  );
}
