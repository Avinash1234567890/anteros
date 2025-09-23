# Database Setup Instructions

## Setting up the Users Table in Supabase

1. Go to your Supabase dashboard: https://app.supabase.com
2. Navigate to your project
3. Go to the SQL Editor (in the left sidebar)
4. Copy and paste the contents of `database_setup.sql` into the SQL editor
5. Click "Run" to execute the SQL commands

## What this creates:

- **users table** with proper schema including:
  - `id` (primary key)
  - `user_id` (foreign key to auth.users)
  - `first_name`, `last_name`, `age`
  - `is_single`, `partner_name`, `relationship_duration`
  - `created_at`, `updated_at` timestamps

- **Row Level Security (RLS)** policies:
  - All users can view profiles
  - Users can only modify their own profile
  - Users can only insert/delete their own profile

- **Database triggers** for automatic timestamp updates

- **Indexes** for better query performance

## Verification

After running the SQL, you can verify the table was created by:
1. Going to the "Table Editor" in Supabase
2. You should see the "users" table listed
3. Click on it to see the column structure

## Environment Variables

Make sure your `.env.local` file contains:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```
