import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore"
import { db, isFirebaseConfigured } from "@/lib/firebase"
import { PRODUCTS } from "@/lib/store-data"
import type { Product } from "@/lib/types"

const LOCAL_STORAGE_KEY = "denihub_custom_products"

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

export function getLocalProducts(): Product[] | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export function saveLocalProducts(products: Product[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products))
}

/**
 * Pobiera produkty z Firestore. Przy braku konfiguracji / błędzie
 * zwraca dane z localStorage lub lokalny seed z store-data.ts.
 */
export async function fetchProducts(): Promise<{
  products: Product[]
  source: "firestore" | "local"
}> {
  if (!isFirebaseConfigured || !db) {
    const local = getLocalProducts()
    return { products: local ?? PRODUCTS, source: "local" }
  }

  try {
    const productsRef = collection(db, "products")
    const q = query(productsRef, orderBy("name"))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      console.warn(
        "[products] Kolekcja products jest pusta — używam lokalnych danych.",
      )
      const local = getLocalProducts()
      return { products: local ?? PRODUCTS, source: "local" }
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
    const local = getLocalProducts()
    return { products: local ?? PRODUCTS, source: "local" }
  }
}

export async function fetchProductById(
  id: string,
): Promise<Product | null> {
  if (!isFirebaseConfigured || !db) {
    const local = getLocalProducts() ?? PRODUCTS
    return local.find((p) => p.id === id) ?? null
  }

  try {
    const snap = await getDoc(doc(db, "products", id))
    if (!snap.exists()) {
      const local = getLocalProducts() ?? PRODUCTS
      return local.find((p) => p.id === id) ?? null
    }
    return mapProductDoc(snap.id, snap.data())
  } catch {
    const local = getLocalProducts() ?? PRODUCTS
    return local.find((p) => p.id === id) ?? null
  }
}

export async function addProductDoc(
  productData: Omit<Product, "id">,
): Promise<Product> {
  const newProductPayload = {
    name: productData.name,
    price: Number(productData.price),
    originalPrice: Number(productData.originalPrice || productData.price),
    imageUrl: productData.imageUrl,
    category: productData.category,
    style: productData.style,
    sizes: productData.sizes,
    badge: productData.badge || null,
    description: productData.description,
    gender: productData.gender,
  }

  if (isFirebaseConfigured && db) {
    try {
      const productsRef = collection(db, "products")
      const docRef = await addDoc(productsRef, newProductPayload)
      return {
        id: docRef.id,
        ...newProductPayload,
        badge: productData.badge,
      }
    } catch (err) {
      console.warn("[products] Brak uprawnień do zapisu w Firestore, zapisuję lokalnie:", err)
    }
  }

  const generatedId = "custom-" + Math.random().toString(36).substring(2, 9)
  const created: Product = {
    id: generatedId,
    ...productData,
  }
  return created
}

export async function updateProductDoc(
  id: string,
  productData: Partial<Product>,
): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = doc(db, "products", id)
      await updateDoc(ref, productData as Record<string, unknown>)
      return
    } catch (err) {
      console.warn("[products] Brak uprawnień do edycji w Firestore, aktualizuję lokalnie:", err)
    }
  }
}

export async function deleteProductDoc(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = doc(db, "products", id)
      await deleteDoc(ref)
      return
    } catch (err) {
      console.warn("[products] Brak uprawnień do usunięcia z Firestore, usuwam lokalnie:", err)
    }
  }
}
