import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const crop = searchParams.get('crop');

    const db = getDb();
    let query = 'SELECT * FROM demand_forecasts WHERE 1=1';
    const params: any[] = [];

    if (crop) {
      query += ' AND crop_name LIKE ?';
      params.push(`%${crop}%`);
    }

    query += ' ORDER BY confidence_percent DESC';
    const forecasts = db.prepare(query).all(...params);

    return NextResponse.json({
      success: true,
      aiEngine: 'KisanBandhan Demand Forecasting AI Engine',
      data: forecasts,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
