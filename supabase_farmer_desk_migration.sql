-- =============================================================================
-- KisanBandhan AI: Supabase Product Listings & Farmer Desk Schema Migration
-- =============================================================================
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/qtldwcgzzroapkepttti/sql
-- =============================================================================

-- 1. Ensure users table exists and has all farmer & buyer fields
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
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

-- 2. Create Optimized product_listings Table
CREATE TABLE IF NOT EXISTS public.product_listings (
    id TEXT PRIMARY KEY,
    farmer_id TEXT NOT NULL,
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

-- Ensure all necessary columns exist if table already partially existed
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS farmer_name TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS farmer_phone TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS crop_name TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS crop_name_hi TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS variety TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS unit TEXT DEFAULT 'kg';
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS state TEXT DEFAULT 'Maharashtra';

-- Indexes for ultra-fast marketplace search and farmer desk isolation
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

-- 3. Seed Default Staple Verified Crop Listings
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
