'use client';

import React from 'react';
import { useStore } from './StoreContext';
import { motion } from 'motion/react';
import Image from 'next/image';

interface GenderBannersProps {
  onShopClick: () => void;
  setSelectedGender: (gender: 'all' | 'Woman' | 'Man') => void;
}

export default function GenderBanners({ onShopClick, setSelectedGender }: GenderBannersProps) {
  const handleGenderSelect = (gender: 'Woman' | 'Man') => {
    setSelectedGender(gender);
    onShopClick();
  };

  return (
    <section className="bg-[#FDFCFB] py-12 border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Woman's Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
            onClick={() => handleGenderSelect('Woman')}
            className="group relative h-[350px] sm:h-[450px] w-full overflow-hidden bg-stone-100 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <Image
              src="https://img.magnific.com/free-photo/hair-fashionable-gray-sunglasses-brunette_1157-3225.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Kolekcja Damska Jeans"
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Ambient Dark Overlay at bottom for readable text */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Big bold typography as seen in Image 3 */}
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white">
              <h3 className="text-5xl sm:text-6xl font-black uppercase italic tracking-tighter text-white">
                DLA NIEJ
              </h3>
              <p className="text-xs text-stone-200 mt-2 font-black tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                Zobacz kolekcję damską →
              </p>
            </div>
          </motion.div>

          {/* Man's Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
            onClick={() => handleGenderSelect('Man')}
            className="group relative h-[350px] sm:h-[450px] w-full overflow-hidden bg-stone-100 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <Image
              src="https://t4.ftcdn.net/jpg/01/82/33/43/360_F_182334324_Snk2BsBEBSgCUWw1KcevXhe3iuyBbRyu.jpg"
              alt="Kolekcja Męska Jeans"
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Ambient Dark Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Big bold typography */}
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white">
              <h3 className="text-5xl sm:text-6xl font-black uppercase italic tracking-tighter text-white">
                DLA NIEGO
              </h3>
              <p className="text-xs text-stone-200 mt-2 font-black tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                Zobacz kolekcję męską →
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
