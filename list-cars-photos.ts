import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzkgjtxrzwzoibzesphi.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function listCarsPhotos() {
  console.log('📋 Listando fotos de todos os carros...\n');

  try {
    // Buscar todos os carros
    const { data: cars, error: carsError } = await supabase
      .from('cars')
      .select('id, brand, model')
      .order('created_at', { ascending: false });

    if (carsError || !cars) {
      console.error('❌ Erro:', carsError);
      return;
    }

    for (const car of cars) {
      console.log(`\n🚗 ${car.brand} ${car.model}`);

      // Buscar foto de perfil
      const { data: profilePhoto, error: profileError } = await supabase
        .from('car_photos')
        .select('photo_url')
        .eq('car_id', car.id)
        .ilike('photo_url', '%_profile_%')
        .limit(1);

      // Buscar todas as fotos
      const { data: allPhotos, error: allError } = await supabase
        .from('car_photos')
        .select('photo_url')
        .eq('car_id', car.id);

      if (profilePhoto && profilePhoto.length > 0 && !profileError) {
        console.log(`   ✅ Tem foto de perfil`);
      } else {
        console.log(`   ⚠️  Sem foto de perfil`);
      }

      if (allPhotos && allPhotos.length > 0 && !allError) {
        console.log(`   📸 Total de fotos: ${allPhotos.length}`);
        const galleryCount = allPhotos.filter(p => p.photo_url.includes('_gallery_')).length;
        console.log(`      - Galeria: ${galleryCount}`);
      } else {
        console.log(`   📸 Sem fotos na tabela car_photos`);
      }
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

listCarsPhotos();
