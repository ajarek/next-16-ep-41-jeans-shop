export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  imageUrl: string
  category: "jackets" | "shorts" | "jeans" | "skirts" | "shirts" | "overalls"
  style: "Casual" | "Elegant" | "Distressed" | "High Waist" | "Classic"
  sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL")[]
  badge?: "Best Seller" | "New" | "Promotion"
  description: string
  gender: "Woman" | "Man" | "Unisex"
}

export interface UserProfileDoc {
  uid: string
  email: string
  displayName: string
  photoURL: string | null
  role: "admin" | "user"
  createdAt: string
  updatedAt: string
}

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const

export const STYLES = [
  "Casual",
  "Elegant",
  "Distressed",
  "High Waist",
  "Classic",
] as const

export const CATEGORY_LABELS: Record<string, string> = {
  all: "Wszystko",
  jackets: "Kurtki",
  shorts: "Szorty",
  jeans: "Jeansy",
  skirts: "Spódnice",
  shirts: "Koszule",
  overalls: "Kombinezony",
}

export function buildCategories(products: Product[]) {
  const ids = [
    "all",
    "jackets",
    "shorts",
    "jeans",
    "skirts",
    "shirts",
    "overalls",
  ] as const

  return ids.map((id) => ({
    id,
    name: CATEGORY_LABELS[id],
    count:
      id === "all"
        ? products.length
        : products.filter((p) => p.category === id).length,
  }))
}
