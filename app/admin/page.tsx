"use client"

import React, { useState, useMemo } from "react"
import { useStore } from "@/components/StoreContext"
import { useAuth } from "@/components/AuthContext"
import AuthModal from "@/components/AuthModal"
import AdminProductModal from "@/components/AdminProductModal"
import type { Product } from "@/lib/types"
import { CATEGORY_LABELS } from "@/lib/types"
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  RefreshCw,
  LayoutGrid,
  List,
  DollarSign,
  Tag,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  ShieldAlert,
  Lock,
  LogIn,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const ADMIN_EMAIL = "ajarek2101@gmail.com"

export default function AdminDashboardPage() {
  const { user, loading: authLoading, logout } = useAuth()
  const {
    products,
    productsSource,
    loadingProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
  } = useStore()

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const isAdmin = user?.isAdmin || user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()

  // Stan UI
  const [search, setSearch] = useState("")
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all")
  const [selectedBadgeFilter, setSelectedBadgeFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

  // Stan Modala produktów
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Stan Modala potwierdzenia usunięcia
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Powiadomienia Toast
  const [notification, setNotification] = useState<string | null>(null)

  const showNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3000)
  }

  // Obliczenia Statystyk (KPI)
  const stats = useMemo(() => {
    const totalCount = products.length
    const totalValue = products.reduce((acc, p) => acc + p.price, 0)
    const avgPrice = totalCount > 0 ? totalValue / totalCount : 0
    const promoCount = products.filter(
      (p) => p.badge === "Promotion" || p.price < p.originalPrice,
    ).length
    const bestSellerCount = products.filter(
      (p) => p.badge === "Best Seller",
    ).length

    return {
      totalCount,
      totalValue: totalValue.toFixed(2),
      avgPrice: avgPrice.toFixed(2),
      promoCount,
      bestSellerCount,
    }
  }, [products])

  // Filtrowanie produktów
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.style.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        selectedCategoryFilter === "all" || p.category === selectedCategoryFilter

      const matchesBadge =
        selectedBadgeFilter === "all"
          ? true
          : selectedBadgeFilter === "none"
            ? !p.badge
            : p.badge === selectedBadgeFilter

      return matchesSearch && matchesCategory && matchesBadge
    })
  }, [products, search, selectedCategoryFilter, selectedBadgeFilter])

  // Obsługa zapisu w modalu (dodanie lub edycja)
  const handleSaveProduct = async (
    productData: Omit<Product, "id">,
    productId?: string,
  ) => {
    if (productId) {
      await updateProduct(productId, productData)
      showNotification(`Produkt "${productData.name}" został zaktualizowany.`)
    } else {
      const created = await addProduct(productData)
      showNotification(`Pomyślnie dodano nowy produkt: "${created.name}".`)
    }
  }

  // Obsługa usunięcia
  const ConfirmDelete = async () => {
    if (!deletingProduct) return
    try {
      setIsDeleting(true)
      await deleteProduct(deletingProduct.id)
      showNotification(`Usunięto produkt "${deletingProduct.name}".`)
    } catch (err) {
      console.error(err)
    } finally {
      setIsDeleting(false)
      setDeletingProduct(null)
    }
  }

  // Reset danych do fabrycznych seed-ów
  const handleResetData = async () => {
    if (
      window.confirm(
        "Czy na pewno chcesz przywrócić domyślną listę produktów? Wszelkie zmodyfikowane i dodane przedmioty zostaną zastąpione domyślnym zestawem seed.",
      )
    ) {
      await resetProductsToDefault()
      showNotification("Przywrócono domyślne dane seed produktów.")
    }
  }

  // 1. Ekran ładowania statusu autoryzacji
  if (authLoading) {
    return (
      <div className='min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6'>
        <div className='bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center max-w-sm w-full'>
          <RefreshCw size={32} className='animate-spin mx-auto text-black mb-3' />
          <h3 className='text-xs font-black uppercase tracking-wider text-black'>
            Weryfikacja Uprawnień...
          </h3>
          <p className='text-[11px] text-stone-500 mt-1 font-medium'>
            Sprawdzanie statusu logowania administratora.
          </p>
        </div>
      </div>
    )
  }

  // 2. Ekran braku uprawnień dla kont innych niż ajarek2101@gmail.com
  if (!isAdmin) {
    return (
      <div className='min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 sm:p-6 relative'>
        <div className='bg-white border-2 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full text-center space-y-6'>
          <div className='w-16 h-16 bg-rose-100 border-2 border-black rounded-full flex items-center justify-center mx-auto text-[#E11D48] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
            <ShieldAlert size={32} />
          </div>

          <div>
            <span className='inline-block bg-black text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 mb-2'>
              TRASA CHRONIONA / PROTECTED ROUTE
            </span>
            <h1 className='text-xl sm:text-2xl font-black text-black italic tracking-tight'>
              Dostęp Zastrzeżony dla Administratora
            </h1>
            <p className='text-xs text-stone-600 font-medium mt-2 leading-relaxed'>
              Strona zarządzania produktami jest widoczna wyłącznie dla zweryfikowanego konta administratora o adresie e-mail:{" "}
              <strong className='text-black font-bold underline decoration-[#E11D48] decoration-2'>
                {ADMIN_EMAIL}
              </strong>.
            </p>
          </div>

          <div className='bg-[#F8F7F3] border border-black p-3.5 text-xs text-left font-semibold space-y-1.5'>
            <div className='flex items-center justify-between text-stone-700'>
              <span>Twój aktualny profil:</span>
              {user ? (
                <span className='font-bold text-black bg-stone-200 px-2 py-0.5 border border-stone-400 truncate max-w-[200px]'>
                  {user.email || user.displayName}
                </span>
              ) : (
                <span className='font-bold text-red-600 bg-red-50 px-2 py-0.5 border border-red-200'>
                  Niezalogowany
                </span>
              )}
            </div>
          </div>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-3 pt-2'>
            <Link
              href='/shop'
              className='w-full sm:w-auto px-5 py-2.5 bg-stone-100 border border-black text-xs font-black uppercase tracking-wider hover:bg-stone-200 transition-colors flex items-center justify-center gap-2'
            >
              <ArrowLeft size={14} />
              <span>Wróć do Sklepu</span>
            </Link>

            {user ? (
              <button
                onClick={async () => {
                  await logout()
                  setIsAuthModalOpen(true)
                }}
                className='w-full sm:w-auto px-6 py-2.5 bg-[#E11D48] text-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2'
              >
                <LogIn size={14} />
                <span>Zaloguj jako Admin</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className='w-full sm:w-auto px-6 py-2.5 bg-[#E11D48] text-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2'
              >
                <LogIn size={14} />
                <span>Zaloguj się</span>
              </button>
            )}
          </div>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#FDFCFB] pb-20'>
      {/* Toast Notification */}
      {notification && (
        <div className='fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white border-2 border-black px-5 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 text-xs font-bold'>
          <CheckCircle size={18} className='text-emerald-400' />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Admin Banner */}
      <div className='bg-[#1A1A1A] text-white border-b-4 border-black py-8 px-4 sm:px-6 lg:px-8 shadow-md'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <span className='bg-[#E11D48] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 border border-white'>
                ADMIN PANEL
              </span>
              <span className='text-stone-400 text-xs font-mono flex items-center gap-1'>
                <ShieldCheck size={14} className='text-emerald-400' />
                Źródło danych: {productsSource === "firestore" ? "Firestore DB" : "Lokalne Storage"}
              </span>
            </div>
            <h1 className='text-2xl sm:text-3xl font-black italic tracking-tight text-white flex items-center gap-3'>
              ZARZĄDZANIE PRODUKTAMI
            </h1>
            <p className='text-xs text-stone-300 font-medium mt-1'>
              Zarządzaj katalogiem odzieży jeansowej, zmieniaj ceny, dodawaj przedmioty i kontroluj magazyn.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <Link
              href='/shop'
              className='px-4 py-2 bg-white text-black border-2 border-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:bg-stone-100 flex items-center gap-2 transition-all'
            >
              <ArrowLeft size={14} />
              <span>Powrót do Sklepu</span>
            </Link>
            <button
              onClick={() => {
                setEditingProduct(null)
                setIsModalOpen(true)
              }}
              className='px-5 py-2.5 bg-[#E11D48] text-white border-2 border-white shadow-[3px_3px_0px_0px_rgba(225,29,72,0.5)] hover:bg-red-700 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all'
            >
              <Plus size={16} />
              <span>Dodaj Nowy Produkt</span>
            </button>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8'>
        {/* Metric Cards (KPI) */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
          {/* Total Count */}
          <div className='bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-xs font-black uppercase tracking-wider text-stone-500'>
                Wszystkie Produkty
              </span>
              <div className='p-2 bg-stone-100 border border-black'>
                <Package size={18} className='text-black' />
              </div>
            </div>
            <p className='text-3xl font-black text-black'>{stats.totalCount}</p>
            <p className='text-[10px] font-bold text-stone-400 mt-1 uppercase tracking-wider'>
              Pozycji w katalogu
            </p>
          </div>

          {/* Total Inventory Value */}
          <div className='bg-[#F8F7F3] border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-xs font-black uppercase tracking-wider text-stone-500'>
                Wartość Katalowa
              </span>
              <div className='p-2 bg-emerald-100 border border-black'>
                <DollarSign size={18} className='text-emerald-800' />
              </div>
            </div>
            <p className='text-3xl font-black text-black'>{stats.totalValue} PLN</p>
            <p className='text-[10px] font-bold text-emerald-700 mt-1 uppercase tracking-wider'>
              Suma cen produktów
            </p>
          </div>

          {/* Average Price */}
          <div className='bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-xs font-black uppercase tracking-wider text-stone-500'>
                Średnia Cena
              </span>
              <div className='p-2 bg-blue-100 border border-black'>
                <TrendingUp size={18} className='text-blue-800' />
              </div>
            </div>
            <p className='text-3xl font-black text-black'>{stats.avgPrice} PLN</p>
            <p className='text-[10px] font-bold text-stone-400 mt-1 uppercase tracking-wider'>
              Na produkt
            </p>
          </div>

          {/* Promocje & Bestsellery */}
          <div className='bg-rose-50 border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-xs font-black uppercase tracking-wider text-[#E11D48]'>
                Wyróżnienia
              </span>
              <div className='p-2 bg-[#E11D48] text-white border border-black'>
                <Sparkles size={18} />
              </div>
            </div>
            <div className='flex items-baseline gap-2'>
              <p className='text-3xl font-black text-black'>{stats.promoCount}</p>
              <span className='text-xs font-bold text-stone-600'>promocji</span>
            </div>
            <p className='text-[10px] font-bold text-stone-500 mt-1 uppercase tracking-wider'>
              {stats.bestSellerCount} oznaczonych jako Best Seller
            </p>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className='bg-white border-2 border-black p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4'>
          {/* Search box */}
          <div className='relative flex-1 max-w-md'>
            <input
              type='text'
              placeholder='Szukaj po nazwie, opisie, kategorii...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full pl-9 pr-8 py-2 bg-[#F8F7F3] border border-black text-xs font-semibold focus:outline-hidden focus:bg-white'
            />
            <Search size={16} className='absolute left-2.5 top-2.5 text-stone-600' />
            {search && (
              <button
                onClick={() => setSearch("")}
                className='absolute right-2 top-2 text-[10px] bg-black text-white px-1.5 py-0.5 font-bold uppercase'
              >
                Clear
              </button>
            )}
          </div>

          {/* Dropdown Filters & Controls */}
          <div className='flex flex-wrap items-center gap-3'>
            {/* Category Filter */}
            <div className='flex items-center gap-1.5'>
              <Filter size={14} className='text-stone-500' />
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className='px-3 py-2 bg-[#F8F7F3] border border-black text-xs font-bold focus:outline-hidden'
              >
                <option value='all'>Wszystkie Kategorie</option>
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
                  if (key === "all") return null
                  return (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  )
                })}
              </select>
            </div>

            {/* Badge Filter */}
            <div className='flex items-center gap-1.5'>
              <Tag size={14} className='text-stone-500' />
              <select
                value={selectedBadgeFilter}
                onChange={(e) => setSelectedBadgeFilter(e.target.value)}
                className='px-3 py-2 bg-[#F8F7F3] border border-black text-xs font-bold focus:outline-hidden'
              >
                <option value='all'>Wszystkie Odznaki</option>
                <option value='Best Seller'>Best Seller</option>
                <option value='New'>Nowość (New)</option>
                <option value='Promotion'>Promocja</option>
                <option value='none'>Bez odznaki</option>
              </select>
            </div>

            {/* View switcher */}
            <div className='flex items-center border border-black bg-stone-100 p-0.5'>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 text-xs font-bold transition-colors ${
                  viewMode === "table" ? "bg-black text-white" : "text-black hover:bg-stone-200"
                }`}
                title='Widok tabeli'
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 text-xs font-bold transition-colors ${
                  viewMode === "grid" ? "bg-black text-white" : "text-black hover:bg-stone-200"
                }`}
                title='Widok kafelków'
              >
                <LayoutGrid size={16} />
              </button>
            </div>

            {/* Reset products button */}
            <button
              onClick={handleResetData}
              className='px-3 py-2 bg-stone-100 border border-black hover:bg-stone-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors'
              title='Przywróć domyślny zestaw produktów'
            >
              <RefreshCw size={14} />
              <span className='hidden xl:inline'>Reset Seed</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        {loadingProducts ? (
          <div className='py-20 text-center bg-white border-2 border-black p-8'>
            <RefreshCw size={32} className='animate-spin mx-auto text-black mb-3' />
            <p className='text-xs font-bold uppercase tracking-widest text-stone-600'>
              Ładowanie produktów...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className='py-16 text-center bg-white border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
            <Package size={48} className='mx-auto text-stone-400 mb-3' />
            <h3 className='text-base font-black uppercase text-black'>Brak produktów</h3>
            <p className='text-xs text-stone-500 mt-1 max-w-sm mx-auto'>
              Nie znaleziono produktów spełniających podane kryteria wyszukiwania lub filtry.
            </p>
            <button
              onClick={() => {
                setSearch("")
                setSelectedCategoryFilter("all")
                setSelectedBadgeFilter("all")
              }}
              className='mt-4 px-4 py-2 bg-black text-white text-xs font-bold uppercase'
            >
              Wyczyść filtry
            </button>
          </div>
        ) : viewMode === "table" ? (
          /* Table View */
          <div className='bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-x-auto'>
            <table className='w-full text-left border-collapse min-w-[700px]'>
              <thead>
                <tr className='bg-[#2B3E50] text-white text-xs font-black uppercase tracking-wider border-b-2 border-black'>
                  <th className='p-3.5 w-16 text-center'>Zdjęcie</th>
                  <th className='p-3.5'>Produkt & Styl</th>
                  <th className='p-3.5'>Kategoria / Płeć</th>
                  <th className='p-3.5'>Cena (PLN)</th>
                  <th className='p-3.5'>Rozmiary</th>
                  <th className='p-3.5'>Odznaka</th>
                  <th className='p-3.5 text-right'>Akcje</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-stone-200 text-xs font-semibold text-stone-900'>
                {filteredProducts.map((product) => {
                  const isDiscounted = product.originalPrice > product.price
                  return (
                    <tr
                      key={product.id}
                      className='hover:bg-[#F8F7F3] transition-colors border-b border-stone-200'
                    >
                      {/* Thumbnail */}
                      <td className='p-3 text-center'>
                        <div className='w-12 h-14 bg-stone-100 border border-black overflow-hidden mx-auto relative'>
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            sizes='48px'
                            className='object-cover'
                            unoptimized
                          />
                        </div>
                      </td>

                      {/* Name & Details */}
                      <td className='p-3'>
                        <span className='font-black text-black text-xs block'>
                          {product.name}
                        </span>
                        <div className='flex items-center gap-2 mt-0.5'>
                          <span className='text-[10px] text-stone-500 font-medium'>
                            ID: {product.id}
                          </span>
                          <span className='text-[10px] bg-stone-100 text-stone-800 border border-stone-300 px-1.5 py-0.2 font-bold'>
                            {product.style}
                          </span>
                        </div>
                      </td>

                      {/* Category & Gender */}
                      <td className='p-3'>
                        <span className='font-bold uppercase text-[11px] block text-black'>
                          {CATEGORY_LABELS[product.category] || product.category}
                        </span>
                        <span className='text-[10px] text-stone-500 block font-medium'>
                          {product.gender}
                        </span>
                      </td>

                      {/* Price */}
                      <td className='p-3'>
                        <div className='flex flex-col'>
                          <span className='font-black text-black text-sm'>
                            {product.price.toFixed(2)} PLN
                          </span>
                          {isDiscounted && (
                            <span className='line-through text-stone-400 text-[10px]'>
                              {product.originalPrice.toFixed(2)} PLN
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Sizes */}
                      <td className='p-3'>
                        <div className='flex flex-wrap gap-1 max-w-[140px]'>
                          {product.sizes?.map((sz) => (
                            <span
                              key={sz}
                              className='text-[9px] bg-white border border-black font-black px-1.5 py-0.5'
                            >
                              {sz}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Badge */}
                      <td className='p-3'>
                        {product.badge ? (
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 border border-black inline-block ${
                              product.badge === "Best Seller"
                                ? "bg-amber-300 text-black"
                                : product.badge === "Promotion"
                                  ? "bg-[#E11D48] text-white"
                                  : "bg-blue-600 text-white"
                            }`}
                          >
                            {product.badge}
                          </span>
                        ) : (
                          <span className='text-[10px] text-stone-400 italic'>-</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className='p-3 text-right'>
                        <div className='flex items-center justify-end gap-2'>
                          <button
                            onClick={() => {
                              setEditingProduct(product)
                              setIsModalOpen(true)
                            }}
                            className='p-1.5 bg-white border border-black hover:bg-stone-100 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all'
                            title='Edytuj produkt'
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => setDeletingProduct(product)}
                            className='p-1.5 bg-[#E11D48] text-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all'
                            title='Usuń produkt'
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid Cards View */
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className='bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between group overflow-hidden'
              >
                <div>
                  <div className='w-full h-56 bg-stone-100 border-b-2 border-black relative overflow-hidden'>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes='(max-width: 768px) 100vw, 300px'
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                      unoptimized
                    />
                    {product.badge && (
                      <span
                        className={`absolute top-2 left-2 text-[10px] font-black uppercase px-2 py-0.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                          product.badge === "Best Seller"
                            ? "bg-amber-300 text-black"
                            : product.badge === "Promotion"
                              ? "bg-[#E11D48] text-white"
                              : "bg-blue-600 text-white"
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className='p-4 space-y-2'>
                    <div className='flex items-center justify-between text-[10px] font-bold text-stone-500 uppercase'>
                      <span>{CATEGORY_LABELS[product.category] || product.category}</span>
                      <span>{product.gender}</span>
                    </div>

                    <h4 className='font-black text-sm text-black line-clamp-1'>
                      {product.name}
                    </h4>

                    <div className='flex items-baseline justify-between pt-1'>
                      <span className='text-base font-black text-black'>
                        {product.price.toFixed(2)} PLN
                      </span>
                      {product.originalPrice > product.price && (
                        <span className='line-through text-stone-400 text-xs font-bold'>
                          {product.originalPrice.toFixed(2)} PLN
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className='p-4 pt-0 border-t border-stone-200 mt-2 flex items-center justify-between gap-2'>
                  <button
                    onClick={() => {
                      setEditingProduct(product)
                      setIsModalOpen(true)
                    }}
                    className='flex-1 py-1.5 bg-white border border-black text-xs font-bold uppercase tracking-wider hover:bg-stone-100 flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  >
                    <Edit size={13} />
                    <span>Edytuj</span>
                  </button>
                  <button
                    onClick={() => setDeletingProduct(product)}
                    className='py-1.5 px-3 bg-[#E11D48] text-white border border-black text-xs font-bold uppercase hover:bg-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Admin Product Modal (Add/Edit) */}
      <AdminProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProduct(null)
        }}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4'>
          <div className='bg-[#FDFCFB] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 max-w-md w-full space-y-4'>
            <div className='flex items-center gap-3 text-red-600'>
              <AlertTriangle size={24} />
              <h3 className='text-base font-black uppercase text-black'>
                Potwierdzenie Usunięcia
              </h3>
            </div>
            <p className='text-xs font-medium text-stone-700 leading-relaxed'>
              Czy na pewno chcesz usunąć produkt{" "}
              <strong className='text-black font-bold'>"{deletingProduct.name}"</strong> z
              katalogu? Operacji nie będzie można cofnąć.
            </p>
            <div className='flex items-center justify-end gap-3 pt-2'>
              <button
                onClick={() => setDeletingProduct(null)}
                className='px-4 py-2 bg-stone-200 border border-black text-xs font-bold uppercase'
              >
                Anuluj
              </button>
              <button
                onClick={ConfirmDelete}
                disabled={isDeleting}
                className='px-5 py-2 bg-[#E11D48] text-white border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase hover:bg-black'
              >
                {isDeleting ? "Usuwanie..." : "Tak, Usuń"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
