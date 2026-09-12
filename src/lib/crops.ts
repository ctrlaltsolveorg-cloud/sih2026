import { getDb } from './db';
import { supabase } from './supabase';
import { getOrFetchCropTranslation } from './translator';

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
  unit?: string;
}

/**
 * Fetch all active crop listings from SQLite (for public marketplace)
 */
export function getAllCrops() {
  const db = getDb();
  return db
    .prepare(
      `
    SELECT l.*, u.name as farmer_name 
    FROM product_listings l
    LEFT JOIN users u ON l.farmer_id = u.id
    ORDER BY l.created_at DESC
  `
    )
    .all();
}

/**
 * Fetch crops owned by a specific farmer (user-isolated data)
 */
export function getCropsByFarmer(farmerId: string) {
  const db = getDb();
  return db
    .prepare(
      `
    SELECT l.*, u.name as farmer_name 
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
  const defaultImage = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80';
  
  // Format images: prioritize images array (2 to 6 photos), serialize to JSON or fallback to string
  let finalImageList: string[] = [];
  if (Array.isArray(images) && images.length > 0) {
    finalImageList = images.filter((img) => typeof img === 'string' && img.trim().length > 0);
  } else if (imageUrl && imageUrl.trim().length > 0) {
    finalImageList = [imageUrl.trim()];
  } else {
    finalImageList = [defaultImage];
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
    location: loc,
    district: 'Nashik',
    status: 'ACTIVE',
  };

  // 2. Save in SQLite DB
  const db = getDb();
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

  // 3. Supabase Sync
  let supabaseStatus = 'Supabase Synced';
  try {
    const { error } = await supabase.from('product_listings').insert([
      {
        id,
        farmer_id: newListing.farmer_id,
        crop_name: newListing.crop_name,
        category: newListing.category,
        quantity_available: newListing.quantity_available,
        price_paise: newListing.price_paise,
        grade: newListing.grade,
        location: newListing.location,
        status: 'ACTIVE',
      },
    ]);
    if (error) {
      supabaseStatus = `SQLite Saved (Supabase Note: ${error.message})`;
    }
  } catch (err: any) {
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

