import { NextResponse } from 'next/server';
import { createCropListing, getAllCrops } from '@/lib/crops';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const listings = getAllCrops();
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
    const result = await createCropListing(body);

    return NextResponse.json({
      success: true,
      message: 'Crop registered successfully!',
      supabaseStatus: result.supabaseStatus,
      crop: result,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
