'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductList from '@/components/ProductList';
import ProductDetailsModal from '@/components/ProductDetailsModal';
import AuthModal from '@/components/AuthModal';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import OrdersModal from '@/components/OrdersModal';
import { Product } from '@/lib/store-data';

export default function ShopPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedGender, setSelectedGender] = useState<'all' | 'Woman' | 'Man'>('all');

  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.location.href = '/';
    } else if (sectionId === 'shop') {
      const element = document.getElementById('shop-catalog');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (sectionId === 'about' || sectionId === 'contact' || sectionId === 'blog') {
      window.location.href = '/#footer';
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FDFCFB]">
      {/* Navigation */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      <main className="flex-grow">
        {/* Shop Hero Banner */}
        <section className="bg-[#1A1A1A] border-b-2 border-black py-14 px-4">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <p className="text-[14px] font-black uppercase tracking-[0.3em] text-[#E11D48]">
              — Kolekcja 2025 —
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
              Nasz Sklep
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-300 max-w-md mx-auto pt-1">
              Przeglądaj pełną kolekcję jeansów, kurtek i akcesoriów denim
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="h-px w-16 bg-[#E11D48]" />
              <span className="text-[12px] font-black text-stone-300 uppercase tracking-widest">Blue.Jeans Store</span>
              <span className="h-px w-16 bg-[#E11D48]" />
            </div>
          </div>
        </section>

        {/* Full Product List with Filters */}
        <ProductList
          onProductClick={(product) => setSelectedProduct(product)}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* MODALS LAYER */}

      {/* Product Details Modal — przeniesiony z app/page.tsx */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Orders Modal */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />
    </div>
  );
}
