import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getDb } from '@/lib/db';
import productImagesRegistry from '@/data/product_images.json';

export async function POST() {
  try {
    const db = getDb();
    const items = productImagesRegistry as any[];

    // 1. Save all records into SQLite `product_images`
    const insertStmt = db.prepare(`
      INSERT INTO product_images (
        id, product_id, crop_name, crop_name_hi, category, variety,
        logo_id, logo_url, logo_alt,
        primary_image_id, primary_image_url,
        thumbnail_id, thumbnail_url,
        gallery_urls, logo_structure, images_structure
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        crop_name = excluded.crop_name,
        logo_url = excluded.logo_url,
        primary_image_url = excluded.primary_image_url,
        thumbnail_url = excluded.thumbnail_url,
        gallery_urls = excluded.gallery_urls,
        logo_structure = excluded.logo_structure,
        images_structure = excluded.images_structure
    `);

    db.transaction(() => {
      for (const item of items) {
        insertStmt.run(
          item.id,
          item.product_id,
          item.crop_name,
          item.crop_name_hi || item.crop_name,
          item.category,
          item.variety || '',
          item.logo_id,
          item.logo_url,
          item.logo_alt,
          item.primary_image_id,
          item.primary_image_url,
          item.thumbnail_id,
          item.thumbnail_url,
          JSON.stringify(item.gallery_urls || []),
          JSON.stringify(item.logo_structure || {}),
          JSON.stringify(item.images_structure || {})
        );
      }
    })();

    // 2. Sync / Upsert into Supabase `product_images` table in batches of 50
    let supaSuccessCount = 0;
    let supaError = null;

    try {
      const supaRecords = items.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        crop_name: item.crop_name,
        crop_name_hi: item.crop_name_hi,
        category: item.category,
        variety: item.variety,
        logo_id: item.logo_id,
        logo_url: item.logo_url,
        logo_alt: item.logo_alt,
        primary_image_id: item.primary_image_id,
        primary_image_url: item.primary_image_url,
        thumbnail_id: item.thumbnail_id,
        thumbnail_url: item.thumbnail_url,
        gallery_urls: item.gallery_urls,
        logo_structure: item.logo_structure,
        images_structure: item.images_structure,
      }));

      const chunkSize = 50;
      for (let i = 0; i < supaRecords.length; i += chunkSize) {
        const chunk = supaRecords.slice(i, i + chunkSize);
        const { error } = await supabase.from('product_images').upsert(chunk, { onConflict: 'id' });
        if (error) {
          supaError = error.message;
        } else {
          supaSuccessCount += chunk.length;
        }
      }
    } catch (e: any) {
      supaError = e.message;
    }

    return NextResponse.json({
      success: true,
      sqliteCount: items.length,
      supabaseSuccessCount: supaSuccessCount,
      supabaseNote: supaError ? `Supabase Note: ${supaError}` : 'Supabase table synced successfully',
      message: `Successfully processed ${items.length} product image records.`,
    });
  } catch (error: any) {
    console.error('Error syncing supabase images:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to sync image table' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
