import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzkgjtxrzwzoibzesphi.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkOpelPhotos() {
  console.log('🔍 Verificando fotos do OPEL INSIGNIA...\n');

  try {
    // ID do OPEL
    const opelId = 'e27d74b5-f7c9-4e59-b657-f35739ef7717';

    // Buscar todas as fotos do OPEL
    const { data: allPhotos, error: allError } = await supabase
      .from('car_photos')
      .select('*')
      .eq('car_id', opelId);

    if (allError) {
      console.error('❌ Erro:', allError);
      return;
    }

    console.log(`📸 Total de fotos do OPEL: ${allPhotos?.length || 0}\n`);

    if (allPhotos && allPhotos.length > 0) {
      allPhotos.forEach((photo, i) => {
        console.log(`${i + 1}. ${photo.photo_url}`);
        console.log(`   Nome: ${photo.photo_name}`);

        if (photo.photo_url.includes('_profile_')) {
          console.log('   ⭐ FOTO DE PERFIL');
        } else if (photo.photo_url.includes('_gallery_')) {
          console.log('   🖼️  Foto de galeria');
        }
        console.log();
      });
    }

    // Testar a query que está sendo usada na API
    console.log('🧪 Testando query da API (buscar foto de perfil)...\n');
    const { data: profilePhoto, error: profileError } = await supabase
      .from('car_photos')
      .select('photo_url')
      .eq('car_id', opelId)
      .ilike('photo_url', '%_profile_%')
      .limit(1)
      .single();

    if (profilePhoto && !profileError) {
      console.log('✅ Foto de perfil encontrada pela API:');
      console.log(`   ${profilePhoto.photo_url}`);
    } else {
      console.log('⚠️  Nenhuma foto de perfil encontrada pela API');
      console.log('   Erro:', profileError?.message);

      // Buscar primeira foto disponível (fallback)
      const { data: firstPhoto } = await supabase
        .from('car_photos')
        .select('photo_url')
        .eq('car_id', opelId)
        .limit(1);

      if (firstPhoto && firstPhoto.length > 0) {
        console.log('\n📌 Primeira foto (fallback usado pela API):');
        console.log(`   ${firstPhoto[0].photo_url}`);
      }
    }

    // Verificar foto na tabela cars
    const { data: car } = await supabase
      .from('cars')
      .select('photo_url')
      .eq('id', opelId)
      .single();

    if (car && car.photo_url) {
      console.log('\n🚗 Foto na tabela cars:');
      console.log(`   ${car.photo_url}`);
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

checkOpelPhotos();
