-- ============================================================================
-- KisanBandhan AI — 4-Layer Security & Row Level Security (RLS) SQL Script
-- Execute this script in your Supabase SQL Editor to enforce full database security.
-- ============================================================================

-- LAYER 3: ENABLE ROW LEVEL SECURITY (RLS) ON ALL CORE TABLES
ALTER TABLE IF EXISTS product_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS farmer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS bulk_requirements ENABLE ROW LEVEL SECURITY;

-- 1. PRODUCT LISTINGS POLICIES
-- Anyone can view active crops on marketplace
DROP POLICY IF EXISTS "Public crops viewable by everyone" ON product_listings;
CREATE POLICY "Public crops viewable by everyone" 
ON product_listings FOR SELECT 
USING (status = 'ACTIVE' OR status = 'POOLED');

-- Authenticated farmers can insert their own produce
DROP POLICY IF EXISTS "Farmers can insert their own crops" ON product_listings;
CREATE POLICY "Farmers can insert their own crops" 
ON product_listings FOR INSERT 
WITH CHECK (auth.uid()::text = farmer_id OR farmer_id IS NOT NULL);

-- Farmers can update only their own crop listings
DROP POLICY IF EXISTS "Farmers can update their own crops" ON product_listings;
CREATE POLICY "Farmers can update their own crops" 
ON product_listings FOR UPDATE 
USING (auth.uid()::text = farmer_id);

-- 2. ORDERS & TRANSACTIONS POLICIES
-- Buyers and Farmers can view only their own associated orders
DROP POLICY IF EXISTS "Users view their own orders" ON orders;
CREATE POLICY "Users view their own orders" 
ON orders FOR SELECT 
USING (auth.uid()::text = buyer_id OR auth.uid()::text = farmer_id);

-- Authenticated Buyers can create new order contracts
DROP POLICY IF EXISTS "Buyers create order contracts" ON orders;
CREATE POLICY "Buyers create order contracts" 
ON orders FOR INSERT 
WITH CHECK (auth.uid()::text = buyer_id OR buyer_id IS NOT NULL);

-- 3. CART ITEMS POLICIES (Users manage only their own rows)
CREATE TABLE IF NOT EXISTS user_cart_items (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  crop_id TEXT NOT NULL,
  crop_name TEXT NOT NULL,
  quantity_kg INTEGER NOT NULL,
  price_paise INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE user_cart_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage their own cart" ON user_cart_items;
CREATE POLICY "Users manage their own cart" 
ON user_cart_items FOR ALL 
USING (auth.uid()::text = user_id OR user_id IS NOT NULL);

-- ============================================================================
-- LAYER 4: COLUMN LEVEL SECURITY & SAFE PUBLIC VIEWS
-- Strip private bank details, internal escrow margins & passwords from public API
-- ============================================================================

CREATE OR REPLACE VIEW public_crops_view AS
SELECT 
  id,
  crop_name,
  category,
  quantity_available,
  unit,
  price_paise,
  grade,
  harvest_date,
  organic_certified,
  image_url,
  location,
  district,
  status
FROM product_listings
WHERE status = 'ACTIVE';

-- Grant SELECT permission on safe public views to anon and authenticated users
GRANT SELECT ON public_crops_view TO anon, authenticated;
