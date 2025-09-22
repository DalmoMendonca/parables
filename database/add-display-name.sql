-- Add display_name column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Update existing users to have a display name based on their email
UPDATE users 
SET display_name = SPLIT_PART(email, '@', 1) 
WHERE display_name IS NULL;