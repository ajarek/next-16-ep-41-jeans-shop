'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
}

export default function Hero({ onShopClick }: HeroProps) {
  return (
    <section className="relative bg-[#FDFCFB] overflow-hidden border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[450px] lg:min-h-[600px] flex flex-col lg:flex-row items-center justify-between py-12 lg:py-0 gap-8">
          {/* Left Arrow Controls */}
          <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <button className="p-2.5 bg-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[#1A1A1A] hover:bg-black hover:text-white transition-all cursor-pointer">
              <ArrowLeft size={16} />
            </button>
          </div>

          {/* Background Image Wrapper */}
          <div className="w-full lg:w-[50%] shrink-0 relative h-[300px] sm:h-[400px] lg:h-[500px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-stone-100">
            <img
              src="https://marketingportal.viaoutlets.com/transform/749697e7-8f14-4e76-9c0b-c17c4b30e0f3/Levis-jpg?w=1200&h=675&fit=crop"
              alt="BLUE.JEANS Special Offer Denim"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center items-start space-y-5 lg:pl-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-black uppercase tracking-widest text-[#2B3E50] border-b-2 border-[#2B3E50] pb-1"
            >
              Limitowana Kolekcja
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-none tracking-tighter uppercase italic"
            >
              NIEŚMIERTELNY<br/>
              <span className="text-[#2B3E50] underline decoration-4 underline-offset-8">DENIM.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-sm font-black uppercase tracking-wider text-stone-500">ZNIŻKI DO</span>
              <span className="text-3xl sm:text-4xl font-black text-[#E11D48] tracking-tight bg-[#E11D48]/10 px-2 py-0.5 border border-black/10">-40% OFF</span>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={onShopClick}
              className="px-8 py-3.5 bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              Kup teraz →
            </motion.button>
          </div>

          {/* Right Arrow Controls */}
          <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <button className="p-2.5 bg-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[#1A1A1A] hover:bg-black hover:text-white transition-all cursor-pointer">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
