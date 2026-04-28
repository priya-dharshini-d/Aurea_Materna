import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wqwtrzpxloplypvtjxbm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxd3RyenB4bG9wbHlwdnRqeGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjUyNjQsImV4cCI6MjA5Mjk0MTI2NH0.hsOZY-Jq50i_lT0oRztrL6K1O2WHPTvmRvubyHMNtTc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
