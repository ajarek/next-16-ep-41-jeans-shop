'use client';

import React, { useState } from 'react';
import { useStore, ShippingAddress } from './StoreContext';
import { useAuth } from './AuthContext';
import { X, ArrowLeft, CreditCard, ShoppingBag, ShieldCheck, CheckCircle2, Lock, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, checkout, promoCode, promoDiscount } = useStore();
  const { user } = useAuth();
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Address, 2: Payment, 3: Processing, 4: Success
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  // Address State
  const [address, setAddress] = useState<ShippingAddress>({
    name: user ? user.displayName || 'Jarek' : 'Jarek',
    street: 'Królewska 25',
    city: 'Warszawa',
    zip: '00-060',
    phone: '500-100-200',
  });

  // Credit Card State
  const [cardNo, setCardNo] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');
  const [paymentMethod, setPaymentMethod] = useState<'Karta' | 'BLIK' | 'Przelew'>('Karta');
  const [blikCode, setBlikCode] = useState('');

  if (!isOpen) return null;

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = cartSubtotal * promoDiscount;
  const finalTotal = cartSubtotal - discountAmount;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    }
  };

  const handleSimulatePayment = async () => {
    setStep(3); // Start Processing
    try {
      const order = await checkout(address, {
        method: paymentMethod === 'Karta' ? 'Karta płatnicza' : paymentMethod === 'BLIK' ? 'BLIK' : 'Przelew bankowy',
      });
      setCreatedOrder(order);
      setStep(4); // Success!
    } catch (err: any) {
      alert(`Błąd podczas przetwarzania zamówienia: ${err.message}`);
      setStep(2); // Go back
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl overflow-hidden bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 flex flex-col md:flex-row max-h-[90vh] rounded-none"
        >
          {/* Close trigger - hide on success */}
          {step !== 4 && step !== 3 && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-1.5 border-2 border-black bg-white hover:bg-black hover:text-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors rounded-none cursor-pointer"
            >
              <X size={16} />
            </button>
          )}

          {/* LEFT SIDE: STEPS & CONTENT */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto max-h-[50vh] md:max-h-[90vh] bg-[#FDFCFB]">
            
            {/* Header / Steps Indicator */}
            {step !== 3 && step !== 4 && (
              <div className="flex items-center gap-4 mb-6">
                {step === 2 && (
                  <button
                    onClick={() => setStep(1)}
                    className="p-1.5 border-2 border-black bg-white hover:bg-black hover:text-white text-black rounded-none cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <ArrowLeft size={14} />
                  </button>
                )}
                <div>
                  <h3 className="font-black text-xl sm:text-2xl text-stone-900 uppercase italic tracking-tighter leading-none">
                    Sfinalizuj Zamówienie
                  </h3>
                  <p className="text-[10px] text-[#2B3E50] font-black uppercase tracking-wider mt-1.5">
                    Krok {step} z 2: {step === 1 ? 'Adres dostawy' : 'Szybka płatność online'}
                  </p>
                </div>
              </div>
            )}

            {/* STEP 1: SHIPPING ADDRESS FORM */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest">
                    Imię i Nazwisko / Firma
                  </label>
                  <input
                    type="text"
                    required
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    placeholder="Np. Jan Kowalski"
                    className="w-full px-4 py-2.5 bg-white border-2 border-black text-xs sm:text-sm font-semibold focus:outline-hidden focus:bg-[#F8F7F3] rounded-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest">
                    Ulica i numer domu
                  </label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="Np. Marszałkowska 12"
                    className="w-full px-4 py-2.5 bg-white border-2 border-black text-xs sm:text-sm font-semibold focus:outline-hidden focus:bg-[#F8F7F3] rounded-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest">
                      Kod pocztowy
                    </label>
                    <input
                      type="text"
                      required
                      value={address.zip}
                      onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                      placeholder="00-000"
                      className="w-full px-4 py-2.5 bg-white border-2 border-black text-xs sm:text-sm text-center font-mono font-black focus:outline-hidden focus:bg-[#F8F7F3] rounded-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest">
                      Miejscowość / Miasto
                    </label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="Np. Warszawa"
                      className="w-full px-4 py-2.5 bg-white border-2 border-black text-xs sm:text-sm font-semibold focus:outline-hidden focus:bg-[#F8F7F3] rounded-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest">
                    Telefon kontaktowy
                    <span className="text-[9px] text-stone-400 lowercase italic ml-1">Do kuriera</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="500-000-000"
                    className="w-full px-4 py-2.5 bg-white border-2 border-black text-xs sm:text-sm font-semibold focus:outline-hidden focus:bg-[#F8F7F3] rounded-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all py-3.5 text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2 mt-6 rounded-none"
                >
                  <span>Dalej do płatności</span>
                  <ArrowLeft size={14} className="rotate-180" />
                </button>
              </form>
            )}

            {/* STEP 2: ONLINE PAYMENT SIMULATION */}
            {step === 2 && (
              <div className="space-y-6">
                {/* Payment Method Selector */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {[
                    { id: 'Karta', label: 'Karta płatnicza', icon: <CreditCard size={14} /> },
                    { id: 'BLIK', label: 'BLIK', icon: <span className="font-sans font-black text-[10px] tracking-tight text-stone-900 leading-none">BLIK</span> },
                    { id: 'Przelew', label: 'Szybki przelew', icon: <ShieldCheck size={14} className="text-emerald-500" /> },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-3 border-2 border-black flex flex-col items-center justify-center gap-1.5 font-bold transition-all rounded-none cursor-pointer ${
                        paymentMethod === method.id
                          ? 'bg-[#E11D48] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] scale-102'
                          : 'bg-white hover:bg-[#F8F7F3] text-stone-700'
                      }`}
                    >
                      {method.icon}
                      <span className="text-[10px] uppercase font-black tracking-wider">{method.label}</span>
                    </button>
                  ))}
                </div>

                {/* Sub-form based on method */}
                {paymentMethod === 'Karta' && (
                  <div className="space-y-4 bg-white p-4 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-center text-xs font-black text-stone-900 uppercase tracking-widest">
                      <span>KARTA KREDYTOWA / DEBETOWA</span>
                      <Lock size={12} className="text-stone-900" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest">Numer karty</label>
                      <input
                        type="text"
                        value={cardNo}
                        onChange={(e) => setCardNo(e.target.value)}
                        placeholder="4111 2222 3333 4444"
                        className="w-full px-4 py-2 bg-white border-2 border-black text-xs sm:text-sm font-mono font-bold focus:outline-hidden rounded-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest">Ważność</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/RR"
                          className="w-full px-4 py-2 bg-white border-2 border-black text-xs sm:text-sm text-center font-mono font-bold focus:outline-hidden rounded-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest">CVC / CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full px-4 py-2 bg-white border-2 border-black text-xs sm:text-sm text-center font-mono font-bold focus:outline-hidden rounded-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'BLIK' && (
                  <div className="space-y-4 bg-white p-4 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-center text-xs font-black text-stone-900 uppercase tracking-widest">
                      <span>WPROWADŹ KOD BLIK</span>
                      <span className="font-black text-[#E11D48]">BLIK</span>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="000 000"
                        value={blikCode}
                        onChange={(e) => setBlikCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full py-3 bg-white border-2 border-black text-xl font-black tracking-widest text-center text-[#E11D48] focus:outline-hidden rounded-none"
                      />
                      <p className="text-[10px] text-stone-600 font-bold text-center leading-relaxed uppercase tracking-wider">
                        Wygeneruj kod w swojej aplikacji bankowej, wpisz go tutaj i zaakceptuj transakcję na telefonie.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Przelew' && (
                  <div className="space-y-4 bg-white p-4 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-center text-xs font-black text-stone-900 uppercase tracking-widest">
                      <span>WYBIERZ SWÓJ BANK</span>
                      <ShieldCheck size={14} className="text-emerald-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold uppercase tracking-wider">
                      {['PKO BP', 'mBank', 'ING Bank', 'Pekao SA'].map((bank) => (
                        <button
                          key={bank}
                          onClick={() => alert(`Po kliknięciu sfinalizowania nastąpi przekierowanie i automatyczna autoryzacja z banku ${bank}.`)}
                          className="p-2 border-2 border-black bg-white hover:bg-black hover:text-white text-stone-700 transition-all text-[11px] rounded-none cursor-pointer"
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSimulatePayment}
                  className="w-full bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all py-3.5 text-xs font-bold uppercase tracking-widest cursor-pointer mt-6 rounded-none flex items-center justify-center gap-2"
                >
                  <span>Zapłać ${finalTotal.toFixed(2)} i zamów</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[9px] text-stone-500 font-bold uppercase tracking-wider text-center">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  <span>Szyfrowane połączenie i symulowane testowe środowisko płatności.</span>
                </div>
              </div>
            )}

            {/* STEP 3: LOADING PAYMENT PROGRESS */}
            {step === 3 && (
              <div className="text-center py-20 space-y-6 flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-stone-200 border-t-[#E11D48] rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-[#E11D48]">
                     <CreditCard size={20} className="animate-pulse" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-black text-lg text-stone-900 uppercase italic tracking-tighter">Autoryzacja płatności...</h3>
                  <p className="text-xs text-stone-500 max-w-xs leading-relaxed font-semibold">
                    Łączenie z bankiem i bezpiecznym operatorem transakcji. Proszę nie odświeżać tej strony.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 4: ORDER SUCCESS DETAILS */}
            {step === 4 && createdOrder && (
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-rose-100 text-[#E11D48] rounded-none flex items-center justify-center mx-auto border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="font-black text-2xl uppercase italic tracking-tighter text-stone-950">
                    Dziękujemy za zamówienie!
                  </h3>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed font-bold uppercase tracking-wide">
                    Płatność została pomyślnie autoryzowana. Twoje zamówienie jest już przekazane do realizacji w naszym magazynie.
                  </p>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-none space-y-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs sm:text-sm">
                  <div className="flex justify-between items-center pb-2 border-b-2 border-stone-200">
                    <span className="text-stone-500 uppercase tracking-wider font-bold text-[10px]">ID Zamówienia:</span>
                    <strong className="font-mono text-stone-900 text-sm tracking-wide font-black">{createdOrder.id}</strong>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b-2 border-stone-200">
                    <span className="text-stone-500 uppercase tracking-wider font-bold text-[10px]">Numer nadania kuriera:</span>
                    <strong className="font-mono text-[#E11D48] font-black">{createdOrder.trackingNumber}</strong>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b-2 border-stone-200">
                    <span className="text-stone-500 uppercase tracking-wider font-bold text-[10px]">Adres wysyłki:</span>
                    <span className="text-right text-stone-800 font-black">{createdOrder.shippingAddress.name}, {createdOrder.shippingAddress.street}, {createdOrder.shippingAddress.city}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 uppercase tracking-wider font-bold text-[10px]">Przewidywana dostawa:</span>
                    <span className="text-emerald-700 font-black uppercase tracking-wider">Jutro (w ciągu 24h)</span>
                  </div>
                </div>

                {user && (
                  <p className="text-[10px] text-stone-500 text-center font-black uppercase tracking-wider">
                    To zamówienie zostało zapisane w Twojej historii zakupów!
                  </p>
                )}

                <button
                  onClick={() => {
                    onClose();
                    setStep(1);
                  }}
                  className="w-full bg-[#E11D48] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all py-3.5 text-xs font-bold uppercase tracking-widest cursor-pointer rounded-none flex items-center justify-center gap-2"
                >
                  <span>Wróć do sklepu</span>
                </button>
              </div>
            )}

          </div>

          {/* RIGHT SIDE: BILL SUMMARY (Hidden on success screen to avoid clutter) */}
          {step !== 4 && step !== 3 && (
            <div className="w-full md:w-[280px] bg-[#FDFCFB] border-t-2 md:border-t-0 md:border-l-2 border-black p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-black text-stone-900 text-xs uppercase tracking-widest mb-4 pb-1.5 border-b-2 border-black">
                  Podsumowanie Koszyka
                </h4>
                
                {/* Scroll of cart items */}
                <div className="space-y-3 overflow-y-auto max-h-[140px] pr-1 scrollbar-thin">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-2.5 items-center justify-between text-xs">
                      <div className="truncate max-w-[150px]">
                        <span className="font-black text-stone-900 font-mono">{item.quantity}x</span>{' '}
                        <span className="text-stone-800 font-semibold">{item.product.name}</span>
                        <span className="text-[9px] text-[#2B3E50] font-black uppercase tracking-wider block">Rozmiar: {item.size}</span>
                      </div>
                      <span className="font-black text-stone-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-black border-t-2 my-4" />

                {/* Bill */}
                <div className="space-y-2 text-xs font-bold uppercase tracking-wider">
                  <div className="flex justify-between text-stone-500 text-[10px]">
                    <span>Podsuma</span>
                    <span className="font-black text-stone-900">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-black text-[10px]">
                      <span>Zniżka {promoCode}</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-500 text-[10px]">
                    <span>Dostawa</span>
                    <span className="text-emerald-600 font-black tracking-widest uppercase">Gratis</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-black">
                <div className="flex justify-between items-baseline text-stone-950 mb-4">
                  <span className="text-xs font-black uppercase tracking-widest">Suma Razem</span>
                  <span className="text-xl font-black font-mono text-[#E11D48]">${finalTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-none border-2 border-black text-[9px] text-stone-600 font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <ShieldCheck size={13} className="text-[#E11D48] shrink-0" />
                  <span>Szyfrowanie 256-bit</span>
                </div>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
