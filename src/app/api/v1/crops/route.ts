import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Fetch from local SQLite DB
    const db = getDb();
    const listings = db.prepare(`
      SELECT l.*, u.name as farmer_name 
      FROM product_listings l
      LEFT JOIN users u ON l.farmer_id = u.id
      ORDER BY l.created_at DESC
    `).all();

    return NextResponse.json({
      success: true,
      source: 'database',
      crops: listings,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cropName, quantityKg, priceRupees, grade, location, category, farmerName } = body;

    if (!cropName) {
      return NextResponse.json({ success: false, message: 'Crop name is required' }, { status: 400 });
    }

    const id = `lst_${Date.now()}`;
    const pricePaise = Math.round((parseFloat(priceRupees) || 30) * 100);
    const mandiPricePaise = Math.round(pricePaise * 1.25);
    const qty = parseInt(quantityKg) || 500;
    const cat = category || 'Vegetables';
    const loc = location || 'नासिक एग्रो-हब #04';
    const gradeVal = grade || 'उच्चतम श्रेणी A+';
    const harvestDate = new Date().toISOString().split('T')[0];
    // Auto-trigger AI translation for newly registered crop name
    const db = getDb();
    try {
      const trimmedCrop = cropName.trim();
      const lowerCrop = trimmedCrop.toLowerCase();

      // Check if already in cache
      const cached = db.prepare('SELECT hi_name, en_name FROM crop_translations_cache WHERE LOWER(crop_key) = ?').get(lowerCrop);
      if (!cached) {
        let hi = trimmedCrop;
        let en = trimmedCrop;
        const isDevanagari = /[\u0900-\u097F]/.test(trimmedCrop);

        if (isDevanagari) {
          const resEn = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=hi&tl=en&dt=t&q=${encodeURIComponent(trimmedCrop)}`
          );
          const dataEn = await resEn.json();
          if (dataEn?.[0]?.[0]?.[0]) en = dataEn[0][0][0].trim();
        } else {
          const resHi = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(trimmedCrop)}`
          );
          const dataHi = await resHi.json();
          if (dataHi?.[0]?.[0]?.[0]) hi = dataHi[0][0][0].trim();
        }

        db.prepare(`
          INSERT OR REPLACE INTO crop_translations_cache (crop_key, hi_name, en_name)
          VALUES (?, ?, ?)
        `).run(lowerCrop, hi, en);
      }
    } catch (err) {
      console.error('Auto crop translation error:', err);
    }

    const defaultImage = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80';

    const newListing = {
      id,
      farmer_id: 'u_farmer_1',
      fpo_id: 'fpo_nashik_1',
      crop_name: cropName,
      category: cat,
      quantity_available: qty,
      unit: 'kg',
      price_paise: pricePaise,
      mandi_retail_price_paise: mandiPricePaise,
      grade: gradeVal,
      harvest_date: harvestDate,
      organic_certified: gradeVal.includes('ऑर्गेनिक') || gradeVal.includes('Organic') ? 1 : 0,
      image_url: defaultImage,
      location: loc,
      district: 'Nashik',
      status: 'ACTIVE',
    };

    // 1. Insert into SQLite DB
    db.prepare(`
      INSERT INTO product_listings (id, farmer_id, fpo_id, crop_name, category, quantity_available, unit, price_paise, mandi_retail_price_paise, grade, harvest_date, organic_certified, image_url, location, district, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
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

    // 2. Attempt Sync to Supabase Table `product_listings`
    let supabaseStatus = 'Supabase Connected & Synced';
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
        supabaseStatus = `SQLite Saved (Supabase: ${error.message})`;
      }
    } catch (sbErr: any) {
      supabaseStatus = `SQLite Saved (${sbErr.message})`;
    }

    return NextResponse.json({
      success: true,
      message: 'Crop registered successfully!',
      supabaseStatus,
      crop: {
        id: id,
        crop: newListing.crop_name,
        qty: newListing.quantity_available,
        priceRupees: (newListing.price_paise / 100).toFixed(2),
        grade: newListing.grade,
        location: newListing.location,
        farmer_name: farmerName || 'Ramesh Patil',
        status: 'सत्यापित फसल',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
