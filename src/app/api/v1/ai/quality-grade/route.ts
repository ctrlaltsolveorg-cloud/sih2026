import { NextResponse } from 'next/server';
import { verifyCropQuality } from '@/lib/crop-quality';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cropName, category, imageUrl, image, hfToken, hfModel, moisture, harvestAgeDays, variety } = body;

    const headerHfToken = request.headers.get('x-hf-token') || undefined;
    const finalHfToken = hfToken || headerHfToken || process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN;

    const targetImage = image || imageUrl;

    const inspectionResult = await verifyCropQuality({
      cropName: cropName || 'Produce Lot',
      category,
      imageUrl: targetImage,
      hfToken: finalHfToken,
      hfModel,
      extraDetails: {
        moisture,
        harvestAgeDays,
        variety,
      },
    });

    return NextResponse.json({
      success: true,
      aiEngine: inspectionResult.provider,
      provider: inspectionResult.provider,
      inspectionResult,
    });
  } catch (error: any) {
    console.error('Error in quality-grade API:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
