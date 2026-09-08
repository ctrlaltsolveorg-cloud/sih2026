-- ====================================================================
-- KisanBandhan AI (SIH 2026 PS 26033) - Supabase PostgreSQL Schema
-- Includes pgvector extension for AI Semantic Search
-- ====================================================================

-- 1. Enable Vector Extension for Semantic Search & Matchmaking
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Users Table (6 Personas)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('FARMER', 'FPO', 'BUYER', 'HUB_OPERATOR', 'TRANSPORTER', 'ADMIN')),
  village TEXT,
  district TEXT NOT NULL,
  state TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. FPO Groups Table
CREATE TABLE IF NOT EXISTS fpo_groups (
  id TEXT PRIMARY KEY,
  fpo_name TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL,
  total_members INTEGER DEFAULT 1,
  manager_user_id TEXT REFERENCES users(id)
);

-- 4. Farmer Profiles Table
CREATE TABLE IF NOT EXISTS farmer_profiles (
  user_id TEXT PRIMARY KEY REFERENCES users(id),
  farm_name TEXT NOT NULL,
  fpo_id TEXT REFERENCES fpo_groups(id),
  total_land_acres NUMERIC DEFAULT 0,
  verification_status TEXT DEFAULT 'VERIFIED' CHECK(verification_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
  bank_account TEXT,
  ifsc_code TEXT
);

-- 5. Product Listings Table
CREATE TABLE IF NOT EXISTS product_listings (
  id TEXT PRIMARY KEY,
  farmer_id TEXT NOT NULL REFERENCES users(id),
  fpo_id TEXT REFERENCES fpo_groups(id),
  crop_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices')),
  quantity_available INTEGER NOT NULL CHECK(quantity_available >= 0),
  unit TEXT NOT NULL DEFAULT 'kg',
  price_paise INTEGER NOT NULL CHECK(price_paise > 0),
  mandi_retail_price_paise INTEGER NOT NULL,
  grade TEXT DEFAULT 'Grade A',
  harvest_date TEXT NOT NULL,
  organic_certified INTEGER DEFAULT 0,
  image_url TEXT NOT NULL,
  location TEXT NOT NULL,
  district TEXT NOT NULL,
  status TEXT DEFAULT 'ACTIVE' CHECK(status IN ('ACTIVE', 'PAUSED', 'SOLD_OUT')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Crop Vector Embeddings Table (pgvector 384 dimensions)
CREATE TABLE IF NOT EXISTS crop_embeddings (
  id SERIAL PRIMARY KEY,
  listing_id TEXT UNIQUE REFERENCES product_listings(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  district TEXT NOT NULL,
  grade TEXT NOT NULL,
  description_text TEXT NOT NULL,
  embedding vector(384),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- HNSW Index for Ultra-Fast Cosine Distance Vector Queries
CREATE INDEX IF NOT EXISTS crop_embeddings_vector_idx 
ON crop_embeddings 
USING hnsw (embedding vector_cosine_ops);

-- 7. Vector Similarity Search Function (RPC)
CREATE OR REPLACE FUNCTION match_crops (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id int,
  listing_id text,
  crop_name text,
  district text,
  grade text,
  description_text text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    crop_embeddings.id,
    crop_embeddings.listing_id,
    crop_embeddings.crop_name,
    crop_embeddings.district,
    crop_embeddings.grade,
    crop_embeddings.description_text,
    1 - (crop_embeddings.embedding <=> query_embedding) AS similarity
  FROM crop_embeddings
  WHERE 1 - (crop_embeddings.embedding <=> query_embedding) > match_threshold
  ORDER BY crop_embeddings.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 8. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  buyer_id TEXT NOT NULL REFERENCES users(id),
  farmer_id TEXT NOT NULL REFERENCES users(id),
  fpo_id TEXT REFERENCES fpo_groups(id),
  status TEXT DEFAULT 'Placed' CHECK(status IN ('Placed', 'Accepted', 'Picked Up', 'Out for Delivery', 'Delivered', 'Cancelled')),
  subtotal_paise INTEGER NOT NULL,
  delivery_fee_paise INTEGER NOT NULL,
  total_amount_paise INTEGER NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_type TEXT DEFAULT 'EXPRESS',
  payment_method TEXT DEFAULT 'COD',
  payment_status TEXT DEFAULT 'PENDING',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Deliveries Table
CREATE TABLE IF NOT EXISTS deliveries (
  id TEXT PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL REFERENCES orders(id),
  partner_id TEXT REFERENCES users(id),
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  status TEXT DEFAULT 'ASSIGNED' CHECK(status IN ('ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED')),
  pickup_otp TEXT DEFAULT '4829',
  delivery_otp TEXT DEFAULT '9103',
  optimized_stop_sequence INTEGER DEFAULT 1,
  estimated_distance_km NUMERIC DEFAULT 14.5,
  estimated_eta_minutes INTEGER DEFAULT 35,
  assigned_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Hub Intakes Table
CREATE TABLE IF NOT EXISTS hub_intakes (
  id TEXT PRIMARY KEY,
  lot_id TEXT NOT NULL,
  operator_id TEXT NOT NULL REFERENCES users(id),
  crop_name TEXT NOT NULL,
  quantity_kg INTEGER NOT NULL,
  quality_grade TEXT DEFAULT 'Grade A+',
  cv_confidence_score NUMERIC DEFAULT 0.94,
  shelf_life_days INTEGER DEFAULT 12,
  fssai_compliance TEXT DEFAULT 'PASS',
  qr_code_id TEXT NOT NULL,
  intake_status TEXT DEFAULT 'STORED'
);

-- 11. Seed Initial Data
INSERT INTO users (id, name, phone, role, village, district, state, address) VALUES
('u_farmer_1', 'Ramesh Patil', '9876543210', 'FARMER', 'Pimplgaon', 'Nashik', 'Maharashtra', 'Pimplgaon Baswant, Nashik, MH 422209'),
('u_fpo_1', 'Sanjay Deshmukh (FPO Lead)', '9876543219', 'FPO', 'Lasalgaon Hub', 'Nashik', 'Maharashtra', 'Sahyadri Farmers Producer Co., Nashik'),
('u_buyer_2', 'Annapurna Hotel & Catering', '9822233344', 'BUYER', '', 'Pune', 'Maharashtra', 'Sector 17, Swargate, Pune 411002'),
('u_hub_1', 'Rajesh Kulkarni (Hub Supervisor)', '9900088877', 'HUB_OPERATOR', 'Hadapsar Mandi', 'Pune', 'Maharashtra', 'KisanBandhan Hub 4, Hadapsar, Pune'),
('u_partner_1', 'Vikram Shinde Fleet', '9900011122', 'TRANSPORTER', 'Hadapsar', 'Pune', 'Maharashtra', 'Kisan Express Logistics Hub, Pune'),
('u_admin_1', 'Ministry Governance Admin', '9000000000', 'ADMIN', '', 'New Delhi', 'Delhi', 'Dept of Consumer Affairs, Krishi Bhawan, New Delhi')
ON CONFLICT (id) DO NOTHING;

INSERT INTO fpo_groups (id, fpo_name, district, state, total_members, manager_user_id) VALUES
('fpo_nashik_1', 'Sahyadri Farmers Producer Co.', 'Nashik', 'Maharashtra', 142, 'u_fpo_1')
ON CONFLICT (id) DO NOTHING;

INSERT INTO product_listings (id, farmer_id, fpo_id, crop_name, category, quantity_available, unit, price_paise, mandi_retail_price_paise, grade, harvest_date, organic_certified, image_url, location, district, status) VALUES
('lst_101', 'u_farmer_1', 'fpo_nashik_1', 'Fresh Nashik Tomatoes', 'Vegetables', 450, 'kg', 2800, 4500, 'Grade A Premium', '2026-09-07', 1, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80', 'Pimplgaon Mandi Hub', 'Nashik', 'ACTIVE'),
('lst_102', 'u_farmer_1', 'fpo_nashik_1', 'Red Onions (Nashik Quality)', 'Vegetables', 1200, 'kg', 3500, 5200, 'Grade A', '2026-09-06', 0, 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&w=600&q=80', 'Lasalgaon Cold Storage', 'Nashik', 'ACTIVE')
ON CONFLICT (id) DO NOTHING;
