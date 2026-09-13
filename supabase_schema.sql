-- KisanBandhan AI: Supabase Database Schema
-- Copy and run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- ===================================================
-- 1. Create product_listings Table
-- ===================================================
CREATE TABLE IF NOT EXISTS public.product_listings (
    id TEXT PRIMARY KEY,
    farmer_id TEXT NOT NULL DEFAULT 'u_farmer_1',
    fpo_id TEXT DEFAULT 'fpo_nashik_1',
    crop_name TEXT NOT NULL,
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

-- Ensure column compatibility if table was created previously
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE public.product_listings ADD COLUMN IF NOT EXISTS images_structure JSONB;

-- ===================================================
-- 2. Create product_images Table (Media Registry)
-- Stores product logo images and structured photos with unique link IDs
-- ===================================================
CREATE TABLE IF NOT EXISTS public.product_images (
    id TEXT PRIMARY KEY,                             -- e.g. 'media_veg_1'
    product_id TEXT NOT NULL,                        -- e.g. 'veg_1'
    crop_name TEXT NOT NULL,                         -- e.g. 'Tomato (Red)'
    crop_name_hi TEXT,                               -- e.g. 'टमाटर (लाल देशी)'
    category TEXT NOT NULL,                          -- Vegetables, Fruits, Pulses, Grains
    variety TEXT,                                    -- e.g. 'Pusa Ruby'
    logo_id TEXT NOT NULL,                           -- e.g. 'lnk_logo_veg_1'
    logo_url TEXT NOT NULL,                          -- 1:1 ratio square emblem/logo URL
    logo_alt TEXT,                                   -- Accessibility description
    primary_image_id TEXT NOT NULL,                  -- e.g. 'lnk_img_veg_1_primary'
    primary_image_url TEXT NOT NULL,                 -- Main high-res crop photo URL
    thumbnail_id TEXT NOT NULL,                      -- e.g. 'lnk_img_veg_1_thumb'
    thumbnail_url TEXT NOT NULL,                     -- Thumbnail URL
    gallery_urls JSONB DEFAULT '[]'::jsonb,          -- Array of additional gallery photo URLs
    logo_structure JSONB,                            -- Structured Logo { link_id, url, alt, type, aspect_ratio }
    images_structure JSONB,                          -- Structured Images { primary, thumbnail, gallery: [...] }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for rapid lookup
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_category ON public.product_images(category);

-- ===================================================
-- 3. Row Level Security (RLS) & Permissions
-- ===================================================
ALTER TABLE public.product_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- product_listings policies
DROP POLICY IF EXISTS "Allow public read access on product_listings" ON public.product_listings;
CREATE POLICY "Allow public read access on product_listings"
ON public.product_listings FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow public insert access on product_listings" ON public.product_listings;
CREATE POLICY "Allow public insert access on product_listings"
ON public.product_listings FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access on product_listings" ON public.product_listings;
CREATE POLICY "Allow public update access on product_listings"
ON public.product_listings FOR UPDATE
USING (true);

DROP POLICY IF EXISTS "Allow public delete access on product_listings" ON public.product_listings;
CREATE POLICY "Allow public delete access on product_listings"
ON public.product_listings FOR DELETE
USING (true);

-- product_images policies
DROP POLICY IF EXISTS "Allow public read access on product_images" ON public.product_images;
CREATE POLICY "Allow public read access on product_images"
ON public.product_images FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow public insert/upsert on product_images" ON public.product_images;
CREATE POLICY "Allow public insert/upsert on product_images"
ON public.product_images FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on product_images" ON public.product_images;
CREATE POLICY "Allow public update on product_images"
ON public.product_images FOR UPDATE
USING (true);

-- ===================================================
-- 4. Default Kisan User Verification
-- Ensure default farmer 'u_farmer_1' (Ramesh Patil) exists
-- ===================================================
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT UNIQUE,
    role TEXT NOT NULL DEFAULT 'FARMER',
    district TEXT DEFAULT 'Nashik',
    state TEXT DEFAULT 'Maharashtra',
    address TEXT DEFAULT 'Pimplgaon Baswant, Nashik, MH',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on users" ON public.users FOR INSERT WITH CHECK (true);

INSERT INTO public.users (id, name, phone, email, role, district, state, address)
VALUES ('u_farmer_1', 'Ramesh Patil', '9876543210', 'ramesh.patil@kisanbandhan.ai', 'FARMER', 'Nashik', 'Maharashtra', 'Pimplgaon Baswant, Nashik, MH 422209')
ON CONFLICT (id) DO UPDATE SET
  name = excluded.name,
  email = excluded.email;

-- ===================================================
-- 5. Note on Populating All 352 Products
-- You can seed all 352 catalog products to default farmer 'u_farmer_1'
-- by visiting: POST /api/v1/products/seed-default-kisan
-- Or clicking "Add All 352 Products" in the Farmer Dashboard UI!
-- ===================================================
