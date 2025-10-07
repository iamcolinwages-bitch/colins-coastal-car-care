-- Create media table for managing all site images
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  category TEXT CHECK (category IN ('portfolio', 'hero', 'gallery', 'testimonial', 'other')) DEFAULT 'other',
  alt_text TEXT,
  tags TEXT[], -- Array of tags for searching
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_media_category ON media(category);
CREATE INDEX idx_media_is_active ON media(is_active);
CREATE INDEX idx_media_display_order ON media(display_order);

-- Enable Row Level Security
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active media
CREATE POLICY "Anyone can view active media"
  ON media
  FOR SELECT
  USING (is_active = true);

-- Policy: Service role can do everything (for admin operations)
CREATE POLICY "Service role can manage media"
  ON media
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create storage bucket for media (run this in Supabase dashboard SQL editor if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);
