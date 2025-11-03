import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzkgjtxrzwzoibzesphi.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllPhotos() {
  console.log('📸 Verificando todas as fotos...\n');

  try {
    // Tentar buscar todas as fotos
    const { data: allPhotos, error: allError } = await supabase
      .from('car_photos')
      .select('*')
      .limit(10);

    if (allError) {
      console.error('❌ Erro ao buscar fotos:', allError);
      console.error('Detalhes:', JSON.stringify(allError, null, 2));
    } else {
      console.log(`✅ Encontradas ${allPhotos?.length || 0} fotos (primeiras 10):\n`);
      allPhotos?.forEach((photo, i) => {
        console.log(`${i + 1}. Car ID: ${photo.car_id}`);
        console.log(`   URL: ${photo.photo_url}`);
        console.log(`   Order: ${photo.display_order}, Primary: ${photo.is_primary}\n`);
      });
    }

    // Agrupar fotos por carro
    const { data: groupedPhotos, error: groupError } = await supabase
      .from('car_photos')
      .select('car_id, photo_url')
      .order('car_id')
      .order('display_order', { ascending: true });

    if (!groupError && groupedPhotos) {
      const carPhotosMap = new Map<string, string[]>();
      groupedPhotos.forEach(photo => {
        if (!carPhotosMap.has(photo.car_id)) {
          carPhotosMap.set(photo.car_id, []);
        }
        carPhotosMap.get(photo.car_id)?.push(photo.photo_url);
      });

      console.log('\n📊 Fotos por carro:');
      carPhotosMap.forEach((photos, carId) => {
        console.log(`\n  ${carId}: ${photos.length} fotos`);
      });
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

checkAllPhotos();
