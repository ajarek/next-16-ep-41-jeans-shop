"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  ShoppingBag,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Printer,
  Calendar,
  User,
  MapPin,
  Phone,
  CreditCard,
  X,
  Database,
  ArrowUpDown,
  Tag,
  Package,
  FileText,
  Edit2,
  Check,
} from "lucide-react"
import Image from "next/image"
import type { Order, OrderStatus } from "@/lib/types"
import {
  fetchAdminOrdersFromFirestore,
  updateOrderStatusInFirestore,
} from "@/lib/orders"

interface AdminOrdersViewProps {
  onNotification?: (msg: string) => void
}

const STATUS_COLORS: Record<
  OrderStatus,
  { bg: string; text: string; border: string; badgeBg: string }
> = {
  "Płatność zaakceptowana": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-700",
    badgeBg: "bg-blue-600 text-white",
  },
  "Wysyłka w toku": {
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-700",
    badgeBg: "bg-amber-500 text-black",
  },
  Dostarczono: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-700",
    badgeBg: "bg-emerald-600 text-white",
  },
  Anulowano: {
    bg: "bg-rose-50",
    text: "text-rose-800",
    border: "border-rose-700",
    badgeBg: "bg-rose-600 text-white",
  },
}

export default function AdminOrdersView({ onNotification }: AdminOrdersViewProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState<"firestore" | "local">("firestore")
  const [fetchError, setFetchError] = useState<string | null>(null)

  // Filtry i Sortowanie
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest" | "lowest">("newest")

  // Modale
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [printModalOrder, setPrintModalOrder] = useState<Order | null>(null)

  // Stan edycji statusu w locie
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null)

  // Stan edycji numeru tracking w modalu
  const [editingTracking, setEditingTracking] = useState(false)
  const [trackingInput, setTrackingInput] = useState("")

  const loadOrders = useCallback(async () => {
    setLoading(true)
    setFetchError(null)
    const result = await fetchAdminOrdersFromFirestore()
    setOrders(result.orders)
    setDataSource(result.source)
    if (result.error) {
      setFetchError(result.error)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  // Obliczenia KPI
  const stats = useMemo(() => {
    const totalCount = orders.length
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0)
    const pendingCount = orders.filter(
      (o) => o.status === "Płatność zaakceptowana" || o.status === "Wysyłka w toku",
    ).length
    const deliveredCount = orders.filter((o) => o.status === "Dostarczono").length
    const avgOrderValue = totalCount > 0 ? totalRevenue / totalCount : 0

    return {
      totalCount,
      totalRevenue: totalRevenue.toFixed(2),
      pendingCount,
      deliveredCount,
      avgOrderValue: avgOrderValue.toFixed(2),
    }
  }, [orders])

  // Filtrowanie i sortowanie zamówień
  const filteredOrders = useMemo(() => {
    return orders
      .filter((o) => {
        const matchesSearch =
          o.id.toLowerCase().includes(search.toLowerCase()) ||
          o.shippingAddress.name.toLowerCase().includes(search.toLowerCase()) ||
          o.shippingAddress.city.toLowerCase().includes(search.toLowerCase()) ||
          o.shippingAddress.street.toLowerCase().includes(search.toLowerCase()) ||
          o.trackingNumber.toLowerCase().includes(search.toLowerCase())

        const matchesStatus =
          statusFilter === "all" || o.status === statusFilter

        return matchesSearch && matchesStatus
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        if (sortBy === "oldest") {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        }
        if (sortBy === "highest") {
          return b.totalAmount - a.totalAmount
        }
        if (sortBy === "lowest") {
          return a.totalAmount - b.totalAmount
        }
        return 0
      })
  }, [orders, search, statusFilter, sortBy])

  // Obsługa zmiany statusu zamówienia w Firestore
  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingOrderId(orderId)
    // Zapisz najpierw optymistycznie w stanie
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    )
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null))
    }

    const success = await updateOrderStatusInFirestore(orderId, newStatus)
    setUpdatingOrderId(null)

    if (success) {
      onNotification?.(`Zaktualizowano status zamówienia ${orderId} na "${newStatus}".`)
    } else {
      onNotification?.(`Zaktualizowano lokalnie zamówienie ${orderId} (brak połączenia Firestore).`)
    }
  }

  // Obsługa zapisu numeru przesyłki tracking
  const handleSaveTracking = async () => {
    if (!selectedOrder) return
    const success = await updateOrderStatusInFirestore(
      selectedOrder.id,
      selectedOrder.status,
      trackingInput,
    )
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id ? { ...o, trackingNumber: trackingInput } : o,
      ),
    )
    setSelectedOrder((prev) => (prev ? { ...prev, trackingNumber: trackingInput } : null))
    setEditingTracking(false)
    if (success) {
      onNotification?.(`Zapisano numer przesyłki ${trackingInput} w Firestore.`)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className='space-y-8'>
      {/* 1. KARTY KPI ZAMÓWIEŃ */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
        {/* Łącznie zamówień */}
        <div className='bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-xs font-black uppercase tracking-wider text-stone-500'>
              Liczba Zamówień
            </span>
            <div className='p-2 bg-stone-100 border border-black'>
              <ShoppingBag size={18} className='text-black' />
            </div>
          </div>
          <p className='text-3xl font-black text-black'>{stats.totalCount}</p>
          <p className='text-[10px] font-bold text-stone-400 mt-1 uppercase tracking-wider'>
            Wszystkie zarejestrowane transakcje
          </p>
        </div>

        {/* Całkowity Przychód */}
        <div className='bg-[#F8F7F3] border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-xs font-black uppercase tracking-wider text-stone-500'>
              Suma Zamówień (Przychód)
            </span>
            <div className='p-2 bg-emerald-100 border border-black'>
              <DollarSign size={18} className='text-emerald-800' />
            </div>
          </div>
          <p className='text-3xl font-black text-black'>{stats.totalRevenue} PLN</p>
          <p className='text-[10px] font-bold text-emerald-700 mt-1 uppercase tracking-wider'>
            Średnia wartość zamówienia: {stats.avgOrderValue} PLN
          </p>
        </div>

        {/* Zamówienia W Toku */}
        <div className='bg-amber-50 border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-xs font-black uppercase tracking-wider text-amber-900'>
              W Realizacji / Wysyłce
            </span>
            <div className='p-2 bg-amber-500 text-black border border-black'>
              <Clock size={18} />
            </div>
          </div>
          <p className='text-3xl font-black text-stone-900'>{stats.pendingCount}</p>
          <p className='text-[10px] font-bold text-amber-800 mt-1 uppercase tracking-wider'>
            Wymagają przetworzenia lub nadania
          </p>
        </div>

        {/* Zamówienia Zrealizowane */}
        <div className='bg-emerald-50 border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-xs font-black uppercase tracking-wider text-emerald-900'>
              Dostarczono (Zrealizowane)
            </span>
            <div className='p-2 bg-emerald-600 text-white border border-black'>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <p className='text-3xl font-black text-stone-900'>{stats.deliveredCount}</p>
          <p className='text-[10px] font-bold text-emerald-700 mt-1 uppercase tracking-wider'>
            Zakończone pomyślnie
          </p>
        </div>
      </div>

      {/* 2. PASEK NARZĘDZIOWY (FILTRY, WYSZUKIWARKA, FIRESTORE STATUS) */}
      <div className='bg-white border-2 border-black p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4'>
        <div className='flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4'>
          {/* Wyszukiwarka */}
          <div className='relative flex-1 max-w-md'>
            <input
              type='text'
              placeholder='Szukaj ID, imienia klienta, miasta, nr śledzenia...'
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

          {/* Kontrolki filtrów i odświeżania */}
          <div className='flex flex-wrap items-center gap-3'>
            {/* Filtr Statusu */}
            <div className='flex items-center gap-1.5'>
              <Filter size={14} className='text-stone-500' />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='px-3 py-2 bg-[#F8F7F3] border border-black text-xs font-bold focus:outline-hidden'
              >
                <option value='all'>Wszystkie Statusy</option>
                <option value='Płatność zaakceptowana'>Płatność zaakceptowana</option>
                <option value='Wysyłka w toku'>Wysyłka w toku</option>
                <option value='Dostarczono'>Dostarczono</option>
                <option value='Anulowano'>Anulowano</option>
              </select>
            </div>

            {/* Sortowanie */}
            <div className='flex items-center gap-1.5'>
              <ArrowUpDown size={14} className='text-stone-500' />
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "newest" | "oldest" | "highest" | "lowest")
                }
                className='px-3 py-2 bg-[#F8F7F3] border border-black text-xs font-bold focus:outline-hidden'
              >
                <option value='newest'>Najnowsze pierwsze</option>
                <option value='oldest'>Najstarsze pierwsze</option>
                <option value='highest'>Najwyższa wartość</option>
                <option value='lowest'>Najniższa wartość</option>
              </select>
            </div>

            {/* Przycisk Odświeżenia z Firestore */}
            <button
              onClick={loadOrders}
              disabled={loading}
              className='px-3 py-2 bg-[#1A1A1A] text-white border border-black text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black flex items-center gap-2 transition-all cursor-pointer'
              title='Pobierz zamówienia z bazy danych Firestore'
            >
              <RefreshCw size={14} className={loading ? "animate-spin text-[#E11D48]" : ""} />
              <span>Odśwież Firestore</span>
            </button>
          </div>
        </div>

        {/* Pasek statusu bazy danych Firestore */}
        <div className='flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200 text-[11px] font-bold text-stone-600'>
          <div className='flex items-center gap-2'>
            <Database size={14} className='text-[#E11D48]' />
            <span>
              Źródło danych:{" "}
              <span className='bg-black text-white px-1.5 py-0.5 uppercase tracking-widest text-[9px]'>
                {dataSource === "firestore" ? "Firestore Collection 'orders'" : "Lokale Demo Data"}
              </span>
            </span>
            {fetchError && (
              <span className='text-rose-600 font-normal'>({fetchError})</span>
            )}
          </div>
          <div>
            Pokazywanie{" "}
            <span className='font-mono font-black text-black'>{filteredOrders.length}</span> z{" "}
            <span className='font-mono font-black text-black'>{orders.length}</span> zamówień
          </div>
        </div>
      </div>

      {/* 3. TABELA / LISTA ZAMÓWIEŃ */}
      <div className='bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
        {loading ? (
          <div className='text-center py-20 flex flex-col items-center justify-center gap-3'>
            <RefreshCw size={28} className='animate-spin text-[#E11D48]' />
            <p className='text-xs text-black font-black uppercase tracking-wider'>
              Ładowanie danych z kolekcji "orders" w Firestore...
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className='text-center py-16 space-y-3 bg-[#FDFCFB]'>
            <ShoppingBag size={32} className='mx-auto text-stone-400' />
            <h4 className='font-black text-stone-900 text-sm uppercase tracking-widest'>
              Brak zamówień spełniających kryteria
            </h4>
            <p className='text-xs text-stone-500 font-medium max-w-sm mx-auto'>
              Zmień zapytanie w wyszukiwarce lub wybierz inny filtr statusu.
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-[#1A1A1A] text-white text-[11px] font-black uppercase tracking-wider border-b-2 border-black'>
                  <th className='p-3.5'>ID Zamówienia</th>
                  <th className='p-3.5'>Klient & Adres</th>
                  <th className='p-3.5'>Data złożenia</th>
                  <th className='p-3.5'>Status Firestore</th>
                  <th className='p-3.5'>Artykuły</th>
                  <th className='p-3.5 text-right'>Kwota Całkowita</th>
                  <th className='p-3.5 text-center'>Akcje Admina</th>
                </tr>
              </thead>
              <tbody className='divide-y-2 divide-black text-xs font-semibold'>
                {filteredOrders.map((order) => {
                  const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS["Płatność zaakceptowana"]
                  const isUpdatingThis = updatingOrderId === order.id

                  return (
                    <tr
                      key={order.id}
                      className='hover:bg-[#F8F7F3] transition-colors group'
                    >
                      {/* ID Zamówienia & Nr przesyłki */}
                      <td className='p-3.5 align-top space-y-1'>
                        <div className='font-mono font-black text-stone-900 text-sm'>
                          {order.id}
                        </div>
                        <div className='text-[10px] text-stone-500 font-mono flex items-center gap-1'>
                          <Truck size={12} className='text-stone-400' />
                          <span>{order.trackingNumber}</span>
                        </div>
                      </td>

                      {/* Klient i Adres */}
                      <td className='p-3.5 align-top space-y-0.5'>
                        <p className='font-black text-stone-900 flex items-center gap-1.5'>
                          <User size={13} className='text-[#E11D48]' />
                          {order.shippingAddress.name}
                        </p>
                        <p className='text-[11px] text-stone-600 flex items-center gap-1.5'>
                          <MapPin size={12} className='text-stone-400 shrink-0' />
                          {order.shippingAddress.city}, {order.shippingAddress.street}
                        </p>
                        <p className='text-[10px] text-stone-400 font-mono'>
                          {order.shippingAddress.phone}
                        </p>
                      </td>

                      {/* Data */}
                      <td className='p-3.5 align-top whitespace-nowrap text-stone-600'>
                        <div className='flex items-center gap-1 text-[11px] font-bold'>
                          <Calendar size={13} className='text-stone-400' />
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                      </td>

                      {/* Quick Status Updater */}
                      <td className='p-3.5 align-top space-y-1.5'>
                        <div className='relative inline-block'>
                          <select
                            value={order.status}
                            disabled={isUpdatingThis}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value as OrderStatus)
                            }
                            className={`px-2.5 py-1 text-[11px] font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer focus:outline-hidden ${statusStyle.badgeBg}`}
                          >
                            <option value='Płatność zaakceptowana' className='bg-white text-black'>
                              Płatność zaakceptowana
                            </option>
                            <option value='Wysyłka w toku' className='bg-white text-black'>
                              Wysyłka w toku
                            </option>
                            <option value='Dostarczono' className='bg-white text-black'>
                              Dostarczono
                            </option>
                            <option value='Anulowano' className='bg-white text-black'>
                              Anulowano
                            </option>
                          </select>
                        </div>
                      </td>

                      {/* Pozycje */}
                      <td className='p-3.5 align-top space-y-1'>
                        <div className='flex items-center gap-1.5'>
                          <Package size={13} className='text-stone-500' />
                          <span className='font-bold text-stone-800'>
                            {order.items.reduce((s, i) => s + i.quantity, 0)} szt. ({order.items.length} pozycji)
                          </span>
                        </div>
                        <div className='text-[10px] text-stone-500 truncate max-w-[180px]'>
                          {order.items.map((i) => i.name).join(", ")}
                        </div>
                      </td>

                      {/* Kwota */}
                      <td className='p-3.5 align-top text-right space-y-0.5 whitespace-nowrap'>
                        <p className='font-mono font-black text-stone-900 text-sm'>
                          ${order.totalAmount.toFixed(2)}
                        </p>
                        {order.discountAmount > 0 && (
                          <p className='text-[10px] text-emerald-700 font-bold'>
                            Rabat: -${order.discountAmount.toFixed(2)}
                          </p>
                        )}
                        <p className='text-[10px] text-stone-400 uppercase font-semibold'>
                          {order.paymentMethod}
                        </p>
                      </td>

                      {/* Akcje */}
                      <td className='p-3.5 align-top text-center whitespace-nowrap'>
                        <div className='flex items-center justify-center gap-1.5'>
                          <button
                            onClick={() => {
                              setSelectedOrder(order)
                              setTrackingInput(order.trackingNumber)
                              setEditingTracking(false)
                            }}
                            className='p-1.5 bg-white border border-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer'
                            title='Podgląd i edycja szczegółów'
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => setPrintModalOrder(order)}
                            className='p-1.5 bg-rose-50 border border-black text-[#E11D48] hover:bg-[#E11D48] hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer'
                            title='Generuj rachunek / list przewozowy'
                          >
                            <Printer size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. MODAL SZCZEGÓŁÓW ZAMÓWIENIA */}
      <AnimatePresence>
        {selectedOrder && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto'>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className='fixed inset-0 bg-black/60 backdrop-blur-xs'
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className='relative w-full max-w-3xl bg-[#FDFCFB] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 flex flex-col max-h-[90vh] my-auto'
            >
              {/* Modal Header */}
              <div className='px-6 py-4 bg-[#1A1A1A] text-white border-b-2 border-black flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <ShoppingBag size={20} className='text-[#E11D48]' />
                  <div>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-black text-lg text-white font-mono'>
                        Zamówienie {selectedOrder.id}
                      </h3>
                      <span className='text-[10px] bg-[#E11D48] text-white font-black px-2 py-0.5 border border-white uppercase tracking-widest'>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <p className='text-[10px] text-stone-300 font-mono mt-0.5'>
                      UID Klienta: {selectedOrder.uid} • Złożono: {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className='p-1.5 border border-white bg-white text-black hover:bg-[#E11D48] hover:text-white transition-colors cursor-pointer'
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content Body */}
              <div className='p-6 overflow-y-auto space-y-6 text-xs'>
                {/* Numer śledzenia & Status Firestore */}
                <div className='bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                  <div className='space-y-1'>
                    <span className='text-[10px] font-black uppercase tracking-widest text-stone-500 block'>
                      Numer Przesyłki Kurierskiej (Tracking)
                    </span>
                    {editingTracking ? (
                      <div className='flex items-center gap-2'>
                        <input
                          type='text'
                          value={trackingInput}
                          onChange={(e) => setTrackingInput(e.target.value)}
                          className='px-2.5 py-1 border border-black bg-[#F8F7F3] font-mono font-bold text-sm focus:outline-hidden'
                        />
                        <button
                          onClick={handleSaveTracking}
                          className='px-3 py-1 bg-emerald-600 text-white font-black border border-black flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer'
                        >
                          <Check size={14} />
                          Zapisz
                        </button>
                      </div>
                    ) : (
                      <div className='flex items-center gap-2 font-mono font-black text-sm text-stone-900'>
                        <Truck size={16} className='text-[#E11D48]' />
                        <span>{selectedOrder.trackingNumber}</span>
                        <button
                          onClick={() => setEditingTracking(true)}
                          className='p-1 hover:bg-stone-100 text-stone-600 border border-stone-300 ml-1 cursor-pointer'
                          title='Edytuj numer nadania'
                        >
                          <Edit2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className='space-y-1 text-right'>
                    <span className='text-[10px] font-black uppercase tracking-widest text-stone-500 block'>
                      Zmień Status w Firestore
                    </span>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) =>
                        handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)
                      }
                      className='px-3 py-1.5 bg-[#1A1A1A] text-white border-2 border-black font-black text-xs uppercase tracking-wider cursor-pointer focus:outline-hidden'
                    >
                      <option value='Płatność zaakceptowana'>Płatność zaakceptowana</option>
                      <option value='Wysyłka w toku'>Wysyłka w toku</option>
                      <option value='Dostarczono'>Dostarczono</option>
                      <option value='Anulowano'>Anulowano</option>
                    </select>
                  </div>
                </div>

                {/* Tabela Zamówionych Artykułów */}
                <div className='space-y-2'>
                  <h4 className='font-black text-stone-900 uppercase tracking-widest text-xs flex items-center gap-2'>
                    <Package size={14} className='text-[#E11D48]' />
                    Zawartość Przesyłki ({selectedOrder.items.length} pozycji)
                  </h4>
                  <div className='bg-white border-2 border-black divide-y border-stone-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
                    {selectedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className='p-3 flex items-center justify-between hover:bg-[#F8F7F3]'
                      >
                        <div className='flex items-center gap-3'>
                          <div className='w-12 h-14 relative border border-black overflow-hidden bg-stone-100 shrink-0'>
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className='object-cover'
                            />
                          </div>
                          <div>
                            <p className='font-black text-stone-900 text-xs'>{item.name}</p>
                            <div className='flex items-center gap-2 mt-1 text-[10px] font-bold text-stone-500'>
                              <span className='bg-stone-100 border border-black px-1.5 py-0.5 text-black'>
                                Rozmiar: {item.size}
                              </span>
                              <span>Ilość: {item.quantity} szt.</span>
                              <span>Cena jedn.: ${item.price.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div className='text-right font-mono font-black text-stone-900 text-sm'>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dane Adresowe i Płatność */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {/* Adres */}
                  <div className='bg-white border-2 border-black p-4 space-y-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
                    <span className='text-[10px] font-black text-[#E11D48] uppercase tracking-widest flex items-center gap-1.5'>
                      <MapPin size={13} />
                      Adres Dostawy
                    </span>
                    <div className='space-y-0.5 text-stone-800 font-semibold'>
                      <p className='font-black text-sm text-black'>
                        {selectedOrder.shippingAddress.name}
                      </p>
                      <p>{selectedOrder.shippingAddress.street}</p>
                      <p>
                        {selectedOrder.shippingAddress.zip} {selectedOrder.shippingAddress.city}
                      </p>
                      <p className='text-stone-500 font-mono text-[11px] pt-1 flex items-center gap-1'>
                        <Phone size={11} />
                        {selectedOrder.shippingAddress.phone}
                      </p>
                    </div>
                  </div>

                  {/* Płatność & Podsumowanie */}
                  <div className='bg-white border-2 border-black p-4 space-y-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between'>
                    <div className='space-y-1.5'>
                      <span className='text-[10px] font-black text-[#E11D48] uppercase tracking-widest flex items-center gap-1.5'>
                        <CreditCard size={13} />
                        Szczegóły Płatności
                      </span>
                      <p className='font-black text-stone-900'>
                        Metoda: {selectedOrder.paymentMethod}
                      </p>
                      {selectedOrder.promoCodeUsed && (
                        <p className='text-[11px] font-bold text-emerald-700 flex items-center gap-1'>
                          <Tag size={11} />
                          Kod Rabatowy: {selectedOrder.promoCodeUsed} (-${selectedOrder.discountAmount.toFixed(2)})
                        </p>
                      )}
                    </div>

                    <div className='pt-2 border-t-2 border-black flex justify-between items-baseline font-mono'>
                      <span className='text-xs font-black uppercase text-stone-600'>Razem Opłacono:</span>
                      <span className='text-lg font-black text-black'>${selectedOrder.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className='px-6 py-4 bg-[#F8F7F3] border-t-2 border-black flex items-center justify-between'>
                <button
                  onClick={() => {
                    setPrintModalOrder(selectedOrder)
                    setSelectedOrder(null)
                  }}
                  className='px-4 py-2 bg-white text-black border-2 border-black font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white flex items-center gap-2 transition-all cursor-pointer'
                >
                  <Printer size={15} />
                  Drukuj List Przewozowy
                </button>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className='px-5 py-2 bg-[#1A1A1A] text-white border-2 border-black font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black cursor-pointer'
                >
                  Zamknij
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. MODAL DRUKOWANIA RACHUNKU / LISTU PRZEWOZOWEGO */}
      <AnimatePresence>
        {printModalOrder && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPrintModalOrder(null)}
              className='fixed inset-0 bg-black/70 backdrop-blur-xs'
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='relative w-full max-w-2xl bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] z-10 space-y-6 rounded-none my-auto'
            >
              {/* Header Listu */}
              <div className='border-b-4 border-black pb-4 flex justify-between items-start'>
                <div>
                  <h2 className='text-3xl font-black italic tracking-tighter uppercase text-stone-900'>
                   Blue Jeans <span className='text-[#E11D48]'>EXPRESS</span>
                  </h2>
                  <p className='text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500 mt-1'>
                    E-COMMERCE FULFILLMENT CENTER • NIP: 123-456-78-90
                  </p>
                </div>
                <div className='text-right font-mono'>
                  <div className='bg-black text-white px-3 py-1 font-black text-xs uppercase tracking-wider border border-black'>
                    DOKUMENT DOSTAWY
                  </div>
                  <p className='text-xs font-bold text-stone-600 mt-1'>
                    {printModalOrder.id}
                  </p>
                </div>
              </div>

              {/* Visual Barcode */}
              <div className='bg-[#F8F7F3] border-2 border-black p-3 text-center space-y-1'>
                <div className='font-mono text-2xl tracking-[0.3em] font-black text-stone-900 select-none'>
                  ||||| ||| ||||||| || |||||| ||| ||||
                </div>
                <p className='font-mono text-xs font-bold text-stone-600 uppercase tracking-widest'>
                  TRACKING: {printModalOrder.trackingNumber}
                </p>
              </div>

              {/* Sekcja Nadawcy i Odbiorcy */}
              <div className='grid grid-cols-2 gap-6 text-xs'>
                <div className='border-2 border-black p-4 space-y-1 bg-stone-50'>
                  <span className='text-[9px] font-black uppercase tracking-widest text-stone-500 block border-b border-stone-300 pb-1'>
                    NADAWCA / SHIPPER
                  </span>
                  <p className='font-black text-stone-900'>Blue Jeans Store</p>
                  <p className='text-stone-700 font-semibold'>Magazyn Centralny 01</p>
                  <p className='text-stone-700 font-semibold'>ul. Fabryczna 10, 00-950 Warszawa</p>
                  <p className='text-stone-500 font-mono text-[10px] pt-1'>Tel: +48 800 123 456</p>
                </div>

                <div className='border-2 border-black p-4 space-y-1 bg-stone-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
                  <span className='text-[9px] font-black uppercase tracking-widest text-[#E11D48] block border-b border-stone-300 pb-1'>
                    ODBIORCA / RECIPIENT
                  </span>
                  <p className='font-black text-sm text-stone-900'>
                    {printModalOrder.shippingAddress.name}
                  </p>
                  <p className='text-stone-800 font-bold'>
                    {printModalOrder.shippingAddress.street}
                  </p>
                  <p className='text-stone-800 font-bold'>
                    {printModalOrder.shippingAddress.zip} {printModalOrder.shippingAddress.city}
                  </p>
                  <p className='text-stone-600 font-mono text-[10px] pt-1 font-bold'>
                    Tel: {printModalOrder.shippingAddress.phone}
                  </p>
                </div>
              </div>

              {/* Tabela Artykułów */}
              <div className='border-2 border-black overflow-hidden text-xs'>
                <table className='w-full text-left border-collapse'>
                  <thead>
                    <tr className='bg-black text-white font-black uppercase tracking-wider text-[10px]'>
                      <th className='p-2 border-b border-black'>Produkt</th>
                      <th className='p-2 border-b border-black text-center'>Rozmiar</th>
                      <th className='p-2 border-b border-black text-center'>Ilość</th>
                      <th className='p-2 border-b border-black text-right'>Wartość</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y border-stone-300 font-semibold'>
                    {printModalOrder.items.map((item, i) => (
                      <tr key={i}>
                        <td className='p-2 font-black text-stone-900'>{item.name}</td>
                        <td className='p-2 text-center font-mono font-bold'>{item.size}</td>
                        <td className='p-2 text-center font-mono font-bold'>{item.quantity}</td>
                        <td className='p-2 text-right font-mono font-black'>
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Stopka druku */}
              <div className='flex items-center justify-between pt-2 text-[10px] text-stone-500 font-mono uppercase tracking-wider'>
                <span>Kurier: DPD Express PL • Opłacono: {printModalOrder.paymentMethod}</span>
                <span className='font-black text-stone-900 text-sm font-mono'>
                  TOTAL: ${printModalOrder.totalAmount.toFixed(2)}
                </span>
              </div>

              {/* Przyciski Akcji */}
              <div className='flex justify-end gap-3 pt-4 border-t-2 border-black print:hidden'>
                <button
                  onClick={() => setPrintModalOrder(null)}
                  className='px-4 py-2 border-2 border-black bg-white text-black font-black text-xs uppercase tracking-wider cursor-pointer'
                >
                  Anuluj
                </button>
                <button
                  onClick={() => window.print()}
                  className='px-5 py-2 border-2 border-black bg-[#E11D48] text-white font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-red-700 flex items-center gap-2 cursor-pointer'
                >
                  <Printer size={16} />
                  Drukuj Stronę (Ctrl+P)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
