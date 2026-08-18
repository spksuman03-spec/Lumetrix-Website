import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brands = [
  'Sony', 'Bose', 'Logitech', 'Razer', 'Garmin', 'Apple', 'Samsung', 'Dell',
  'Asus', 'Sennheiser', 'Anker', 'Nomad', 'Grovemade', 'Leica', 'Keychron',
  'SteelSeries', 'Corsair', 'Marshall', 'Bang & Olufsen', 'Shure', 'Alienware'
];

const categories = ['Audio', 'Gaming', 'Wearables', 'Electronics', 'Accessories'];

const productTemplates = [
  // AUDIO (22 templates)
  { name: 'Wireless ANC Over-Ear Headphones', cat: 'Audio', minP: 199, maxP: 499, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80', desc: 'Active noise cancelling headphones with spatial audio and 40-hour battery.' },
  { name: 'Studio Monitor Studio Headphones', cat: 'Audio', minP: 149, maxP: 349, img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80', desc: 'Flat frequency response studio headphones for audiophiles and producers.' },
  { name: 'Hi-Fi True Wireless Earbuds Pro', cat: 'Audio', minP: 129, maxP: 279, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80', desc: 'Compact wireless earbuds with hybrid ANC and transparency mode.' },
  { name: 'Desktop Hi-Res Reference Speakers', cat: 'Audio', minP: 249, maxP: 699, img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80', desc: 'Powered desktop speaker pair with bluetooth 5.3 and optical inputs.' },
  { name: 'Dolby Atmos Wireless Soundbar System', cat: 'Audio', minP: 399, maxP: 999, img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80', desc: '5.1 channel home theater soundbar with wireless sub and rear surround speakers.' },
  { name: 'Vintage Bluetooth Acoustic Speaker', cat: 'Audio', minP: 179, maxP: 399, img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80', desc: 'Retro aesthetic speaker with analog controls and room-filling acoustics.' },
  { name: 'USB Condenser Studio Microphone', cat: 'Audio', minP: 99, maxP: 249, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80', desc: 'Broadcast-grade condenser microphone for streaming, podcasting, and vocals.' },

  // GAMING (22 templates)
  { name: 'Custom Mechanical RGB Keyboard', cat: 'Gaming', minP: 119, maxP: 299, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80', desc: 'Hot-swappable mechanical keyboard with per-key RGB and aluminum chassis.' },
  { name: 'Ultra-Lightweight Wireless Gaming Mouse', cat: 'Gaming', minP: 69, maxP: 159, img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80', desc: 'Sub-60g competitive gaming mouse with 30,000 DPI sensor and optical switches.' },
  { name: '34-Inch Curved OLED 240Hz Gaming Monitor', cat: 'Gaming', minP: 799, maxP: 1399, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80', desc: '1000R curved ultra-wide OLED display with 0.03ms response time and G-Sync.' },
  { name: 'Haptic Feedback Wireless Gaming Headset', cat: 'Gaming', minP: 159, maxP: 329, img: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&auto=format&fit=crop&q=80', desc: 'Immersion haptic bass feedback, 7.1 surround sound, and retractable mic.' },
  { name: 'Pro Wireless Esports Controller', cat: 'Gaming', minP: 149, maxP: 249, img: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&auto=format&fit=crop&q=80', desc: 'Customizable back paddles, adjustable trigger stops, and interchangeable thumbsticks.' },
  { name: 'Ergonomic Breathable Mesh Racing Gaming Chair', cat: 'Gaming', minP: 299, maxP: 599, img: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=80', desc: '4D armrests, memory foam lumbar support cushion, and 165-degree recline.' },

  // WEARABLES (20 templates)
  { name: 'Titanium Smartwatch Ultra Pro', cat: 'Wearables', minP: 349, maxP: 799, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80', desc: 'Sapphire glass smartwatch with GPS, ECG, blood oxygen sensor, and 100m water resistance.' },
  { name: 'AR Display Smart Glasses', cat: 'Wearables', minP: 499, maxP: 899, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80', desc: 'Micro-OLED virtual display glasses for navigation, media consumption, and work.' },
  { name: 'Fitness Health Tracker Ring', cat: 'Wearables', minP: 199, maxP: 349, img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80', desc: 'Lightweight titanium smart ring for continuous sleep staging, HRV, and body temperature tracking.' },
  { name: 'Slim Amoled Fitness Tracker Band', cat: 'Wearables', minP: 49, maxP: 119, img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&auto=format&fit=crop&q=80', desc: 'Color AMOLED display band with 14-day battery, heart rate monitoring, and 50+ workout modes.' },

  // ELECTRONICS (20 templates)
  { name: '4K Full-Frame Studio Mirrorless Camera', cat: 'Electronics', minP: 1199, maxP: 2499, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80', desc: '33MP full-frame CMOS sensor with AI-powered autofocus and 4K 60p video.' },
  { name: 'Ultra-Slim 15-Inch OLED Laptop', cat: 'Electronics', minP: 1099, maxP: 1999, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80', desc: 'CNC aluminum laptop with 3.5K OLED touchscreen, 32GB RAM, and 1TB NVMe SSD.' },
  { name: '12.9-Inch Mini-LED Retina Pro Tablet', cat: 'Electronics', minP: 799, maxP: 1299, img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80', desc: 'Liquid Retina XDR display tablet with M-series chip, pencil support, and Thunderbolt.' },
  { name: 'Smart 4K Portable Laser Projector', cat: 'Electronics', minP: 499, maxP: 899, img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80', desc: '200-inch projection capability, auto-focus, auto-keystone, and built-in speakers.' },
  { name: 'Drone 4K HDR Quadcopter Pro', cat: 'Electronics', minP: 699, maxP: 1399, img: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80', desc: '4K/60fps HDR video, 47-minute flight time, omnidirectional obstacle sensing.' },

  // ACCESSORIES (20 templates)
  { name: 'Handcrafted Italian Leather Backpack', cat: 'Accessories', minP: 159, maxP: 299, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80', desc: 'Full-grain leather backpack with padded 16-inch laptop pocket and hidden luggage strap.' },
  { name: 'Wool Felt Desk Mat & Wireless Charger', cat: 'Accessories', minP: 49, maxP: 89, img: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=800&auto=format&fit=crop&q=80', desc: 'Merino wool felt desk mat featuring integrated fast wireless phone charging pad.' },
  { name: 'Magnetic Anodized Aluminum Laptop Stand', cat: 'Accessories', minP: 39, maxP: 79, img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80', desc: 'Ergonomic elevated stand with cable management and heat dissipation ventilation.' },
  { name: 'Multi-Port 140W GaN Desktop Power Station', cat: 'Accessories', minP: 59, maxP: 119, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80', desc: '4-port GaN III fast charger station for charging laptop, tablet, and phone simultaneously.' },
  { name: 'Water-Resistant Tech Cable Organizer Pouch', cat: 'Accessories', minP: 29, maxP: 59, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80', desc: 'Accordion style padded travel pouch for power banks, cables, chargers, and SD cards.' }
];

const adjectives = [
  'Pro', 'Ultra', 'Elite', 'Titan', 'Apex', 'Stealth', 'Phantom', 'Matrix',
  'Vanguard', 'Infinite', 'Cyber', 'Starlight', 'Vortex', 'Prime', 'Hyper', 'Nova'
];

const generatedProducts = [];

let idCounter = 1;

for (let i = 0; i < 112; i++) {
  const template = productTemplates[i % productTemplates.length];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  
  const name = `${brand} ${template.name} ${adj}`;
  const price = Number((Math.random() * (template.maxP - template.minP) + template.minP).toFixed(2));
  const rating = Number((Math.random() * 0.6 + 4.4).toFixed(1));
  const numReviews = Math.floor(Math.random() * 45) + 5;
  const countInStock = Math.floor(Math.random() * 25) + 3;
  const featured = i < 12;

  generatedProducts.push({
    _id: `prd_${idCounter}`,
    name,
    image: template.img,
    description: template.desc,
    brand,
    category: template.cat,
    price,
    countInStock,
    rating,
    numReviews,
    featured,
    user: 'usr_admin',
    reviews: [
      {
        _id: `rev_${idCounter}_1`,
        name: 'Alex Rivera',
        rating: 5,
        comment: 'Top tier quality! Exceeded my expectations.',
        user: 'usr_john',
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - (i * 3600000)).toISOString()
  });

  idCounter++;
}

// 1. Write backend/data/products.js
const productsJsContent = `const products = ${JSON.stringify(generatedProducts.map(({ _id, user, reviews, createdAt, ...rest }) => rest), null, 2)};\n\nexport default products;\n`;

fs.writeFileSync(path.join(__dirname, '../data/products.js'), productsJsContent, 'utf8');

// 2. Write backend/db.json
const dbJsonPath = path.join(__dirname, '../db.json');
let dbData = { users: [], products: [], orders: [] };
if (fs.existsSync(dbJsonPath)) {
  try {
    dbData = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));
  } catch (e) {}
}

dbData.products = generatedProducts;
fs.writeFileSync(dbJsonPath, JSON.stringify(dbData, null, 2), 'utf8');

console.log(`Successfully generated ${generatedProducts.length} products!`);
