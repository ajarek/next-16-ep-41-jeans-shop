'use client';

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useStore } from './StoreContext';
import { ShoppingCart, User, Search, Menu, X, LogOut, ClipboardList, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({ onOpenAuth, onOpenCart, onOpenOrders, onScrollToSection }: NavbarProps) {
  const { user, logout } = useAuth();
  const { cart, searchQuery, setSearchQuery } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCFB] border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Desktop Left Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
          <button onClick={() => handleNavClick('home')} className="hover:opacity-60 transition-opacity border-b-2 border-transparent hover:border-black pb-1">Home</button>
          <button onClick={() => handleNavClick('about')} className="hover:opacity-60 transition-opacity border-b-2 border-transparent hover:border-black pb-1">O nas</button>
          <button onClick={() => handleNavClick('shop')} className="hover:opacity-60 transition-opacity border-b-2 border-transparent hover:border-black pb-1">Sklep</button>
          <button onClick={() => handleNavClick('blog')} className="hover:opacity-60 transition-opacity border-b-2 border-transparent hover:border-black pb-1">Blog</button>
          <button onClick={() => handleNavClick('contact')} className="hover:opacity-60 transition-opacity border-b-2 border-transparent hover:border-black pb-1">Kontakt</button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-2 text-stone-600 hover:text-stone-900 focus:outline-hidden"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Brand Logo - Centered in desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0">
          <button
            onClick={() => onScrollToSection('home')}
            className="text-3xl font-black tracking-tighter italic text-[#1A1A1A] flex items-center focus:outline-hidden"
          >
            BLUE.JEANS
          </button>
        </div>

        {/* Right Section: Search, Profile, Cart */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Search box - hidden on very small devices */}
          <div className="relative hidden md:block w-48 lg:w-60">
            <input
              type="text"
              placeholder="Szukaj..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-black text-xs font-semibold focus:outline-hidden focus:bg-[#F8F7F3] transition-colors"
            />
            <Search size={14} className="absolute left-2 top-2.5 text-[#1A1A1A]" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1.5 text-[9px] bg-black text-white px-1.5 py-0.5 rounded-xs font-bold uppercase"
              >
                Clear
              </button>
            )}
          </div>

          {/* User Profile dropdown or sign-in */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs font-bold text-[#1A1A1A] hover:bg-[#F8F7F3] transition-all focus:outline-hidden"
                >
                  <div className="w-5 h-5 rounded-full bg-[#2B3E50] flex items-center justify-center text-white font-bold text-[10px] uppercase overflow-hidden border border-black shrink-0">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
                    ) : (
                      user.displayName ? user.displayName[0] : 'U'
                    )}
                  </div>
                  <span className="hidden sm:inline max-w-[80px] truncate">{user.displayName || 'Konto'}</span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setIsProfileDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 mt-2 w-52 bg-[#FDFCFB] border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-40 py-1.5"
                      >
                        <div className="px-4 py-2 border-b border-black bg-[#F8F7F3]">
                          <p className="text-xs font-black text-[#1A1A1A] truncate">{user.displayName}</p>
                          <p className="text-[10px] font-medium text-stone-500 truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            onOpenOrders();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[#1A1A1A] hover:bg-black hover:text-white text-left text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          <ClipboardList size={14} />
                          <span>Historia zakupów</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-red-600 hover:bg-[#E11D48] hover:text-white text-left text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          <LogOut size={14} />
                          <span>Wyloguj się</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs font-bold text-[#1A1A1A] hover:bg-[#F8F7F3] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 border border-black">
                  <User size={11} />
                </div>
                <span className="hidden sm:inline">ZALOGUJ SIĘ</span>
              </button>
            )}
          </div>

          {/* Cart Icon and Counter */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#E11D48] text-white border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all px-4 py-2 text-xs font-bold uppercase tracking-widest focus:outline-hidden"
          >
            <ShoppingCart size={14} />
            <span className="hidden xs:inline">KOSZYK</span>
            <span className="bg-white text-black border border-black rounded-full w-5 h-5 flex items-center justify-center font-black text-[9px]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-stone-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3 text-sm font-semibold text-stone-700">
              {/* Mobile Search */}
              <div className="relative py-2">
                <input
                  type="text"
                  placeholder="Szukaj jeansów..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                />
                <Search size={14} className="absolute left-3 top-5 text-stone-400" />
              </div>
              <button
                onClick={() => handleNavClick('home')}
                className="block w-full py-2 border-b border-stone-50 text-left hover:text-black"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="block w-full py-2 border-b border-stone-50 text-left hover:text-black"
              >
                About us
              </button>
              <button
                onClick={() => handleNavClick('shop')}
                className="block w-full py-2 border-b border-stone-50 text-left hover:text-black"
              >
                Shop
              </button>
              <button
                onClick={() => handleNavClick('blog')}
                className="block w-full py-2 border-b border-stone-50 text-left hover:text-black"
              >
                Blog
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="block w-full py-2 text-left hover:text-black"
              >
                Contact us
              </button>

              {user && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenOrders();
                  }}
                  className="flex items-center gap-2 text-blue-700 font-bold bg-blue-50 px-3 py-2.5 rounded-lg w-full text-left"
                >
                  <ClipboardList size={16} />
                  <span>Twoja historia zakupów</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
