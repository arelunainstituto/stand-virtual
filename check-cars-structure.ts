import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzkgjtxrzwzoibzesphi.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCarsStructure() {
  console.log('🔍 Verificando estrutura da tabela cars...\n');

  // Buscar um carro de exemplo
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Erro:', error);
    return;
  }

  if (data && data.length > 0) {
    console.log('✅ Estrutura da tabela cars:');
    console.log(JSON.stringify(data[0], null, 2));
    console.log('\nCampos disponíveis:', Object.keys(data[0]));
  } else {
    console.log('⚠️  Nenhum carro encontrado na tabela');
  }

  // Verificar todos os carros
  const { data: allCars, error: allError } = await supabase
    .from('cars')
    .select('id, brand, model, photo_url');

  if (!allError && allCars) {
    console.log(`\n📊 Total de carros: ${allCars.length}`);
    console.log('Carros sem foto:', allCars.filter(car => !car.photo_url).length);
    console.log('Carros com foto:', allCars.filter(car => car.photo_url).length);
  }
}

checkCarsStructure();
