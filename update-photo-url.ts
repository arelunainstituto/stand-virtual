import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://bzkgjtxrzwzoibzesphi.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY || '');

async function updatePhotoUrl() {
  const carId = '671354cf-c4d3-4bff-bcc6-673bcacbd87d';
  const profilePhotoUrl = 'https://bzkgjtxrzwzoibzesphi.supabase.co/storage/v1/object/public/car-photos/671354cf-c4d3-4bff-bcc6-673bcacbd87d_profile_1762187932427_wp2srwz7h.webp';

  console.log(`🔄 Atualizando photo_url para foto de perfil...`);

  const { data, error } = await supabase
    .from('cars')
    .update({ photo_url: profilePhotoUrl })
    .eq('id', carId);

  if (error) {
    console.error('❌ Erro:', error);
  } else {
    console.log('✅ photo_url atualizado com sucesso!');
    console.log(`   Nova URL: ${profilePhotoUrl}`);
  }
}

updatePhotoUrl();
