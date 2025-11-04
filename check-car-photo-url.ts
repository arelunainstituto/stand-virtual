import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://bzkgjtxrzwzoibzesphi.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY || '');

async function checkPhotoUrl() {
  const { data, error } = await supabase
    .from('cars')
    .select('id, brand, model, photo_url')
    .eq('id', '671354cf-c4d3-4bff-bcc6-673bcacbd87d')
    .single();

  if (error) {
    console.error('Erro:', error);
  } else {
    console.log(`Carro: ${data.brand} ${data.model}`);
    console.log(`photo_url: ${data.photo_url || 'null'}`);
    if (data.photo_url) {
      console.log(`   ...${data.photo_url.slice(-60)}`);
    }
  }
}

checkPhotoUrl();
