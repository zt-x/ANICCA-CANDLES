window.netlify = {
  env: {
    SUPABASE_URL: '{{ env.SUPABASE_URL }}',
    SUPABASE_ANON_KEY: '{{ env.SUPABASE_ANON_KEY }}'
  }
};