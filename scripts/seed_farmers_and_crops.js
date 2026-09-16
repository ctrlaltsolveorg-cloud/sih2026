const { createClient } = require('@supabase/supabase-js');

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qtldwcgzzroapkepttti.supabase.co';
const rawAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bGR3Y2d6enJvYXBrZXB0dHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5MDUxNjUsImV4cCI6MjEwMjQ4MTE2NX0.uVNqZRQ0QJJxl0DyonU16XQ0oxlIjYQl0MgjL5DN85Q';
const supabase = createClient(rawUrl, rawAnonKey);

// 3 Real Dedicated Farmers
const FARMERS = [
  {
    id: 'u_farmer_ramkishan',
    name: 'Ramkishan Maurya (रामकिशन मौर्य)',
    phone: '+91 98391 22334',
    email: 'ramkishan.farmer@kisanbandhan.ai',
    role: 'FARMER',
    village: 'Kaimganj Farm Hub',
    district: 'Farrukhabad',
    state: 'Uttar Pradesh',
    address: 'Kaimganj Cold Storage Mandi Road, Farrukhabad, UP 209502',
    created_at: new Date().toISOString()
  },
  {
    id: 'u_farmer_gurpreet',
    name: 'Gurpreet Singh Sandhu (गुरप्रीत सिंह)',
    phone: '+91 98140 33445',
    email: 'gurpreet.sandhu@kisanbandhan.ai',
    role: 'FARMER',
    village: 'Khanna Grain Mandi Hub',
    district: 'Ludhiana',
    state: 'Punjab',
    address: 'G.T. Road, Asia Largest Grain Mandi, Khanna, Punjab 141401',
    created_at: new Date().toISOString()
  },
  {
    id: 'u_farmer_shivaji',
    name: 'Shivaji Rao Jadhav (शिवाजी राव जाधव)',
    phone: '+91 98220 44556',
    email: 'shivaji.jadhav@kisanbandhan.ai',
    role: 'FARMER',
    village: 'Narayangaon Tomato Hub',
    district: 'Pune',
    state: 'Maharashtra',
    address: 'Pune-Nashik Highway, Narayangaon Krishi Upaj Mandi, Pune, MH 410504',
    created_at: new Date().toISOString()
  }
];

// Curated Products with High-Res Bulk Farm Storage Photos
const PRODUCTS = [
  // Farmer 1: Ramkishan Maurya (Aaloo / Potato Specialist)
  {
    id: 'prod_aaloo_bulk_1',
    farmer_id: 'u_farmer_ramkishan',
    farmer_name: 'Ramkishan Maurya (रामकिशन मौर्य)',
    farmer_phone: '+91 98391 22334',
    crop_name: 'Potato / Aaloo (Kufri Pukhraj - Cold Storage Bulk)',
    crop_name_hi: 'आलू (कुफरी पुखराज - कोल्ड स्टोरेज थोक)',
    category: 'Vegetables',
    variety: 'Kufri Pukhraj',
    quantity_available: 5000,
    unit: 'kg',
    price_paise: 1800, // ₹18/kg
    mandi_retail_price_paise: 2400, // ₹24/kg
    grade: 'उच्चतम श्रेणी A+ (कोल्ड स्टोरेज ग्रेड)',
    harvest_date: '2026-09-15',
    organic_certified: 0,
    // Direct Bulk Storage Potato Photo
    image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80',
    logo_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80', // Huge heap of raw potatoes
      'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=1200&q=80', // Bulk farm storage potatoes
      'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&w=1200&q=80'  // Warehouse potato sacks
    ],
    location: 'Kaimganj Cold Storage Mandi #02, Farrukhabad',
    district: 'Farrukhabad',
    state: 'Uttar Pradesh',
    status: 'ACTIVE',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_aaloo_baby_2',
    farmer_id: 'u_farmer_ramkishan',
    farmer_name: 'Ramkishan Maurya (रामकिशन मौर्य)',
    farmer_phone: '+91 98391 22334',
    crop_name: 'Baby Potato / Chhota Aaloo (Dum Aaloo Grade - Fresh Dig)',
    crop_name_hi: 'छोटा दम आलू (ताज़ा खुदाई थोक ढेर)',
    category: 'Vegetables',
    variety: 'Chandramukhi Baby',
    quantity_available: 2500,
    unit: 'kg',
    price_paise: 2200, // ₹22/kg
    mandi_retail_price_paise: 2800,
    grade: 'A+ ग्रेड (छोटा गोल आलू)',
    harvest_date: '2026-09-14',
    organic_certified: 1,
    image_url: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=1200&q=80',
    logo_url: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Kaimganj Cold Storage Mandi #02, Farrukhabad',
    district: 'Farrukhabad',
    state: 'Uttar Pradesh',
    status: 'ACTIVE',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_pyaz_storage_3',
    farmer_id: 'u_farmer_ramkishan',
    farmer_name: 'Ramkishan Maurya (रामकिशन मौर्य)',
    farmer_phone: '+91 98391 22334',
    crop_name: 'Red Onion / Pyaz (Farm Storage Shed Bulk)',
    crop_name_hi: 'लाल प्याज (फार्म स्टोरेज शेड थोक)',
    category: 'Vegetables',
    variety: 'Pusa Red',
    quantity_available: 4000,
    unit: 'kg',
    price_paise: 2600, // ₹26/kg
    mandi_retail_price_paise: 3400,
    grade: 'A ग्रेड',
    harvest_date: '2026-09-13',
    organic_certified: 0,
    image_url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1200&q=80',
    logo_url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Farrukhabad Agri Mandi Hub',
    district: 'Farrukhabad',
    state: 'Uttar Pradesh',
    status: 'ACTIVE',
    created_at: new Date().toISOString()
  },

  // Farmer 2: Gurpreet Singh Sandhu (Grains & Mustard Specialist)
  {
    id: 'prod_gehun_bulk_1',
    farmer_id: 'u_farmer_gurpreet',
    farmer_name: 'Gurpreet Singh Sandhu (गुरप्रीत सिंह)',
    farmer_phone: '+91 98140 33445',
    crop_name: 'Sharbati Wheat (शरबती प्रीमियम गेहूं - Warehouse Sacks Bulk)',
    crop_name_hi: 'शरबती गेहूं (गोदाम थोक बोरी स्टॉक)',
    category: 'Grains',
    variety: 'Sharbati Gold',
    quantity_available: 10000, // 10 Tons
    unit: 'kg',
    price_paise: 3600, // ₹36/kg
    mandi_retail_price_paise: 4400,
    grade: 'उच्चतम श्रेणी A+ (100% साफ दाना)',
    harvest_date: '2026-09-12',
    organic_certified: 0,
    image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
    logo_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Khanna Grain Mandi Yard #14, Ludhiana',
    district: 'Ludhiana',
    state: 'Punjab',
    status: 'ACTIVE',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_basmati_bulk_2',
    farmer_id: 'u_farmer_gurpreet',
    farmer_name: 'Gurpreet Singh Sandhu (गुरप्रीत सिंह)',
    farmer_phone: '+91 98140 33445',
    crop_name: '1121 Basmati Paddy Rice (बासमती धान - Mandi Harvest Pile)',
    crop_name_hi: '1121 बासमती धान (मंडी थोक फसल ढेर)',
    category: 'Grains',
    variety: 'Pusa 1121',
    quantity_available: 8000,
    unit: 'kg',
    price_paise: 4200, // ₹42/kg
    mandi_retail_price_paise: 5000,
    grade: 'A+ एक्सपोर्ट क्वालिटी',
    harvest_date: '2026-09-14',
    organic_certified: 1,
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80',
    logo_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Khanna Grain Mandi Yard #14, Ludhiana',
    district: 'Ludhiana',
    state: 'Punjab',
    status: 'ACTIVE',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_sarson_bulk_3',
    farmer_id: 'u_farmer_gurpreet',
    farmer_name: 'Gurpreet Singh Sandhu (गुरप्रीत सिंह)',
    farmer_phone: '+91 98140 33445',
    crop_name: 'Yellow Mustard Seeds / Sarson (पीली सरसों - Farm Sacks Bulk)',
    crop_name_hi: 'पीली सरसों (तेल ग्रेड थोक बोरियां)',
    category: 'Seeds',
    variety: 'Pusa Bold Yellow',
    quantity_available: 3000,
    unit: 'kg',
    price_paise: 5800, // ₹58/kg
    mandi_retail_price_paise: 6800,
    grade: 'उच्च तेल प्रतिशत A+',
    harvest_date: '2026-09-10',
    organic_certified: 0,
    image_url: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1200&q=80',
    logo_url: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Khanna Mandi Warehouse, Punjab',
    district: 'Ludhiana',
    state: 'Punjab',
    status: 'ACTIVE',
    created_at: new Date().toISOString()
  },

  // Farmer 3: Shivaji Rao Jadhav (Tomatoes, Chillies & Green Peas Specialist)
  {
    id: 'prod_tamatar_crates_1',
    farmer_id: 'u_farmer_shivaji',
    farmer_name: 'Shivaji Rao Jadhav (शिवाजी राव जाधव)',
    farmer_phone: '+91 98220 44556',
    crop_name: 'Red Tomato / Tamatar (Vaishali - Crates Stack Bulk Mandi)',
    crop_name_hi: 'वैशाली लाल टमाटर (क्रेट्स स्टैक थोक मंडी)',
    category: 'Vegetables',
    variety: 'Vaishali 108',
    quantity_available: 4500,
    unit: 'kg',
    price_paise: 3200, // ₹32/kg
    mandi_retail_price_paise: 4000,
    grade: 'A+ ग्रेड (चमकदार पक्का लाल)',
    harvest_date: '2026-09-16',
    organic_certified: 0,
    image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80',
    logo_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Narayangaon Krishi Mandi Platform #03, Pune',
    district: 'Pune',
    state: 'Maharashtra',
    status: 'ACTIVE',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_mirch_bags_2',
    farmer_id: 'u_farmer_shivaji',
    farmer_name: 'Shivaji Rao Jadhav (शिवाजी राव जाधव)',
    farmer_phone: '+91 98220 44556',
    crop_name: 'Spicy Green Chilli (तीखी हरी मिर्च - Mesh Bags Bulk Wholesale)',
    crop_name_hi: 'हरी मिर्च (जालीदार बोरियों में थोक मंडी स्टॉक)',
    category: 'Vegetables',
    variety: 'G-4 Teja',
    quantity_available: 1800,
    unit: 'kg',
    price_paise: 4400, // ₹44/kg
    mandi_retail_price_paise: 5500,
    grade: 'A+ तीव्र तीखापन',
    harvest_date: '2026-09-15',
    organic_certified: 1,
    image_url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=1200&q=80',
    logo_url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Narayangaon Krishi Mandi Platform #03, Pune',
    district: 'Pune',
    state: 'Maharashtra',
    status: 'ACTIVE',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_matar_crates_3',
    farmer_id: 'u_farmer_shivaji',
    farmer_name: 'Shivaji Rao Jadhav (शिवाजी राव जाधव)',
    farmer_phone: '+91 98220 44556',
    crop_name: 'Fresh Green Peas / Matar (मीठी हरी मटर - Farm Crates Harvest Bulk)',
    crop_name_hi: 'मीठी हरी मटर (ताज़ी तुड़ाई क्रेट्स थोक)',
    category: 'Vegetables',
    variety: 'Arkel Sweet Peas',
    quantity_available: 2200,
    unit: 'kg',
    price_paise: 5200, // ₹52/kg
    mandi_retail_price_paise: 6500,
    grade: 'A+ मीठी भरी हुई फली',
    harvest_date: '2026-09-16',
    organic_certified: 1,
    image_url: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=1200&q=80',
    logo_url: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592394533824-9440e5d68530?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Narayangaon Mandi Yard, Pune',
    district: 'Pune',
    state: 'Maharashtra',
    status: 'ACTIVE',
    created_at: new Date().toISOString()
  }
];

async function seed() {
  console.log('🚀 1. Seeding 3 Verified Farmers into Supabase users table...');
  for (const farmer of FARMERS) {
    const { data, error } = await supabase.from('users').upsert(farmer, { onConflict: 'id' }).select();
    if (error) {
      console.error(`❌ Error inserting farmer ${farmer.name}:`, error.message);
    } else {
      console.log(`✅ Farmer inserted: ${farmer.name} (${farmer.id})`);
    }
  }

  console.log('\n🚀 2. Seeding 9 Bulk Farm Produce Products (3 per farmer) into Supabase product_listings...');
  for (const prod of PRODUCTS) {
    const { data, error } = await supabase.from('product_listings').upsert(prod, { onConflict: 'id' }).select();
    if (error) {
      console.error(`❌ Error inserting product ${prod.crop_name}:`, error.message);
    } else {
      console.log(`✅ Product inserted: ${prod.crop_name} -> Farmer: ${prod.farmer_name} | Photo: ${prod.image_url.slice(0, 50)}...`);
    }
  }

  console.log('\n✨ Verifying counts in Supabase...');
  const { data: allUsers } = await supabase.from('users').select('id, name, role').eq('role', 'FARMER');
  console.log('Total Farmers in Supabase:', allUsers?.length);
  
  const { data: allProds } = await supabase.from('product_listings').select('id, crop_name, farmer_name, image_url');
  console.log('Total Products in Supabase:', allProds?.length);
  console.log('Sample Products:', allProds?.slice(-5));
}

seed();
