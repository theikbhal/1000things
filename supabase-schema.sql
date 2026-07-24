-- Run this in your Supabase SQL editor
-- Creates the tables for the 1000 Things app

CREATE TABLE IF NOT EXISTS grids (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'My 1000 Things',
  rows INTEGER NOT NULL DEFAULT 25,
  cols INTEGER NOT NULL DEFAULT 40,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE grids ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own grids"
  ON grids FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS things (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  grid_id UUID REFERENCES grids(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  row_idx INTEGER NOT NULL,
  col_idx INTEGER NOT NULL,
  type TEXT NOT NULL DEFAULT 'text',
  value TEXT DEFAULT '',
  label TEXT,
  checked BOOLEAN DEFAULT false,
  count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(grid_id, row_idx, col_idx)
);

ALTER TABLE things ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own things"
  ON things FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_things_grid ON things(grid_id);
CREATE INDEX idx_things_user ON things(user_id);
