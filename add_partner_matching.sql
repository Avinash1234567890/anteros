-- Add partner_email column to users table
ALTER TABLE users ADD COLUMN partner_email VARCHAR(255);

-- Create index for better performance on partner matching queries
CREATE INDEX IF NOT EXISTS idx_users_partner_email ON users(partner_email);

-- Function to check if a couple is mutually matched
CREATE OR REPLACE FUNCTION check_mutual_couple(user_email TEXT, partner_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if both users have each other as partners
  RETURN EXISTS (
    SELECT 1 FROM users 
    WHERE email = user_email 
    AND partner_email = partner_email
    AND NOT is_single
  ) AND EXISTS (
    SELECT 1 FROM users 
    WHERE email = partner_email 
    AND partner_email = user_email
    AND NOT is_single
  );
END;
$$ LANGUAGE plpgsql;

-- View to get all mutually matched couples
CREATE OR REPLACE VIEW mutual_couples AS
SELECT DISTINCT
  LEAST(u1.email, u2.email) as person1_email,
  GREATEST(u1.email, u2.email) as person2_email,
  u1.first_name || ' ' || u1.last_name as person1_name,
  u2.first_name || ' ' || u2.last_name as person2_name,
  u1.relationship_duration
FROM users u1
JOIN users u2 ON u1.partner_email = u2.email
WHERE u1.partner_email = u2.email 
  AND u2.partner_email = u1.email
  AND u1.is_single = false 
  AND u2.is_single = false
  AND u1.email < u2.email; -- Avoid duplicates
