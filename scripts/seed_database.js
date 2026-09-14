const Database = require('better-sqlite3');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// Supabase setup
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qtldwcgzzroapkepttti.supabase.co';
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bGR3Y2d6enJvYXBrZXB0dHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNjg4MTMsImV4cCI6MjA1NTc0NDgxM30.default_placeholder';
const sanitizedKey = rawKey.replace(/\.default_placeholder$/, '');

const supabase = createClient(rawUrl, sanitizedKey);

// Registered Farmers & Stakeholders
const DEFAULT_REGISTERED_FARMERS = [
  {
    id: 'u_farmer_1',
    name: 'Ramesh Patil',
    phone: '9876543210',
    email: 'ramesh.patil@kisanbandhan.ai',
    district: 'Nashik',
    state: 'Maharashtra',
    address: 'Pimplgaon Baswant, Nashik, MH 422209',
    location: 'नासिक संकलन केंद्र (Nashik Mandi Hub)',
    fpoId: 'fpo_nashik_1',
  },
  {
    id: 'u_farmer_2',
    name: 'Harpreet Singh',
    phone: '9876543211',
    email: 'harpreet@kisanbandhan.ai',
    district: 'Ludhiana',
    state: 'Punjab',
    address: 'G.T. Road, Khanna, Ludhiana, PB 141401',
    location: 'खन्ना अनाज मंडी (Khanna Grain Mandi, PB)',
    fpoId: null,
  },
  {
    id: 'u_farmer_3',
    name: 'Suresh Gaikwad',
    phone: '9876543212',
    email: 'suresh.gaikwad@kisanbandhan.ai',
    district: 'Pune',
    state: 'Maharashtra',
    address: 'Baramati Agro Hub, Pune, MH 413102',
    location: 'बारामती एग्रो-हब (Baramati Agro Hub, Pune)',
    fpoId: null,
  },
  {
    id: 'u_farmer_4',
    name: 'Ananya Roy',
    phone: '9876543213',
    email: 'ananya.roy@kisanbandhan.ai',
    district: 'Hooghly',
    state: 'West Bengal',
    address: 'Singur Krishi Mandi, Hooghly, WB 712409',
    location: 'सिंगूर कृषि संकलन केंद्र (Singur Hub, WB)',
    fpoId: null,
  },
  {
    id: 'u_farmer_5',
    name: 'Rajesh Choudhary',
    phone: '9876543214',
    email: 'rajesh.farmer@kisanbandhan.ai',
    district: 'Jaipur',
    state: 'Rajasthan',
    address: 'Chomu Mandi Link Road, Jaipur, RJ 303702',
    location: 'चोमू कृषि मंडी हब (Chomu Mandi, Jaipur)',
    fpoId: null,
  },
];

const ALL_DEFAULT_USERS = [
  ...DEFAULT_REGISTERED_FARMERS.map((f) => ({
    id: f.id,
    name: f.name,
    phone: f.phone,
    email: f.email,
    role: 'FARMER',
    district: f.district,
    state: f.state,
    address: f.address,
  })),
  {
    id: 'u_fpo_1',
    name: 'Sanjay Deshmukh (FPO Lead)',
    phone: '9876543219',
    email: 'sanjay.fpo@kisanbandhan.ai',
    role: 'FPO',
    district: 'Nashik',
    state: 'Maharashtra',
    address: 'Sahyadri Farmers Producer Co., Lasalgaon, Nashik, MH',
  },
  {
    id: 'u_buyer_1',
    name: 'Priya Sharma (Consumer)',
    phone: '9811122233',
    email: 'priya@kisanbandhan.ai',
    role: 'BUYER',
    district: 'Pune',
    state: 'Maharashtra',
    address: 'Flat 402, Green Acres, Viman Nagar, Pune 411014',
  },
  {
    id: 'u_buyer_2',
    name: 'Annapurna Hotel & Catering',
    phone: '9822233344',
    email: 'annapurna@kisanbandhan.ai',
    role: 'BUYER',
    district: 'Pune',
    state: 'Maharashtra',
    address: 'Sector 17, Swargate, Pune 411002',
  },
  {
    id: 'u_hub_1',
    name: 'Rajesh Kulkarni (Hub Supervisor)',
    phone: '9900088877',
    email: 'rajesh.hub@kisanbandhan.ai',
    role: 'HUB_OPERATOR',
    district: 'Pune',
    state: 'Maharashtra',
    address: 'KisanBandhan Hub 4, Hadapsar Mandi, Pune 411028',
  },
  {
    id: 'u_partner_1',
    name: 'Vikram Shinde Fleet',
    phone: '9900011122',
    email: 'vikram.logistics@kisanbandhan.ai',
    role: 'TRANSPORTER',
    district: 'Pune',
    state: 'Maharashtra',
    address: 'Kisan Express Logistics Hub, Pune 411013',
  },
  {
    id: 'u_admin_1',
    name: 'Ministry Governance Admin',
    phone: '9000000000',
    email: 'admin@kisanbandhan.ai',
    role: 'ADMIN',
    district: 'New Delhi',
    state: 'Delhi',
    address: 'Dept of Consumer Affairs, Krishi Bhawan, New Delhi 110001',
  },
];

async function runSeed() {
  console.log('🚀 Starting Backend Database & Supabase Seeder...');

  const dbPath = path.join(process.cwd(), 'kisanbandhan.db');
  const db = new Database(dbPath);

  // 1. Ensure users table exists in SQLite
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT UNIQUE,
      role TEXT NOT NULL,
      village TEXT,
      district TEXT NOT NULL,
      state TEXT NOT NULL,
      address TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS product_listings (
      id TEXT PRIMARY KEY,
      farmer_id TEXT NOT NULL REFERENCES users(id),
      fpo_id TEXT,
      crop_name TEXT NOT NULL,
      category TEXT NOT NULL,
      quantity_available INTEGER NOT NULL,
      unit TEXT NOT NULL DEFAULT 'kg',
      price_paise INTEGER NOT NULL,
      mandi_retail_price_paise INTEGER NOT NULL,
      grade TEXT,
      harvest_date TEXT,
      organic_certified INTEGER DEFAULT 0,
      image_url TEXT,
      logo_url TEXT,
      location TEXT,
      district TEXT,
      status TEXT DEFAULT 'ACTIVE',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Insert Users into SQLite
  const userInsert = db.prepare(`
    INSERT INTO users (id, name, phone, email, role, village, district, state, address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      phone = excluded.phone,
      email = excluded.email,
      role = excluded.role,
      district = excluded.district,
      state = excluded.state,
      address = excluded.address
  `);

  db.transaction(() => {
    for (const u of ALL_DEFAULT_USERS) {
      userInsert.run(u.id, u.name, u.phone, u.email, u.role, 'Agro Hub', u.district, u.state, u.address);
    }
  })();
  console.log(`✅ Seeded ${ALL_DEFAULT_USERS.length} Registered Default Users in SQLite.`);

  // 3. Sync Users to Supabase
  try {
    const { error: userError } = await supabase.from('users').upsert(
      ALL_DEFAULT_USERS.map((u) => ({
        id: u.id,
        name: u.name,
        phone: u.phone,
        email: u.email,
        role: u.role,
        district: u.district,
        state: u.state,
        address: u.address,
      })),
      { onConflict: 'id' }
    );
    if (userError) {
      console.warn('⚠️ Supabase users sync notice:', userError.message);
    } else {
      console.log(`✅ Synced ${ALL_DEFAULT_USERS.length} Users to Supabase.`);
    }
  } catch (err) {
    console.warn('⚠️ Supabase users sync error:', err.message);
  }

  // 4. Load catalog items from cropCatalogData
  // Read catalog data file directly or extract
  const catalogPath = path.join(process.cwd(), 'src/lib/cropCatalogData.ts');
  const catalogContent = fs.readFileSync(catalogPath, 'utf-8');
  
  // Extract VEGETABLES_CATALOG, FRUITS_CATALOG, PULSES_CATALOG, GRAINS_CATALOG
  const extractItems = (varName) => {
    const regex = new RegExp(`export const ${varName}: CatalogCropItem\\[\\] = (\\[[\\s\\S]*?\\n\\]);`);
    const match = catalogContent.match(regex);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const veg = extractItems('VEGETABLES_CATALOG');
  const fruits = extractItems('FRUITS_CATALOG');
  const pulses = extractItems('PULSES_CATALOG');
  const grains = extractItems('GRAINS_CATALOG');

  const fullCatalog = [...veg, ...fruits, ...pulses, ...grains];
  console.log(`📦 Loaded ${fullCatalog.length} catalog crops (${veg.length} Veg, ${fruits.length} Fruits, ${pulses.length} Pulses, ${grains.length} Grains).`);

  const listingInsert = db.prepare(`
    INSERT INTO product_listings (
      id, farmer_id, fpo_id, crop_name, category, quantity_available, unit,
      price_paise, mandi_retail_price_paise, grade, harvest_date, organic_certified,
      image_url, logo_url, location, district, status
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?
    )
    ON CONFLICT(id) DO UPDATE SET
      farmer_id = excluded.farmer_id,
      fpo_id = excluded.fpo_id,
      quantity_available = excluded.quantity_available,
      price_paise = excluded.price_paise,
      mandi_retail_price_paise = excluded.mandi_retail_price_paise,
      image_url = excluded.image_url,
      logo_url = excluded.logo_url,
      location = excluded.location,
      district = excluded.district,
      status = 'ACTIVE'
  `);

  const harvestDate = new Date().toISOString().split('T')[0];
  const supaRecords = [];
  const breakdown = {};
  DEFAULT_REGISTERED_FARMERS.forEach((f) => {
    breakdown[f.id] = { name: f.name, location: f.location, count: 0, sampleCrops: [] };
  });

  let vegIdx = 0, fruitIdx = 0, pulseIdx = 0;

  db.transaction(() => {
    for (const item of fullCatalog) {
      let assignedFarmer = DEFAULT_REGISTERED_FARMERS[0];

      if (item.category === 'Vegetables') {
        assignedFarmer = vegIdx % 2 === 0 ? DEFAULT_REGISTERED_FARMERS[0] : DEFAULT_REGISTERED_FARMERS[3];
        vegIdx++;
      } else if (item.category === 'Grains') {
        assignedFarmer = DEFAULT_REGISTERED_FARMERS[1]; // Harpreet Singh
      } else if (item.category === 'Fruits') {
        assignedFarmer = fruitIdx % 3 === 0 ? DEFAULT_REGISTERED_FARMERS[0] : DEFAULT_REGISTERED_FARMERS[2]; // Suresh or Ramesh
        fruitIdx++;
      } else if (item.category === 'Pulses') {
        assignedFarmer = pulseIdx % 2 === 0 ? DEFAULT_REGISTERED_FARMERS[3] : DEFAULT_REGISTERED_FARMERS[4]; // Ananya or Rajesh
        pulseIdx++;
      } else {
        assignedFarmer = DEFAULT_REGISTERED_FARMERS[4]; // Rajesh Choudhary
      }

      const listingId = `lst_kisan_${item.id}`;
      const photos = item.photos && item.photos.length > 0 ? item.photos : [item.thumbnail || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'];
      const imageUrlJson = JSON.stringify(photos);
      const logoUrl = item.logo_url || item.sideLogo || photos[0];
      const pricePaise = item.pricePaise || Math.round((item.priceRupees || 30) * 100);
      const mandiPricePaise = Math.round(pricePaise * 1.25);

      listingInsert.run(
        listingId,
        assignedFarmer.id,
        assignedFarmer.fpoId,
        item.name,
        item.category,
        500,
        item.unit || 'kg',
        pricePaise,
        mandiPricePaise,
        item.grade || 'उच्चतम श्रेणी A+',
        harvestDate,
        item.isOrganic ? 1 : 0,
        imageUrlJson,
        logoUrl,
        assignedFarmer.location,
        assignedFarmer.district,
        'ACTIVE'
      );

      supaRecords.push({
        id: listingId,
        farmer_id: assignedFarmer.id,
        crop_name: item.name,
        category: item.category,
        quantity_available: 500,
        unit: item.unit || 'kg',
        price_paise: pricePaise,
        mandi_retail_price_paise: mandiPricePaise,
        grade: item.grade || 'उच्चतम श्रेणी A+',
        harvest_date: harvestDate,
        organic_certified: item.isOrganic ? 1 : 0,
        location: assignedFarmer.location,
        district: assignedFarmer.district,
        status: 'ACTIVE',
        image_url: imageUrlJson,
        logo_url: logoUrl,
      });

      breakdown[assignedFarmer.id].count++;
      if (breakdown[assignedFarmer.id].sampleCrops.length < 4) {
        breakdown[assignedFarmer.id].sampleCrops.push(item.name);
      }
    }
  })();

  console.log(`✅ Inserted/Updated ${fullCatalog.length} products in SQLite.`);

  // 5. Sync to Supabase in chunks
  let supaCount = 0;
  try {
    const chunkSize = 50;
    for (let i = 0; i < supaRecords.length; i += chunkSize) {
      const chunk = supaRecords.slice(i, i + chunkSize);
      const { error } = await supabase.from('product_listings').upsert(chunk, { onConflict: 'id' });
      if (!error) {
        supaCount += chunk.length;
      }
    }
    console.log(`✅ Synced ${supaCount} products to Supabase.`);
  } catch (err) {
    console.warn('⚠️ Supabase product sync notice:', err.message);
  }

  console.log('\n📊 Summary of Products per Registered Default User:');
  console.table(
    Object.keys(breakdown).map((k) => ({
      'User ID': k,
      'Farmer Name': breakdown[k].name,
      'Location': breakdown[k].location,
      'Total Products': breakdown[k].count,
      'Sample Products': breakdown[k].sampleCrops.join(', '),
    }))
  );

  console.log('✨ All registered users and their products are now active in the database!');
}

runSeed().catch(console.error);
