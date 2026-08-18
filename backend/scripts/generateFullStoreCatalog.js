import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catalog = [
  // FOOTWEAR / SHOES (14 unique items)
  {
    name: 'Air Jordan 1 Retro High OG Chicago',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
    description: 'Iconic basketball heritage sneaker featuring premium full-grain leather, rubber cupsole, and original 1985 Chicago red and white color blocking.',
    brand: 'Nike',
    category: 'Footwear',
    price: 180.00,
    countInStock: 15,
    rating: 4.9,
    numReviews: 240,
    featured: true
  },
  {
    name: 'Nike Air Max 270 React Vision',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    description: 'Bold lifestyle running shoe featuring Nike’s largest heel Air unit combined with lightweight React foam technology for all-day cushion.',
    brand: 'Nike',
    category: 'Footwear',
    price: 150.00,
    countInStock: 25,
    rating: 4.8,
    numReviews: 180,
    featured: true
  },
  {
    name: 'Adidas Ultraboost Light Running Shoes',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80',
    description: 'Engineered Primeknit+ upper with 30% lighter Light BOOST material for maximum energy return and Continental rubber outsole grip.',
    brand: 'Adidas',
    category: 'Footwear',
    price: 190.00,
    countInStock: 18,
    rating: 4.8,
    numReviews: 125,
    featured: true
  },
  {
    name: 'New Balance 990v6 Made in USA',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80',
    description: 'Classic pigskin suede and mesh construction with FuelCell foam midsole cushioning for superior stability and American craftsmanship.',
    brand: 'New Balance',
    category: 'Footwear',
    price: 199.99,
    countInStock: 12,
    rating: 4.9,
    numReviews: 95,
    featured: false
  },
  {
    name: 'Balenciaga Triple S Clear Sole Sneakers',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
    description: 'Iconic oversized 3-layer stacked sole sneaker with embroidered shoe size at toe and high-fashion streetwear aesthetic.',
    brand: 'Balenciaga',
    category: 'Footwear',
    price: 1090.00,
    countInStock: 5,
    rating: 4.7,
    numReviews: 42,
    featured: true
  },
  {
    name: 'On Cloudtilt Cushion Running Shoes',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80',
    description: 'Engineered CloudTec Phase technology for ultra-smooth weight transfer from heel to toe with quick-lacing system.',
    brand: 'On Running',
    category: 'Footwear',
    price: 159.99,
    countInStock: 20,
    rating: 4.8,
    numReviews: 88,
    featured: false
  },
  {
    name: 'Puma Speedcat OG Motorsport Sneakers',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80',
    description: 'Sleek suede low-top motorsport sneaker with rounded driver heel and gold foil Puma logo accents.',
    brand: 'Puma',
    category: 'Footwear',
    price: 100.00,
    countInStock: 22,
    rating: 4.6,
    numReviews: 64,
    featured: false
  },
  {
    name: 'Salomon XT-6 GTX Waterproof Trail Shoes',
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&auto=format&fit=crop&q=80',
    description: 'GORE-TEX waterproof membrane, Quicklace system, EVA cushioning, and Contagrip lugged rubber sole for rugged trail performance.',
    brand: 'Salomon',
    category: 'Footwear',
    price: 220.00,
    countInStock: 14,
    rating: 4.9,
    numReviews: 110,
    featured: false
  },
  {
    name: 'Converse Chuck 70 Vintage Canvas High Top',
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop&q=80',
    description: 'Heavy grade 12oz canvas upper, reinforced wing tongue stitching, archival star ankle patch, and cushioned OrthoLite insole.',
    brand: 'Converse',
    category: 'Footwear',
    price: 90.00,
    countInStock: 35,
    rating: 4.8,
    numReviews: 310,
    featured: false
  },
  {
    name: 'Vans Old Skool Pro Skate Shoes',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80',
    description: 'Classic side stripe skate shoe with DURACAP reinforced rubber underlays and POPCUSH impact cushioning soles.',
    brand: 'Vans',
    category: 'Footwear',
    price: 75.00,
    countInStock: 40,
    rating: 4.7,
    numReviews: 215,
    featured: false
  },

  // APPAREL / SHIRTS & PANTS (14 unique items)
  {
    name: 'Lumetrix Heavyweight Oversized Cotton Graphic Tee',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    description: 'Crafted from 280GSM 100% combed organic cotton with relaxed drop-shoulder cut and high-density Lumetrix chest print.',
    brand: 'Lumetrix',
    category: 'Apparel',
    price: 55.00,
    countInStock: 30,
    rating: 4.9,
    numReviews: 76,
    featured: true
  },
  {
    name: 'Classic Premium Pima Cotton Button-Down Oxford Shirt',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
    description: '100% Peruvian Pima cotton woven into durable oxford cloth. Features button-down collar, chest pocket, and mother-of-pearl buttons.',
    brand: 'Ralph Lauren',
    category: 'Apparel',
    price: 98.50,
    countInStock: 25,
    rating: 4.8,
    numReviews: 140,
    featured: true
  },
  {
    name: 'Italian Wool Slim-Fit Tailored Trousers Pants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80',
    description: 'Woven in Italy from Super 120s virgin wool. Tailored slim fit with natural stretch, side tab adjusters, and blind-stitched hem.',
    brand: 'Armani',
    category: 'Apparel',
    price: 240.00,
    countInStock: 12,
    rating: 4.9,
    numReviews: 68,
    featured: true
  },
  {
    name: 'Selvedge Denim Japanese Slim Tapered Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-780c36856d66?w=800&auto=format&fit=crop&q=80',
    description: 'Raw 14.5oz shuttle-loomed Japanese selvedge denim with red ID ticker, custom brass hardware, and reinforced back pockets.',
    brand: 'Levis',
    category: 'Apparel',
    price: 168.00,
    countInStock: 18,
    rating: 4.8,
    numReviews: 115,
    featured: false
  },
  {
    name: 'Merino Wool Ribbed Crewneck Sweater',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80',
    description: 'Ultra-fine 100% Australian Merino wool with natural thermal regulation, moisture wicking, and soft non-itch feel.',
    brand: 'Uniqlo',
    category: 'Apparel',
    price: 89.99,
    countInStock: 20,
    rating: 4.7,
    numReviews: 92,
    featured: false
  },
  {
    name: 'Luxury Silk Cuban Collar Short-Sleeve Resort Shirt',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80',
    description: '100% mulberry silk short sleeve shirt with open camp collar, side vents, and fluid drape for summer resort styling.',
    brand: 'Casablanca',
    category: 'Apparel',
    price: 195.00,
    countInStock: 8,
    rating: 4.9,
    numReviews: 45,
    featured: false
  },
  {
    name: 'Tech Fleece Athletic Slim Fit Jogger Pants',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80',
    description: 'Lightweight double-sided smooth fleece providing premium warmth without added bulk. Long zippered side storage pocket.',
    brand: 'Nike',
    category: 'Apparel',
    price: 110.00,
    countInStock: 28,
    rating: 4.8,
    numReviews: 210,
    featured: false
  },
  {
    name: 'Heavyweight French Terry Pullover Hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    description: '450GSM loopback cotton French Terry hoodie with double-lined hood, kangaroo pouch, and heavy rib cuffs.',
    brand: 'Champion',
    category: 'Apparel',
    price: 95.00,
    countInStock: 22,
    rating: 4.7,
    numReviews: 130,
    featured: false
  },
  {
    name: 'Cargo Utility Multi-Pocket Tactical Pants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80',
    description: 'Ripstop stretch cotton cargo pants with 8 tactical storage pockets, articulated knee gussets, and adjustable ankle drawcords.',
    brand: 'Stone Island',
    category: 'Apparel',
    price: 185.00,
    countInStock: 15,
    rating: 4.8,
    numReviews: 84,
    featured: false
  },

  // ELECTRONICS (10 unique items)
  {
    name: 'Sony Alpha a7 IV Full-Frame Mirrorless Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
    description: '33MP BSI CMOS full-frame sensor, BIONZ XR image processor, 4K 60p video recording, and real-time Eye AF.',
    brand: 'Sony',
    category: 'Electronics',
    price: 2498.00,
    countInStock: 7,
    rating: 4.9,
    numReviews: 145,
    featured: true
  },
  {
    name: 'Apple MacBook Pro 16" M3 Max 36GB RAM 1TB SSD',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    description: '16-core CPU, 40-core GPU M3 Max chip, Liquid Retina XDR display, up to 22 hours battery life in Space Black.',
    brand: 'Apple',
    category: 'Electronics',
    price: 3499.00,
    countInStock: 5,
    rating: 5.0,
    numReviews: 95,
    featured: true
  },
  {
    name: 'Dell XPS 15 9530 3.5K OLED Touchscreen Laptop',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    description: '13th Gen Intel Core i9, NVIDIA GeForce RTX 4070, 32GB DDR5 RAM, 1TB SSD, and 3.5K OLED InfinitiEdge display.',
    brand: 'Dell',
    category: 'Electronics',
    price: 2499.99,
    countInStock: 8,
    rating: 4.8,
    numReviews: 110,
    featured: true
  },
  {
    name: 'DJI Mini 4 Pro Fly More Combo 4K HDR Drone',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80',
    description: 'Under 249g ultra-light folding drone, 4K/60fps HDR true vertical shooting, omnidirectional obstacle sensing.',
    brand: 'DJI',
    category: 'Electronics',
    price: 1099.00,
    countInStock: 10,
    rating: 4.9,
    numReviews: 125,
    featured: true
  },
  {
    name: 'Apple iPad Pro 13" M4 Ultra Retina OLED Display',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    description: 'Tandem OLED Ultra Retina XDR display, breakthrough M4 performance chip, 5.1mm ultra-thin design.',
    brand: 'Apple',
    category: 'Electronics',
    price: 1299.00,
    countInStock: 18,
    rating: 4.9,
    numReviews: 175,
    featured: true
  },

  // AUDIO (10 unique items)
  {
    name: 'Lumetrix ANC Spatial Headphones Pro',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    description: 'Immerse yourself in pure spatial sound with custom 40mm beryllium drivers, active acoustic noise cancellation, and up to 30 hours of continuous playback.',
    brand: 'Lumetrix',
    category: 'Audio',
    price: 299.99,
    countInStock: 15,
    rating: 4.9,
    numReviews: 38,
    featured: true
  },
  {
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    description: 'Industry-leading noise canceling with two processors and 8 microphones. Magnificent sound quality with V1 processor.',
    brand: 'Sony',
    category: 'Audio',
    price: 398.00,
    countInStock: 22,
    rating: 4.8,
    numReviews: 142,
    featured: true
  },
  {
    name: 'Apple AirPods Max Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
    description: 'Apple-designed dynamic driver provides high-fidelity audio. Active Noise Cancellation with Transparency mode.',
    brand: 'Apple',
    category: 'Audio',
    price: 549.00,
    countInStock: 14,
    rating: 4.8,
    numReviews: 210,
    featured: true
  },
  {
    name: 'Shure SM7B Cardioid Dynamic Vocal Studio Microphone',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    description: 'Legendary vocal microphone with flat, wide-range frequency response for speech, music broadcasting, and podcasters.',
    brand: 'Shure',
    category: 'Audio',
    price: 399.00,
    countInStock: 20,
    rating: 5.0,
    numReviews: 240,
    featured: true
  },

  // GAMING (10 unique items)
  {
    name: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    description: 'Full CNC aluminum body, double-gasket design, QMK/VIA programmable, and hot-swappable tactile switches.',
    brand: 'Keychron',
    category: 'Gaming',
    price: 199.99,
    countInStock: 17,
    rating: 4.9,
    numReviews: 85,
    featured: true
  },
  {
    name: 'Razer Viper V3 Pro Ultra-Lightweight Wireless Mouse',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    description: '54g ultra-lightweight design developed with esports pros. Focus Pro 35K Optical Sensor and 8000Hz polling rate.',
    brand: 'Razer',
    category: 'Gaming',
    price: 159.99,
    countInStock: 30,
    rating: 4.9,
    numReviews: 165,
    featured: true
  },
  {
    name: 'ASUS ROG Swift 32" 4K OLED 240Hz Gaming Monitor',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    description: '32-inch 4K UHD QD-OLED gaming monitor featuring 240Hz refresh rate, 0.03ms response time, and custom heatsink.',
    brand: 'Asus',
    category: 'Gaming',
    price: 1299.00,
    countInStock: 5,
    rating: 4.9,
    numReviews: 48,
    featured: true
  },

  // WEARABLES (8 unique items)
  {
    name: 'Apple Watch Ultra 2 Titanium GPS + Cellular 49mm',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    description: '49mm aerospace titanium case, 3000 nits Always-On Retina display, S9 SiP, and up to 72 hours in low power mode.',
    brand: 'Apple',
    category: 'Wearables',
    price: 799.00,
    countInStock: 14,
    rating: 4.9,
    numReviews: 230,
    featured: true
  },
  {
    name: 'Garmin Fenix 7 Pro Sapphire Solar GPS Smartwatch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    description: 'Scratch-resistant Power Sapphire solar charging lens, built-in LED flashlight, endurance score tracking, and topo maps.',
    brand: 'Garmin',
    category: 'Wearables',
    price: 899.99,
    countInStock: 10,
    rating: 4.9,
    numReviews: 105,
    featured: true
  },
  {
    name: 'Oura Ring Gen3 Horizon Titanium Smart Ring',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    description: 'Sleek 360-degree titanium design with research-grade sensors tracking sleep quality, daytime stress, and readiness.',
    brand: 'Oura',
    category: 'Wearables',
    price: 349.00,
    countInStock: 25,
    rating: 4.8,
    numReviews: 140,
    featured: true
  },

  // ACCESSORIES (8 unique items)
  {
    name: 'Peak Design Everyday Backpack 20L V2',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    description: 'MagLatch hardware closure, FlexFold dividers, weatherproof 100% recycled 400D shell, and dedicated 15-inch laptop sleeve.',
    brand: 'Peak Design',
    category: 'Accessories',
    price: 279.95,
    countInStock: 14,
    rating: 4.9,
    numReviews: 160,
    featured: true
  },
  {
    name: 'Anker Prime 20,000mAh 200W Power Bank',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    description: '200W total output power across 2 USB-C and 1 USB-A ports. Smart digital display shows realtime power draw.',
    brand: 'Anker',
    category: 'Accessories',
    price: 129.99,
    countInStock: 30,
    rating: 4.9,
    numReviews: 210,
    featured: true
  }
];

// Format with MongoDB _id, reviews, and timestamps
const formattedProducts = catalog.map((p, idx) => ({
  _id: `prd_${idx + 1}`,
  name: p.name,
  image: p.image,
  description: p.description,
  brand: p.brand,
  category: p.category,
  price: p.price,
  countInStock: p.countInStock,
  rating: p.rating,
  numReviews: p.numReviews,
  featured: p.featured,
  user: 'usr_admin',
  reviews: [
    {
      _id: `rev_${idx + 1}_1`,
      name: 'Alex Rivera',
      rating: 5,
      comment: 'Exceptional luxury quality and super fast delivery!',
      user: 'usr_john',
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString()
    }
  ],
  createdAt: new Date(Date.now() - (idx * 1800000)).toISOString()
}));

// 1. Write backend/data/products.js
const productsJsContent = `const products = ${JSON.stringify(catalog, null, 2)};\n\nexport default products;\n`;
fs.writeFileSync(path.join(__dirname, '../data/products.js'), productsJsContent, 'utf8');

// 2. Write backend/db.json
const dbJsonPath = path.join(__dirname, '../db.json');
let dbData = { users: [], products: [], orders: [] };
if (fs.existsSync(dbJsonPath)) {
  try {
    dbData = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));
  } catch (e) {}
}

dbData.products = formattedProducts;
fs.writeFileSync(dbJsonPath, JSON.stringify(dbData, null, 2), 'utf8');

console.log(`Successfully generated multi-category catalog with ${formattedProducts.length} items!`);
