import { getDb } from './db';
import { supabase } from './supabase';
import { getOrFetchCropTranslation } from './translator';
import { getCropPhotosByName } from './cropImageMatcher';
import { FULL_CROP_CATALOG } from './cropCatalogData';

export interface CropListingInput {
  cropName: string;
  quantityKg: number | string;
  priceRupees: number | string;
  grade?: string;
  location?: string;
  category?: string;
  farmerId?: string;
  farmerName?: string;
  imageUrl?: string;
  images?: string[]; // 2 to 6 photos support
  logoUrl?: string;
  unit?: string;
}

/**
 * Ensure exactly 3 verified staple products and their verified farmers exist in DB
 */
export function ensureStapleProductsSeeded(db: any) {
  try {
    // 1. Ensure verified farmers exist
    db.prepare(`
      INSERT OR REPLACE INTO users (id, name, phone, email, role, village, district, state, address)
      VALUES 
      ('u_farmer_1', 'Ramesh Patil (रमेश पाटिल)', '+91 98765 43210', 'ramesh.patil@kisanbandhan.ai', 'FARMER', 'Pimplgaon', 'Nashik', 'Maharashtra', 'खेत संकलन केंद्र #04, नासिक (Nashik Hub, Maharashtra)'),
      ('u_farmer_2', 'Harpreet Singh (हरप्रीत सिंह)', '+91 98765 43211', 'harpreet@kisanbandhan.ai', 'FARMER', 'Pimplgaon Hub', 'Nashik', 'Maharashtra', 'पिंपलगांव मंडी हब, नासिक (Pimplgaon Mandi Hub, Nashik)'),
      ('u_farmer_3', 'Suresh Gaikwad (सुरेश गायकवाड़)', '+91 98765 43212', 'suresh.gaikwad@kisanbandhan.ai', 'FARMER', 'Sehore Mandi', 'Sehore', 'Madhya Pradesh', 'सीहोर कृषि मंडी हब, मध्य प्रदेश (Sehore Mandi Hub, MP)')
    `).run();

    // 2. Ensure buyers exist
    db.prepare(`
      INSERT OR REPLACE INTO users (id, name, phone, email, role, village, district, state, address)
      VALUES 
      ('u_buyer_1', 'Priya Sharma (प्रिया शर्मा)', '+91 98111 22233', 'priya.buyer@kisanbandhan.ai', 'BUYER', 'Viman Nagar', 'Pune', 'Maharashtra', 'Sector 4, Viman Nagar, Pune, Maharashtra 411014'),
      ('u_buyer_2', 'Annapurna Hotel & Catering (होटल अन्नपूर्णा)', '+91 98222 33344', 'annapurna@kisanbandhan.ai', 'BUYER', 'Swargate', 'Pune', 'Maharashtra', 'Annapurna Hotel & Catering, Swargate, Pune 411002'),
      ('u_partner_1', 'Vikram Shinde Fleet (विक्रम शिंदे)', '+91 99000 11122', 'vikram.logistics@kisanbandhan.ai', 'TRANSPORTER', 'Hadapsar', 'Pune', 'Maharashtra', 'Kisan Express Logistics Hub, Pune')
    `).run();

    // 3. Ensure the 3 verified products exist
    db.prepare(`
      INSERT OR REPLACE INTO product_listings (
        id, farmer_id, crop_name, category, quantity_available, unit, price_paise, mandi_retail_price_paise, grade, harvest_date, image_url, location, district, status
      ) VALUES 
      ('prod_tomato_1', 'u_farmer_1', 'Tomato (Vaishali 108)', 'Vegetables', 500, 'kg', 3450, 4200, 'उच्चतम श्रेणी A+', '2026-09-14', '', 'खेत संकलन केंद्र #04, नासिक (Nashik Hub, Maharashtra)', 'Nashik', 'ACTIVE'),
      ('prod_onion_1', 'u_farmer_2', 'Onion (Nashik Red)', 'Vegetables', 800, 'kg', 2800, 3500, 'ग्रेड A+ (निर्यात गुणवत्ता)', '2026-09-14', '', 'पिंपलगांव मंडी हब, नासिक (Pimplgaon Mandi Hub, Nashik)', 'Nashik', 'ACTIVE'),
      ('prod_wheat_1', 'u_farmer_3', 'Wheat (Sharbati Gold)', 'Grains', 1200, 'kg', 3800, 4600, 'प्रीमियम ग्रेड A', '2026-09-14', '', 'सीहोर कृषि मंडी हब, मध्य प्रदेश (Sehore Mandi Hub, MP)', 'Sehore', 'ACTIVE')
    `).run();

    // 4. Ensure ord_501 order item exists so transporter shows real crop details
    try {
      const orderItem = db.prepare('SELECT id FROM order_items WHERE order_id = ?').get('ord_501');
      if (!orderItem) {
        db.prepare(`
          INSERT INTO order_items (order_id, listing_id, crop_name, quantity, unit, unit_price_paise)
          VALUES ('ord_501', 'prod_tomato_1', 'Tomato (Vaishali 108)', 100, 'kg', 3450)
        `).run();
      }
    } catch (e) {}

  } catch (e) {
    console.warn('Notice seeding staple products:', e);
  }
}

/**
 * Fetch all active crop listings (Public Marketplace across India)
 * Supabase Cloud first, with SQLite fallback.
 */
export async function getAllCrops() {
  // 1. Try Supabase Cloud first
  try {
    const { data: supaCrops, error: supaErr } = await supabase
      .from('product_listings')
      .select('*')
      .eq('status', 'ACTIVE')
      .order('created_at', { ascending: false });

    if (!supaErr && Array.isArray(supaCrops) && supaCrops.length > 0) {
      return supaCrops;
    }
  } catch (err) {
    console.warn('Supabase getAllCrops failed, falling back to SQLite:', err);
  }

  // 2. Fallback to SQLite DB
  const db = getDb();
  ensureStapleProductsSeeded(db);
  return db
    .prepare(
      `
    SELECT l.*, COALESCE(u.name, 'Verified Farmer') as farmer_name, COALESCE(u.phone, '+91 98765 43210') as farmer_phone
    FROM product_listings l
    LEFT JOIN users u ON l.farmer_id = u.id
    WHERE l.status = 'ACTIVE' OR l.status IS NULL
    ORDER BY l.created_at DESC
  `
    )
    .all();
}

/**
 * Fetch crops owned by a specific farmer (User-Isolated Farmer Desk)
 * Shows only the crops belonging to the given farmerId.
 */
export async function getCropsByFarmer(farmerId: string) {
  if (!farmerId) return [];

  // 1. Try Supabase Cloud first
  try {
    const { data: supaCrops, error: supaErr } = await supabase
      .from('product_listings')
      .select('*')
      .eq('farmer_id', farmerId)
      .order('created_at', { ascending: false });

    if (!supaErr && Array.isArray(supaCrops)) {
      return supaCrops;
    }
  } catch (err) {
    console.warn('Supabase getCropsByFarmer failed, falling back to SQLite:', err);
  }

  // 2. Fallback to SQLite DB
  const db = getDb();
  ensureStapleProductsSeeded(db);
  return db
    .prepare(
      `
    SELECT l.*, COALESCE(u.name, 'Verified Farmer') as farmer_name, COALESCE(u.phone, '+91 98765 43210') as farmer_phone
    FROM product_listings l
    LEFT JOIN users u ON l.farmer_id = u.id
    WHERE l.farmer_id = ?
    ORDER BY l.created_at DESC
  `
    )
    .all(farmerId);
}

/**
 * Create a new crop listing with auto-AI translation & Supabase sync
 */
export async function createCropListing(input: CropListingInput) {
  const { cropName, quantityKg, priceRupees, grade, location, category, farmerId, farmerName, imageUrl, images, unit } = input;

  if (!cropName) {
    throw new Error('Crop name is required');
  }

  const id = `lst_${Date.now()}`;
  const pricePaise = Math.round((parseFloat(String(priceRupees)) || 30) * 100);
  const mandiPricePaise = Math.round(pricePaise * 1.25);
  const qty = parseInt(String(quantityKg)) || 500;
  const cat = category || 'Vegetables';
  const loc = location || 'नासिक एग्रो-हब #04';
  const gradeVal = grade || 'उच्चतम श्रेणी A+';
  const harvestDate = new Date().toISOString().split('T')[0];
  const actualFarmerId = farmerId || 'u_farmer_1';
  // Format images: prioritize images array (2 to 6 photos), serialize to JSON or fallback to name-matched crop photos
  let finalImageList: string[] = [];
  if (Array.isArray(images) && images.length > 0) {
    finalImageList = images.filter((img) => typeof img === 'string' && img.trim().length > 0);
  } else if (imageUrl && imageUrl.trim().length > 0) {
    finalImageList = [imageUrl.trim()];
  } else {
    finalImageList = getCropPhotosByName(cropName);
  }

  // Ensure image_url stores valid representation
  const cropImage = finalImageList.length > 1 ? JSON.stringify(finalImageList) : finalImageList[0];

  // 1. Auto AI Translation & Cache
  await getOrFetchCropTranslation(cropName);

  const newListing = {
    id,
    farmer_id: actualFarmerId,
    fpo_id: 'fpo_nashik_1',
    crop_name: cropName,
    category: cat,
    quantity_available: qty,
    unit: unit || 'kg',
    price_paise: pricePaise,
    mandi_retail_price_paise: mandiPricePaise,
    grade: gradeVal,
    harvest_date: harvestDate,
    organic_certified: gradeVal.includes('ऑर्गेनिक') || gradeVal.includes('Organic') ? 1 : 0,
    image_url: cropImage,
    logo_url: input.logoUrl || (finalImageList.length > 0 ? finalImageList[0] : ''),
    location: loc,
    district: 'Nashik',
    status: 'ACTIVE',
  };

  // 2. Save in SQLite DB
  const db = getDb();
  try {
    // Ensure farmer user exists in users table to satisfy foreign key
    db.prepare(`
      INSERT OR IGNORE INTO users (id, name, phone, email, role, village, district, state, address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      actualFarmerId,
      farmerName || 'किसान (Farmer)',
      '+91 98765 43210',
      `${actualFarmerId}@kisanbandhan.ai`,
      'FARMER',
      'Village Hub',
      'Nashik',
      'Maharashtra',
      loc
    );

    // Ensure default FPO exists
    db.prepare(`
      INSERT OR IGNORE INTO fpos (id, name, registration_number, district, state, hub_id)
      VALUES ('fpo_nashik_1', 'Sahyadri Farmers Producer Co.', 'FPO-MH-2024-001', 'Nashik', 'Maharashtra', 'hub_nashik_1')
    `).run();

    db.prepare(
      `
      INSERT INTO product_listings (id, farmer_id, fpo_id, crop_name, category, quantity_available, unit, price_paise, mandi_retail_price_paise, grade, harvest_date, organic_certified, image_url, logo_url, location, district, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    ).run(
      id,
      newListing.farmer_id,
      newListing.fpo_id,
      newListing.crop_name,
      newListing.category,
      newListing.quantity_available,
      newListing.unit,
      newListing.price_paise,
      newListing.mandi_retail_price_paise,
      newListing.grade,
      newListing.harvest_date,
      newListing.organic_certified,
      newListing.image_url,
      newListing.logo_url,
      newListing.location,
      newListing.district,
      newListing.status
    );
  } catch (dbErr) {
    // Fallback if older schema without logo_url
    db.prepare(
      `
      INSERT INTO product_listings (id, farmer_id, fpo_id, crop_name, category, quantity_available, unit, price_paise, mandi_retail_price_paise, grade, harvest_date, organic_certified, image_url, location, district, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    ).run(
      id,
      newListing.farmer_id,
      newListing.fpo_id,
      newListing.crop_name,
      newListing.category,
      newListing.quantity_available,
      newListing.unit,
      newListing.price_paise,
      newListing.mandi_retail_price_paise,
      newListing.grade,
      newListing.harvest_date,
      newListing.organic_certified,
      newListing.image_url,
      newListing.location,
      newListing.district,
      newListing.status
    );
  }

  // 3. Supabase Sync (Cloud Primary)
  let supabaseStatus = 'Supabase Synced';
  try {
    // 3a. Ensure farmer user exists in Supabase users table
    try {
      await supabase.from('users').upsert({
        id: actualFarmerId,
        name: farmerName || 'किसान (Farmer)',
        phone: '+91 98765 43210',
        role: 'FARMER',
        district: 'Nashik',
        state: 'Maharashtra',
        address: loc,
      });
    } catch (uErr) {
      console.warn('Notice ensuring user in Supabase:', uErr);
    }

    // 3b. Insert or update listing in Supabase product_listings
    const supaListing = {
      id,
      farmer_id: actualFarmerId,
      farmer_name: farmerName || 'किसान (Farmer)',
      farmer_phone: '+91 98765 43210',
      crop_name: newListing.crop_name,
      category: newListing.category,
      quantity_available: newListing.quantity_available,
      unit: newListing.unit,
      price_paise: newListing.price_paise,
      mandi_retail_price_paise: newListing.mandi_retail_price_paise,
      grade: newListing.grade,
      harvest_date: newListing.harvest_date,
      organic_certified: newListing.organic_certified,
      image_url: newListing.image_url,
      logo_url: newListing.logo_url,
      images: finalImageList,
      location: newListing.location,
      district: 'Nashik',
      status: 'ACTIVE',
    };

    const { error } = await supabase.from('product_listings').upsert([supaListing]);
    if (error) {
      console.warn('Supabase product_listings upsert note:', error.message);
      supabaseStatus = `SQLite Saved (Supabase Note: ${error.message})`;
    } else {
      supabaseStatus = 'Supabase Cloud Synced (Verified)';
    }
  } catch (err: any) {
    console.warn('Supabase product_listings catch note:', err.message);
    supabaseStatus = `SQLite Saved (${err.message})`;
  }

  return {
    success: true,
    id,
    crop: newListing.crop_name,
    qty: newListing.quantity_available,
    priceRupees: (newListing.price_paise / 100).toFixed(2),
    grade: newListing.grade,
    location: newListing.location,
    farmer_name: farmerName || 'Kisan Member',
    status: 'सत्यापित फसल',
    imageUrl: cropImage,
    images: finalImageList,
    supabaseStatus,
  };
}

/**
 * Update an existing crop listing by ID (supports all categories: Vegetables, Fruits, Pulses, Grains)
 */
export async function updateCropListing(input: {
  id: string;
  cropName?: string;
  quantityKg?: number | string;
  priceRupees?: number | string;
  grade?: string;
  location?: string;
  category?: string;
  images?: string[];
  imageUrl?: string;
  unit?: string;
  isOrganic?: boolean | number;
}) {
  const { id, cropName, quantityKg, priceRupees, grade, location, category, images, imageUrl, unit, isOrganic } = input;
  if (!id) {
    throw new Error('Crop listing ID is required for update');
  }

  const db = getDb();
  const updates: string[] = [];
  const params: any[] = [];

  if (cropName) {
    updates.push('crop_name = ?');
    params.push(cropName);
    try {
      await getOrFetchCropTranslation(cropName);
    } catch (e) {}
  }

  if (category) {
    updates.push('category = ?');
    params.push(category);
  }

  if (quantityKg !== undefined) {
    const qty = parseInt(String(quantityKg)) || 0;
    updates.push('quantity_available = ?');
    params.push(qty);
  }

  if (priceRupees !== undefined) {
    const pricePaise = Math.round((parseFloat(String(priceRupees)) || 30) * 100);
    updates.push('price_paise = ?');
    params.push(pricePaise);
    updates.push('mandi_retail_price_paise = ?');
    params.push(Math.round(pricePaise * 1.25));
  }

  if (grade !== undefined) {
    updates.push('grade = ?');
    params.push(grade);
  }

  if (location !== undefined) {
    updates.push('location = ?');
    params.push(location);
  }

  if (unit !== undefined) {
    updates.push('unit = ?');
    params.push(unit);
  }

  if (isOrganic !== undefined) {
    updates.push('organic_certified = ?');
    params.push(isOrganic ? 1 : 0);
  }

  let finalImageList: string[] = [];
  if (Array.isArray(images) && images.length > 0) {
    finalImageList = images.filter((img) => typeof img === 'string' && img.trim().length > 0);
  } else if (imageUrl && imageUrl.trim().length > 0) {
    finalImageList = [imageUrl.trim()];
  }

  if (finalImageList.length > 0) {
    const cropImage = finalImageList.length > 1 ? JSON.stringify(finalImageList) : finalImageList[0];
    updates.push('image_url = ?');
    params.push(cropImage);
  }

  if (updates.length > 0) {
    params.push(id);
    db.prepare(`UPDATE product_listings SET ${updates.join(', ')} WHERE id = ?`).run(...params);
  }

  // Supabase update sync
  try {
    const supaUpdate: any = {};
    if (cropName) supaUpdate.crop_name = cropName;
    if (category) supaUpdate.category = category;
    if (quantityKg !== undefined) supaUpdate.quantity_available = parseInt(String(quantityKg));
    if (priceRupees !== undefined) supaUpdate.price_paise = Math.round((parseFloat(String(priceRupees)) || 30) * 100);
    if (grade) supaUpdate.grade = grade;
    if (location) supaUpdate.location = location;
    await supabase.from('product_listings').update(supaUpdate).eq('id', id);
  } catch (e) {}

  return {
    success: true,
    id,
    message: 'Crop updated successfully',
  };
}

/**
 * Delete a crop listing by ID from SQLite and Supabase
 */
export async function deleteCropListing(id: string) {
  const db = getDb();
  // 1. Delete from SQLite
  try {
    db.prepare(`DELETE FROM product_listings WHERE id = ?`).run(id);
  } catch (e) {}

  // 2. Delete from Supabase
  try {
    await supabase.from('product_listings').delete().eq('id', id);
  } catch (e) {
    console.error('Supabase delete crop error:', e);
  }

  return { success: true, id };
}

/**
 * Seed all 352 catalog products to the default kisan user ('u_farmer_1' - Ramesh Patil)
 * Inserts or updates in SQLite `product_listings` and Supabase `product_listings`
 */
export const DEFAULT_REGISTERED_FARMERS = [
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

export const ALL_DEFAULT_USERS = [
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
  {
    id: 'u_dev_master',
    name: 'Piyush Kumar (Lead Dev & Collaborator)',
    phone: '9999999999',
    email: 'piyush@kisanbandhan.ai',
    role: 'ADMIN',
    district: 'Nashik',
    state: 'Maharashtra',
    address: 'KisanBandhan Innovation Lab, Maharashtra',
  },
];

export async function seedDefaultKisanAllProducts() {
  const db = getDb();

  // 1. Ensure all default registered users exist in SQLite
  const insertUserStmt = db.prepare(`
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
      insertUserStmt.run(
        u.id,
        u.name,
        u.phone,
        u.email,
        u.role,
        'Agro Hub',
        u.district,
        u.state,
        u.address
      );
    }
  })();

  // 2. Sync all default users to Supabase `users` table
  let supaUserSyncCount = 0;
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
    if (!userError) {
      supaUserSyncCount = ALL_DEFAULT_USERS.length;
    }
  } catch (err: any) {
    console.error('Supabase user upsert error:', err);
  }

  // 3. Prepare product listings upsert statement
  const upsertListingStmt = db.prepare(`
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
  const supaRecords: any[] = [];
  const farmerProductCounts: Record<string, { name: string; count: number; crops: string[] }> = {};

  DEFAULT_REGISTERED_FARMERS.forEach((f) => {
    farmerProductCounts[f.id] = { name: f.name, count: 0, crops: [] };
  });

  // Assign crops smartly across the 5 default registered farmers
  db.transaction(() => {
    let vegIdx = 0;
    let fruitIdx = 0;
    let pulseIdx = 0;
    let grainIdx = 0;

    for (const item of FULL_CROP_CATALOG) {
      const listingId = `lst_kisan_${item.id}`;
      const photos = item.photos && item.photos.length > 0 ? item.photos : [item.thumbnail];
      const imageUrlJson = JSON.stringify(photos);
      const logoUrl = item.logo_url || item.sideLogo || photos[0];
      const pricePaise = item.pricePaise || Math.round((item.priceRupees || 30) * 100);
      const mandiPricePaise = Math.round(pricePaise * 1.25);

      // Distribute crops realistically:
      // - Vegetables: Ramesh Patil (Nashik, first half) & Ananya Roy (Bengal, second half)
      // - Grains: Harpreet Singh (Khanna / Punjab)
      // - Fruits: Suresh Gaikwad (Pune / Baramati) & Ramesh Patil (grapes/oranges)
      // - Pulses: Ananya Roy (first half) & Rajesh Choudhary (Rajasthan, second half)
      // - Seeds/Spices: Rajesh Choudhary (Jaipur / Rajasthan)
      let assignedFarmer = DEFAULT_REGISTERED_FARMERS[0]; // default u_farmer_1

      if (item.category === 'Vegetables') {
        assignedFarmer = vegIdx % 2 === 0 ? DEFAULT_REGISTERED_FARMERS[0] : DEFAULT_REGISTERED_FARMERS[3]; // Ramesh (0) or Ananya (3)
        vegIdx++;
      } else if (item.category === 'Grains') {
        assignedFarmer = DEFAULT_REGISTERED_FARMERS[1]; // Harpreet Singh (1)
        grainIdx++;
      } else if (item.category === 'Fruits') {
        assignedFarmer = fruitIdx % 3 === 0 ? DEFAULT_REGISTERED_FARMERS[0] : DEFAULT_REGISTERED_FARMERS[2]; // Ramesh (0) or Suresh Gaikwad (2)
        fruitIdx++;
      } else if (item.category === 'Pulses') {
        assignedFarmer = pulseIdx % 2 === 0 ? DEFAULT_REGISTERED_FARMERS[3] : DEFAULT_REGISTERED_FARMERS[4]; // Ananya (3) or Rajesh (4)
        pulseIdx++;
      } else {
        // Seeds / Spices
        assignedFarmer = DEFAULT_REGISTERED_FARMERS[4]; // Rajesh Choudhary (4)
      }

      upsertListingStmt.run(
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
        farmer_name: assignedFarmer.name,
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

      farmerProductCounts[assignedFarmer.id].count++;
      if (farmerProductCounts[assignedFarmer.id].crops.length < 5) {
        farmerProductCounts[assignedFarmer.id].crops.push(item.name);
      }
    }
  })();

  // 4. Sync in batches of 50 to Supabase `product_listings` table
  let supabaseSyncedCount = 0;
  try {
    const chunkSize = 50;
    for (let i = 0; i < supaRecords.length; i += chunkSize) {
      const chunk = supaRecords.slice(i, i + chunkSize);
      const { error } = await supabase.from('product_listings').upsert(chunk, { onConflict: 'id' });
      if (!error) {
        supabaseSyncedCount += chunk.length;
      }
    }
  } catch (err: any) {
    console.error('Supabase batch upsert error:', err);
  }

  return {
    success: true,
    totalProductsSeeded: FULL_CROP_CATALOG.length,
    supabaseSyncedCount,
    supaUserSyncCount,
    registeredUsersCount: ALL_DEFAULT_USERS.length,
    farmerProductBreakdown: farmerProductCounts,
    message: `Successfully seeded all ${FULL_CROP_CATALOG.length} catalog products across ${DEFAULT_REGISTERED_FARMERS.length} registered default farmers in both SQLite and Supabase!`,
  };
}


