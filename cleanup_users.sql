-- Clean up duplicate users (run this if you have duplicate email issues)

-- First, let's see what data exists
SELECT email, COUNT(*) as count 
FROM users 
GROUP BY email 
HAVING COUNT(*) > 1;

-- If you want to delete all users and start fresh (USE WITH CAUTION!)
-- DELETE FROM users;

-- Or if you want to delete duplicates, keeping only the most recent:
DELETE FROM users 
WHERE id NOT IN (
  SELECT MAX(id) 
  FROM users 
  GROUP BY email
);

-- Check the remaining users
SELECT * FROM users ORDER BY created_at DESC;
