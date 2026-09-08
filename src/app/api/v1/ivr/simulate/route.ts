import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { farmerPhone, dtmfInput, textCommand } = await request.json();

    const db = getDb();
    let responseAudioText = '';

    if (dtmfInput === '1' || textCommand?.toLowerCase().includes('list')) {
      // Auto list produce from voice/SMS command
      const listingId = 'lst_ivr_' + Date.now();
      db.prepare(`
        INSERT INTO product_listings (
          id, farmer_id, fpo_id, crop_name, category, quantity_available, unit,
          price_paise, mandi_retail_price_paise, grade, harvest_date,
          organic_certified, image_url, location, district, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        listingId,
        'u_farmer_1',
        'fpo_nashik_1',
        'Nashik Tomatoes (IVR Voice Listed)',
        'Vegetables',
        500,
        'kg',
        2800,
        4500,
        'Grade A',
        new Date().toISOString().split('T')[0],
        0,
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
        'Nashik IVR Hub',
        'Nashik',
        'ACTIVE'
      );

      responseAudioText = 'धन्यवाद! आपकी 500 किलो टमाटर की फसल ₹28 प्रति किलो के भाव पर किसान डायरेक्ट बाज़ार में सफलतापूर्वक लिस्ट कर दी गई है। (Listing Created via IVR Call)';
    } else if (dtmfInput === '2' || textCommand?.toLowerCase().includes('price')) {
      responseAudioText = 'आज नासिक मंडी में टमाटर का AI अनुशंसित भाव ₹28 से ₹32 प्रति किलो है। मांग बहुत अधिक है।';
    } else {
      responseAudioText = 'नमस्ते किसान भाई! फसल की बिक्री के लिए 1 दबाएं, मंडी भाव जानने के लिए 2 दबाएं।';
    }

    return NextResponse.json({
      success: true,
      channel: 'Toll-Free IVR Phone Voice & SMS Gateway Simulator',
      receivedPhone: farmerPhone || '9876543210',
      dtmfInput,
      simulatedAudioResponseHindi: responseAudioText,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
