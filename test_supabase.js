const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wqwtrzpxloplypvtjxbm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxd3RyenB4bG9wbHlwdnRqeGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjUyNjQsImV4cCI6MjA5Mjk0MTI2NH0.hsOZY-Jq50i_lT0oRztrL6K1O2WHPTvmRvubyHMNtTc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Fetching pending approvals...');
  try {
    const { data, error } = await supabase
      .from('pending_approvals')
      .select('*');

    if (error) {
      console.error('Supabase Error:', error.message);
    } else {
      console.log(`Found ${data.length} pending requests:`);
      data.forEach(p => {
        console.log(`- ${p.full_name} (${p.role}): ${p.phone_number}`);
      });
    }
  } catch (err) {
    console.error('Unexpected Error:', err.message);
  }
}

testConnection();
