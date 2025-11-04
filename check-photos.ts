import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://bzkgjtxrzwzoibzesphi.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY || '');

async function main() {
  console.log('📸 Verificando fotos reais no banco...\n');

  // Buscar todos os carros disponíveis
  const { data: cars } = await supabase
    .from('cars')
    .select('id, brand, model, status, photo_url')
    .neq('status', 'vendido')
    .limit(3);

  console.log(`Encontrados ${cars?.length || 0} carros\n`);

  for (const car of cars || []) {
    console.log(`🚗 ${car.brand} ${car.model}`);
    console.log(`   ID: ${car.id}`);
    console.log(`   photo_url: ${car.photo_url}`);

    // Buscar fotos da car_photos
    const { data: photos } = await supabase
      .from('car_photos')
      .select('*')
      .eq('car_id', car.id);

    console.log(`   Fotos na car_photos: ${photos?.length || 0}`);
    photos?.forEach((p, i) => {
      console.log(`      ${i+1}. ${p.photo_url}`);
    });
    console.log('');
  }
}

main();
