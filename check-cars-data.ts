import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function checkCarsData() {
  console.log('🚗 Buscando dados da tabela cars...\n');

  
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .limit(3);

  if (error) {
    console.error('❌ Erro:', error);
    return;
  }

  if (data && data.length > 0) {
    console.log('✅ Dados encontrados:\n');
    console.log(JSON.stringify(data, null, 2));
  } else {
    console.log('⚠️  Nenhum registro encontrado');
  }
}

checkCarsData()
  .then(() => {
    console.log('\n✅ Consulta concluída!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Erro:', err);
    process.exit(1);
  });
