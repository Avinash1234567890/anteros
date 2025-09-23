-- Debug query to see what's in the database
SELECT 
  email,
  first_name,
  last_name,
  is_single,
  pg_typeof(is_single) as is_single_type,
  partner_name,
  created_at
FROM users 
ORDER BY created_at DESC;
