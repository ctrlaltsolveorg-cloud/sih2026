import { NextResponse } from 'next/server';
import { createOrder, getOrders } from '@/lib/orders';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || undefined;
    const role = searchParams.get('role') || undefined;
    const orderId = searchParams.get('orderId') || undefined;

    // 1. Fetch from local SQLite DB
    const localOrders = getOrders({ userId, role, orderId }) || [];

    // 2. Fetch from Supabase Cloud
    let supaOrders: any[] = [];
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          deliveries (*)
        `)
        .order('created_at', { ascending: false });

      if (orderId) {
        query = query.eq('id', orderId);
      } else if (userId && role === 'FARMER') {
        query = query.or(`farmer_id.eq.${userId},farmer_id.eq.u_farmer_1`);
      } else if (userId && role === 'BUYER') {
        query = query.or(`buyer_id.eq.${userId},buyer_id.eq.u_buyer_1`);
      } else if (userId && role === 'TRANSPORTER') {
        query = query.in('status', ['Placed', 'Accepted', 'Out for Delivery', 'Picked Up']);
      }

      const { data, error: supaErr } = await query;
      if (!supaErr && Array.isArray(data)) {
        supaOrders = data.map((ord: any) => {
          const del = Array.isArray(ord.deliveries) ? ord.deliveries[0] : ord.deliveries;
          return {
            ...ord,
            pickup_otp: del?.pickup_otp || ord.pickup_otp,
            delivery_otp: del?.delivery_otp || ord.delivery_otp,
            driver_name: del?.driver_name || ord.driver_name,
            driver_phone: del?.driver_phone || ord.driver_phone,
            driver_vehicle: del?.driver_vehicle || ord.driver_vehicle,
            delivery_status: del?.status || ord.delivery_status,
          };
        });
      }
    } catch (supaEx) {
      console.warn('Notice querying Supabase orders:', supaEx);
    }

    // 3. Merge both sources (local SQLite + Supabase cloud)
    const orderMap = new Map<string, any>();
    for (const o of localOrders) {
      orderMap.set(o.id, o);
    }
    for (const o of supaOrders) {
      if (!orderMap.has(o.id)) {
        orderMap.set(o.id, o);
      }
    }

    const mergedOrders = Array.from(orderMap.values()).sort((a, b) => {
      const tA = new Date(a.created_at || 0).getTime();
      const tB = new Date(b.created_at || 0).getTime();
      return tB - tA;
    });

    return NextResponse.json({
      success: true,
      count: mergedOrders.length,
      orders: mergedOrders,
      source: 'merged',
    });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createOrder(body);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
