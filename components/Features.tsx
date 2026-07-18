'use client';

import React from 'react';
import { ShoppingBag, Box, Truck } from 'lucide-react';

export default function Features() {
  const steps = [
    {
      id: "f1",
      icon: <ShoppingBag className="w-8 h-8 text-blue-900" />,
      title: "Wybierz model",
      desc: "Przeglądaj naszą starannie skrojoną kolekcję jeansów, spódnic, koszul i kombinezonów, aby odnaleźć swój idealny styl i krój.",
      bgColor: "bg-blue-50",
    },
    {
      id: "f2",
      icon: <Box className="w-8 h-8 text-orange-900" />,
      title: "Dodaj do koszyka",
      desc: "Wybierz swój idealny rozmiar i styl, a następnie w łatwy i szybki sposób sfinalizuj bezpieczną transakcję kartą płatniczą.",
      bgColor: "bg-orange-50",
    },
    {
      id: "f3",
      icon: <Truck className="w-8 h-8 text-stone-800" />,
      title: "Szybka dostawa",
      desc: "Twoja paczka zostanie wysłana w ciągu 24 godzin od złożenia zamówienia. Śledź jej status online bezpośrednio w panelu klienta.",
      bgColor: "bg-stone-50",
    },
  ];

  return (
    <section className="bg-[#FDFCFB] py-16 border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center space-y-4 max-w-sm mx-auto">
              {/* Sharp-cornered border-2 border-black box with shadow for Icon */}
              <div className="w-16 h-16 bg-[#F8F7F3] border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {step.icon}
              </div>
              <h4 className="text-lg font-black uppercase tracking-tight text-stone-950">
                {step.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-[280px] font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
