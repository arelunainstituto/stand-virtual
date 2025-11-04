import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://bzkgjtxrzwzoibzesphi.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY || '');

async function countPhotos() {
  const { data, error } = await supabase
    .from('car_photos')
    .select('id, photo_name')
    .eq('car_id', '671354cf-c4d3-4bff-bcc6-673bcacbd87d');

  if (error) {
    console.error('Erro:', error);
  } else {
    console.log(`Total de fotos no banco: ${data.length}`);
  }
}

countPhotos();
