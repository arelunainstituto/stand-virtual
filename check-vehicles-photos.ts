import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkVehiclesWithPhotos() {
  console.log('🔍 Verificando veículos com fotos no banco de dados...\n');

  const { data: allCars, error } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Erro ao buscar veículos:', error);
    return;
  }

  console.log(`📊 Total de veículos no banco: ${allCars?.length || 0}\n`);

  const carsWithPhotos = allCars?.filter(car => car.photo_url && car.photo_url.trim() !== '') || [];
  const carsWithoutPhotos = allCars?.filter(car => !car.photo_url || car.photo_url.trim() === '') || [];

  console.log(`✅ Veículos COM foto: ${carsWithPhotos.length}`);
  console.log(`❌ Veículos SEM foto: ${carsWithoutPhotos.length}\n`);

  console.log('═══════════════════════════════════════════════════════');
  console.log('VEÍCULOS COM FOTO:');
  console.log('═══════════════════════════════════════════════════════\n');

  carsWithPhotos.forEach((car, index) => {
    console.log(`${index + 1}. ${car.brand} ${car.model} (${car.year})`);
    console.log(`   Status: ${car.status}`);
    console.log(`   Foto: ${car.photo_url?.substring(0, 60)}...`);
    console.log('');
  });

  if (carsWithoutPhotos.length > 0) {
    console.log('═══════════════════════════════════════════════════════');
    console.log('VEÍCULOS SEM FOTO:');
    console.log('═══════════════════════════════════════════════════════\n');

    carsWithoutPhotos.forEach((car, index) => {
      console.log(`${index + 1}. ${car.brand} ${car.model} (${car.year})`);
      console.log(`   Status: ${car.status}`);
      console.log(`   Foto: (sem foto)`);
      console.log('');
    });
  }

  console.log('═══════════════════════════════════════════════════════');
  console.log('RESUMO POR STATUS:');
  console.log('═══════════════════════════════════════════════════════\n');

  const disponiveisComFoto = carsWithPhotos.filter(c => c.status === 'disponivel').length;
  const vendidosComFoto = carsWithPhotos.filter(c => c.status === 'vendido').length;
  const reservadosComFoto = carsWithPhotos.filter(c => c.status === 'reservado').length;

  console.log(`Disponíveis com foto: ${disponiveisComFoto}`);
  console.log(`Vendidos com foto: ${vendidosComFoto}`);
  console.log(`Reservados com foto: ${reservadosComFoto}`);
}

checkVehiclesWithPhotos();
