export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  category: 'jackets' | 'shorts' | 'jeans' | 'skirts' | 'shirts' | 'overalls';
  style: 'Casual' | 'Elegant' | 'Distressed' | 'High Waist' | 'Classic';
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  badge?: 'Best Seller' | 'New' | 'Promotion';
  description: string;
  gender: 'Woman' | 'Man' | 'Unisex';
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Denim jeans",
    price: 49.00,
    originalPrice: 59.00,
    // Blue ripped jeans
    imageUrl: "https://picsum.photos/seed/denim_jeans_blue/600/800",
    category: "jeans",
    style: "Distressed",
    sizes: ["S", "M", "L", "XL"],
    description: "Modne, przecierane jeansy z wysokiej jakości denimu. Doskonałe dopasowanie i niepowtarzalny charakter dzięki starannie wykonanym przetarciom.",
    gender: "Woman",
  },
  {
    id: "p2",
    name: "Denim jacket",
    price: 59.00,
    originalPrice: 79.00,
    // Denim jacket with black laces
    imageUrl: "https://picsum.photos/seed/denim_jacket_laces/600/800",
    category: "jackets",
    style: "Casual",
    sizes: ["XS", "S", "M", "L"],
    description: "Klasyczna kurtka jeansowa z unikalnym sznurowaniem po bokach. Idealna na chłodniejsze wieczory, doda charakteru każdej stylizacji.",
    gender: "Woman",
  },
  {
    id: "p3",
    name: "Denim scouts",
    price: 79.00,
    originalPrice: 89.00,
    imageUrl: "https://picsum.photos/seed/denim_scouts_skirt/600/800",
    category: "skirts",
    style: "Classic",
    sizes: ["S", "M", "L"],
    badge: "Best Seller",
    description: "Elegancja spotyka denim. Długa spódnica jeansowa o klasycznym kroju A-line z subtelnym rozszerzeniem u dołu.",
    gender: "Woman",
  },
  {
    id: "p4",
    name: "Denim shorts",
    price: 59.00,
    originalPrice: 99.00,
    imageUrl: "https://picsum.photos/seed/denim_shorts_destroyed/600/800",
    category: "shorts",
    style: "Distressed",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Krótkie szorty jeansowe z postrzępionymi nogawkami i przetarciami. Must-have na letnie, słoneczne dni.",
    gender: "Woman",
  },
  {
    id: "p5",
    name: "Denim man jacket",
    price: 35.00,
    originalPrice: 75.00,
    imageUrl: "https://picsum.photos/seed/denim_man_jacket_winter/600/800",
    category: "jackets",
    style: "Classic",
    sizes: ["M", "L", "XL", "XXL"],
    badge: "New",
    description: "Solidna męska kurtka jeansowa z ocieplanym kołnierzem typu kożuszek. Połączenie tradycyjnego stylu i ciepła.",
    gender: "Man",
  },
  {
    id: "p6",
    name: "Denim shirt",
    price: 69.00,
    originalPrice: 89.00,
    imageUrl: "https://picsum.photos/seed/denim_shirt_classic/600/800",
    category: "shirts",
    style: "Classic",
    sizes: ["S", "M", "L", "XL"],
    description: "Klasyczna koszula jeansowa o kroju regular fit. Miękki w dotyku materiał gwarantuje wygodę przez cały dzień.",
    gender: "Unisex",
  },
  {
    id: "p7",
    name: "Denim stylish scouts",
    price: 89.00,
    originalPrice: 99.00,
    imageUrl: "https://picsum.photos/seed/denim_stylish_scouts/600/800",
    category: "skirts",
    style: "High Waist",
    sizes: ["XS", "S", "M", "L"],
    description: "Stylowa długa spódnica jeansowa z głębokim rozcięciem z przodu i wysokim stanem. Podkreśla sylwetkę i dodaje klasy.",
    gender: "Woman",
  },
  {
    id: "p8",
    name: "Denim man shorty",
    price: 60.00,
    originalPrice: 80.00,
    imageUrl: "https://picsum.photos/seed/denim_man_shorty/600/800",
    category: "shorts",
    style: "Casual",
    sizes: ["M", "L", "XL", "XXL"],
    description: "Komfortowe męskie szorty jeansowe z gumką w pasie i sznurkiem do regulacji. Idealne do luźnych, sportowych stylizacji.",
    gender: "Man",
  },
  {
    id: "p9",
    name: "Denim jump suit",
    price: 78.00,
    originalPrice: 98.00,
    imageUrl: "https://picsum.photos/seed/denim_jump_suit/600/800",
    category: "overalls",
    style: "Casual",
    sizes: ["S", "M", "L"],
    description: "Oryginalny jednoczęściowy kombinezon jeansowy ogrodniczki z regulowanymi szelkami. Praktyczny i niezwykle modny.",
    gender: "Woman",
  },
  {
    id: "p10",
    name: "Denim common jacket",
    price: 85.00,
    originalPrice: 95.00,
    imageUrl: "https://picsum.photos/seed/denim_common_jacket/600/800",
    category: "jackets",
    style: "Elegant",
    sizes: ["S", "M", "L", "XL"],
    description: "Elegancka kurtka denimowa o prostym, minimalistycznym kroju. Ciemnogranatowy odcień sprawia, że pasuje również do bardziej formalnych stylizacji.",
    gender: "Unisex",
  }
];

export const CATEGORIES = [
  { id: "all", name: "Wszystko", count: PRODUCTS.length },
  { id: "jackets", name: "Kurtki", count: PRODUCTS.filter(p => p.category === "jackets").length },
  { id: "shorts", name: "Szorty", count: PRODUCTS.filter(p => p.category === "shorts").length },
  { id: "jeans", name: "Jeansy", count: PRODUCTS.filter(p => p.category === "jeans").length },
  { id: "skirts", name: "Spódnice", count: PRODUCTS.filter(p => p.category === "skirts").length },
  { id: "shirts", name: "Koszule", count: PRODUCTS.filter(p => p.category === "shirts").length },
  { id: "overalls", name: "Kombinezony", count: PRODUCTS.filter(p => p.category === "overalls").length }
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const STYLES = ["Casual", "Elegant", "Distressed", "High Waist", "Classic"] as const;
