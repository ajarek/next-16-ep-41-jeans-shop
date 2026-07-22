import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore"
import { db, isFirebaseConfigured } from "@/lib/firebase"
import type { Order, OrderItem, OrderStatus, ShippingAddress } from "@/lib/types"

/** Mapuje dokument Firestore z kolekcji "orders" na typ Order. */
export function mapOrderDoc(
  id: string,
  data: Record<string, unknown>,
): Order {
  const shipping = (data.shippingAddress as ShippingAddress | undefined) || {
    name: "Brak danych",
    street: "",
    city: "",
    zip: "",
    phone: "",
  }

  return {
    id,
    uid: String(data.uid || "nieznany"),
    items: (Array.isArray(data.items) ? data.items : []) as OrderItem[],
    totalAmount: Number(data.totalAmount || 0),
    discountAmount: Number(data.discountAmount || 0),
    promoCodeUsed: (data.promoCodeUsed as string | null) ?? null,
    shippingAddress: shipping,
    paymentMethod: String(data.paymentMethod || "Karta płatnicza"),
    createdAt: String(data.createdAt || new Date().toISOString()),
    status: (data.status as OrderStatus) || "Płatność zaakceptowana",
    trackingNumber:
      String(data.trackingNumber || "") || `DH-${id.slice(0, 6)}`,
  }
}

function sortOrdersByDateDesc(orders: Order[]): Order[] {
  return [...orders].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

/**
 * Pobiera zamówienia zalogowanego użytkownika z kolekcji Firestore "orders"
 * (filtr: uid == userId). Przy braku indeksu złożonego sortuje po stronie klienta.
 */
function toErrorMessage(err: unknown): string {
  if (err && typeof err === "object") {
    const e = err as { code?: string; message?: string }
    if (e.code === "permission-denied" || e.message?.includes("insufficient permissions")) {
      return "Missing or insufficient permissions. Sprawdź reguły Firestore i czy jesteś zalogowany."
    }
    if (e.message) return e.message
  }
  return err instanceof Error ? err.message : String(err)
}

export async function fetchUserOrdersFromFirestore(
  uid: string,
): Promise<{
  orders: Order[]
  source: "firestore" | "none"
  error?: string
}> {
  if (!isFirebaseConfigured || !db) {
    return {
      orders: [],
      source: "none",
      error: "Firebase nie jest skonfigurowany",
    }
  }

  if (!uid) {
    return { orders: [], source: "none", error: "Brak uid użytkownika" }
  }

  const ordersRef = collection(db, "orders")

  // 1) Proste zapytanie tylko po uid (nie wymaga composite index)
  try {
    const q = query(ordersRef, where("uid", "==", uid))
    const snapshot = await getDocs(q)
    const orders: Order[] = []
    snapshot.forEach((docSnap) => {
      orders.push(mapOrderDoc(docSnap.id, docSnap.data() as Record<string, unknown>))
    })
    return { orders: sortOrdersByDateDesc(orders), source: "firestore" }
  } catch (err: unknown) {
    const errorMessage = toErrorMessage(err)
    console.error("[orders] Błąd pobierania zamówień użytkownika:", err)
    return { orders: [], source: "none", error: errorMessage }
  }
}

// Domyślne przykładowe zamówienia do celów demonstracyjnych / fallback
export const SAMPLE_ADMIN_ORDERS: Order[] = [
  {
    id: "DH-892415",
    uid: "user-demihub-01",
    items: [
      {
        productId: "p1",
        name: "Kurtka Jeansowa Classic Heritage",
        price: 349.99,
        size: "M",
        quantity: 1,
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRND77stLVNqG3HGsw3PHVO66iYt1FYlcUdVVk_z9QSm9mYVY1WdQ44gVk&s=10",
      },
      {
        productId: "p3",
        name: "Spódnica Denim Retro Mini",
        price: 159.99,
        size: "S",
        quantity: 1,
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR86f1d-f8p4e-sN1m5k2p-v9q3r6t1u4w&s=10",
      },
    ],
    totalAmount: 509.98,
    discountAmount: 0,
    promoCodeUsed: null,
    shippingAddress: {
      name: "Jan Kowalski",
      street: "ul. Marszałkowska 12/4",
      city: "Warszawa",
      zip: "00-001",
      phone: "+48 601 234 567",
    },
    paymentMethod: "BLIK",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: "Płatność zaakceptowana",
    trackingNumber: "DH89241500PL",
  },
  {
    id: "DH-771092",
    uid: "user-demihub-02",
    items: [
      {
        productId: "p2",
        name: "Jeansy Slim Fit Dark Wash",
        price: 249.99,
        size: "L",
        quantity: 2,
        imageUrl: "https://media.lee.com/i/lee/SIZE4-MODEL-Straight",
      },
    ],
    totalAmount: 374.98,
    discountAmount: 125.0,
    promoCodeUsed: "TEES25",
    shippingAddress: {
      name: "Anna Nowak",
      street: "ul. Floriańska 8",
      city: "Kraków",
      zip: "31-019",
      phone: "+48 502 987 654",
    },
    paymentMethod: "Karta płatnicza (Visa)",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    status: "Wysyłka w toku",
    trackingNumber: "DH77109288PL",
  },
  {
    id: "DH-619204",
    uid: "user-demihub-03",
    items: [
      {
        productId: "p4",
        name: "Koszula Jeansowa Western Style",
        price: 199.99,
        size: "XL",
        quantity: 1,
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4e-x7_r8v5p2m-9q3r6t1u4w5e6f7g8h&s=10",
      },
    ],
    totalAmount: 199.99,
    discountAmount: 0,
    promoCodeUsed: null,
    shippingAddress: {
      name: "Piotr Wiśniewski",
      street: "ul. Piotrkowska 145",
      city: "Łódź",
      zip: "90-001",
      phone: "+48 790 112 233",
    },
    paymentMethod: "Szybki Przelew (Przelewy24)",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    status: "Dostarczono",
    trackingNumber: "DH61920411PL",
  },
]

/**
 * Pobiera wszystkie zamówienia z kolekcji Firestore "orders" (panel admina).
 * Przy braku Firebase / błędzie — fallback do SAMPLE_ADMIN_ORDERS.
 */
export async function fetchAdminOrdersFromFirestore(): Promise<{
  orders: Order[]
  source: "firestore" | "local"
  error?: string
}> {
  if (!isFirebaseConfigured || !db) {
    return { orders: SAMPLE_ADMIN_ORDERS, source: "local" }
  }

  try {
    const ordersRef = collection(db, "orders")
    const q = query(ordersRef, orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)

    const fetched: Order[] = []
    snapshot.forEach((docSnap) => {
      fetched.push(mapOrderDoc(docSnap.id, docSnap.data()))
    })

    // Pusta kolekcja = pusta lista (bez przykładowych danych demo)
    return { orders: fetched, source: "firestore" }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.warn("Błąd podczas pobierania zamówień z Firestore, używam fallback:", errorMessage)
    return {
      orders: SAMPLE_ADMIN_ORDERS,
      source: "local",
      error: errorMessage,
    }
  }
}

/**
 * Aktualizuje status i ewentualny numer przesyłki zamówienia w Firestore.
 */
export async function updateOrderStatusInFirestore(
  orderId: string,
  newStatus: OrderStatus,
  newTrackingNumber?: string,
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) {
    return false
  }

  try {
    const orderRef = doc(db, "orders", orderId)
    const updateData: Partial<Order> = { status: newStatus }
    if (newTrackingNumber) {
      updateData.trackingNumber = newTrackingNumber
    }
    await updateDoc(orderRef, updateData)
    return true
  } catch (err) {
    console.error(`Nie udało się zaktualizować zamówienia ${orderId} w Firestore:`, err)
    return false
  }
}
