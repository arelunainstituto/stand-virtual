import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('🔍 Verificando tabelas disponíveis no Supabase...\n');
  console.log('URL:', supabaseUrl);
  console.log('');

  // Tentar buscar da tabela cars
  console.log('📋 Tentando acessar tabela "cars":');
  const { data: cars, error: carsError } = await supabase
    .from('cars')
    .select('*')
    .limit(5);

  if (carsError) {
    console.log('❌ Erro ao acessar tabela cars:', carsError.message);
  } else {
    console.log(`✅ Tabela cars acessível. Registros encontrados: ${cars?.length || 0}`);
    if (cars && cars.length > 0) {
      console.log('   Primeiro registro:', JSON.stringify(cars[0], null, 2));
    }
  }

  console.log('');

  // Tentar buscar da tabela vehicles (caso exista)
  console.log('📋 Tentando acessar tabela "vehicles":');
  const { data: vehicles, error: vehiclesError } = await supabase
    .from('vehicles')
    .select('*')
    .limit(5);

  if (vehiclesError) {
    console.log('❌ Erro ao acessar tabela vehicles:', vehiclesError.message);
  } else {
    console.log(`✅ Tabela vehicles acessível. Registros encontrados: ${vehicles?.length || 0}`);
    if (vehicles && vehicles.length > 0) {
      console.log('   Primeiro registro:', JSON.stringify(vehicles[0], null, 2));
    }
  }

  console.log('');

  // Tentar buscar da tabela viaturas (caso exista)
  console.log('📋 Tentando acessar tabela "viaturas":');
  const { data: viaturas, error: viaturasError } = await supabase
    .from('viaturas')
    .select('*')
    .limit(5);

  if (viaturasError) {
    console.log('❌ Erro ao acessar tabela viaturas:', viaturasError.message);
  } else {
    console.log(`✅ Tabela viaturas acessível. Registros encontrados: ${viaturas?.length || 0}`);
    if (viaturas && viaturas.length > 0) {
      console.log('   Primeiro registro:', JSON.stringify(viaturas[0], null, 2));
    }
  }
}

checkTables();
