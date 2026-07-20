'use client';

import React, { useState } from 'react';
import ProductList from '@/components/ProductList';
import ProductDetailsModal from '@/components/ProductDetailsModal';
import { Product } from '@/lib/store-data';

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedGender, setSelectedGender] = useState<'all' | 'Woman' | 'Man'>('all');

  return (
    <>
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

      {/* Product Details Modal — page-specific */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
