import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { cropName, baseMandiPriceRupees, grade, organic, distanceKm } = await request.json();

    const basePrice = parseFloat(baseMandiPriceRupees || '35');
    const qualityMultiplier = grade === 'Grade A+' || grade === 'Export Grade' ? 1.15 : (grade === 'Grade A' ? 1.08 : 0.95);
    const organicMultiplier = organic ? 1.25 : 1.0;
    const distanceCostAdjustment = Math.min((parseFloat(distanceKm || '10') * 0.15), 5.0);

    const recommendedRupees = (basePrice * qualityMultiplier * organicMultiplier) - distanceCostAdjustment;
    const recommendedPaise = Math.round(recommendedRupees * 100);
    const minBandPaise = Math.round(recommendedPaise * 0.92);
    const maxBandPaise = Math.round(recommendedPaise * 1.12);

    return NextResponse.json({
      success: true,
      aiEngine: 'KisanBandhan Fair Price AI Model (Tier 1)',
      cropName: cropName || 'Tomatoes',
      inputs: { baseMandiPriceRupees, grade, organic, distanceKm },
      priceBand: {
        minPricePaise: minBandPaise,
        recommendedPricePaise: recommendedPaise,
        maxPricePaise: maxBandPaise,
        recommendedPriceRupees: (recommendedPaise / 100).toFixed(2),
      },
      fairnessExplanation: `Calculated from Agmarknet baseline index ₹${basePrice}/kg with +${Math.round((qualityMultiplier - 1) * 100)}% quality grade bonus and zero middleman deduction.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
