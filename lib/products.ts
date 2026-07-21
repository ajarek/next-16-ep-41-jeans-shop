import {
  collection,
  doc,
  getDocs,
  getDoc,
  orderBy,
  query,
} from "firebase/firestore"
import { db, isFirebaseConfigured } from "@/lib/firebase"
import { PRODUCTS } from "@/lib/store-data"
import type { Product } from "@/lib/types"

function mapProductDoc(id: string, data: Record<string, unknown>): Product {
  return {
    id,
    name: String(data.name ?? ""),
    price: Number(data.price ?? 0),
    originalPrice: Number(data.originalPrice ?? data.price ?? 0),
    imageUrl: String(data.imageUrl ?? ""),
    category: data.category as Product["category"],
    style: data.style as Product["style"],
    sizes: (data.sizes as Product["sizes"]) ?? [],
    badge: data.badge as Product["badge"] | undefined,
    description: String(data.description ?? ""),
    gender: data.gender as Product["gender"],
  }
}

/**
 * Pobiera produkty z Firestore. Przy braku konfiguracji / błędzie
 * zwraca lokalny seed z store-data.ts.
 */
export async function fetchProducts(): Promise<{
  products: Product[]
  source: "firestore" | "local"
}> {
  if (!isFirebaseConfigured || !db) {
    return { products: PRODUCTS, source: "local" }
  }

  try {
    const productsRef = collection(db, "products")
    const q = query(productsRef, orderBy("name"))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      console.warn(
        "[products] Kolekcja products jest pusta — używam lokalnego seeda.",
      )
      return { products: PRODUCTS, source: "local" }
    }

    const products: Product[] = []
    snapshot.forEach((document) => {
      products.push(mapProductDoc(document.id, document.data()))
    })

    return { products, source: "firestore" }
  } catch (error) {
    console.error(
      "[products] Błąd odczytu Firestore, fallback do lokalnych danych:",
      error,
    )
    return { products: PRODUCTS, source: "local" }
  }
}

export async function fetchProductById(
  id: string,
): Promise<Product | null> {
  if (!isFirebaseConfigured || !db) {
    return PRODUCTS.find((p) => p.id === id) ?? null
  }

  try {
    const snap = await getDoc(doc(db, "products", id))
    if (!snap.exists()) {
      return PRODUCTS.find((p) => p.id === id) ?? null
    }
    return mapProductDoc(snap.id, snap.data())
  } catch {
    return PRODUCTS.find((p) => p.id === id) ?? null
  }
}
