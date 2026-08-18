import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catalog = [
  // MEN'S COLLECTION
  {
    name: 'Men’s Air Jordan 1 Retro High OG Chicago',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
    description: 'Men’s iconic basketball heritage sneaker featuring premium full-grain leather, rubber cupsole, and original 1985 Chicago red/white colorway.',
    brand: 'Nike',
    category: 'Footwear',
    gender: 'Men',
    price: 180.00,
    countInStock: 15,
    rating: 4.9,
    numReviews: 240,
    featured: true
  },
  {
    name: 'Men’s Italian Wool Slim-Fit Suit Trousers Pants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80',
    description: 'Men’s tailored trousers woven in Italy from Super 120s virgin wool with natural stretch and blind-stitched hem.',
    brand: 'Armani',
    category: 'Apparel',
    gender: 'Men',
    price: 240.00,
    countInStock: 12,
    rating: 4.9,
    numReviews: 68,
    featured: true
  },
  {
    name: 'Men’s Heavyweight Oversized Organic Cotton Graphic Tee',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    description: 'Men’s 280GSM organic cotton tee with drop-shoulder cut and high-density Lumetrix graphic chest print.',
    brand: 'Lumetrix',
    category: 'Apparel',
    gender: 'Men',
    price: 55.00,
    countInStock: 30,
    rating: 4.9,
    numReviews: 76,
    featured: true
  },
  {
    name: 'Men’s Selvedge Denim Japanese Slim Tapered Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-780c36856d66?w=800&auto=format&fit=crop&q=80',
    description: 'Men’s raw 14.5oz shuttle-loomed Japanese selvedge denim with red ID ticker and custom brass hardware.',
    brand: 'Levis',
    category: 'Apparel',
    gender: 'Men',
    price: 168.00,
    countInStock: 18,
    rating: 4.8,
    numReviews: 115,
    featured: false
  },
  {
    name: 'Men’s Technical Waterproof Hooded Windbreaker Jacket',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80',
    description: 'Men’s lightweight GORE-TEX 3-layer breathable windbreaker jacket with sealed seams and storm hood.',
    brand: 'Arc’teryx',
    category: 'Apparel',
    gender: 'Men',
    price: 320.00,
    countInStock: 10,
    rating: 4.9,
    numReviews: 82,
    featured: false
  },

  // WOMEN'S COLLECTION
  {
    name: 'Women’s Nike Air Max 270 React Cushion Sneakers',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    description: 'Women’s lifestyle running shoe featuring Nike’s largest heel Air unit combined with lightweight React foam.',
    brand: 'Nike',
    category: 'Footwear',
    gender: 'Women',
    price: 150.00,
    countInStock: 25,
    rating: 4.8,
    numReviews: 180,
    featured: true
  },
  {
    name: 'Women’s Luxury Silk Floral Summer Midi Dress',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80',
    description: 'Women’s 100% mulberry silk midi dress featuring hand-painted floral pattern, adjustable straps, and fluid silhouette.',
    brand: 'Reformation',
    category: 'Apparel',
    gender: 'Women',
    price: 248.00,
    countInStock: 14,
    rating: 4.9,
    numReviews: 94,
    featured: true
  },
  {
    name: 'Women’s Cashmere Ribbed Knit Open-Front Cardigan',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    description: 'Women’s 100% Grade-A Mongolian cashmere cardigan sweater with deep side pockets and relaxed drop shoulder fit.',
    brand: 'Everlane',
    category: 'Apparel',
    gender: 'Women',
    price: 185.00,
    countInStock: 16,
    rating: 4.8,
    numReviews: 67,
    featured: true
  },
  {
    name: 'Women’s High-Waisted Tailored Wide-Leg Linen Trousers',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
    description: 'Women’s breathable French flax linen trousers with high waist rise, front pleats, and comfortable elastic back waist.',
    brand: 'ZARA',
    category: 'Apparel',
    gender: 'Women',
    price: 89.90,
    countInStock: 22,
    rating: 4.7,
    numReviews: 110,
    featured: false
  },
  {
    name: 'Women’s Oura Ring Gen3 Horizon Rose Gold Smart Ring',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    description: 'Women’s titanium smart ring in Rose Gold tracking sleep staging, readiness score, cycle insights, and stress.',
    brand: 'Oura',
    category: 'Wearables',
    gender: 'Women',
    price: 449.00,
    countInStock: 12,
    rating: 4.9,
    numReviews: 125,
    featured: false
  },

  // KIDS' COLLECTION
  {
    name: 'Kids’ Nike Air Force 1 Low Junior Sneakers',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&auto=format&fit=crop&q=80',
    description: 'Kids’ classic low-top leather sneaker with durable rubber cupsole, padded collar, and soft foam cushioning.',
    brand: 'Nike',
    category: 'Footwear',
    gender: 'Kids',
    price: 75.00,
    countInStock: 30,
    rating: 4.9,
    numReviews: 195,
    featured: true
  },
  {
    name: 'Kids’ Heavyweight Cotton Graphic Hoodie & Joggers Set',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80',
    description: 'Kids’ 2-piece cozy fleece tracksuit set with rib-knit cuffs, elastic waistband, and soft brushed interior.',
    brand: 'Champion',
    category: 'Apparel',
    gender: 'Kids',
    price: 65.00,
    countInStock: 25,
    rating: 4.8,
    numReviews: 88,
    featured: true
  },
  {
    name: 'Kids’ Safe-Sound 85dB Volume-Limiting Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    description: 'Kids’ bluetooth headphones engineered with safe 85dB max volume limit, durable bendable headband, and 30-hour battery.',
    brand: 'JBL',
    category: 'Audio',
    gender: 'Kids',
    price: 49.99,
    countInStock: 35,
    rating: 4.9,
    numReviews: 140,
    featured: true
  },
  {
    name: 'Kids’ Smart Activity GPS Tracker Watch with SOS Button',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    description: 'Kids’ smart watch with real-time GPS tracking, 4G voice/video calls, geofence alerts, and emergency SOS button.',
    brand: 'Garmin',
    category: 'Wearables',
    gender: 'Kids',
    price: 119.00,
    countInStock: 18,
    rating: 4.7,
    numReviews: 76,
    featured: false
  },
  {
    name: 'Kids’ Interactive Educational 10" HD Learning Tablet',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    description: 'Kids’ 10-inch HD display tablet with kid-proof protective bumper case, parental controls, and pre-loaded STEM apps.',
    brand: 'Amazon',
    category: 'Electronics',
    gender: 'Kids',
    price: 139.99,
    countInStock: 20,
    rating: 4.8,
    numReviews: 210,
    featured: false
  },

  // TECH & ACCESSORIES
  {
    name: 'Lumetrix ANC Spatial Headphones Pro',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    description: 'Immerse yourself in pure spatial sound with custom 40mm beryllium drivers, active acoustic noise cancellation, and 30 hours playtime.',
    brand: 'Lumetrix',
    category: 'Audio',
    gender: 'Unisex',
    price: 299.99,
    countInStock: 15,
    rating: 4.9,
    numReviews: 38,
    featured: true
  },
  {
    name: 'Sony Alpha a7 IV Full-Frame Mirrorless Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
    description: '33MP BSI CMOS full-frame sensor, BIONZ XR image processor, 4K 60p video recording, and real-time Eye AF.',
    brand: 'Sony',
    category: 'Electronics',
    gender: 'Unisex',
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
    gender: 'Unisex',
    price: 3499.00,
    countInStock: 5,
    rating: 5.0,
    numReviews: 95,
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
  gender: p.gender || 'Unisex',
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
      comment: 'Top tier quality! Perfect fit and super fast delivery.',
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

console.log(`Successfully generated Men, Women, and Kids catalog with ${formattedProducts.length} items!`);
