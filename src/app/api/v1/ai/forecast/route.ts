import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { forecastDemandWithGemini } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const crop = searchParams.get('crop');
    const region = searchParams.get('region');

    const db = getDb();
    let query = 'SELECT * FROM demand_forecasts WHERE 1=1';
    const params: any[] = [];

    if (crop) {
      query += ' AND crop_name LIKE ?';
      params.push(`%${crop}%`);
    }

    query += ' ORDER BY confidence_percent DESC';
    const forecasts = db.prepare(query).all(...params);

    // Run Google Gemini Live Macro Demand Projection
    const geminiForecast = await forecastDemandWithGemini(crop || undefined, region || undefined);

    return NextResponse.json({
      success: true,
      aiEngine: geminiForecast
        ? `KisanBandhan Demand Forecasting AI powered by Google Gemini (${geminiForecast.modelUsed})`
        : 'KisanBandhan Demand Forecasting AI Baseline',
      provider: geminiForecast ? 'Google Gemini Generative AI' : 'KisanBandhan APMC Analytics',
      liveAiProjection: geminiForecast,
      data: forecasts,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

