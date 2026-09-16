-- =============================================================================
-- KisanBandhan AI: Complete Master Supabase Cloud Schema
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/qtldwcgzzroapkepttti/sql/new
-- =============================================================================

-- =============================================================================
-- 1. USERS TABLE (Supports Multi-Laptop Cross-Device Cloud Authentication)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    password TEXT, -- For seamless cross-device login across any laptop
    phone TEXT NOT NULL DEFAULT '9876543210',
    role TEXT NOT NULL DEFAULT 'FARMER' CHECK (role IN ('FARMER', 'FPO', 'BUYER', 'HUB_OPERATOR', 'TRANSPORTER', 'ADMIN')),
    village TEXT DEFAULT 'Agro Hub',
    district TEXT DEFAULT 'Nashik',
    state TEXT DEFAULT 'Maharashtra',
    address TEXT NOT NULL DEFAULT 'Maharashtra, India',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure password column exists if users table already existed
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS password TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '9876543210';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS district TEXT DEFAULT 'Nashik';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS state TEXT DEFAULT 'Maharashtra';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS address TEXT DEFAULT 'Maharashtra, India';

-- Indexes for lightning fast login and lookup
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- Enable RLS & Configure Public Access Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on users" ON public.users;
CREATE POLICY "Allow public read access on users" ON public.users FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert access on users" ON public.users;
CREATE POLICY "Allow public insert access on users" ON public.users FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update access on users" ON public.users;
CREATE POLICY "Allow public update access on users" ON public.users FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow public delete access on users" ON public.users;
CREATE POLICY "Allow public delete access on users" ON public.users FOR DELETE USING (true);

-- Seed Seed/Demo Accounts in Supabase Users
INSERT INTO public.users (id, name, email, password, phone, role, district, state, address)
VALUES 
  ('u_dev_master', 'Piyush Kumar (Lead Dev & Collaborator)', 'piyush@kisanbandhan.ai', 'dev', '9999999999', 'ADMIN', 'Nashik', 'Maharashtra', 'KisanBandhan Innovation Lab, Maharashtra'),
  ('u_farmer_1', 'Ramesh Patil (रमेश पाटिल)', 'ramesh.patil@kisanbandhan.ai', 'Kisan#9824!Agri', '9876543210', 'FARMER', 'Nashik', 'Maharashtra', 'Pimplgaon Baswant, Nashik, MH 422209'),
  ('u_farmer_2', 'Harpreet Singh (हरप्रीत सिंह)', 'harpreet@kisanbandhan.ai', 'Kisan#9824!Agri', '9876543211', 'FARMER', 'Ludhiana', 'Punjab', 'G.T. Road, Khanna, Ludhiana, PB 141401'),
  ('u_farmer_3', 'Suresh Gaikwad (सुरेश गायकवाड़)', 'suresh.gaikwad@kisanbandhan.ai', 'Kisan#9824!Agri', '9876543212', 'FARMER', 'Pune', 'Maharashtra', 'Baramati Agro Hub, Pune, MH 413102'),
  ('u_farmer_4', 'Ananya Roy', 'ananya.roy@kisanbandhan.ai', 'Kisan#9824!Agri', '9876543213', 'FARMER', 'Hooghly', 'West Bengal', 'Singur Krishi Mandi, Hooghly, WB 712409'),
  ('u_fpo_1', 'Sanjay Deshmukh (FPO Lead)', 'sanjay.fpo@kisanbandhan.ai', 'Kisan#9824!Agri', '9876543219', 'FPO', 'Nashik', 'Maharashtra', 'Sahyadri Farmers Producer Co., Lasalgaon, Nashik, MH'),
  ('u_buyer_1', 'Priya Sharma (Consumer)', 'priya@kisanbandhan.ai', 'Kisan#9824!Agri', '9811122233', 'BUYER', 'Pune', 'Maharashtra', 'Flat 402, Green Acres, Viman Nagar, Pune 411014'),
  ('u_buyer_2', 'Annapurna Hotel & Catering', 'annapurna@kisanbandhan.ai', 'Kisan#9824!Agri', '9822233344', 'BUYER', 'Pune', 'Maharashtra', 'Sector 17, Swargate, Pune 411002'),
  ('u_hub_1', 'Rajesh Kulkarni (Hub Supervisor)', 'rajesh.hub@kisanbandhan.ai', 'Kisan#9824!Agri', '9900088877', 'HUB_OPERATOR', 'Pune', 'Maharashtra', 'KisanBandhan Hub 4, Hadapsar Mandi, Pune 411028'),
  ('u_partner_1', 'Vikram Shinde Fleet', 'vikram.logistics@kisanbandhan.ai', 'Kisan#9824!Agri', '9900011122', 'TRANSPORTER', 'Pune', 'Maharashtra', 'Kisan Express Logistics Hub, Pune 411013'),
  ('u_admin_1', 'Ministry Governance Admin', 'admin@kisanbandhan.ai', 'Kisan#9824!Agri', '9000000000', 'ADMIN', 'New Delhi', 'Delhi', 'Dept of Consumer Affairs, Krishi Bhawan, New Delhi 110001')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  password = COALESCE(EXCLUDED.password, public.users.password),
  phone = EXCLUDED.phone,
  role = EXCLUDED.role;


-- =============================================================================
-- 2. PRODUCT_LISTINGS TABLE (Farmer Desk Isolation & Public Marketplace)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.product_listings (
    id TEXT PRIMARY KEY,
    farmer_id TEXT NOT NULL,
    fpo_id TEXT DEFAULT 'fpo_nashik_1',
    farmer_name TEXT,
    farmer_phone TEXT,
    crop_name TEXT NOT NULL,
    crop_name_hi TEXT,
    category TEXT NOT NULL DEFAULT 'Vegetables',
    variety TEXT,
    quantity_available INTEGER NOT NULL DEFAULT 500,
    unit TEXT NOT NULL DEFAULT 'kg',
    price_paise INTEGER NOT NULL DEFAULT 3000,
    mandi_retail_price_paise INTEGER DEFAULT 4000,
    grade TEXT DEFAULT 'उच्चतम श्रेणी A+',
    harvest_date TEXT DEFAULT CURRENT_DATE::text,
    organic_certified INTEGER DEFAULT 0,
    image_url TEXT DEFAULT '',
    logo_url TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    location TEXT DEFAULT 'नासिक मंडी संकलन हब',
    district TEXT DEFAULT 'Nashik',
    state TEXT DEFAULT 'Maharashtra',
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure all columns exist
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS fpo_id TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS farmer_name TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS farmer_phone TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS crop_name TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS crop_name_hi TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS variety TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS unit TEXT DEFAULT 'kg';
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS state TEXT DEFAULT 'Maharashtra';

-- High-performance indexes
CREATE INDEX IF NOT EXISTS idx_product_listings_farmer_id ON public.product_listings(farmer_id);
CREATE INDEX IF NOT EXISTS idx_product_listings_status ON public.product_listings(status);
CREATE INDEX IF NOT EXISTS idx_product_listings_category ON public.product_listings(category);
CREATE INDEX IF NOT EXISTS idx_product_listings_created_at ON public.product_listings(created_at DESC);

-- Enable RLS & Configure Public Access Policies
ALTER TABLE public.product_listings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on product_listings" ON public.product_listings;
CREATE POLICY "Allow public read access on product_listings" ON public.product_listings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert access on product_listings" ON public.product_listings;
CREATE POLICY "Allow public insert access on product_listings" ON public.product_listings FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update access on product_listings" ON public.product_listings;
CREATE POLICY "Allow public update access on product_listings" ON public.product_listings FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow public delete access on product_listings" ON public.product_listings;
CREATE POLICY "Allow public delete access on product_listings" ON public.product_listings FOR DELETE USING (true);

-- Seed Default Staple Verified Crop Listings
INSERT INTO public.product_listings (
    id, farmer_id, farmer_name, farmer_phone, crop_name, crop_name_hi, category, variety,
    quantity_available, unit, price_paise, mandi_retail_price_paise, grade, harvest_date,
    organic_certified, image_url, location, district, state, status
) VALUES 
(
    'prod_tomato_1',
    'u_farmer_1',
    'Ramesh Patil (रमेश पाटिल)',
    '+91 98765 43210',
    'Tomato (Vaishali 108)',
    'टमाटर (वैशाली 108)',
    'Vegetables',
    'Vaishali 108',
    500,
    'kg',
    3450,
    4200,
    'उच्चतम श्रेणी A+',
    '2026-09-14',
    1,
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    'खेत संकलन केंद्र #04, नासिक (Nashik Hub, Maharashtra)',
    'Nashik',
    'Maharashtra',
    'ACTIVE'
),
(
    'prod_onion_1',
    'u_farmer_2',
    'Harpreet Singh (हरप्रीत सिंह)',
    '+91 98765 43211',
    'Onion (Nashik Red)',
    'प्याज (लाल नासिक)',
    'Vegetables',
    'Nashik Red',
    800,
    'kg',
    2800,
    3500,
    'ग्रेड A+ (निर्यात गुणवत्ता)',
    '2026-09-14',
    0,
    'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    'पिंपलगांव मंडी हब, नासिक (Pimplgaon Mandi Hub, Nashik)',
    'Nashik',
    'Maharashtra',
    'ACTIVE'
),
(
    'prod_wheat_1',
    'u_farmer_3',
    'Suresh Gaikwad (सुरेश गायकवाड़)',
    '+91 98765 43212',
    'Wheat (Sharbati Gold)',
    'गेहूं (शरबती गोल्ड)',
    'Grains',
    'Sharbati Gold',
    1200,
    'kg',
    3800,
    4600,
    'प्रीमियम ग्रेड A',
    '2026-09-14',
    1,
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    'सीहोर कृषि मंडी हब, मध्य प्रदेश (Sehore Mandi Hub, MP)',
    'Sehore',
    'Madhya Pradesh',
    'ACTIVE'
)
ON CONFLICT (id) DO UPDATE SET
    farmer_name = EXCLUDED.farmer_name,
    crop_name = EXCLUDED.crop_name,
    quantity_available = EXCLUDED.quantity_available,
    price_paise = EXCLUDED.price_paise,
    status = EXCLUDED.status;


-- =============================================================================
-- 3. ORDERS TABLE (Live Direct Farm Purchase & Escrow Smart Contracts)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    buyer_id TEXT NOT NULL,
    farmer_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Placed' CHECK (status IN ('Placed', 'Accepted', 'Picked Up', 'Out for Delivery', 'Delivered', 'Cancelled')),
    subtotal_paise INTEGER NOT NULL DEFAULT 0,
    delivery_fee_paise INTEGER NOT NULL DEFAULT 0,
    total_amount_paise INTEGER NOT NULL DEFAULT 0,
    delivery_address TEXT NOT NULL,
    delivery_type TEXT DEFAULT 'EXPRESS',
    payment_method TEXT DEFAULT 'COD',
    payment_status TEXT DEFAULT 'PENDING_ESCROW',
    pickup_otp TEXT DEFAULT '1234',
    delivery_otp TEXT DEFAULT '5678',
    shipping_json JSONB,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure columns exist
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_json JSONB;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS pickup_otp TEXT DEFAULT '1234';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_otp TEXT DEFAULT '5678';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'PENDING_ESCROW';

CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON public.orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_farmer_id ON public.orders(farmer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on orders" ON public.orders;
CREATE POLICY "Allow public read access on orders" ON public.orders FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert access on orders" ON public.orders;
CREATE POLICY "Allow public insert access on orders" ON public.orders FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update access on orders" ON public.orders;
CREATE POLICY "Allow public update access on orders" ON public.orders FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow public delete access on orders" ON public.orders;
CREATE POLICY "Allow public delete access on orders" ON public.orders FOR DELETE USING (true);


-- =============================================================================
-- 4. ORDER_ITEMS TABLE (Produce details per order)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id TEXT NOT NULL,
    listing_id TEXT,
    crop_name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 100,
    unit TEXT NOT NULL DEFAULT 'kg',
    unit_price_paise INTEGER NOT NULL DEFAULT 3000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on order_items" ON public.order_items;
CREATE POLICY "Allow public read access on order_items" ON public.order_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert access on order_items" ON public.order_items;
CREATE POLICY "Allow public insert access on order_items" ON public.order_items FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update access on order_items" ON public.order_items;
CREATE POLICY "Allow public update access on order_items" ON public.order_items FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow public delete access on order_items" ON public.order_items;
CREATE POLICY "Allow public delete access on order_items" ON public.order_items FOR DELETE USING (true);


-- =============================================================================
-- 5. DELIVERIES TABLE (Transporter Logistics, OTP Handshake & Route GPS)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.deliveries (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    partner_id TEXT NOT NULL DEFAULT 'u_partner_1',
    pickup_location TEXT NOT NULL,
    drop_location TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ASSIGNED' CHECK (status IN ('ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'FAILED')),
    pickup_otp TEXT DEFAULT '1234',
    delivery_otp TEXT DEFAULT '5678',
    optimized_stop_sequence INTEGER DEFAULT 1,
    estimated_distance_km NUMERIC DEFAULT 12.5,
    estimated_eta_minutes INTEGER DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_deliveries_order_id ON public.deliveries(order_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_partner_id ON public.deliveries(partner_id);

ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on deliveries" ON public.deliveries;
CREATE POLICY "Allow public read access on deliveries" ON public.deliveries FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert access on deliveries" ON public.deliveries;
CREATE POLICY "Allow public insert access on deliveries" ON public.deliveries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update access on deliveries" ON public.deliveries;
CREATE POLICY "Allow public update access on deliveries" ON public.deliveries FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow public delete access on deliveries" ON public.deliveries;
CREATE POLICY "Allow public delete access on deliveries" ON public.deliveries FOR DELETE USING (true);

-- =============================================================================
-- Seed Demo Active Order (ord_501) for Live Delivery & OTP Verification
-- =============================================================================
INSERT INTO public.orders (
    id, buyer_id, farmer_id, status, subtotal_paise, delivery_fee_paise, total_amount_paise,
    delivery_address, delivery_type, payment_method, payment_status, pickup_otp, delivery_otp
) VALUES (
    'ord_501',
    'u_buyer_1',
    'u_farmer_1',
    'Placed',
    345000,
    13800,
    358800,
    'Priya Sharma | Phone: 9811122233 | Flat 402, Green Acres, Viman Nagar, Pune, Maharashtra - 411014 (HOME)',
    'EXPRESS',
    'COD',
    'PENDING_ESCROW',
    '4829',
    '7193'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.order_items (order_id, listing_id, crop_name, quantity, unit, unit_price_paise)
VALUES ('ord_501', 'prod_tomato_1', 'Tomato (Vaishali 108)', 100, 'kg', 3450)
ON CONFLICT DO NOTHING;

INSERT INTO public.deliveries (
    id, order_id, partner_id, pickup_location, drop_location, status, pickup_otp, delivery_otp
) VALUES (
    'del_501',
    'ord_501',
    'u_partner_1',
    'खेत संकलन केंद्र #04, नासिक (Nashik Hub, Maharashtra)',
    'Sector 4, Viman Nagar, Pune, Maharashtra 411014',
    'ASSIGNED',
    '4829',
    '7193'
) ON CONFLICT (id) DO NOTHING;
