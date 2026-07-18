'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import GenderBanners from '@/components/GenderBanners';
import ProductList from '@/components/ProductList';
import DenimBanner from '@/components/DenimBanner';
import DiscountBanner from '@/components/DiscountBanner';
import Features from '@/components/Features';
import Carousel from '@/components/Carousel';
import Footer from '@/components/Footer';

// Modals
import AuthModal from '@/components/AuthModal';
import CartDrawer from '@/components/CartDrawer';
import ProductDetailsModal from '@/components/ProductDetailsModal';
import CheckoutModal from '@/components/CheckoutModal';
import OrdersModal from '@/components/OrdersModal';

import { Product } from '@/lib/store-data';

export default function Home() {
  // Modal Visibility State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Gender Filter shared between banners & product list
  const [selectedGender, setSelectedGender] = useState<'all' | 'Woman' | 'Man'>('all');

  // Smooth Scroll Anchor Helper
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'shop') {
      const element = document.getElementById('shop-catalog');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (sectionId === 'about' || sectionId === 'contact' || sectionId === 'blog') {
      // About and Contact are situated in our informative footer
      const element = document.getElementById('about') || document.getElementsByTagName('footer')[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Primary Navigation bar */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      <main className="flex-grow">
        {/* Special Offer BIG SALE Hero Banner */}
        <section id="home">
          <Hero onShopClick={() => handleScrollToSection('shop')} />
        </section>

        {/* Categories grid (Jackets, Shorts, Jeans) */}
        <CategoryGrid onShopClick={() => handleScrollToSection('shop')} />

        {/* Woman's / Man's Gender banners */}
        <GenderBanners
          onShopClick={() => handleScrollToSection('shop')}
          setSelectedGender={setSelectedGender}
        />

        {/* Central Jeans Product Catalog with Size & Style Filter */}
        <ProductList
          onProductClick={(product) => setSelectedProduct(product)}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />

        {/* Denim textured watermark banner */}
        <DenimBanner onShopClick={() => handleScrollToSection('shop')} />

        {/* 25% off TEES25 promo banner */}
        <DiscountBanner onShopClick={() => handleScrollToSection('shop')} />

        {/* Features journey description step list */}
        <Features />

        {/* LOOKBOOK Instagram gallery */}
        <Carousel />
      </main>

      {/* Informative footer */}
      <Footer />

      {/* MODALS LAYER */}
      
      {/* Email & Google Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Cart Drawer Sidebar */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Product Specification & Size picker Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Simulated Online Payment Secure Gateway */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Purchase history listing & courier tracker */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />
    </div>
  );
}
