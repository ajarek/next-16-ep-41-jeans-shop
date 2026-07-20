"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Product } from '@/lib/store-data';
import React, { useState } from 'react'

const ContactPage = () => {
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
      window.location.href = '/shop';
    } else if (sectionId === 'about' || sectionId === 'contact' || sectionId === 'blog') {
      window.location.href = '/#footer';
    }
  };
    
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#FDFCFB]">
         {/* Navigation */}
              <Navbar
                onOpenAuth={() => setIsAuthOpen(true)}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenOrders={() => setIsOrdersOpen(true)}
                onScrollToSection={handleScrollToSection}
              />
              <h1 className='text-4xl font-bold text-center'>Kontakt</h1>
      <Footer />
    </div>
  )
}

export default ContactPage