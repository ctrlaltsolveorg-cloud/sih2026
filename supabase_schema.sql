-- KisanBandhan AI: Supabase Database Schema
-- Copy and run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create product_listings Table
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
    location TEXT DEFAULT 'नासिक मंडी संकलन हब',
    district TEXT DEFAULT 'Nashik',
    status TEXT DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS) & Grant Public Select / Insert Permissions
ALTER TABLE public.product_listings ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
CREATE POLICY "Allow public read access on product_listings"
ON public.product_listings FOR SELECT
USING (true);

-- Allow Public Insert Access
CREATE POLICY "Allow public insert access on product_listings"
ON public.product_listings FOR INSERT
WITH CHECK (true);

-- Allow Public Update Access
CREATE POLICY "Allow public update access on product_listings"
ON public.product_listings FOR UPDATE
USING (true);

-- 3. Seed Initial Produce
INSERT INTO public.product_listings (id, crop_name, category, quantity_available, price_paise, grade, location)
VALUES 
  ('lst_101', 'ताज़ा हाइब्रिड टमाटर (Fresh Tomatoes)', 'Vegetables', 1200, 3450, 'Grade A+', 'नासिक मंडी हब (महाराष्ट्र)'),
  ('lst_102', 'लाल प्याज (Lasalgaon Red Onion)', 'Vegetables', 3500, 2800, 'Grade A', 'लासलगांव संकलन केंद्र'),
  ('lst_103', 'जैविक ज्योति आलू (Organic Potatoes)', 'Root Crops', 2800, 2250, 'Grade A+', 'इन्दौर (मध्य प्रदेश)')
ON CONFLICT (id) DO NOTHING;
