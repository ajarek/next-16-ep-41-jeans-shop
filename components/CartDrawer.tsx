"use client"

import React, { useState } from "react"
import { useStore } from "./StoreContext"
import {
  X,
  Trash2,
  Tag,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  onCheckout: () => void
}

export default function CartDrawer({
  isOpen,
  onClose,
  onCheckout,
}: CartDrawerProps) {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removePromoCode,
  } = useStore()

  const [couponInput, setCouponInput] = useState("")
  const [couponError, setCouponError] = useState("")
  const [couponSuccess, setCouponSuccess] = useState("")

  if (!isOpen) return null

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )
  const discountAmount = subtotal * promoDiscount
  const total = subtotal - discountAmount

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    setCouponError("")
    setCouponSuccess("")

    if (!couponInput) return

    const result = applyPromoCode(couponInput)
    if (result.success) {
      setCouponSuccess(result.message)
      setCouponInput("")
    } else {
      setCouponError(result.message)
    }
  }

  return (
    <AnimatePresence>
      <div className='fixed inset-0 z-50 overflow-hidden'>
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className='absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity'
        />

        {/* Sliding drawer panel */}
        <div className='absolute inset-y-0 right-0 max-w-full flex pl-10'>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className='w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l-2 border-black'
          >
            {/* Header */}
            <div className='px-6 py-5 border-b-2 border-black flex items-center justify-between bg-[#F8F7F3]'>
              <div className='flex items-center gap-2'>
                <ShoppingBag size={18} className='text-[#1A1A1A]' />
                <h3 className='text-base font-black uppercase italic tracking-tighter text-[#1A1A1A]'>
                  Twój Koszyk
                </h3>
              </div>
              <button
                onClick={onClose}
                className='p-1.5 border border-black bg-white hover:bg-black hover:text-white text-[#1A1A1A] transition-colors rounded-none cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
              >
                <X size={14} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className='flex-1 overflow-y-auto p-6 space-y-6 bg-[#FDFCFB]'>
              {cart.length === 0 ? (
                <div className='text-center py-24 space-y-4'>
                  <div className='w-16 h-16 bg-white border-2 border-black flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                    <ShoppingBag size={24} className='text-[#E11D48]' />
                  </div>
                  <div>
                    <h4 className='text-base font-black uppercase tracking-tight text-stone-950'>
                      Koszyk jest pusty
                    </h4>
                    <p className='text-xs font-bold uppercase tracking-wide text-stone-500 mt-1.5 max-w-[200px] mx-auto'>
                      Nie dodałeś jeszcze żadnych jeansowych ubrań do swojego
                      koszyka.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className='px-5 py-2.5 bg-[#E11D48] text-white text-xs font-bold uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer rounded-none'
                  >
                    Przeglądaj sklep →
                  </button>
                </div>
              ) : (
                <div className='space-y-4'>
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className='flex gap-4 p-3 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    >
                      <div className='w-16 h-20 overflow-hidden shrink-0 bg-[#F8F7F3] border-2 border-black rounded-none'>
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className='w-full h-full object-cover'
                          referrerPolicy='no-referrer'
                          width={64}
                          height={80}
                        />
                      </div>

                      <div className='flex-1 flex flex-col justify-between py-0.5'>
                        <div className='space-y-0.5'>
                          <h4 className='text-xs sm:text-sm font-black uppercase tracking-tight text-stone-900 truncate max-w-[180px]'>
                            {item.product.name}
                          </h4>
                          <p className='text-[10px] font-black uppercase tracking-widest text-[#2B3E50]'>
                            Rozmiar:{" "}
                            <strong className='text-[#E11D48]'>
                              {item.size}
                            </strong>{" "}
                            • {item.product.style}
                          </p>
                        </div>

                        <div className='flex items-center justify-between mt-1'>
                          {/* Quantity Controls */}
                          <div className='flex items-center border-2 border-black rounded-none overflow-hidden bg-white scale-90 -ml-1'>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.product.id,
                                  item.size,
                                  item.quantity - 1,
                                )
                              }
                              className='px-2 py-0.5 text-stone-900 hover:bg-[#F8F7F3] font-black cursor-pointer'
                            >
                              -
                            </button>
                            <span className='px-2 text-xs font-mono font-bold text-stone-800'>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.product.id,
                                  item.size,
                                  item.quantity + 1,
                                )
                              }
                              className='px-2 py-0.5 text-stone-900 hover:bg-[#F8F7F3] font-black cursor-pointer'
                            >
                              +
                            </button>
                          </div>

                          <div className='flex items-center gap-3'>
                            <span className='text-xs sm:text-sm font-black text-stone-950'>
                              zł
                              {(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() =>
                                removeFromCart(item.product.id, item.size)
                              }
                              className='text-stone-400 hover:text-red-500 border border-transparent hover:border-black hover:bg-red-50 p-1 rounded-none cursor-pointer'
                              title='Usuń produkt'
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom calculation, promo code & checkout button */}
            {cart.length > 0 && (
              <div className='border-t-2 border-black bg-[#F8F7F3] p-6 space-y-4'>
                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className='space-y-1.5'>
                  <div className='flex gap-2'>
                    <div className='relative flex-1'>
                      <Tag
                        size={13}
                        className='absolute left-3 top-3 text-[#1A1A1A]'
                      />
                      <input
                        type='text'
                        placeholder='Kod rabatowy (np. TEES25)'
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className='w-full pl-8 pr-3 py-2 bg-white border-2 border-black text-xs uppercase font-bold focus:outline-hidden'
                      />
                    </div>
                    <button
                      type='submit'
                      className='px-4 py-2 bg-[#2B3E50] text-white border-2 border-black hover:bg-black text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer rounded-none'
                    >
                      Dodaj
                    </button>
                  </div>

                  {couponError && (
                    <p className='text-[10px] text-red-600 font-bold pl-1 uppercase tracking-wide'>
                      {couponError}
                    </p>
                  )}
                  {couponSuccess && (
                    <p className='text-[10px] text-emerald-600 font-bold pl-1 uppercase tracking-wide'>
                      {couponSuccess}
                    </p>
                  )}

                  {promoCode && (
                    <div className='flex items-center justify-between bg-rose-50 text-[#E11D48] text-[9px] font-black uppercase py-1 px-2.5 border-2 border-black mt-1'>
                      <span className='flex items-center gap-1'>
                        <Tag size={10} />
                        KOD: {promoCode} (-25%)
                      </span>
                      <button
                        type='button'
                        onClick={removePromoCode}
                        className='text-black font-black uppercase underline hover:text-[#E11D48]'
                      >
                        Usuń
                      </button>
                    </div>
                  )}
                </form>

                {/* Bill details */}
                <div className='space-y-1.5 text-xs font-bold uppercase tracking-wider text-stone-700'>
                  <div className='flex justify-between'>
                    <span>Suma</span>
                    <span className='text-stone-900'>
                      zł{subtotal.toFixed(2)}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className='flex justify-between text-[#E11D48]'>
                      <span>Rabat promocyjny ({promoCode})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className='flex justify-between'>
                    <span>Koszt dostawy</span>
                    <span className='font-black text-emerald-600'>DARMOWA</span>
                  </div>
                  <hr className='border-black border-t-2 my-2' />
                  <div className='flex justify-between items-baseline text-stone-900'>
                    <span className='text-sm font-black'>
                      Do zapłaty (Razem)
                    </span>
                    <span className='text-lg font-mono font-black'>
                      zł{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={onCheckout}
                  className='w-full bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all py-3.5 text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2 rounded-none'
                >
                  <span>Przejdź do kasy</span>
                  <ArrowRight size={15} />
                </button>

                <div className='flex items-center justify-center gap-1.5 text-[9px] text-stone-500 font-bold uppercase tracking-wide text-center'>
                  <ShieldCheck size={11} className='text-emerald-600' />
                  <span>Bezpieczne płatności online SSL</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}
