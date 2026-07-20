"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Hero from "@/components/Hero"
import CategoryGrid from "@/components/CategoryGrid"
import GenderBanners from "@/components/GenderBanners"
import DenimBanner from "@/components/DenimBanner"
import DiscountBanner from "@/components/DiscountBanner"
import Features from "@/components/Features"
import Carousel from "@/components/Carousel"
import Link from "next/link"
import { PRODUCTS } from "@/lib/store-data"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const router = useRouter()

  // Gender Filter shared between banners & product list
  const [selectedGender, setSelectedGender] = useState<"all" | "Woman" | "Man">(
    "all",
  )

  // Smooth Scroll / navigate helper for in-page CTAs
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (sectionId === "shop") {
      router.push("/shop")
    } else if (
      sectionId === "about" ||
      sectionId === "contact" ||
      sectionId === "blog"
    ) {
      const element =
        document.getElementById("about") || document.getElementById("footer")
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <>
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
      <section className='bg-[#FDFCFB] py-20 border-t-2 border-b-2 border-black'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Section Header */}
          <div className='text-center mb-14 space-y-3'>
            <p className='text-[10px] font-black uppercase tracking-[0.3em] text-[#E11D48]'>
              — Premiera —
            </p>
            <h2 className='text-4xl sm:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase italic'>
              Najnowsza Kolekcja
            </h2>
            <p className='text-xs font-bold uppercase tracking-wider text-stone-500 max-w-sm mx-auto'>
              Cztery style, jeden wspólny mianownik — bezkompromisowy denim
            </p>
          </div>

          {/* Cards Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {PRODUCTS.slice(0, 4).map((product) => {
              return (
                <motion.div
                  key={product.id}
                  layout
                  whileHover={{ y: -4 }}
                  className='group relative cursor-pointer flex flex-col bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all'
                >
                  {/* Image Area */}
                  <div className='relative aspect-[3/4] w-full border-2 border-black overflow-hidden bg-stone-50'>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      className='w-full h-full object-cover group-hover:scale-102 transition-transform duration-500'
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
                      referrerPolicy='no-referrer'
                    />

                    {/* Action Overlays on hover */}
                    <div className='absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3 gap-2.5'></div>

                    {/* Best Seller / New Badges */}
                    {product.badge && (
                      <span className='absolute top-3 left-3 bg-[#E11D48] text-white text-[9px] font-black uppercase px-2.5 py-1 border border-black tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'>
                        {product.badge === "Best Seller"
                          ? "Hit"
                          : product.badge === "New"
                            ? "Nowość"
                            : product.badge}
                      </span>
                    )}
                  </div>

                  {/* Meta info & pricing */}
                  <div className='mt-4 flex flex-col justify-between flex-1 space-y-2'>
                    <div>
                      <h3 className='text-md font-black uppercase text-[#1A1A1A] leading-tight tracking-tight group-hover:text-[#2B3E50] transition-colors'>
                        {product.name}
                      </h3>
                      <p className='text-[10px] text-stone-500 font-mono tracking-wider uppercase mt-1'>
                        {product.style}
                      </p>
                    </div>

                    <div className='pt-2 border-t border-black/5 flex items-center justify-between'>
                      <div className='flex items-baseline gap-2'>
                        <span className='text-xs text-stone-400 line-through font-medium'>
                          ${product.originalPrice.toFixed(2)}
                        </span>
                        <span className='text-base font-black text-[#1A1A1A]'>
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      <div className='text-[9px] bg-stone-100 border border-black/10 px-1.5 py-0.5 text-stone-600 font-bold uppercase tracking-wider shrink-0'>
                        Rozmiary: {product.sizes.join(", ")}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className='text-center mt-12'>
            <Link
              href='/shop'
              className='inline-flex items-center gap-3 bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all px-8 py-4 text-xs font-black uppercase tracking-widest'
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
    </>
  )
}
