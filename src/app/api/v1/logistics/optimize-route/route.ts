import { NextResponse } from 'next/server';
import { getOrders } from '@/lib/orders';
import { geocodeLocation } from '@/lib/geocoding';
import {
  optimizeMultiStopRoute,
  RouteStop,
  VehicleType,
  OptimizationGoal,
  VEHICLE_CONFIGS,
} from '@/lib/route-optimizer';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const vehicleType = (searchParams.get('vehicleType') as VehicleType) || 'TATA_ACE';
    const goal = (searchParams.get('goal') as OptimizationGoal) || 'SHORTEST_DISTANCE';
    const partnerId = searchParams.get('partnerId') || 'u_partner_1';

    // 1. Fetch transporter orders
    const allOrders = getOrders({ role: 'TRANSPORTER' });
    const relevantOrders = allOrders.filter(
      (o: any) =>
        o.status === 'Accepted' ||
        o.status === 'Picked Up' ||
        o.status === 'Out for Delivery' ||
        o.status === 'Placed'
    );

    // Default driver origin: Nashik Collection Hub
    const origin = {
      name: 'Kisan Logistics Dispatch Center (Panchavati, Nashik)',
      lat: 20.0125,
      lng: 73.7932,
    };

    const stops: RouteStop[] = [];

    if (relevantOrders.length > 0) {
      for (const ord of relevantOrders.slice(0, 5)) {
        // 1. Pickup Stop at Farmer
        const pickupLocStr = ord.pickup_location || ord.farmer_name || 'Niphad Agro Farm';
        const pickupGeo = await geocodeLocation(pickupLocStr);
        const cropName = ord.items?.[0]?.crop_name || 'Fresh Produce';
        const qty = ord.items?.reduce((s: number, it: any) => s + (it.quantity || 0), 0) || 250;

        stops.push({
          id: `pickup_${ord.id}`,
          orderId: ord.id,
          name: `Pickup: ${ord.farmer_name || 'Farmer Gate'} (${pickupGeo.name})`,
          address: pickupLocStr,
          lat: pickupGeo.lat,
          lng: pickupGeo.lng,
          type: 'PICKUP',
          contactName: ord.farmer_name || 'Farmer',
          contactPhone: ord.farmer_phone || '+91 98220 44551',
          cropName,
          quantityKg: qty,
          otp: ord.pickup_otp,
          completed: ord.status === 'Picked Up' || ord.status === 'Out for Delivery',
        });

        // 2. Drop Stop at Buyer / APMC Mandi
        const dropLocStr = ord.drop_location || ord.delivery_address || 'Pune Market Yard';
        const dropGeo = await geocodeLocation(dropLocStr);

        stops.push({
          id: `drop_${ord.id}`,
          orderId: ord.id,
          name: `Delivery: ${ord.buyer_name || 'Buyer Store'} (${dropGeo.name})`,
          address: dropLocStr,
          lat: dropGeo.lat,
          lng: dropGeo.lng,
          type: 'DROP',
          contactName: ord.buyer_name || 'Buyer',
          contactPhone: ord.buyer_phone || '+91 98111 22334',
          cropName,
          quantityKg: qty,
          otp: ord.delivery_otp,
          completed: ord.status === 'Delivered',
        });
      }
    } else {
      // High-value realistic default scenario across Maharashtra's Golden Agro Triangle
      stops.push(
        {
          id: 'pickup_demo_1',
          name: 'Farmer Ramesh Patil (Niphad Gate 4)',
          address: 'Niphad, Nashik',
          lat: 20.0784,
          lng: 74.1082,
          type: 'PICKUP',
          contactName: 'Ramesh Patil',
          contactPhone: '+91 98220 12345',
          cropName: 'Grade-A Nashik Tomatoes',
          quantityKg: 650,
          otp: '4821',
          completed: false,
        },
        {
          id: 'pickup_demo_2',
          name: 'Suresh Jadhav Farm Gate (Dindori Grape Cluster)',
          address: 'Dindori, Nashik',
          lat: 20.2033,
          lng: 73.8344,
          type: 'PICKUP',
          contactName: 'Suresh Jadhav',
          contactPhone: '+91 98220 98765',
          cropName: 'Export Grade Sonaka Grapes',
          quantityKg: 400,
          otp: '3190',
          completed: false,
        },
        {
          id: 'drop_demo_1',
          name: 'Hotel Annapurna Cold Storage (Swargate, Pune)',
          address: 'Swargate Commercial Hub, Pune',
          lat: 18.5018,
          lng: 73.8586,
          type: 'DROP',
          contactName: 'Rohan Sharma (Procurement Head)',
          contactPhone: '+91 98900 44321',
          cropName: 'Tomatoes & Grapes Consignment',
          quantityKg: 1050,
          otp: '7742',
          completed: false,
        },
        {
          id: 'drop_demo_2',
          name: 'Vashi APMC International Fruit Terminal (Navi Mumbai)',
          address: 'Vashi APMC Market, Sector 19',
          lat: 19.0760,
          lng: 73.0034,
          type: 'DROP',
          contactName: 'Vashi APMC Mandi Inspector',
          contactPhone: '+91 98200 55112',
          cropName: 'Export Surplus Consignment',
          quantityKg: 500,
          otp: '8910',
          completed: false,
        }
      );
    }

    const result = await optimizeMultiStopRoute({
      origin,
      stops,
      vehicleType,
      goal,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error calculating route optimization:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      originInput,
      stopsInput,
      vehicleType = 'TATA_ACE',
      goal = 'SHORTEST_DISTANCE',
    } = body;

    // Resolve origin
    let origin = {
      name: 'Nashik Central Logistics Hub',
      lat: 20.0059,
      lng: 73.7898,
    };

    if (originInput) {
      if (originInput.lat && originInput.lng) {
        origin = {
          name: originInput.name || 'Custom Origin',
          lat: Number(originInput.lat),
          lng: Number(originInput.lng),
        };
      } else if (originInput.name) {
        const geo = await geocodeLocation(originInput.name);
        origin = { name: geo.name, lat: geo.lat, lng: geo.lng };
      }
    }

    // Resolve stops
    const stops: RouteStop[] = [];
    if (Array.isArray(stopsInput) && stopsInput.length > 0) {
      for (let i = 0; i < stopsInput.length; i++) {
        const s = stopsInput[i];
        let lat = Number(s.lat);
        let lng = Number(s.lng);
        let name = s.name || `Stop #${i + 1}`;

        if (isNaN(lat) || isNaN(lng) || (lat === 0 && lng === 0)) {
          const geo = await geocodeLocation(s.address || s.name || 'Nashik');
          lat = geo.lat;
          lng = geo.lng;
          name = s.name || geo.name;
        }

        stops.push({
          id: s.id || `stop_${Date.now()}_${i}`,
          orderId: s.orderId,
          name,
          address: s.address || name,
          lat,
          lng,
          type: s.type || (i === stopsInput.length - 1 ? 'DROP' : 'PICKUP'),
          contactName: s.contactName,
          contactPhone: s.contactPhone,
          cropName: s.cropName,
          quantityKg: s.quantityKg ? Number(s.quantityKg) : undefined,
          perishabilityScore: s.perishabilityScore ? Number(s.perishabilityScore) : undefined,
          otp: s.otp,
          completed: !!s.completed,
        });
      }
    }

    const result = await optimizeMultiStopRoute({
      origin,
      stops,
      vehicleType,
      goal,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error optimizing custom route:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
