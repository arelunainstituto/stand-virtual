import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://bzkgjtxrzwzoibzesphi.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY || '');

async function updateAllPhotoUrls() {
  console.log('🔄 Atualizando photo_url para todos os carros...\n');

  // Buscar todos os carros
  const { data: cars, error: carsError } = await supabase
    .from('cars')
    .select('id, brand, model, photo_url')
    .neq('status', 'vendido');

  if (carsError) {
    console.error('❌ Erro ao buscar carros:', carsError);
    return;
  }

  console.log(`📊 Total de carros: ${cars?.length || 0}\n`);

  let updated = 0;
  let skipped = 0;

  for (const car of cars || []) {
    // Buscar foto de perfil na car_photos
    const { data: profilePhoto } = await supabase
      .from('car_photos')
      .select('photo_url')
      .eq('car_id', car.id)
      .ilike('photo_url', '%_profile_%')
      .limit(1)
      .single();

    if (profilePhoto && profilePhoto.photo_url !== car.photo_url) {
      // Atualizar se encontrou foto de perfil diferente
      const { error: updateError } = await supabase
        .from('cars')
        .update({ photo_url: profilePhoto.photo_url })
        .eq('id', car.id);

      if (updateError) {
        console.log(`❌ ${car.brand} ${car.model} - Erro: ${updateError.message}`);
      } else {
        console.log(`✅ ${car.brand} ${car.model} - Atualizado para foto de perfil`);
        updated++;
      }
    } else {
      console.log(`⏭️  ${car.brand} ${car.model} - Já está correto ou sem foto de perfil`);
      skipped++;
    }
  }

  console.log(`\n📈 Resumo:`);
  console.log(`   Atualizados: ${updated}`);
  console.log(`   Não alterados: ${skipped}`);
}

updateAllPhotoUrls();
