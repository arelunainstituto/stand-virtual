import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzkgjtxrzwzoibzesphi.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyDatabase() {
  console.log('🔍 Verificando dados do banco...\n');

  try {
    // Buscar todos os carros
    const { data: cars, error: carsError } = await supabase
      .from('cars')
      .select('id, brand, model, photo_url')
      .order('created_at', { ascending: false });

    if (carsError) {
      console.error('❌ Erro ao buscar carros:', carsError);
      return;
    }

    console.log(`📊 Total de carros na tabela cars: ${cars?.length || 0}\n`);

    if (cars && cars.length > 0) {
      console.log('🚗 Carros encontrados:');
      for (const car of cars) {
        console.log(`\n  - ${car.brand} ${car.model} (${car.id})`);
        console.log(`    Photo URL: ${car.photo_url || 'SEM FOTO'}`);

        // Verificar se tem fotos na tabela car_photos
        const { data: photos, error: photosError } = await supabase
          .from('car_photos')
          .select('photo_url, display_order')
          .eq('car_id', car.id)
          .order('display_order', { ascending: true });

        if (photosError) {
          if (photosError.message.includes('does not exist')) {
            console.log('    ⚠️  Tabela car_photos não existe');
          } else {
            console.log(`    ❌ Erro ao buscar fotos: ${photosError.message}`);
          }
        } else if (photos && photos.length > 0) {
          console.log(`    ✅ ${photos.length} fotos na tabela car_photos:`);
          photos.forEach((p, i) => {
            console.log(`       ${i + 1}. ${p.photo_url}`);
          });
        } else {
          console.log('    ℹ️  Nenhuma foto na tabela car_photos');
        }
      }
    } else {
      console.log('⚠️  Nenhum carro encontrado');
    }

    // Verificar total de fotos
    const { count, error: countError } = await supabase
      .from('car_photos')
      .select('*', { count: 'exact', head: true });

    if (!countError) {
      console.log(`\n📸 Total de fotos na tabela car_photos: ${count || 0}`);
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

verifyDatabase();
