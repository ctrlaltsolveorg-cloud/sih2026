import { NextResponse } from 'next/server';
import { updateDeliveryLocation, getDeliveryTracking } from '@/lib/orders';

export const dynamic = 'force-dynamic';

/**
 * POST /api/v1/logistics/location
 * Driver / Transporter broadcasts live GPS coordinates
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, latitude, longitude, speed, heading, accuracy } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'orderId is required' },
        { status: 400 }
      );
    }

    if (latitude === undefined || longitude === undefined || isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json(
        { success: false, message: 'Valid latitude and longitude coordinates are required' },
        { status: 400 }
      );
    }

    const result = await updateDeliveryLocation({
      orderId,
      latitude: Number(latitude),
      longitude: Number(longitude),
      speed: Number(speed || 0),
      heading: Number(heading || 0),
      accuracy: Number(accuracy || 0),
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error updating driver GPS location:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update GPS location' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/v1/logistics/location?orderId=ord_xxx
 * Buyer, Farmer, or Transporter fetches real-time GPS tracking status & breadcrumbs trail
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'orderId parameter is required' },
        { status: 400 }
      );
    }

    const tracking = await getDeliveryTracking(orderId);
    return NextResponse.json(tracking);
  } catch (error: any) {
    console.error('Error getting delivery tracking:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to retrieve delivery tracking' },
      { status: 404 }
    );
  }
}
