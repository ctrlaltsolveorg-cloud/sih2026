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

    // 1. Try Supabase Cloud first (Cloud-synced source of truth across Vercel Lambdas)
    try {
      let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (orderId) {
        query = query.eq('id', orderId);
      } else if (userId && role === 'FARMER') {
        query = query.eq('farmer_id', userId);
      } else if (userId && role === 'BUYER') {
        query = query.eq('buyer_id', userId);
      }
      const { data: supaOrders, error: supaErr } = await query;
      if (!supaErr && Array.isArray(supaOrders)) {
        return NextResponse.json({
          success: true,
          count: supaOrders.length,
          orders: supaOrders,
        });
      }
    } catch (supaEx) {
      console.warn('Notice querying Supabase orders, falling back to SQLite:', supaEx);
    }

    const orders = getOrders({ userId, role, orderId });

    return NextResponse.json({
      success: true,
      count: orders.length,
      orders,
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
