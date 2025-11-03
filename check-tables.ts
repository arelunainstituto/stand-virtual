import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function checkTables() {
  console.log('🔍 Verificando tabelas no Supabase...\n');

  // Query para listar todas as tabelas no schema public
  const { data, error } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
    .eq('table_type', 'BASE TABLE');

  if (error) {
    console.error('❌ Erro ao buscar tabelas:', error);

    // Tentar uma abordagem alternativa usando RPC
    console.log('\n🔄 Tentando abordagem alternativa...\n');

    // Tentar acessar algumas tabelas comuns
    const possibleTables = [
      'vehicles', 'veiculos', 'carros', 'cars',
      'viaturas', 'autos', 'produtos', 'products',
      'items', 'inventory', 'stock'
    ];

    console.log('Testando nomes de tabelas possíveis:\n');

    for (const tableName of possibleTables) {
      try {
        const { error: tableError } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);

        if (!tableError) {
          console.log(`✅ Tabela encontrada: ${tableName}`);

          // Tentar obter contagem de registros
          const { count } = await supabase
            .from(tableName)
            .select('*', { count: 'exact', head: true });

          console.log(`   └─ Registros: ${count || 0}`);

          // Tentar obter estrutura (primeiras linhas)
          const { data: sample } = await supabase
            .from(tableName)
            .select('*')
            .limit(1);

          if (sample && sample.length > 0) {
            console.log(`   └─ Colunas: ${Object.keys(sample[0]).join(', ')}\n`);
          }
        }
      } catch (err) {
        // Ignorar erros de tabelas que não existem
      }
    }

    return;
  }

  if (data && data.length > 0) {
    console.log('📋 Tabelas encontradas no schema public:\n');
    data.forEach((table: any) => {
      console.log(`  - ${table.table_name}`);
    });
    console.log(`\n✅ Total: ${data.length} tabelas`);
  } else {
    console.log('⚠️  Nenhuma tabela encontrada no schema public');
  }
}

checkTables()
  .then(() => {
    console.log('\n✅ Verificação concluída!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Erro:', err);
    process.exit(1);
  });
