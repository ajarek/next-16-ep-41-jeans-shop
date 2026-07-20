"use client"

import React, { useState } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import CategoryGrid from "@/components/CategoryGrid"
import GenderBanners from "@/components/GenderBanners"
import DenimBanner from "@/components/DenimBanner"
import DiscountBanner from "@/components/DiscountBanner"
import Features from "@/components/Features"
import Carousel from "@/components/Carousel"
import Footer from "@/components/Footer"
import Link from "next/link"
import { PRODUCTS } from "@/lib/store-data"

// Modals
import AuthModal from "@/components/AuthModal"
import CartDrawer from "@/components/CartDrawer"
import CheckoutModal from "@/components/CheckoutModal"
import OrdersModal from "@/components/OrdersModal"

import { motion } from "motion/react"
import { Sparkles, Flame, Star, ArrowRight, Eye } from "lucide-react"
import Image from "next/image"



export default function Home() {
  // Modal Visibility State
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrdersOpen, setIsOrdersOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Gender Filter shared between banners & product list
  const [selectedGender, setSelectedGender] = useState<"all" | "Woman" | "Man">(
    "all",
  )

  // Smooth Scroll Anchor Helper
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (sectionId === "shop") {
      const element = document.getElementById("shop-catalog")
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else if (
      sectionId === "about" ||
      sectionId === "contact" ||
      sectionId === "blog"
    ) {
      // About and Contact are situated in our informative footer
      const element =
        document.getElementById("about") ||
        document.getElementsByTagName("footer")[0]
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <div className='relative min-h-screen flex flex-col'>
      {/* Primary Navigation bar */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      <main className='flex-grow'>
        {/* Special Offer BIG SALE Hero Banner */}
        <section id='home'>
          <Hero onShopClick={() => handleScrollToSection("shop")} />
        </section>

        {/* Categories grid (Jackets, Shorts, Jeans) */}
        <CategoryGrid onShopClick={() => handleScrollToSection("shop")} />

        {/* Woman's / Man's Gender banners */}
        <GenderBanners
          onShopClick={() => handleScrollToSection("shop")}
          setSelectedGender={setSelectedGender}
        />

      

        {/* NEW COLLECTION CARDS — 4 karty najnowszej kolekcji */}
        <section className="bg-[#FDFCFB] py-20 border-t-2 border-b-2 border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-14 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E11D48]">— Premiera —</p>
              <h2 className="text-4xl sm:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase italic">
                Najnowsza Kolekcja
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 max-w-sm mx-auto">
                Cztery style, jeden wspólny mianownik — bezkompromisowy denim
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS
              .slice(0, 4)
              .map((product, idx) => {
                
                return (
                  <motion.div
                    key={product.id}
                    layout
                    whileHover={{ y: -4 }}
                    
                    className="group relative cursor-pointer flex flex-col bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[3/4] w-full border-2 border-black overflow-hidden bg-stone-50">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Action Overlays on hover */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3 gap-2.5">
                        
                        
                      </div>

                      {/* Best Seller / New Badges */}
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-[#E11D48] text-white text-[9px] font-black uppercase px-2.5 py-1 border border-black tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          {product.badge === 'Best Seller' ? 'Hit' : product.badge === 'New' ? 'Nowość' : product.badge}
                        </span>
                      )}
                    </div>

                    {/* Meta info & pricing */}
                    <div className="mt-4 flex flex-col justify-between flex-1 space-y-2">
                      <div>
                        <h3 className="text-md font-black uppercase text-[#1A1A1A] leading-tight tracking-tight group-hover:text-[#2B3E50] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-[10px] text-stone-500 font-mono tracking-wider uppercase mt-1">
                          {product.style}
                        </p>
                      </div>
                      
                      <div className="pt-2 border-t border-black/5 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs text-stone-400 line-through font-medium">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-base font-black text-[#1A1A1A]">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="text-[9px] bg-stone-100 border border-black/10 px-1.5 py-0.5 text-stone-600 font-bold uppercase tracking-wider shrink-0">
                          Rozmiary: {product.sizes.join(', ')}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all px-8 py-4 text-xs font-black uppercase tracking-widest"
              >
                <span>Zobacz całą kolekcję</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Denim textured watermark banner */}
        <DenimBanner onShopClick={() => handleScrollToSection("shop")} />

        {/* 25% off TEES25 promo banner */}
        <DiscountBanner onShopClick={() => handleScrollToSection("shop")} />

        {/* Features journey description step list */}
        <Features />

        {/* LOOKBOOK Instagram gallery */}
        <Carousel />
      </main>

      {/* Informative footer */}
      <Footer />

      {/* MODALS LAYER */}

      {/* Email & Google Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Cart Drawer Sidebar */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false)
          setIsCheckoutOpen(true)
        }}
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
  )
}
