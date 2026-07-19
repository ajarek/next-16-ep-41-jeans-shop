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
    name: "Dżinsy",
    price: 49.00,
    originalPrice: 59.00,
    // Blue ripped jeans
    imageUrl: "https://media.lee.com/i/lee/SIZE4-MODEL-Straight",
    category: "jeans",
    style: "Distressed",
    sizes: ["S", "M", "L", "XL"],
    description: "Modne, przecierane jeansy z wysokiej jakości denimu. Doskonałe dopasowanie i niepowtarzalny charakter dzięki starannie wykonanym przetarciom.",
    gender: "Woman",
  },
  {
    id: "p2",
    name: "Kurtka dżinsowa",
    price: 59.00,
    originalPrice: 79.00,
    // Denim jacket with black laces
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRND77stLVNqG3HGsw3PHVO66iYt1FYlcUdVVk_z9QSm9mYVY1WdQ44gVk&s=10",
    category: "jackets",
    style: "Casual",
    sizes: ["XS", "S", "M", "L"],
    description: "Klasyczna kurtka jeansowa z unikalnym sznurowaniem po bokach. Idealna na chłodniejsze wieczory, doda charakteru każdej stylizacji.",
    gender: "Woman",
  },
  {
    id: "p3",
    name: "Spódnica dżinsowa",
    price: 79.00,
    originalPrice: 89.00,
    imageUrl: "https://images.napali.app/global/roxy-products/all/default/xlarge/erjdk03027_roxy,w_bfg0_frt9.jpg",
    category: "skirts",
    style: "Classic",
    sizes: ["S", "M", "L"],
    badge: "Best Seller",
    description: "Elegancja spotyka denim. Długa spódnica jeansowa o klasycznym kroju A-line z subtelnym rozszerzeniem u dołu.",
    gender: "Woman",
  },
  {
    id: "p4",
    name: "Szorty dżinsowe",
    price: 59.00,
    originalPrice: 99.00,
    imageUrl: "https://www.fitjeans.com/cdn/shop/files/fitjeans-ripped-shorts-xxs-womens-fitjeans-ripped-shorts-80s-blue-46363256095048.jpg?v=1770594047&width=15000",
    category: "shorts",
    style: "Distressed",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Krótkie szorty jeansowe z postrzępionymi nogawkami i przetarciami. Must-have na letnie, słoneczne dni.",
    gender: "Woman",
  },
  {
    id: "p5",
    name: "Męska kurtka dżinsowa",
    price: 35.00,
    originalPrice: 75.00,
    imageUrl: "https://cp.bigstar.pl/files/sc_staging_images/product/normal_img_623651.webp",
    category: "jackets",
    style: "Classic",
    sizes: ["M", "L", "XL", "XXL"],
    badge: "New",
    description: "Solidna męska kurtka jeansowa z ocieplanym kołnierzem typu kożuszek. Połączenie tradycyjnego stylu i ciepła.",
    gender: "Man",
  },
  {
    id: "p6",
    name: "Koszula jeansowa",
    price: 69.00,
    originalPrice: 89.00,
    imageUrl: "https://cp.bigstar.pl/files/sc_staging_images/product/normal_img_614806.webp",
    category: "shirts",
    style: "Classic",
    sizes: ["S", "M", "L", "XL"],
    description: "Klasyczna koszula jeansowa o kroju regular fit. Miękki w dotyku materiał gwarantuje wygodę przez cały dzień.",
    gender: "Unisex",
  },
  {
    id: "p7",
    name: "Długi jeans ",
    price: 89.00,
    originalPrice: 99.00,
    imageUrl: "https://static.kappahl.com/cdn-cgi/image/width=768,format=auto/globalassets/productimages/190348_f.jpg?ref=F900286D80",
    category: "skirts",
    style: "High Waist",
    sizes: ["XS", "S", "M", "L"],
    description: "Stylowa długa spódnica jeansowa z głębokim rozcięciem z przodu i wysokim stanem. Podkreśla sylwetkę i dodaje klasy.",
    gender: "Woman",
  },
  {
    id: "p8",
    name: "Męskie spodenki dżinsowe",
    price: 60.00,
    originalPrice: 80.00,
    imageUrl: "https://shopduer.com/cdn/shop/products/MSLT5021_Performance_Denim_Short_Tidal_002-FB-233653.jpg?v=1744049890&width=1463",
    category: "shorts",
    style: "Casual",
    sizes: ["M", "L", "XL", "XXL"],
    description: "Komfortowe męskie szorty jeansowe z gumką w pasie i sznurkiem do regulacji. Idealne do luźnych, sportowych stylizacji.",
    gender: "Man",
  },
  {
    id: "p9",
    name: "Kombinezon dżinsowy",
    price: 78.00,
    originalPrice: 98.00,
    imageUrl: "https://pix.bonprix.pl/imgc/0/0/2/5/1/6/5/4/1/6/_1/25165416/kombinezon-dzinsowy.webp",
    category: "overalls",
    style: "Casual",
    sizes: ["S", "M", "L"],
    description: "Oryginalny jednoczęściowy kombinezon jeansowy ogrodniczki z regulowanymi szelkami. Praktyczny i niezwykle modny.",
    gender: "Woman",
  },
  {
    id: "p10",
    name: "Oversizeowa kurtka dżinsowa",
    price: 85.00,
    originalPrice: 95.00,
    imageUrl: "https://www.litlookzstudio.com/cdn/shop/files/Grunge-Button-Up-Oversized-Denim-Jacket.jpg?v=1700136793",
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
