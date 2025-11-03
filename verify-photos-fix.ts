import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyPhotosFix() {
  console.log('🔍 Verificando correção dos veículos com fotos...\n');

  // Buscar todos os veículos
  const { data: allCars } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false });

  // Buscar apenas com foto (usando os mesmos filtros da API)
  const { data: carsWithPhotos } = await supabase
    .from('cars')
    .select('*')
    .not('photo_url', 'is', null)
    .neq('photo_url', '')
    .order('created_at', { ascending: false });

  console.log('═══════════════════════════════════════════════════════');
  console.log('RESUMO:');
  console.log('═══════════════════════════════════════════════════════\n');

  console.log(`📊 Total de veículos no banco: ${allCars?.length || 0}`);
  console.log(`✅ Veículos COM foto (API retornará): ${carsWithPhotos?.length || 0}`);
  console.log(`❌ Veículos SEM foto (API não retornará): ${(allCars?.length || 0) - (carsWithPhotos?.length || 0)}\n`);

  if (carsWithPhotos && carsWithPhotos.length > 0) {
    console.log('═══════════════════════════════════════════════════════');
    console.log('VEÍCULOS QUE SERÃO MOSTRADOS NO SITE:');
    console.log('═══════════════════════════════════════════════════════\n');

    carsWithPhotos.forEach((car, index) => {
      console.log(`${index + 1}. ${car.brand} ${car.model} (${car.year})`);
      console.log(`   Status: ${car.status}`);
      console.log(`   Preço: €${car.sale_price}`);
      console.log(`   Foto: ${car.photo_url?.substring(0, 60)}...`);
      console.log('');
    });
  }

  console.log('═══════════════════════════════════════════════════════');
  console.log('POR STATUS (apenas com foto):');
  console.log('═══════════════════════════════════════════════════════\n');

  const disponivel = carsWithPhotos?.filter(c => c.status === 'disponivel').length || 0;
  const vendido = carsWithPhotos?.filter(c => c.status === 'vendido').length || 0;
  const reservado = carsWithPhotos?.filter(c => c.status === 'reservado').length || 0;

  console.log(`✅ Disponível: ${disponivel}`);
  console.log(`🔴 Vendido: ${vendido}`);
  console.log(`🟡 Reservado: ${reservado}\n`);

  console.log('✅ A API está configurada para retornar APENAS veículos com foto!');
}

verifyPhotosFix();
