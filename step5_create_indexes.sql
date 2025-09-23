-- Step 5: Create indexes for performance (run after step 4)
CREATE INDEX idx_users_user_id ON users(user_id);
CREATE INDEX idx_users_created_at ON users(created_at);
