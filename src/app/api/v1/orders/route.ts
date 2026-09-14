import { NextResponse } from 'next/server';
import { createOrder, getOrders } from '@/lib/orders';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || undefined;
    const role = searchParams.get('role') || undefined;
    const orderId = searchParams.get('orderId') || undefined;

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
    const result: any = await createOrder(body);

    // If n8n Webhook URL is set via environment variable or passed in request body, notify n8n!
    const n8nWebhookUrl = process.env.N8N_ORDER_WEBHOOK_URL || body.n8n_webhook_url;
    if (n8nWebhookUrl && result.success) {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'order.created',
          order_id: result.orderId,
          customer_name: result.customer_name,
          phone: result.phone,
          product: result.product,
          quantity: result.quantity,
          status: result.status,
          total_amount: `₹${result.totalRupees}`,
          delivery_otp: result.deliveryOtp,
          pickup_otp: result.pickupOtp,
          farmer_name: result.farmer_name,
          farmer_phone: result.farmer_phone,
          delivery_address: result.delivery_address,
          smart_contract_hash: result.smartContractHash,
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.warn('n8n order webhook dispatch notice:', err.message));
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
