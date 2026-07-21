/**
 * Seeduje kolekcję Firestore `products` danymi z lib/store-data.ts.
 * Używa OAuth tokena z Firebase CLI (uprawnienia IAM — omija security rules).
 *
 * Uruchom: node scripts/seed-products.mjs
 */
import { readFileSync, existsSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"

const PROJECT_ID = "jeans-shop-ed7cf"
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`

const PRODUCTS = [
  {
    id: "p1",
    name: "Dżinsy",
    price: 49.0,
    originalPrice: 59.0,
    imageUrl: "https://media.lee.com/i/lee/SIZE4-MODEL-Straight",
    category: "jeans",
    style: "Distressed",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Modne, przecierane jeansy z wysokiej jakości denimu. Doskonałe dopasowanie i niepowtarzalny charakter dzięki starannie wykonanym przetarciom.",
    gender: "Woman",
  },
  {
    id: "p2",
    name: "Kurtka dżinsowa",
    price: 59.0,
    originalPrice: 79.0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRND77stLVNqG3HGsw3PHVO66iYt1FYlcUdVVk_z9QSm9mYVY1WdQ44gVk&s=10",
    category: "jackets",
    style: "Casual",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Klasyczna kurtka jeansowa z unikalnym sznurowaniem po bokach. Idealna na chłodniejsze wieczory, doda charakteru każdej stylizacji.",
    gender: "Woman",
  },
  {
    id: "p3",
    name: "Spódnica dżinsowa",
    price: 79.0,
    originalPrice: 89.0,
    imageUrl:
      "https://images.napali.app/global/roxy-products/all/default/xlarge/erjdk03027_roxy,w_bfg0_frt9.jpg",
    category: "skirts",
    style: "Classic",
    sizes: ["S", "M", "L"],
    badge: "Best Seller",
    description:
      "Elegancja spotyka denim. Długa spódnica jeansowa o klasycznym kroju A-line z subtelnym rozszerzeniem u dołu.",
    gender: "Woman",
  },
  {
    id: "p4",
    name: "Szorty dżinsowe",
    price: 59.0,
    originalPrice: 99.0,
    imageUrl:
      "https://www.fitjeans.com/cdn/shop/files/fitjeans-ripped-shorts-xxs-womens-fitjeans-ripped-shorts-80s-blue-46363256095048.jpg?v=1770594047&width=15000",
    category: "shorts",
    style: "Distressed",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Krótkie szorty jeansowe z postrzępionymi nogawkami i przetarciami. Must-have na letnie, słoneczne dni.",
    gender: "Woman",
  },
  {
    id: "p5",
    name: "Męska kurtka dżinsowa",
    price: 35.0,
    originalPrice: 75.0,
    imageUrl:
      "https://cp.bigstar.pl/files/sc_staging_images/product/normal_img_623651.webp",
    category: "jackets",
    style: "Classic",
    sizes: ["M", "L", "XL", "XXL"],
    badge: "New",
    description:
      "Solidna męska kurtka jeansowa z ocieplanym kołnierzem typu kożuszek. Połączenie tradycyjnego stylu i ciepła.",
    gender: "Man",
  },
  {
    id: "p6",
    name: "Koszula jeansowa",
    price: 69.0,
    originalPrice: 89.0,
    imageUrl:
      "https://cp.bigstar.pl/files/sc_staging_images/product/normal_img_614806.webp",
    category: "shirts",
    style: "Classic",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Klasyczna koszula jeansowa o kroju regular fit. Miękki w dotyku materiał gwarantuje wygodę przez cały dzień.",
    gender: "Unisex",
  },
  {
    id: "p7",
    name: "Długi jeans ",
    price: 89.0,
    originalPrice: 99.0,
    imageUrl:
      "https://static.kappahl.com/cdn-cgi/image/width=768,format=auto/globalassets/productimages/190348_f.jpg?ref=F900286D80",
    category: "skirts",
    style: "High Waist",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Stylowa długa spódnica jeansowa z głębokim rozcięciem z przodu i wysokim stanem. Podkreśla sylwetkę i dodaje klasy.",
    gender: "Woman",
  },
  {
    id: "p8",
    name: "Męskie spodenki dżinsowe",
    price: 60.0,
    originalPrice: 80.0,
    imageUrl:
      "https://shopduer.com/cdn/shop/products/MSLT5021_Performance_Denim_Short_Tidal_002-FB-233653.jpg?v=1744049890&width=1463",
    category: "shorts",
    style: "Casual",
    sizes: ["M", "L", "XL", "XXL"],
    description:
      "Komfortowe męskie szorty jeansowe z gumką w pasie i sznurkiem do regulacji. Idealne do luźnych, sportowych stylizacji.",
    gender: "Man",
  },
  {
    id: "p9",
    name: "Kombinezon dżinsowy",
    price: 78.0,
    originalPrice: 98.0,
    imageUrl:
      "https://pix.bonprix.pl/imgc/0/0/2/5/1/6/5/4/1/6/_1/25165416/kombinezon-dzinsowy.webp",
    category: "overalls",
    style: "Casual",
    sizes: ["S", "M", "L"],
    description:
      "Oryginalny jednoczęściowy kombinezon jeansowy ogrodniczki z regulowanymi szelkami. Praktyczny i niezwykle modny.",
    gender: "Woman",
  },
  {
    id: "p10",
    name: "Oversizeowa kurtka dżinsowa",
    price: 85.0,
    originalPrice: 95.0,
    imageUrl:
      "https://www.litlookzstudio.com/cdn/shop/files/Grunge-Button-Up-Oversized-Denim-Jacket.jpg?v=1700136793",
    category: "jackets",
    style: "Elegant",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Elegancka kurtka denimowa o prostym, minimalistycznym kroju. Ciemnogranatowy odcień sprawia, że pasuje również do bardziej formalnych stylizacji.",
    gender: "Unisex",
  },
]

function toFirestoreValue(value) {
  if (value === null || value === undefined) return { nullValue: null }
  if (typeof value === "string") return { stringValue: value }
  if (typeof value === "boolean") return { booleanValue: value }
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? { integerValue: String(value) }
      : { doubleValue: value }
  }
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(toFirestoreValue) } }
  }
  if (typeof value === "object") {
    const fields = {}
    for (const [k, v] of Object.entries(value)) {
      fields[k] = toFirestoreValue(v)
    }
    return { mapValue: { fields } }
  }
  return { stringValue: String(value) }
}

function productToFields(product) {
  const { id, ...rest } = product
  const fields = {}
  for (const [key, value] of Object.entries(rest)) {
    if (value !== undefined) fields[key] = toFirestoreValue(value)
  }
  // Zachowaj id także w polach dokumentu
  fields.id = toFirestoreValue(id)
  return fields
}

function getAccessToken() {
  const credPath = join(homedir(), ".config", "configstore", "firebase-tools.json")
  if (!existsSync(credPath)) {
    throw new Error(
      `Brak tokena Firebase CLI (${credPath}). Uruchom: npx firebase login`,
    )
  }
  const json = JSON.parse(readFileSync(credPath, "utf8"))
  const token = json?.tokens?.access_token
  if (!token) throw new Error("Brak access_token w firebase-tools.json")
  return token
}

async function upsertProduct(token, product) {
  const url = `${BASE}/products/${product.id}`
  const body = { fields: productToFields(product) }
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    // Fallback: create if not exists
    if (res.status === 404) {
      const createUrl = `${BASE}/products?documentId=${product.id}`
      const createRes = await fetch(createUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      if (!createRes.ok) {
        const text = await createRes.text()
        throw new Error(`Create ${product.id} failed: ${createRes.status} ${text}`)
      }
      return "created"
    }
    const text = await res.text()
    throw new Error(`Upsert ${product.id} failed: ${res.status} ${text}`)
  }
  return "updated"
}

async function main() {
  console.log(`Seeding ${PRODUCTS.length} products → project ${PROJECT_ID}`)
  const token = getAccessToken()

  let ok = 0
  for (const product of PRODUCTS) {
    try {
      const status = await upsertProduct(token, product)
      console.log(`  ✓ ${product.id} (${product.name}) — ${status}`)
      ok++
    } catch (err) {
      console.error(`  ✗ ${product.id}:`, err.message)
    }
  }

  console.log(`\nDone: ${ok}/${PRODUCTS.length} products seeded.`)
  if (ok < PRODUCTS.length) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
