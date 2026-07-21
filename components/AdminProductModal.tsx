"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Image as ImageIcon, Sparkles, Check } from "lucide-react"
import type { Product } from "@/lib/types"
import { SIZES, STYLES } from "@/lib/types"

interface AdminProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (productData: Omit<Product, "id">, productId?: string) => Promise<void>
  initialProduct?: Product | null
}

const PRESET_IMAGES = [
  {
    label: "Jeansy Klasyczne",
    url: "https://media.lee.com/i/lee/SIZE4-MODEL-Straight",
  },
  {
    label: "Kurtka Jeansowa",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRND77stLVNqG3HGsw3PHVO66iYt1FYlcUdVVk_z9QSm9mYVY1WdQ44gVk&s=10",
  },
  {
    label: "Spódnica Denim",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR86f1d-f8p4e-sN1m5k2p-v9q3r6t1u4w&s=10",
  },
  {
    label: "Koszula Jeansowa",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4e-x7_r8v5p2m-9q3r6t1u4w5e6f7g8h&s=10",
  },
  {
    label: "Szorty Denim",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9_v5p2m-9q3r6t1u4w5e6f7g8h9i0j&s=10",
  },
]

export default function AdminProductModal({
  isOpen,
  onClose,
  onSave,
  initialProduct,
}: AdminProductModalProps) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [originalPrice, setOriginalPrice] = useState("")
  const [category, setCategory] = useState<Product["category"]>("jeans")
  const [style, setStyle] = useState<Product["style"]>("Casual")
  const [gender, setGender] = useState<Product["gender"]>("Woman")
  const [badge, setBadge] = useState<"Best Seller" | "New" | "Promotion" | "none">("none")
  const [sizes, setSizes] = useState<Product["sizes"]>(["S", "M", "L"])
  const [imageUrl, setImageUrl] = useState("")
  const [description, setDescription] = useState("")
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name)
      setPrice(String(initialProduct.price))
      setOriginalPrice(String(initialProduct.originalPrice || initialProduct.price))
      setCategory(initialProduct.category)
      setStyle(initialProduct.style)
      setGender(initialProduct.gender)
      setBadge(initialProduct.badge || "none")
      setSizes(initialProduct.sizes || [])
      setImageUrl(initialProduct.imageUrl)
      setDescription(initialProduct.description)
    } else {
      setName("")
      setPrice("99.00")
      setOriginalPrice("119.00")
      setCategory("jeans")
      setStyle("Casual")
      setGender("Woman")
      setBadge("New")
      setSizes(["S", "M", "L"])
      setImageUrl(PRESET_IMAGES[0].url)
      setDescription("Nowoczesne ubranie z najwyższej jakości denimu BLUE.JEANS.")
    }
    setFormError(null)
  }, [initialProduct, isOpen])

  const toggleSize = (size: (typeof SIZES)[number]) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!name.trim()) {
      setFormError("Nazwa produktu jest wymagana.")
      return
    }
    const parsedPrice = parseFloat(price)
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setFormError("Podaj poprawną cenę produktu.")
      return
    }
    if (!imageUrl.trim()) {
      setFormError("Wprowadź URL zdjęcia lub wybierz z gotowych szablonów.")
      return
    }
    if (sizes.length === 0) {
      setFormError("Wybierz przynajmniej jeden dostępny rozmiar.")
      return
    }

    try {
      setSaving(true)
      const payload: Omit<Product, "id"> = {
        name: name.trim(),
        price: parsedPrice,
        originalPrice: parseFloat(originalPrice) || parsedPrice,
        category,
        style,
        gender,
        badge: badge === "none" ? undefined : badge,
        sizes,
        imageUrl: imageUrl.trim(),
        description: description.trim(),
      }

      await onSave(payload, initialProduct?.id)
      setSaving(false)
      onClose()
    } catch (err) {
      setSaving(false)
      setFormError("Wystąpił błąd podczas zapisywania produktu.")
      console.error(err)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className='fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className='relative w-full max-w-3xl bg-[#FDFCFB] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] my-8 overflow-hidden'
        >
          {/* Header */}
          <div className='bg-[#2B3E50] text-white px-6 py-4 border-b-2 border-black flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Sparkles size={20} className='text-amber-400' />
              <h2 className='text-base font-black uppercase tracking-wider'>
                {initialProduct ? "Edytuj Produkt" : "Dodaj Nowy Produkt"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className='p-1 bg-white text-black border border-black hover:bg-red-500 hover:text-white transition-colors'
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='p-6 space-y-6 max-h-[80vh] overflow-y-auto'>
            {formError && (
              <div className='p-3 bg-red-100 border border-red-500 text-red-700 text-xs font-bold'>
                {formError}
              </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Lewa kolumna: Podstawowe informacje */}
              <div className='space-y-4'>
                <div>
                  <label className='block text-xs font-black uppercase tracking-wider text-black mb-1'>
                    Nazwa produktu *
                  </label>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='np. Jeansy High Waist Vintage'
                    className='w-full px-3 py-2 bg-white border border-black text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-black'
                    required
                  />
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='block text-xs font-black uppercase tracking-wider text-black mb-1'>
                      Cena (PLN) *
                    </label>
                    <input
                      type='number'
                      step='0.01'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder='99.00'
                      className='w-full px-3 py-2 bg-white border border-black text-xs font-semibold focus:outline-hidden'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-xs font-black uppercase tracking-wider text-black mb-1'>
                      Stara cena (PLN)
                    </label>
                    <input
                      type='number'
                      step='0.01'
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder='129.00'
                      className='w-full px-3 py-2 bg-white border border-black text-xs font-semibold focus:outline-hidden'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='block text-xs font-black uppercase tracking-wider text-black mb-1'>
                      Kategoria *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Product["category"])}
                      className='w-full px-3 py-2 bg-white border border-black text-xs font-bold focus:outline-hidden'
                    >
                      <option value='jeans'>Jeansy</option>
                      <option value='jackets'>Kurtki</option>
                      <option value='shorts'>Szorty</option>
                      <option value='skirts'>Spódnice</option>
                      <option value='shirts'>Koszule</option>
                      <option value='overalls'>Kombinezony</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-xs font-black uppercase tracking-wider text-black mb-1'>
                      Styl *
                    </label>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value as Product["style"])}
                      className='w-full px-3 py-2 bg-white border border-black text-xs font-bold focus:outline-hidden'
                    >
                      {STYLES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='block text-xs font-black uppercase tracking-wider text-black mb-1'>
                      Dla kogo (Płeć)
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as Product["gender"])}
                      className='w-full px-3 py-2 bg-white border border-black text-xs font-bold focus:outline-hidden'
                    >
                      <option value='Woman'>Kobieta</option>
                      <option value='Man'>Mężczyzna</option>
                      <option value='Unisex'>Unisex</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-xs font-black uppercase tracking-wider text-black mb-1'>
                      Odznaka (Badge)
                    </label>
                    <select
                      value={badge}
                      onChange={(e) => setBadge(e.target.value as typeof badge)}
                      className='w-full px-3 py-2 bg-white border border-black text-xs font-bold focus:outline-hidden'
                    >
                      <option value='none'>Brak</option>
                      <option value='Best Seller'>Best Seller</option>
                      <option value='New'>Nowość (New)</option>
                      <option value='Promotion'>Promocja</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className='block text-xs font-black uppercase tracking-wider text-black mb-2'>
                    Dostępne Rozmiary *
                  </label>
                  <div className='flex flex-wrap gap-2'>
                    {SIZES.map((sz) => {
                      const isSelected = sizes.includes(sz)
                      return (
                        <button
                          type='button'
                          key={sz}
                          onClick={() => toggleSize(sz)}
                          className={`px-3 py-1.5 text-xs font-black border transition-all ${
                            isSelected
                              ? "bg-[#E11D48] text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                              : "bg-white text-black border-stone-300 hover:border-black"
                          }`}
                        >
                          {sz}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Prawa kolumna: Obrazek & Opis */}
              <div className='space-y-4 flex flex-col justify-between'>
                <div>
                  <label className='block text-xs font-black uppercase tracking-wider text-black mb-1'>
                    URL Obrazka *
                  </label>
                  <input
                    type='url'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder='https://...'
                    className='w-full px-3 py-2 bg-white border border-black text-xs font-semibold focus:outline-hidden mb-2'
                    required
                  />

                  {/* Szybki wybór zdjęć wzorcowych */}
                  <div className='mb-3'>
                    <span className='text-[10px] font-bold text-stone-500 block mb-1 uppercase tracking-wider'>
                      Szybki wybór zdjęcia demonstracyjnego:
                    </span>
                    <div className='flex gap-1.5 flex-wrap'>
                      {PRESET_IMAGES.map((img) => (
                        <button
                          type='button'
                          key={img.label}
                          onClick={() => setImageUrl(img.url)}
                          className={`text-[10px] px-2 py-0.5 border font-semibold ${
                            imageUrl === img.url
                              ? "bg-black text-white border-black"
                              : "bg-stone-100 text-stone-700 border-stone-300 hover:border-black"
                          }`}
                        >
                          {img.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Podgląd obrazka */}
                  <div className='w-full h-44 bg-stone-100 border border-black flex items-center justify-center overflow-hidden relative group'>
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imageUrl}
                        alt='Podgląd'
                        className='w-full h-full object-cover'
                        onError={(e) => {
                          ;(e.target as HTMLElement).style.display = "none"
                        }}
                      />
                    ) : (
                      <div className='text-center p-4 text-stone-400'>
                        <ImageIcon size={32} className='mx-auto mb-1' />
                        <span className='text-xs font-bold block'>Podgląd zdjęcia</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className='block text-xs font-black uppercase tracking-wider text-black mb-1'>
                    Opis produktu
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Krótki opis przedmiotu...'
                    className='w-full px-3 py-2 bg-white border border-black text-xs focus:outline-hidden'
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className='pt-4 border-t border-black flex items-center justify-end gap-3'>
              <button
                type='button'
                onClick={onClose}
                className='px-5 py-2.5 bg-stone-200 border border-black text-xs font-black uppercase tracking-wider hover:bg-stone-300 transition-colors'
              >
                Anuluj
              </button>
              <button
                type='submit'
                disabled={saving}
                className='px-6 py-2.5 bg-[#E11D48] text-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase tracking-wider hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2'
              >
                {saving ? (
                  <span>Zapisywanie...</span>
                ) : (
                  <>
                    <Check size={16} />
                    <span>{initialProduct ? "Zapisz Zmiany" : "Dodaj Produkt"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
