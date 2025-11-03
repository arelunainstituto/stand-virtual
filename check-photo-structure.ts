import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzkgjtxrzwzoibzesphi.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPhotoStructure() {
  console.log('🔍 Verificando estrutura da tabela car_photos...\n');

  try {
    // Buscar uma foto de exemplo e ver todos os campos
    const { data: photos, error } = await supabase
      .from('car_photos')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Erro:', error);
    } else if (photos && photos.length > 0) {
      console.log('✅ Estrutura de uma foto:');
      console.log(JSON.stringify(photos[0], null, 2));
      console.log('\n📋 Campos disponíveis:', Object.keys(photos[0]));
    }

    // Buscar todas as fotos que contém "profile" no nome
    const { data: profilePhotos, error: profileError } = await supabase
      .from('car_photos')
      .select('*')
      .ilike('photo_url', '%profile%');

    if (!profileError && profilePhotos) {
      console.log(`\n📸 Fotos com "profile" no nome: ${profilePhotos.length}`);
      profilePhotos.slice(0, 3).forEach(photo => {
        console.log(`\n  Car ID: ${photo.car_id}`);
        console.log(`  URL: ${photo.photo_url}`);
        console.log(`  Campos:`, Object.keys(photo));
      });
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

checkPhotoStructure();
