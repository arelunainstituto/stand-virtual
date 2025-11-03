import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzkgjtxrzwzoibzesphi.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6a2dqdHhyend6b2liemVzcGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MjM0MDgsImV4cCI6MjA3NDI5OTQwOH0.6SUGAzZK6-8R4uJj_VDAXdz3log6Zux8mqaDiGdDZp0';

async function testSupabaseAPI() {
  console.log('🧪 Testando Supabase API...\n');

  // Teste com service role
  const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
  const { data: serviceData, error: serviceError } = await supabaseService
    .from('cars')
    .select('*')
    .eq('id', 'e27d74b5-f7c9-4e59-b657-f35739ef7717')
    .single();

  console.log('📋 Com SERVICE ROLE:');
  console.log('  photo_url:', serviceData?.photo_url);
  console.log('  Erro:', serviceError);

  // Teste com anon key (como a API usa)
  const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
  const { data: anonData, error: anonError } = await supabaseAnon
    .from('cars')
    .select('*')
    .eq('id', 'e27d74b5-f7c9-4e59-b657-f35739ef7717')
    .single();

  console.log('\n📋 Com ANON KEY:');
  console.log('  photo_url:', anonData?.photo_url);
  console.log('  Erro:', anonError);
}

testSupabaseAPI();
