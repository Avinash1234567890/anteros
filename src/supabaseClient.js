import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
	// Surface clear error in console for deployment debugging
	console.error('[Supabase] Missing environment variables', {
		hasUrl: !!supabaseUrl,
		hasKey: !!supabaseKey
	});
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '', {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: true
	}
});
