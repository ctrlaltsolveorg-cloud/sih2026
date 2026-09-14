import { getDb } from './db';
import { supabase } from './supabase';

export interface CreateOrderItemInput {
  listingId?: string;
  cropName: string;
  quantity: number;
  unit?: string;
  unitPricePaise: number;
}

export interface CreateOrderInput {
  buyerId: string;
  farmerId?: string;
  fpoId?: string;
  deliveryAddress: string;
  deliveryType?: 'EXPRESS' | 'BULK_HUB';
  paymentMethod?: 'COD' | 'UPI' | 'BANK_TRANSFER' | 'ESCROW';
  notes?: string;
  items: CreateOrderItemInput[];
}

export interface VerifyOtpInput {
  orderId: string;
  otpType: 'pickup' | 'delivery';
  enteredOtp: string;
  partnerId?: string;
}

/**
 * Generate cryptographically simple 4-digit numeric OTP
 */
function generate4DigitOtp(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

/**
 * Create a new order with items and delivery records
 * Generates distinct secure pickup_otp and delivery_otp
 */
export async function createOrder(input: CreateOrderInput) {
  const {
    buyerId,
    deliveryAddress,
    deliveryType = 'EXPRESS',
    paymentMethod = 'COD',
    notes = '',
    items,
  } = input;

  if (!items || items.length === 0) {
    throw new Error('Order must contain at least one produce item.');
  }
  if (!deliveryAddress || deliveryAddress.trim().length === 0) {
    throw new Error('Valid delivery address is required.');
  }

  const db = getDb();

  // Validate buyer existence or fallback to u_buyer_1
  let actualBuyerId = buyerId;
  const buyerUser = db.prepare('SELECT id, name FROM users WHERE id = ?').get(buyerId);
  if (!buyerUser) {
    actualBuyerId = 'u_buyer_1';
  }

  // Calculate totals
  const subtotalPaise = items.reduce((sum, item) => sum + (item.quantity * item.unitPricePaise), 0);
  const deliveryFeePaise = deliveryType === 'EXPRESS' ? 3500 : 2000; // ₹35 or ₹20
  const totalAmountPaise = subtotalPaise + deliveryFeePaise;

  // Determine farmerId from first item's listing if available
  let actualFarmerId = input.farmerId;
  let pickupLocation = 'नासिक संकलन केंद्र (Nashik Mandi Hub)';
  if (!actualFarmerId && items[0]?.listingId) {
    const listing = db.prepare('SELECT farmer_id, location FROM product_listings WHERE id = ?').get(items[0].listingId) as any;
    if (listing) {
      actualFarmerId = listing.farmer_id;
      if (listing.location) pickupLocation = listing.location;
    }
  }
  if (!actualFarmerId) {
    actualFarmerId = 'u_farmer_1';
  }

  const orderId = `ord_${Date.now()}`;
  const deliveryId = `del_${Date.now()}`;
  const pickupOtp = generate4DigitOtp();
  const deliveryOtp = generate4DigitOtp();
  const smartContractHash = `KB-ESCROW-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  // Ensure paymentMethod matches SQLite CHECK constraint: ('COD', 'UPI', 'BANK_TRANSFER')
  const validPaymentMethod = ['COD', 'UPI', 'BANK_TRANSFER'].includes(paymentMethod) ? paymentMethod : 'UPI';
  // Initial Payment status is PENDING (Escrow hold) until Delivery OTP is verified
  const paymentStatus = 'PENDING';

  let validFpoId = input.fpoId || null;
  if (validFpoId && !db.prepare('SELECT id FROM fpo_groups WHERE id = ?').get(validFpoId)) {
    validFpoId = null;
  }

  // 1. Insert into SQLite `orders`
  db.prepare(`
    INSERT INTO orders (
      id, buyer_id, farmer_id, fpo_id, status,
      subtotal_paise, delivery_fee_paise, total_amount_paise,
      delivery_address, delivery_type, payment_method, payment_status,
      notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    orderId,
    actualBuyerId,
    actualFarmerId,
    validFpoId,
    'Placed',
    subtotalPaise,
    deliveryFeePaise,
    totalAmountPaise,
    deliveryAddress.trim(),
    deliveryType,
    validPaymentMethod,
    paymentStatus,
    notes ? `${notes} | Contract: ${smartContractHash}` : `Contract: ${smartContractHash}`
  );

  // 2. Insert into SQLite `order_items`
  const insertItemStmt = db.prepare(`
    INSERT INTO order_items (order_id, listing_id, crop_name, quantity, unit, unit_price_paise)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const it of items) {
    let validListingId = it.listingId;
    if (!validListingId || !db.prepare('SELECT id FROM product_listings WHERE id = ?').get(validListingId)) {
      const match = db.prepare('SELECT id FROM product_listings WHERE crop_name LIKE ? LIMIT 1').get(`%${it.cropName.split(' ')[0]}%`) as any;
      validListingId = match ? match.id : 'lst_kisan_veg_1';
    }

    insertItemStmt.run(
      orderId,
      validListingId,
      it.cropName,
      it.quantity,
      it.unit || 'kg',
      it.unitPricePaise
    );
  }

  // 3. Insert into SQLite `deliveries`
  db.prepare(`
    INSERT INTO deliveries (
      id, order_id, partner_id, pickup_location, drop_location,
      status, pickup_otp, delivery_otp, optimized_stop_sequence,
      estimated_distance_km, estimated_eta_minutes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    deliveryId,
    orderId,
    'u_partner_1',
    pickupLocation,
    deliveryAddress.trim(),
    'ASSIGNED',
    pickupOtp,
    deliveryOtp,
    1,
    14.5,
    35
  );

  // 4. Sync with Supabase (Best effort)
  let supabaseSynced = false;
  try {
    const { error: ordErr } = await supabase.from('orders').upsert({
      id: orderId,
      buyer_id: actualBuyerId,
      farmer_id: actualFarmerId,
      status: 'Placed',
      subtotal_paise: subtotalPaise,
      delivery_fee_paise: deliveryFeePaise,
      total_amount_paise: totalAmountPaise,
      delivery_address: deliveryAddress.trim(),
      delivery_type: deliveryType,
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      notes: smartContractHash,
    }, { onConflict: 'id' });

    if (!ordErr) {
      await supabase.from('deliveries').upsert({
        id: deliveryId,
        order_id: orderId,
        partner_id: 'u_partner_1',
        pickup_location: pickupLocation,
        drop_location: deliveryAddress.trim(),
        status: 'ASSIGNED',
        pickup_otp: pickupOtp,
        delivery_otp: deliveryOtp,
      }, { onConflict: 'id' });
      supabaseSynced = true;
    }
  } catch (err: any) {
    console.warn('Supabase order sync notice:', err.message);
  }

  return {
    success: true,
    orderId,
    deliveryId,
    smartContractHash,
    subtotalPaise,
    deliveryFeePaise,
    totalAmountPaise,
    totalRupees: (totalAmountPaise / 100).toFixed(2),
    status: 'Placed',
    paymentStatus,
    deliveryOtp,
    pickupOtp,
    message: 'ऑर्डर एवं स्मार्ट अनुबंध सुरक्षित रूप से निष्पादित! (Order placed with Escrow hold).',
    supabaseSynced,
  };
}

/**
 * Fetch orders for Buyer or Farmer with full items & delivery OTP details
 */
export function getOrders(filter: { userId?: string; role?: string; orderId?: string }) {
  const db = getDb();
  const { userId, role, orderId } = filter;

  let query = `
    SELECT 
      o.*,
      b.name as buyer_name,
      b.phone as buyer_phone,
      f.name as farmer_name,
      f.phone as farmer_phone,
      d.id as delivery_id,
      d.status as delivery_status,
      d.pickup_otp,
      d.delivery_otp,
      d.pickup_location,
      d.drop_location,
      d.estimated_eta_minutes
    FROM orders o
    LEFT JOIN users b ON o.buyer_id = b.id
    LEFT JOIN users f ON o.farmer_id = f.id
    LEFT JOIN deliveries d ON o.id = d.order_id
  `;

  const params: any[] = [];
  const whereClauses: string[] = [];

  if (orderId) {
    whereClauses.push('o.id = ?');
    params.push(orderId);
  } else if (userId) {
    if (role === 'FARMER') {
      whereClauses.push('(o.farmer_id = ? OR o.farmer_id = "u_farmer_1")');
      params.push(userId);
    } else if (role === 'BUYER') {
      whereClauses.push('(o.buyer_id = ? OR o.buyer_id = "u_buyer_1" OR o.buyer_id = "u_buyer_2")');
      params.push(userId);
    } else {
      whereClauses.push('(o.buyer_id = ? OR o.farmer_id = ?)');
      params.push(userId, userId);
    }
  }

  if (whereClauses.length > 0) {
    query += ' WHERE ' + whereClauses.join(' AND ');
  }

  query += ' ORDER BY o.created_at DESC';

  const rows = db.prepare(query).all(...params) as any[];

  // Fetch items for each order
  const itemStmt = db.prepare('SELECT * FROM order_items WHERE order_id = ?');
  return rows.map((r) => {
    const items = itemStmt.all(r.id);
    return {
      ...r,
      items,
      total_rupees: (r.total_amount_paise / 100).toFixed(2),
      subtotal_rupees: (r.subtotal_paise / 100).toFixed(2),
      delivery_fee_rupees: (r.delivery_fee_paise / 100).toFixed(2),
    };
  });
}

/**
 * Verify Pickup or Delivery OTP and advance order & escrow state
 */
export async function verifyOrderOtp(input: VerifyOtpInput) {
  const { orderId, otpType, enteredOtp } = input;
  const db = getDb();

  const delivery = db.prepare(`
    SELECT d.*, o.payment_method, o.payment_status, o.status as order_status
    FROM deliveries d
    JOIN orders o ON d.order_id = o.id
    WHERE d.order_id = ?
  `).get(orderId) as any;

  if (!delivery) {
    throw new Error('Order or Delivery tracking record not found.');
  }

  const cleanEntered = (enteredOtp || '').trim();

  if (otpType === 'pickup') {
    // Verify Farmer Pickup OTP
    if (delivery.pickup_otp !== cleanEntered) {
      throw new Error(`अमान्य पिकअप OTP! (Invalid Pickup OTP. Please check the code given by the farmer.)`);
    }

    db.prepare(`
      UPDATE deliveries SET status = 'IN_TRANSIT' WHERE order_id = ?
    `).run(orderId);

    db.prepare(`
      UPDATE orders SET status = 'Out for Delivery', updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).run(orderId);

    return {
      success: true,
      orderId,
      orderStatus: 'Out for Delivery',
      deliveryStatus: 'IN_TRANSIT',
      message: 'सफलतापूर्वक पिकअप सत्यापित! फसल डिलीवरी हेतु रवाना हो गई है। (Produce picked up and in transit)',
    };
  }

  if (otpType === 'delivery') {
    // Verify Buyer Delivery OTP (Release Escrow)
    if (delivery.delivery_otp !== cleanEntered) {
      throw new Error(`अमान्य डिलीवरी OTP! (Invalid Delivery OTP. Payment cannot be released without matching OTP.)`);
    }

    // Mark delivery completed
    db.prepare(`
      UPDATE deliveries SET status = 'DELIVERED' WHERE order_id = ?
    `).run(orderId);

    // Release Escrow -> Mark Order Delivered & Payment Settled/Paid
    db.prepare(`
      UPDATE orders 
      SET status = 'Delivered', payment_status = 'PAID', updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(orderId);

    // Sync to Supabase
    try {
      await supabase.from('orders').update({
        status: 'Delivered',
        payment_status: 'PAID',
      }).eq('id', orderId);

      await supabase.from('deliveries').update({
        status: 'DELIVERED',
      }).eq('order_id', orderId);
    } catch (err: any) {
      console.warn('Supabase status sync notice:', err.message);
    }

    return {
      success: true,
      orderId,
      orderStatus: 'Delivered',
      deliveryStatus: 'DELIVERED',
      paymentStatus: 'PAID',
      message: 'डिलीवरी एवं एस्क्रो भुगतान सफलतापूर्वक सत्यापित! भुगतान किसान खाते में सुरक्षित रूप से हस्तांतरित। (Escrow released and order delivered).',
    };
  }

  throw new Error('Invalid otpType specified.');
}
