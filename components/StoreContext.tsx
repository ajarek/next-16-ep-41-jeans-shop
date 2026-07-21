"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react"
import { useAuth } from "./AuthContext"
import { db, isFirebaseConfigured } from "@/lib/firebase"
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore"
import {
  fetchProducts,
  addProductDoc,
  updateProductDoc,
  deleteProductDoc,
  saveLocalProducts,
} from "@/lib/products"
import { PRODUCTS } from "@/lib/store-data"
import type { Product } from "@/lib/types"
import { buildCategories, SIZES, STYLES } from "@/lib/types"

export interface CartItem {
  product: Product
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL"
  quantity: number
}

export interface ShippingAddress {
  name: string
  street: string
  city: string
  zip: string
  phone: string
}

export interface Order {
  id: string
  uid: string
  items: {
    productId: string
    name: string
    price: number
    size: string
    quantity: number
    imageUrl: string
  }[]
  totalAmount: number
  discountAmount: number
  promoCodeUsed: string | null
  shippingAddress: ShippingAddress
  paymentMethod: string
  createdAt: string
  status:
    | "Płatność zaakceptowana"
    | "Wysyłka w toku"
    | "Dostarczono"
    | "Anulowano"
  trackingNumber: string
}

interface StoreContextType {
  products: Product[]
  productsSource: "firestore" | "local" | "loading"
  loadingProducts: boolean
  categories: ReturnType<typeof buildCategories>
  cart: CartItem[]
  orders: Order[]
  promoCode: string | null
  promoDiscount: number
  searchQuery: string
  selectedCategory: string
  selectedSize: string
  selectedStyle: string
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setSelectedSize: (size: string) => void
  setSelectedStyle: (style: string) => void
  addToCart: (
    product: Product,
    size: CartItem["size"],
    quantity?: number,
  ) => void
  removeFromCart: (productId: string, size: CartItem["size"]) => void
  updateCartQuantity: (
    productId: string,
    size: CartItem["size"],
    quantity: number,
  ) => void
  applyPromoCode: (code: string) => { success: boolean; message: string }
  removePromoCode: () => void
  checkout: (address: ShippingAddress, paymentDetails: unknown) => Promise<Order>
  clearCart: () => void
  resetFilters: () => void
  refreshProducts: () => Promise<void>
  loadingOrders: boolean
  addProduct: (productData: Omit<Product, "id">) => Promise<Product>
  updateProduct: (id: string, productData: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  resetProductsToDefault: () => Promise<void>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

function generateOrderId(): string {
  return "DH-" + Math.floor(100000 + Math.random() * 900000).toString()
}

function generateTrackingNumber(): string {
  return (
    "DH" + Math.floor(10000000 + Math.random() * 90000000).toString() + "PL"
  )
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  const [products, setProducts] = useState<Product[]>([])
  const [productsSource, setProductsSource] = useState<
    "firestore" | "local" | "loading"
  >("loading")
  const [loadingProducts, setLoadingProducts] = useState(true)

  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(false)

  const [promoCode, setPromoCode] = useState<string | null>(null)
  const [promoDiscount, setPromoDiscount] = useState<number>(0)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedStyle, setSelectedStyle] = useState("all")

  const categories = buildCategories(products)

  const refreshProducts = useCallback(async () => {
    setLoadingProducts(true)
    const { products: fetched, source } = await fetchProducts()
    setProducts(fetched)
    setProductsSource(source)
    setLoadingProducts(false)
  }, [])

  useEffect(() => {
    refreshProducts()
  }, [refreshProducts])

  const addProduct = async (productData: Omit<Product, "id">): Promise<Product> => {
    const created = await addProductDoc(productData)
    setProducts((prev) => {
      const updated = [created, ...prev]
      saveLocalProducts(updated)
      return updated
    })
    return created
  }

  const updateProduct = async (id: string, productData: Partial<Product>): Promise<void> => {
    await updateProductDoc(id, productData)
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...productData } : p))
      saveLocalProducts(updated)
      return updated
    })
  }

  const deleteProduct = async (id: string): Promise<void> => {
    await deleteProductDoc(id)
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id)
      saveLocalProducts(updated)
      return updated
    })
  }

  const resetProductsToDefault = async (): Promise<void> => {
    saveLocalProducts(PRODUCTS)
    setProducts(PRODUCTS)
    setProductsSource("local")
  }

  // Koszyk z localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("denihub_cart")
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart)
        setTimeout(() => setCart(parsed), 0)
      } catch (e) {
        console.error("Failed to parse cart", e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("denihub_cart", JSON.stringify(cart))
  }, [cart])

  // Zamówienia użytkownika
  useEffect(() => {
    if (!user) {
      setTimeout(() => setOrders([]), 0)
      return
    }

    const fetchOrders = async () => {
      setLoadingOrders(true)

      if (isFirebaseConfigured && db && !user.isSimulated) {
        try {
          const ordersRef = collection(db, "orders")
          const q = query(
            ordersRef,
            where("uid", "==", user.uid),
            orderBy("createdAt", "desc"),
          )
          const querySnapshot = await getDocs(q)
          const fetchedOrders: Order[] = []
          querySnapshot.forEach((document) => {
            const data = document.data()
            fetchedOrders.push({
              id: document.id,
              uid: data.uid,
              items: data.items,
              totalAmount: data.totalAmount,
              discountAmount: data.discountAmount,
              promoCodeUsed: data.promoCodeUsed ?? null,
              shippingAddress: data.shippingAddress,
              paymentMethod: data.paymentMethod,
              createdAt: data.createdAt,
              status: data.status,
              trackingNumber: data.trackingNumber,
            })
          })
          setOrders(fetchedOrders)
          setLoadingOrders(false)
          return
        } catch (error) {
          console.error(
            "Failed to fetch orders from Firestore, falling back to LocalStorage:",
            error,
          )
        }
      }

      const localOrdersKey = `denihub_orders_${user.uid}`
      const savedOrders = localStorage.getItem(localOrdersKey)
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders))
        } catch (e) {
          console.error("Failed to parse orders", e)
          setOrders([])
        }
      } else {
        setOrders([])
      }
      setLoadingOrders(false)
    }

    fetchOrders()
  }, [user])

  const addToCart = (
    product: Product,
    size: CartItem["size"],
    quantity = 1,
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size,
      )
      if (existingIndex > -1) {
        const newCart = [...prev]
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity,
        }
        return newCart
      }
      return [...prev, { product, size, quantity }]
    })
  }

  const removeFromCart = (productId: string, size: CartItem["size"]) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size),
      ),
    )
  }

  const updateCartQuantity = (
    productId: string,
    size: CartItem["size"],
    quantity: number,
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item,
      ),
    )
  }

  const applyPromoCode = (code: string) => {
    const cleanCode = code.toUpperCase().trim()
    if (cleanCode === "TEES25") {
      setPromoCode("TEES25")
      setPromoDiscount(0.25)
      return { success: true, message: "Kod TEES25 zastosowany! Zniżka 25%." }
    }
    return { success: false, message: "Niepoprawny kod promocyjny." }
  }

  const removePromoCode = () => {
    setPromoCode(null)
    setPromoDiscount(0)
  }

  const clearCart = () => {
    setCart([])
    setPromoCode(null)
    setPromoDiscount(0)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedSize("all")
    setSelectedStyle("all")
  }

  const saveOrderLocally = (order: Order) => {
    if (!user) return
    const localOrdersKey = `denihub_orders_${user.uid}`
    const savedOrders = localStorage.getItem(localOrdersKey)
    const existingOrders = savedOrders ? JSON.parse(savedOrders) : []
    const newOrders = [order, ...existingOrders]
    localStorage.setItem(localOrdersKey, JSON.stringify(newOrders))
    setOrders(newOrders)
  }

  const checkout = async (
    address: ShippingAddress,
    paymentDetails: unknown,
  ): Promise<Order> => {
    if (cart.length === 0) {
      throw new Error("Koszyk jest pusty.")
    }

    const cartSubtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    )
    const discount = cartSubtotal * promoDiscount
    const finalAmount = cartSubtotal - discount
    const paymentMethodName =
      (paymentDetails as { method?: string })?.method || "Karta płatnicza"

    const newOrder: Order = {
      id: generateOrderId(),
      uid: user ? user.uid : "guest",
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        size: item.size,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl,
      })),
      totalAmount: parseFloat(finalAmount.toFixed(2)),
      discountAmount: parseFloat(discount.toFixed(2)),
      promoCodeUsed: promoCode,
      shippingAddress: address,
      paymentMethod: paymentMethodName,
      createdAt: new Date().toISOString(),
      status: "Płatność zaakceptowana",
      trackingNumber: generateTrackingNumber(),
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (user) {
      if (isFirebaseConfigured && db && !user.isSimulated) {
        try {
          const ordersRef = collection(db, "orders")
          const docRef = await addDoc(ordersRef, {
            uid: newOrder.uid,
            items: newOrder.items,
            totalAmount: newOrder.totalAmount,
            discountAmount: newOrder.discountAmount,
            promoCodeUsed: newOrder.promoCodeUsed,
            shippingAddress: newOrder.shippingAddress,
            paymentMethod: newOrder.paymentMethod,
            createdAt: newOrder.createdAt,
            status: newOrder.status,
            trackingNumber: newOrder.trackingNumber,
          })

          const orderWithId = { ...newOrder, id: docRef.id }
          setOrders((prev) => [orderWithId, ...prev])
          clearCart()
          return orderWithId
        } catch (e) {
          console.error(
            "Failed to save order to Firestore, saving to local state instead:",
            e,
          )
          saveOrderLocally(newOrder)
        }
      } else {
        saveOrderLocally(newOrder)
      }
    } else {
      const guestOrders = JSON.parse(
        localStorage.getItem("denihub_guest_orders") || "[]",
      )
      guestOrders.unshift(newOrder)
      localStorage.setItem("denihub_guest_orders", JSON.stringify(guestOrders))
      setOrders([newOrder])
    }

    clearCart()
    return newOrder
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        productsSource,
        loadingProducts,
        categories,
        cart,
        orders,
        promoCode,
        promoDiscount,
        searchQuery,
        selectedCategory,
        selectedSize,
        selectedStyle,
        setSearchQuery,
        setSelectedCategory,
        setSelectedSize,
        setSelectedStyle,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        applyPromoCode,
        removePromoCode,
        checkout,
        clearCart,
        resetFilters,
        refreshProducts,
        loadingOrders,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

// Re-exporty pomocnicze dla komponentów UI
export { SIZES, STYLES }
