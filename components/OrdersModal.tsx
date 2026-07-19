'use client';

import React, { useState } from 'react';
import { useStore, Order } from './StoreContext';
import { useAuth } from './AuthContext';
import { X, ClipboardList, RefreshCw, Calendar, Truck, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrdersModal({ isOpen, onClose }: OrdersModalProps) {
  const { orders, loadingOrders } = useStore();
  const { user } = useAuth();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 flex flex-col max-h-[85vh] rounded-none"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b-2 border-black flex items-center justify-between bg-[#FDFCFB]">
            <div className="flex items-center gap-2.5">
              <ClipboardList size={18} className="text-[#E11D48]" />
              <div>
                <h3 className="font-black text-xl text-stone-900 uppercase italic tracking-tighter leading-none">
                  Twoja Historia Zakupów
                </h3>
                <p className="text-[10px] text-[#2B3E50] font-black uppercase tracking-widest mt-1.5">
                  Wszystkie zrealizowane i bieżące zamówienia
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 border-2 border-black bg-white hover:bg-black hover:text-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors rounded-none cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Orders list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FDFCFB]">
            {!user ? (
              <div className="text-center py-12 text-stone-500 font-bold uppercase tracking-wider text-xs">
                <p>Musisz być zalogowany, aby przeglądać historię zakupów.</p>
              </div>
            ) : loadingOrders ? (
              <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
                <RefreshCw size={24} className="animate-spin text-[#E11D48]" />
                <p className="text-xs text-stone-600 font-bold uppercase tracking-wider">Pobieranie zamówień z bazy danych...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-12 h-12 rounded-none bg-rose-50 flex items-center justify-center mx-auto border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <ClipboardList size={20} className="text-[#E11D48]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-stone-900 text-xs uppercase tracking-widest">Brak zamówień w historii</h4>
                  <p className="text-xs text-stone-600 mt-1 max-w-[240px] mx-auto leading-relaxed font-semibold">
                    Nie dokonałeś jeszcze żadnych zakupów z tego konta. Sfinalizuj transakcję, aby zobaczyć historię!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const isExpanded = expandedOrderId === order.id;
                  return (
                    <div
                      key={order.id}
                      className="border-2 border-black rounded-none overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {/* Accordion Header */}
                      <div
                        onClick={() => toggleExpand(order.id)}
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#F8F7F3] transition-colors"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black text-stone-900">{order.id}</span>
                            <span className="text-[10px] bg-rose-100 text-[#E11D48] border-2 border-black px-2 py-0.5 rounded-none font-black uppercase tracking-wider">
                              {order.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-bold uppercase tracking-wider">
                            <Calendar size={11} />
                            <span>{formatDate(order.createdAt)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">Suma opłacona</p>
                            <p className="font-mono text-sm font-black text-stone-900">${order.totalAmount.toFixed(2)}</p>
                          </div>
                          {isExpanded ? <ChevronUp size={16} className="text-black" /> : <ChevronDown size={16} className="text-black" />}
                        </div>
                      </div>

                      {/* Accordion Body */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t-2 border-black bg-[#FDFCFB] p-4 space-y-4 text-xs sm:text-sm"
                          >
                            {/* Courier Tracker / Status Steps */}
                            <div className="space-y-2.5 bg-white p-3.5 border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                              <div className="flex justify-between items-center text-[10px] font-black text-stone-500 uppercase tracking-widest">
                                <span className="flex items-center gap-1"><Truck size={13} className="text-black" /> Status Dostawy</span>
                                <span className="font-mono text-[#E11D48]">Śledzenie: {order.trackingNumber}</span>
                              </div>

                              {/* Progress bar visual */}
                              <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px] font-black uppercase tracking-widest">
                                <div className="space-y-1.5 text-emerald-700">
                                  <div className="w-5 h-5 rounded-none bg-[#FDFCFB] text-emerald-600 border-2 border-black flex items-center justify-center mx-auto">
                                    <CheckCircle2 size={11} />
                                  </div>
                                  <span>Złożone</span>
                                </div>
                                <div className="space-y-1.5 text-emerald-700">
                                  <div className="w-5 h-5 rounded-none bg-[#FDFCFB] text-emerald-600 border-2 border-black flex items-center justify-center mx-auto">
                                    <CheckCircle2 size={11} />
                                  </div>
                                  <span>Opłacone</span>
                                </div>
                                <div className="space-y-1.5 text-[#E11D48]">
                                  <div className="w-5 h-5 rounded-none bg-[#E11D48] text-white border-2 border-black flex items-center justify-center mx-auto text-[9px] font-black animate-pulse">
                                    3
                                  </div>
                                  <span>Kurier DPD</span>
                                </div>
                                <div className="space-y-1.5 text-stone-400">
                                  <div className="w-5 h-5 rounded-none bg-stone-100 text-stone-400 border-2 border-stone-300 flex items-center justify-center mx-auto text-[9px] font-black">
                                    4
                                  </div>
                                  <span>Odbiór</span>
                                </div>
                              </div>
                            </div>

                            {/* Order Products List */}
                            <div className="space-y-2">
                              <h4 className="font-black text-stone-900 text-xs uppercase tracking-widest">Zakupione artykuły</h4>
                              <div className="space-y-2 bg-white rounded-none border-2 border-black p-2">
                                {order.items.map((item: any) => (
                                  <div key={item.productId} className="flex justify-between items-center text-xs p-1.5 rounded-none hover:bg-[#F8F7F3]">
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-8 h-10 rounded-none overflow-hidden bg-stone-100 border-2 border-black shrink-0">
                                        <Image src={item.imageUrl} alt={item.name} width={32} height={40} className="w-full h-full object-cover" />
                                      </div>
                                      <div>
                                        <p className="font-black text-stone-900">{item.name}</p>
                                        <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-0.5">Rozmiar: {item.size} • Ilość: {item.quantity}</p>
                                      </div>
                                    </div>
                                    <span className="font-mono font-black text-stone-900">${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div className="bg-white p-3 border-2 border-black rounded-none space-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <span className="text-[10px] font-black text-stone-900 uppercase tracking-widest block">Adres dostawy</span>
                                <p className="font-black text-stone-800">{order.shippingAddress.name}</p>
                                <p className="text-stone-700 font-semibold">{order.shippingAddress.street}</p>
                                <p className="text-stone-700 font-semibold">{order.shippingAddress.zip} {order.shippingAddress.city}</p>
                                <p className="text-stone-500 font-mono text-[11px] font-bold mt-1.5 uppercase tracking-wide">Tel: {order.shippingAddress.phone}</p>
                              </div>
                              <div className="bg-white p-3 border-2 border-black rounded-none flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-black text-stone-900 uppercase tracking-widest block">Metoda płatności</span>
                                  <p className="font-black text-stone-800">{order.paymentMethod}</p>
                                </div>
                                <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500 font-bold uppercase tracking-wider">
                                  {order.discountAmount > 0 ? (
                                    <p className="text-emerald-700 font-black">Rabat: -${order.discountAmount.toFixed(2)}</p>
                                  ) : (
                                    <p>Brak rabatów</p>
                                  )}
                                </div>
                              </div>
                            </div>

                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer inside dialog */}
          <div className="px-6 py-4 bg-[#FDFCFB] rounded-none border-t-2 border-black flex items-center justify-between text-[10px] text-stone-600 font-bold uppercase tracking-wider">
            <span>Realizacja kurierem DPD na terenie Polski.</span>
            <button
              onClick={() => alert('W celu reklamacji, zwrotów lub poprawek w dostawie dzwoń na infolinię: 123-464-9874')}
              className="text-[#E11D48] font-black uppercase tracking-wider hover:underline cursor-pointer"
            >
              Centrum Pomocy
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
