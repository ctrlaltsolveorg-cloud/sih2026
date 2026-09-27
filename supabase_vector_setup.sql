-- ========================================================
-- KISANBANDHAN: SUPABASE PGVECTOR & SEMANTIC SEARCH SETUP
-- Run this script in Supabase Dashboard -> SQL Editor -> Run
-- ========================================================

-- 1. Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create Crop Vector Embeddings Table
CREATE TABLE IF NOT EXISTS crop_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id TEXT REFERENCES product_listings(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  category TEXT,
  grade TEXT,
  district TEXT,
  state TEXT,
  price_paise INTEGER,
  farmer_id TEXT,
  content_text TEXT,
  embedding vector(384), -- 384-dimensional dense vector
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create HNSW Index for ultra-fast Cosine Similarity Search (<5ms)
CREATE INDEX IF NOT EXISTS crop_embeddings_hnsw_idx 
ON crop_embeddings 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 4. Enable Row Level Security (RLS) & Public Read Access
ALTER TABLE crop_embeddings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on crop_embeddings" 
ON crop_embeddings FOR SELECT USING (true);

CREATE POLICY "Allow service_role full access on crop_embeddings" 
ON crop_embeddings FOR ALL USING (true);

-- 5. Semantic Search Function (RPC) for Supabase SDK
CREATE OR REPLACE FUNCTION match_crops(
  query_embedding vector(384),
  match_threshold float DEFAULT 0.3,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  listing_id TEXT,
  crop_name TEXT,
  category TEXT,
  grade TEXT,
  district TEXT,
  state TEXT,
  price_paise INTEGER,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ce.id,
    ce.listing_id,
    ce.crop_name,
    ce.category,
    ce.grade,
    ce.district,
    ce.state,
    ce.price_paise,
    1 - (ce.embedding <=> query_embedding) AS similarity
  FROM crop_embeddings ce
  WHERE 1 - (ce.embedding <=> query_embedding) > match_threshold
  ORDER BY ce.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
