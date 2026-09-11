import { NextResponse } from 'next/server';
import { AGRI_PHRASE_DICTIONARY, Language } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { text, sourceLang = 'auto', targetLang = 'hi' } = await request.json();

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json(
        { success: false, message: 'Text is required for translation' },
        { status: 400 }
      );
    }

    const trimmed = text.trim();

    // 1. Fast path: check known agricultural dictionary
    const lower = trimmed.toLowerCase();
    for (const [key, mapping] of Object.entries(AGRI_PHRASE_DICTIONARY)) {
      const matchedAny = Object.values(mapping).some(
        val => val.toLowerCase() === lower || lower.includes(val.toLowerCase())
      );
      if (matchedAny || lower.includes(key)) {
        const dictMatch = mapping[targetLang as Language];
        if (dictMatch) {
          return NextResponse.json({
            success: true,
            translatedText: dictMatch,
            source: 'agri-dictionary',
            targetLang,
          });
        }
      }
    }

    // 2. Online translation via Google Translate GTX API
    const sl = sourceLang === targetLang ? 'auto' : (sourceLang || 'auto');
    const tl = targetLang || 'hi';

    try {
      const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(trimmed)}`;
      const res = await fetch(gtxUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept': '*/*',
        },
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && Array.isArray(data[0])) {
          const translated = data[0]
            .map((chunk: any) => (chunk && chunk[0] ? chunk[0] : ''))
            .join('');

          if (translated && translated.trim()) {
            const detectedSource = data[2] || (sourceLang !== 'auto' ? sourceLang : 'auto');
            return NextResponse.json({
              success: true,
              translatedText: translated.trim(),
              detectedSource,
              targetLang,
              provider: 'google-gtx',
            });
          }
        }
      }
    } catch (gErr) {
      console.warn('Google GTX translate fallback:', gErr);
    }

    // 3. Fallback: MyMemory Translation API
    try {
      const pair = `${sl === 'auto' ? 'en' : sl}|${tl}`;
      const myMemUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=${encodeURIComponent(pair)}`;
      const memRes = await fetch(myMemUrl, { cache: 'no-store' });
      if (memRes.ok) {
        const memData = await memRes.json();
        const memText = memData?.responseData?.translatedText;
        if (memText && typeof memText === 'string' && !memText.includes('MYMEMORY WARNING')) {
          return NextResponse.json({
            success: true,
            translatedText: memText,
            targetLang,
            provider: 'mymemory',
          });
        }
      }
    } catch (memErr) {
      console.warn('MyMemory translate fallback:', memErr);
    }

    // 4. Offline fallback: return cleaned text
    return NextResponse.json({
      success: true,
      translatedText: trimmed,
      targetLang,
      provider: 'offline-echo',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Translation failed' },
      { status: 500 }
    );
  }
}
