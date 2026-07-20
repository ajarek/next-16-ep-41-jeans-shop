'use client';

import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`Dziękujemy! Adres ${email} został zapisany do naszego newslettera.`);
    setEmail('');
  };

  return (
    <footer id="footer" className="bg-[#FDFCFB] pt-20 pb-8 border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-black">

          {/* Support Column - matches Image 10 */}
          <div className="space-y-6">
            <h3 className="text-3xl font-black tracking-tighter text-[#1A1A1A] uppercase italic underline decoration-4 underline-offset-4 decoration-[#E11D48]">
              BLUE.JEANS.
            </h3>
            <div className="space-y-4 text-stone-700">
              <h4 className="font-black text-[#1A1A1A] text-xs uppercase tracking-widest">
                Potrzebujesz Pomocy?
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed font-semibold">
                Odwiedź nasze Centrum Pomocy lub zadzwoń bezpośrednio pod numer:
              </p>
              <p className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight bg-white border-2 border-black py-1 px-3 inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                123-464-9874
              </p>
            </div>
          </div>

          {/* Menu Column - matches Image 10 */}
          <div className="space-y-4">
            <h4 className="font-black text-[#1A1A1A] text-xs uppercase tracking-widest">
              Menu
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 font-bold uppercase tracking-wider">
              <li>
                <a href="#home" className="hover:text-[#E11D48] transition-colors">Strona Główna</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); alert('BLUE.JEANS to nowoczesny butik denimowy założony w 2026 roku.'); }} className="hover:text-[#E11D48] transition-colors">O Nas</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); alert('Napisz do nas na kontakt@blue_jeans.pl - odpowiadamy w 2 godziny!'); }} className="hover:text-[#E11D48] transition-colors">Kontakt</a>
              </li>
            </ul>
          </div>

          {/* Explore Column - matches Image 10 */}
          <div className="space-y-4">
            <h4 className="font-black text-[#1A1A1A] text-xs uppercase tracking-widest">
              Informacje
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 font-bold uppercase tracking-wider">
              <li>
                <a href="#faq" onClick={(e) => { e.preventDefault(); alert('FAQ: darmowa wysyłka powyżej 150 zł, zwroty do 30 dni!'); }} className="hover:text-[#E11D48] transition-colors">FAQ&apos;s</a>
              </li>
              <li>
                <a href="#shipping" onClick={(e) => { e.preventDefault(); alert('Wysyłamy w ciągu 24 godzin od opłacenia zamówienia kurierem DPD lub do Paczkomatów.'); }} className="hover:text-[#E11D48] transition-colors">Dostawa i Zwroty</a>
              </li>
              <li>
                <a href="#policy" onClick={(e) => { e.preventDefault(); alert('Dbamy o Twoje dane osobowe. Regulamin i polityka prywatności zgodne z RODO.'); }} className="hover:text-[#E11D48] transition-colors">Regulamin sklepu</a>
              </li>
              <li>
                <a href="#payments" onClick={(e) => { e.preventDefault(); alert('Akceptujemy płatności kartą, BLIK, przelewami natychmiastowymi oraz przy odbiorze.'); }} className="hover:text-[#E11D48] transition-colors">Metody płatności</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column - matches Image 10 */}
          <div className="space-y-6">
            <h4 className="font-black text-[#1A1A1A] text-xs uppercase tracking-widest">
              Nasz Newsletter
            </h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Twój adres e-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border-2 border-black text-xs font-bold uppercase focus:outline-hidden focus:bg-[#F8F7F3] transition-all"
              />
              <button
                type="submit"
                className="w-full bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all text-xs font-bold uppercase tracking-widest cursor-pointer py-2.5"
              >
                Zapisz się teraz
              </button>
            </form>

            {/* Social Icons - matches Image 10 */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#social" className="w-9 h-9 border border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Facebook size={14} />
              </a>
              <a href="#social" className="w-9 h-9 border border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Twitter size={14} />
              </a>
              <a href="#social" className="w-9 h-9 border border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Linkedin size={14} />
              </a>
              <a href="#social" className="w-9 h-9 border border-black bg-white flex items-center justify-center text-black hover:bg-[#E11D48] hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Instagram size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright - matches Image 10 */}
        <div className="pt-8 text-center text-[10px] text-stone-500 font-bold uppercase tracking-widest">
          <p>© 2026 by BLUE.JEANS. Created with artistic flair. Polskie tłumaczenie i system płatności.</p>
        </div>
      </div>
    </footer>
  );
}
