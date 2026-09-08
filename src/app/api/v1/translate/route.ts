import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { cropTranslations } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

// Online translation helper using Google Translate GTX free API
async function translateOnline(text: string): Promise<{ hi: string; en: string }> {
  const trimmed = text.trim();
  if (!trimmed) return { hi: text, en: text };

  let hi = '';
  let en = '';
  const isDevanagari = /[\u0900-\u097F]/.test(trimmed);

  try {
    if (isDevanagari) {
      hi = trimmed;
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=hi&tl=en&dt=t&q=${encodeURIComponent(trimmed)}`
      );
      const data = await res.json();
      if (data?.[0]?.[0]?.[0]) {
        en = data[0][0][0].trim();
      }
    } else {
      en = trimmed;
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(trimmed)}`
      );
      const data = await res.json();
      if (data?.[0]?.[0]?.[0]) {
        hi = data[0][0][0].trim();
      }
    }
  } catch (err) {
    console.error('Google Translate GTX API error:', err);
  }

  // Backup: MyMemory API if one of them is missing
  if (!hi || !en || hi === en) {
    try {
      if (!hi || hi === en) {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=en|hi`);
        const data = await res.json();
        if (data?.responseData?.translatedText) {
          hi = data.responseData.translatedText.trim();
        }
      }
      if (!en || en === hi) {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=hi|en`);
        const data = await res.json();
        if (data?.responseData?.translatedText) {
          en = data.responseData.translatedText.trim();
        }
      }
    } catch (err2) {
      console.error('MyMemory Translate API error:', err2);
    }
  }

  return {
    hi: hi || trimmed,
    en: en || trimmed,
  };
}

export async function GET() {
  try {
    const db = getDb();
    const rows = db.prepare('SELECT crop_key, hi_name, en_name FROM crop_translations_cache').all() as Array<{
      crop_key: string;
      hi_name: string;
      en_name: string;
    }>;

    const cache: Record<string, { hi: string; en: string }> = {};
    for (const r of rows) {
      cache[r.crop_key] = { hi: r.hi_name, en: r.en_name };
    }

    return NextResponse.json({
      success: true,
      translations: cache,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, crops } = body;

    const db = getDb();

    // 1. Single crop translation request
    if (text && typeof text === 'string') {
      const trimmed = text.trim();
      const lower = trimmed.toLowerCase();

      // Check i18n static dictionary first
      if (cropTranslations[trimmed]) {
        return NextResponse.json({
          success: true,
          original: trimmed,
          hi: cropTranslations[trimmed].hi,
          en: cropTranslations[trimmed].en,
          source: 'dictionary',
        });
      }

      // Check SQLite DB cache
      const cached = db.prepare('SELECT hi_name, en_name FROM crop_translations_cache WHERE LOWER(crop_key) = ?').get(lower) as {
        hi_name: string;
        en_name: string;
      } | undefined;

      if (cached) {
        return NextResponse.json({
          success: true,
          original: trimmed,
          hi: cached.hi_name,
          en: cached.en_name,
          source: 'db_cache',
        });
      }

      // Live AI Online Translate
      const translated = await translateOnline(trimmed);

      // Save to SQLite DB cache
      db.prepare(`
        INSERT OR REPLACE INTO crop_translations_cache (crop_key, hi_name, en_name)
        VALUES (?, ?, ?)
      `).run(lower, translated.hi, translated.en);

      return NextResponse.json({
        success: true,
        original: trimmed,
        hi: translated.hi,
        en: translated.en,
        source: 'google_ai_live',
      });
    }

    // 2. Batch crop translation request
    if (crops && Array.isArray(crops)) {
      const results: Record<string, { hi: string; en: string }> = {};

      for (const item of crops) {
        if (!item || typeof item !== 'string') continue;
        const trimmed = item.trim();
        const lower = trimmed.toLowerCase();

        if (cropTranslations[trimmed]) {
          results[trimmed] = cropTranslations[trimmed];
          continue;
        }

        const cached = db.prepare('SELECT hi_name, en_name FROM crop_translations_cache WHERE LOWER(crop_key) = ?').get(lower) as {
          hi_name: string;
          en_name: string;
        } | undefined;

        if (cached) {
          results[trimmed] = { hi: cached.hi_name, en: cached.en_name };
          continue;
        }

        const translated = await translateOnline(trimmed);
        db.prepare(`
          INSERT OR REPLACE INTO crop_translations_cache (crop_key, hi_name, en_name)
          VALUES (?, ?, ?)
        `).run(lower, translated.hi, translated.en);

        results[trimmed] = translated;
      }

      return NextResponse.json({
        success: true,
        translations: results,
      });
    }

    return NextResponse.json({ success: false, message: 'Invalid payload. Provide text or crops array.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
