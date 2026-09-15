-- ===================================================
-- KisanBandhan AI: Complete Supabase Database Schema
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/qtldwcgzzroapkepttti/sql
-- ===================================================

-- ===================================================
-- 1. Create users Table
-- ===================================================
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT UNIQUE,
    role TEXT NOT NULL DEFAULT 'FARMER' CHECK (role IN ('FARMER', 'FPO', 'BUYER', 'HUB_OPERATOR', 'TRANSPORTER', 'ADMIN')),
    village TEXT DEFAULT 'Agro Hub',
    district TEXT DEFAULT 'Nashik',
    state TEXT DEFAULT 'Maharashtra',
    address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on users" ON public.users;
CREATE POLICY "Allow public read access on users" ON public.users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert access on users" ON public.users;
CREATE POLICY "Allow public insert access on users" ON public.users FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access on users" ON public.users;
CREATE POLICY "Allow public update access on users" ON public.users FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete access on users" ON public.users;
CREATE POLICY "Allow public delete access on users" ON public.users FOR DELETE USING (true);

-- ===================================================
-- 2. Insert Default Registered Test Users
-- Includes 5 Farmers, FPO, Buyers, Hub Operator, Transporter & Admin
-- ===================================================
INSERT INTO public.users (id, name, phone, email, role, district, state, address)
VALUES 
  ('u_farmer_1', 'Ramesh Patil', '9876543210', 'ramesh.patil@kisanbandhan.ai', 'FARMER', 'Nashik', 'Maharashtra', 'Pimplgaon Baswant, Nashik, MH 422209'),
  ('u_farmer_2', 'Harpreet Singh', '9876543211', 'harpreet@kisanbandhan.ai', 'FARMER', 'Ludhiana', 'Punjab', 'G.T. Road, Khanna, Ludhiana, PB 141401'),
  ('u_farmer_3', 'Suresh Gaikwad', '9876543212', 'suresh.gaikwad@kisanbandhan.ai', 'FARMER', 'Pune', 'Maharashtra', 'Baramati Agro Hub, Pune, MH 413102'),
  ('u_farmer_4', 'Ananya Roy', '9876543213', 'ananya.roy@kisanbandhan.ai', 'FARMER', 'Hooghly', 'West Bengal', 'Singur Krishi Mandi, Hooghly, WB 712409'),
  ('u_farmer_5', 'Rajesh Choudhary', '9876543214', 'rajesh.farmer@kisanbandhan.ai', 'FARMER', 'Jaipur', 'Rajasthan', 'Chomu Mandi Link Road, Jaipur, RJ 303702'),
  ('u_fpo_1', 'Sanjay Deshmukh (FPO Lead)', '9876543219', 'sanjay.fpo@kisanbandhan.ai', 'FPO', 'Nashik', 'Maharashtra', 'Sahyadri Farmers Producer Co., Lasalgaon, Nashik, MH'),
  ('u_buyer_1', 'Priya Sharma (Consumer)', '9811122233', 'priya@kisanbandhan.ai', 'BUYER', 'Pune', 'Maharashtra', 'Flat 402, Green Acres, Viman Nagar, Pune 411014'),
  ('u_buyer_2', 'Annapurna Hotel & Catering', '9822233344', 'annapurna@kisanbandhan.ai', 'BUYER', 'Pune', 'Maharashtra', 'Sector 17, Swargate, Pune 411002'),
  ('u_hub_1', 'Rajesh Kulkarni (Hub Supervisor)', '9900088877', 'rajesh.hub@kisanbandhan.ai', 'HUB_OPERATOR', 'Pune', 'Maharashtra', 'KisanBandhan Hub 4, Hadapsar Mandi, Pune 411028'),
  ('u_partner_1', 'Vikram Shinde Fleet', '9900011122', 'vikram.logistics@kisanbandhan.ai', 'TRANSPORTER', 'Pune', 'Maharashtra', 'Kisan Express Logistics Hub, Pune 411013'),
  ('u_admin_1', 'Ministry Governance Admin', '9000000000', 'admin@kisanbandhan.ai', 'ADMIN', 'New Delhi', 'Delhi', 'Dept of Consumer Affairs, Krishi Bhawan, New Delhi 110001'),
  ('u_dev_master', 'Piyush Kumar (Lead Dev & Collaborator)', '9999999999', 'piyush@kisanbandhan.ai', 'ADMIN', 'Nashik', 'Maharashtra', 'KisanBandhan Innovation Lab, Maharashtra')
ON CONFLICT (id) DO UPDATE SET
  name = excluded.name,
  phone = excluded.phone,
  email = excluded.email,
  role = excluded.role,
  district = excluded.district,
  state = excluded.state,
  address = excluded.address;

-- ===================================================
-- 3. Create product_listings Table
-- ===================================================
CREATE TABLE IF NOT EXISTS public.product_listings (
    id TEXT PRIMARY KEY,
    farmer_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    fpo_id TEXT,
    -- Supported Categories: 'Vegetables', 'Fruits', 'Grains', 'Pulses', 'Seeds', 'Spices', 'Dairy', 'Herbs', 'Cash Crops', 'Flowers'
    category TEXT NOT NULL DEFAULT 'Vegetables',
    quantity_available INTEGER NOT NULL DEFAULT 500,
    unit TEXT NOT NULL DEFAULT 'kg',
    price_paise INTEGER NOT NULL DEFAULT 3000,
    mandi_retail_price_paise INTEGER DEFAULT 4000,
    grade TEXT DEFAULT 'उच्चतम श्रेणी A+',
    harvest_date TEXT DEFAULT CURRENT_DATE::text,
    organic_certified INTEGER DEFAULT 1,
    image_url TEXT DEFAULT 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    logo_url TEXT,
    images_structure JSONB,
    location TEXT DEFAULT 'नासिक मंडी संकलन हब',
    district TEXT DEFAULT 'Nashik',
    status TEXT DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.product_listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on product_listings" ON public.product_listings;
CREATE POLICY "Allow public read access on product_listings" ON public.product_listings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert access on product_listings" ON public.product_listings;
CREATE POLICY "Allow public insert access on product_listings" ON public.product_listings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access on product_listings" ON public.product_listings;
CREATE POLICY "Allow public update access on product_listings" ON public.product_listings FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete access on product_listings" ON public.product_listings;
CREATE POLICY "Allow public delete access on product_listings" ON public.product_listings FOR DELETE USING (true);

-- Ensure column compatibility
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS images_structure JSONB;

-- ===================================================
-- 4. Create product_images Table (Media Registry)
-- ===================================================
CREATE TABLE IF NOT EXISTS public.product_images (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    crop_name TEXT NOT NULL,
    crop_name_hi TEXT,
    category TEXT NOT NULL,
    variety TEXT,
    logo_id TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    logo_alt TEXT,
    primary_image_id TEXT NOT NULL,
    primary_image_url TEXT NOT NULL,
    thumbnail_id TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    gallery_urls JSONB DEFAULT '[]'::jsonb,
    logo_structure JSONB,
    images_structure JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on product_images" ON public.product_images;
CREATE POLICY "Allow public read access on product_images" ON public.product_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert/upsert on product_images" ON public.product_images;
CREATE POLICY "Allow public insert/upsert on product_images" ON public.product_images FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on product_images" ON public.product_images;
CREATE POLICY "Allow public update on product_images" ON public.product_images FOR UPDATE USING (true);

CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_category ON public.product_images(category);

-- ===================================================
-- 5. Create orders, order_items & deliveries Tables
-- Used for real-time testing of order creation & IVR dispatch
-- ===================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    buyer_id TEXT NOT NULL REFERENCES public.users(id),
    farmer_id TEXT NOT NULL REFERENCES public.users(id),
    fpo_id TEXT,
    status TEXT DEFAULT 'Placed',
    subtotal_paise INTEGER NOT NULL,
    delivery_fee_paise INTEGER NOT NULL,
    total_amount_paise INTEGER NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_type TEXT DEFAULT 'EXPRESS',
    payment_method TEXT DEFAULT 'COD',
    payment_status TEXT DEFAULT 'PENDING',
    notes TEXT,
    order_channel TEXT DEFAULT 'WEB',
    ivr_call_sid TEXT,
    caller_phone TEXT,
    pickup_otp TEXT,
    delivery_otp TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on orders" ON public.orders;
CREATE POLICY "Allow public read on orders" ON public.orders FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on orders" ON public.orders;
CREATE POLICY "Allow public insert on orders" ON public.orders FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update on orders" ON public.orders;
CREATE POLICY "Allow public update on orders" ON public.orders FOR UPDATE USING (true);

CREATE TABLE IF NOT EXISTS public.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    listing_id TEXT,
    crop_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit TEXT NOT NULL DEFAULT 'kg',
    unit_price_paise INTEGER NOT NULL
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on order_items" ON public.order_items;
CREATE POLICY "Allow public read on order_items" ON public.order_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on order_items" ON public.order_items FOR INSERT WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.deliveries (
    id TEXT PRIMARY KEY,
    order_id TEXT UNIQUE NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    partner_id TEXT REFERENCES public.users(id),
    pickup_location TEXT NOT NULL,
    drop_location TEXT NOT NULL,
    status TEXT DEFAULT 'ASSIGNED',
    pickup_otp TEXT DEFAULT '4829',
    delivery_otp TEXT DEFAULT '9103',
    optimized_stop_sequence INTEGER DEFAULT 1,
    estimated_distance_km REAL DEFAULT 14.5,
    estimated_eta_minutes INTEGER DEFAULT 35,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on deliveries" ON public.deliveries;
CREATE POLICY "Allow public read on deliveries" ON public.deliveries FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on deliveries" ON public.deliveries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update on deliveries" ON public.deliveries FOR UPDATE USING (true);

-- ===================================================
-- 6. Seed Initial Product Listings per Registered Farmer
-- Ensures each registered farmer has at least 3-4 verified crops!
-- ===================================================

-- Farmer 1: Ramesh Patil (Nashik - Vegetables & Grapes)
INSERT INTO public.product_listings (id, farmer_id, crop_name, category, quantity_available, unit, price_paise, mandi_retail_price_paise, grade, location, district, status, image_url, logo_url)
VALUES 
  ('lst_demo_patil_1', 'u_farmer_1', 'Tomato (Red Pusa Ruby)', 'Vegetables', 1200, 'kg', 3400, 4200, 'उच्चतम श्रेणी A+', 'नासिक संकलन केंद्र (Nashik Mandi)', 'Nashik', 'ACTIVE', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_patil_2', 'u_farmer_1', 'Onion (Nashik Red)', 'Vegetables', 2500, 'kg', 2800, 3500, 'प्रीमियम ग्रेड A', 'नासिक संकलन केंद्र (Nashik Mandi)', 'Nashik', 'ACTIVE', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_patil_3', 'u_farmer_1', 'Grapes (Thompson Seedless)', 'Fruits', 800, 'kg', 6500, 8500, 'निर्यात गुणवत्ता A+', 'नासिक संकलन केंद्र (Nashik Mandi)', 'Nashik', 'ACTIVE', 'https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_patil_4', 'u_farmer_1', 'Cauliflower (Snowball)', 'Vegetables', 600, 'kg', 3000, 4000, 'उच्चतम श्रेणी A+', 'नासिक संकलन केंद्र (Nashik Mandi)', 'Nashik', 'ACTIVE', 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=150&q=80')
ON CONFLICT (id) DO UPDATE SET quantity_available = excluded.quantity_available, price_paise = excluded.price_paise, status = 'ACTIVE';

-- Farmer 2: Harpreet Singh (Punjab - Grains & Mustard)
INSERT INTO public.product_listings (id, farmer_id, crop_name, category, quantity_available, unit, price_paise, mandi_retail_price_paise, grade, location, district, status, image_url, logo_url)
VALUES 
  ('lst_demo_singh_1', 'u_farmer_2', 'Sharbati Wheat (Golden Grain)', 'Grains', 5000, 'kg', 2800, 3400, 'उच्चतम श्रेणी A+', 'खन्ना अनाज मंडी (Khanna Mandi, PB)', 'Ludhiana', 'ACTIVE', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_singh_2', 'u_farmer_2', 'Basmati Rice 1121 (Aged)', 'Grains', 3000, 'kg', 8500, 11000, 'प्रीमियम ग्रेड A', 'खन्ना अनाज मंडी (Khanna Mandi, PB)', 'Ludhiana', 'ACTIVE', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_singh_3', 'u_farmer_2', 'Yellow Mustard Seeds', 'Grains', 1500, 'kg', 5400, 6800, 'उच्चतम श्रेणी A+', 'खन्ना अनाज मंडी (Khanna Mandi, PB)', 'Ludhiana', 'ACTIVE', 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_singh_4', 'u_farmer_2', 'Sweet Corn (Maize)', 'Grains', 2000, 'kg', 2200, 3000, 'प्रीमियम ग्रेड A', 'खन्ना अनाज मंडी (Khanna Mandi, PB)', 'Ludhiana', 'ACTIVE', 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=150&q=80')
ON CONFLICT (id) DO UPDATE SET quantity_available = excluded.quantity_available, price_paise = excluded.price_paise, status = 'ACTIVE';

-- Farmer 3: Suresh Gaikwad (Pune - Fruits & Sugarcane)
INSERT INTO public.product_listings (id, farmer_id, crop_name, category, quantity_available, unit, price_paise, mandi_retail_price_paise, grade, location, district, status, image_url, logo_url)
VALUES 
  ('lst_demo_gaikwad_1', 'u_farmer_3', 'Pomegranate (Bhagwa Red)', 'Fruits', 900, 'kg', 11000, 14500, 'निर्यात गुणवत्ता A+', 'बारामती एग्रो-हब (Baramati Agro Hub, Pune)', 'Pune', 'ACTIVE', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_gaikwad_2', 'u_farmer_3', 'Banana (Grand Naine Cavendish)', 'Fruits', 3500, 'kg', 2400, 3500, 'उच्चतम श्रेणी A+', 'बारामती एग्रो-हब (Baramati Agro Hub, Pune)', 'Pune', 'ACTIVE', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_gaikwad_3', 'u_farmer_3', 'Custard Apple (Sitaphal Balanagar)', 'Fruits', 700, 'kg', 7500, 9500, 'प्रीमियम ग्रेड A', 'बारामती एग्रो-हब (Baramati Agro Hub, Pune)', 'Pune', 'ACTIVE', 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_gaikwad_4', 'u_farmer_3', 'Guava (Allahabad Safeda)', 'Fruits', 1100, 'kg', 4000, 5500, 'उच्चतम श्रेणी A+', 'बारामती एग्रो-हब (Baramati Agro Hub, Pune)', 'Pune', 'ACTIVE', 'https://images.unsplash.com/photo-1536511135899-73e4b77f9859?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1536511135899-73e4b77f9859?auto=format&fit=crop&w=150&q=80')
ON CONFLICT (id) DO UPDATE SET quantity_available = excluded.quantity_available, price_paise = excluded.price_paise, status = 'ACTIVE';

-- Farmer 4: Ananya Roy (West Bengal - Vegetables & Pulses)
INSERT INTO public.product_listings (id, farmer_id, crop_name, category, quantity_available, unit, price_paise, mandi_retail_price_paise, grade, location, district, status, image_url, logo_url)
VALUES 
  ('lst_demo_roy_1', 'u_farmer_4', 'Potato (Jyoti Fresh Harvest)', 'Vegetables', 4000, 'kg', 2100, 2800, 'उच्चतम श्रेणी A+', 'सिंगूर कृषि संकलन केंद्र (Singur Hub, WB)', 'Hooghly', 'ACTIVE', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_roy_2', 'u_farmer_4', 'Pointed Gourd (Parwal Green)', 'Vegetables', 800, 'kg', 4500, 6000, 'प्रीमियम ग्रेड A', 'सिंगूर कृषि संकलन केंद्र (Singur Hub, WB)', 'Hooghly', 'ACTIVE', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_roy_3', 'u_farmer_4', 'Red Lentils (Masoor Dal Whole)', 'Pulses', 1500, 'kg', 7800, 9500, 'उच्चतम श्रेणी A+', 'सिंगूर कृषि संकलन केंद्र (Singur Hub, WB)', 'Hooghly', 'ACTIVE', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_roy_4', 'u_farmer_4', 'Green Moong Dal (Organic)', 'Pulses', 1200, 'kg', 9500, 12000, 'ऑर्गेनिक प्रमाणित A+', 'सिंगूर कृषि संकलन केंद्र (Singur Hub, WB)', 'Hooghly', 'ACTIVE', 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=150&q=80')
ON CONFLICT (id) DO UPDATE SET quantity_available = excluded.quantity_available, price_paise = excluded.price_paise, status = 'ACTIVE';

-- Farmer 5: Rajesh Choudhary (Rajasthan - Spices, Millets & Pulses)
INSERT INTO public.product_listings (id, farmer_id, crop_name, category, quantity_available, unit, price_paise, mandi_retail_price_paise, grade, location, district, status, image_url, logo_url)
VALUES 
  ('lst_demo_choudhary_1', 'u_farmer_5', 'Pearl Millet (Desi Bajra)', 'Grains', 3500, 'kg', 2400, 3100, 'उच्चतम श्रेणी A+', 'चोमू कृषि मंडी हब (Chomu Mandi, Jaipur)', 'Jaipur', 'ACTIVE', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_choudhary_2', 'u_farmer_5', 'Cumin Seeds (Jeera Super Grade)', 'Grains', 1000, 'kg', 26000, 32000, 'प्रीमियम ग्रेड A', 'चोमू कृषि मंडी हब (Chomu Mandi, Jaipur)', 'Jaipur', 'ACTIVE', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_choudhary_3', 'u_farmer_5', 'Chickpeas / Bengal Gram (Desi Chana)', 'Pulses', 2200, 'kg', 6400, 8000, 'उच्चतम श्रेणी A+', 'चोमू कृषि मंडी हब (Chomu Mandi, Jaipur)', 'Jaipur', 'ACTIVE', 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=150&q=80'),
  ('lst_demo_choudhary_4', 'u_farmer_5', 'Moth Beans (Matki Organic)', 'Pulses', 1400, 'kg', 7200, 9000, 'ऑर्गेनिक प्रमाणित A+', 'चोमू कृषि मंडी हब (Chomu Mandi, Jaipur)', 'Jaipur', 'ACTIVE', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80')
ON CONFLICT (id) DO UPDATE SET quantity_available = excluded.quantity_available, price_paise = excluded.price_paise, status = 'ACTIVE';

-- ===================================================
-- 7. Automated Seeding Note:
-- All 352 catalog products are also programmatically synced
-- across all registered farmers via POST /api/v1/products/seed-default-kisan
-- ===================================================
