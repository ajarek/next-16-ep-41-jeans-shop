"use client"

import React, { useState } from "react"
import { useStore } from "./StoreContext"
import { SIZES, STYLES } from "@/lib/types"
import type { Product } from "@/lib/types"
import {
  SlidersHorizontal,
  Eye,
  ShoppingCart,
  Info,
  Loader2,
} from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"

interface ProductListProps {
  onProductClick: (product: Product) => void
  selectedGender: "all" | "Woman" | "Man"
  setSelectedGender: (gender: "all" | "Woman" | "Man") => void
}

export default function ProductList({
  onProductClick,
  selectedGender,
  setSelectedGender,
}: ProductListProps) {
  const {
    products,
    categories,
    loadingProducts,
    searchQuery,
    selectedCategory,
    selectedSize,
    selectedStyle,
    setSelectedCategory,
    setSelectedSize,
    setSelectedStyle,
    addToCart,
    resetFilters,
  } = useStore()

  const [showFiltersMobile, setShowFiltersMobile] = useState(false)

  // Active Filter Calculation
  const filteredProducts = products.filter((product) => {
    // 1. Search Query Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesName = product.name.toLowerCase().includes(query)
      const matchesDesc = product.description.toLowerCase().includes(query)
      if (!matchesName && !matchesDesc) return false
    }

    // 2. Category Filter
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false
    }

    // 3. Gender Filter
    if (
      selectedGender !== "all" &&
      product.gender !== selectedGender &&
      product.gender !== "Unisex"
    ) {
      return false
    }

    // 4. Size Filter
    if (
      selectedSize !== "all" &&
      !product.sizes.includes(selectedSize as any)
    ) {
      return false
    }

    // 5. Style Filter
    if (selectedStyle !== "all" && product.style !== selectedStyle) {
      return false
    }

    return true
  })

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    // Default to first available size
    const defaultSize = product.sizes[0] || "M"
    addToCart(product, defaultSize)
    alert(`Dodano do koszyka: ${product.name} (Rozmiar: ${defaultSize})!`)
  }

  return (
    <section
      id='shop-catalog'
      className='bg-[#FDFCFB] py-16 border-b border-black'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-12 space-y-3'>
          <h2 className='text-4xl sm:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase italic'>
            Poznaj Naszą Kolekcję
          </h2>
          <p className='text-xs font-bold uppercase tracking-wider text-stone-500 max-w-md mx-auto'>
            Nasze jeansy to klasyka połączona z bezkompromisowym designem.
            Znajdź swój fason i ciesz się najwyższą jakością.
          </p>
        </div>

        {/* Filters and Layout controls */}
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* LEFT COLUMN: FILTERS (Sidebar for desktop) */}
          <div className='w-full lg:w-[260px] shrink-0 space-y-6'>
            {/* Filter Toggle Mobile */}
            <div className='flex lg:hidden justify-between items-center bg-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
              <button
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className='flex items-center gap-2 text-xs font-black uppercase tracking-wider text-stone-950'
              >
                <SlidersHorizontal size={14} />
                <span>Filtruj i Szukaj ({filteredProducts.length})</span>
              </button>
              {(selectedCategory !== "all" ||
                selectedSize !== "all" ||
                selectedStyle !== "all" ||
                searchQuery !== "" ||
                selectedGender !== "all") && (
                <button
                  onClick={() => {
                    resetFilters()
                    setSelectedGender("all")
                  }}
                  className='text-[11px] text-[#E11D48] font-black uppercase tracking-wider hover:underline'
                >
                  Resetuj
                </button>
              )}
            </div>

            {/* Main Filters Container */}
            <div
              className={`space-y-6 ${showFiltersMobile ? "block" : "hidden lg:block"}`}
            >
              {/* Filter Panel Content */}
              <div className='border-2 border-black bg-[#F8F7F3] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-6'>
                {/* Header inside desktop filter */}
                <div className='hidden lg:flex justify-between items-center pb-2 border-b border-black'>
                  <span className='text-xs font-black uppercase tracking-widest text-[#1A1A1A] flex items-center gap-2'>
                    <SlidersHorizontal size={12} />
                    Filtry
                  </span>
                  {(selectedCategory !== "all" ||
                    selectedSize !== "all" ||
                    selectedStyle !== "all" ||
                    searchQuery !== "" ||
                    selectedGender !== "all") && (
                    <button
                      onClick={() => {
                        resetFilters()
                        setSelectedGender("all")
                      }}
                      className='text-[10px] text-stone-500 hover:text-red-600 font-bold uppercase tracking-wider transition-colors'
                    >
                      Wyczyść
                    </button>
                  )}
                </div>

                {/* Filter By Gender */}
                <div className='space-y-2.5'>
                  <h4 className='text-xs font-black uppercase tracking-wider text-[#1A1A1A]'>
                    Płeć
                  </h4>
                  <div className='flex flex-col gap-1.5'>
                    {["all", "Woman", "Man"].map((gender) => (
                      <button
                        key={gender}
                        onClick={() => setSelectedGender(gender as any)}
                        className={`w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${
                          selectedGender === gender
                            ? "bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(225,29,72,1)]"
                            : "bg-white text-[#1A1A1A] border-black hover:bg-[#FDFCFB]"
                        }`}
                      >
                        {gender === "all"
                          ? "Wszystko"
                          : gender === "Woman"
                            ? "Kolekcja Damska"
                            : "Kolekcja Męska"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter By Category */}
                <div className='space-y-2.5'>
                  <h4 className='text-xs font-black uppercase tracking-wider text-[#1A1A1A]'>
                    Kategoria
                  </h4>
                  <div className='space-y-1.5'>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between text-left text-xs py-2 px-2.5 border transition-all ${
                          selectedCategory === cat.id
                            ? "bg-[#2B3E50] text-white border-black font-black"
                            : "bg-white text-[#1A1A1A] border-black hover:bg-stone-50"
                        }`}
                      >
                        <span className='font-bold uppercase text-[10px] tracking-wider'>
                          {cat.name}
                        </span>
                        <span className='text-[9px] bg-black text-white py-0.5 px-2 font-black'>
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter By Size - matches user request */}
                <div className='space-y-2.5'>
                  <h4 className='text-xs font-black uppercase tracking-wider text-[#1A1A1A]'>
                    Rozmiar (W)
                  </h4>
                  <div className='grid grid-cols-3 gap-1.5'>
                    <button
                      onClick={() => setSelectedSize("all")}
                      className={`col-span-3 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${
                        selectedSize === "all"
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(225,29,72,1)]"
                          : "bg-white text-[#1A1A1A] border-black hover:bg-[#FDFCFB]"
                      }`}
                    >
                      Wszystkie
                    </button>
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-mono font-black border transition-all ${
                          selectedSize === size
                            ? "bg-[#E11D48] text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            : "bg-white text-stone-700 border-black hover:bg-stone-50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter By Style - matches user request */}
                <div className='space-y-2.5'>
                  <h4 className='text-xs font-black uppercase tracking-wider text-[#1A1A1A]'>
                    Fason / Krój
                  </h4>
                  <div className='space-y-1.5'>
                    <button
                      onClick={() => setSelectedStyle("all")}
                      className={`w-full text-left text-xs py-2 px-2.5 border transition-all ${
                        selectedStyle === "all"
                          ? "bg-[#2B3E50] text-white border-black font-black"
                          : "bg-white text-stone-700 border-black hover:bg-stone-50"
                      }`}
                    >
                      <span className='font-bold uppercase text-[10px] tracking-wider'>
                        WSZYSTKIE STYLE
                      </span>
                    </button>
                    {STYLES.map((style) => (
                      <button
                        key={style}
                        onClick={() => setSelectedStyle(style)}
                        className={`w-full text-left text-xs py-2 px-2.5 border transition-all ${
                          selectedStyle === style
                            ? "bg-[#2B3E50] text-white border-black font-black"
                            : "bg-white text-stone-700 border-black hover:bg-stone-50"
                        }`}
                      >
                        <span className='font-bold uppercase text-[10px] tracking-wider'>
                          {style === "Casual"
                            ? "Casual (Codzienny)"
                            : style === "Elegant"
                              ? "Elegant (Elegancki)"
                              : style === "Distressed"
                                ? "Distressed (Przecierany)"
                                : style === "High Waist"
                                  ? "High Waist (Wysoki Stan)"
                                  : style === "Classic"
                                    ? "Classic (Klasyczny)"
                                    : style}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PRODUCT GRID */}
          <div className='flex-1 space-y-6'>
            {/* Active filters summary */}
            <div className='flex justify-between items-center text-xs font-bold uppercase tracking-wider text-stone-500'>
              <p>
                Znaleziono:{" "}
                <strong className='text-black font-black'>
                  {filteredProducts.length}
                </strong>{" "}
                produktów
              </p>
              {searchQuery && (
                <p>
                  Wyniki dla:{" "}
                  <span className='italic font-black text-[#E11D48]'>
                    &quot;{searchQuery}&quot;
                  </span>
                </p>
              )}
            </div>

            {loadingProducts ? (
              <div className='text-center py-20 bg-white border-2 border-dashed border-black'>
                <Loader2 className='w-10 h-10 text-stone-400 mx-auto mb-3 animate-spin' />
                <h3 className='text-lg font-black text-stone-900 uppercase'>
                  Ładowanie katalogu…
                </h3>
                <p className='text-xs text-stone-500 mt-1 max-w-xs mx-auto font-medium'>
                  Pobieramy produkty z Firebase Firestore.
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className='text-center py-20 bg-white border-2 border-dashed border-black'>
                <Info className='w-10 h-10 text-stone-400 mx-auto mb-3' />
                <h3 className='text-lg font-black text-stone-900 uppercase'>
                  Brak pasujących modeli
                </h3>
                <p className='text-xs text-stone-500 mt-1 max-w-xs mx-auto font-medium'>
                  Spróbuj zmienić filtry rozmiaru, stylu lub wyczyść zapytanie
                  wyszukiwania, aby zobaczyć całą kolekcję.
                </p>
                <button
                  onClick={() => {
                    resetFilters()
                    setSelectedGender("all")
                  }}
                  className='mt-6 px-6 py-3 bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase tracking-wider hover:bg-black transition-all'
                >
                  Wyczyść filtry
                </button>
              </div>
            ) : (
              /* Product Grid - Inspired by Images 4, 7 & 8 */
              <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    whileHover={{ y: -4 }}
                    onClick={() => onProductClick(product)}
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
                      <div className='absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3 gap-2.5'>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onProductClick(product)
                          }}
                          className='p-3 bg-white text-black border border-black hover:bg-[#2B3E50] hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer'
                          title='Szybki podgląd'
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className='p-3 bg-[#E11D48] text-white border border-black hover:bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer'
                          title='Dodaj do koszyka'
                        >
                          <ShoppingCart size={14} />
                        </button>
                      </div>

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
                            zł{product.originalPrice.toFixed(2)}
                          </span>
                          <span className='text-base font-black text-[#1A1A1A]'>
                            zł{product.price.toFixed(2)}
                          </span>
                        </div>

                        <div className='text-[9px] bg-stone-100 border border-black/10 px-1.5 py-0.5 text-stone-600 font-bold uppercase tracking-wider shrink-0'>
                          Rozmiary: {product.sizes.join(", ")}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
