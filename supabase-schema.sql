-- Create advice_pins table
CREATE TABLE IF NOT EXISTS advice_pins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_query TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    style_type TEXT NOT NULL CHECK (style_type IN ('square', 'tall', 'quote')),
    color_scheme TEXT NOT NULL,
    background_image TEXT
);

-- Add RLS policies
ALTER TABLE advice_pins ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read pins (for demo purposes)
CREATE POLICY "Allow public read access" ON advice_pins
    FOR SELECT USING (true);

-- Allow anyone to insert pins (for demo purposes)
CREATE POLICY "Allow public insert access" ON advice_pins
    FOR INSERT WITH CHECK (true);