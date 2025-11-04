import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzkgjtxrzwzoibzesphi.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugSchema() {
  console.log('🔍 Verificando estrutura do banco de dados...\n');

  try {
    // Buscar um carro para ver quais campos existem
    const { data: cars, error: carsError } = await supabase
      .from('cars')
      .select('*')
      .limit(1);

    if (carsError) {
      console.error('❌ Erro ao buscar carros:', carsError);
      return;
    }

    if (cars && cars.length > 0) {
      const car = cars[0];
      console.log('📋 Campos da tabela cars:\n');
      Object.keys(car).forEach((key) => {
        const value = car[key];
        const type = Array.isArray(value) ? 'array' : typeof value;
        console.log(`   - ${key}: ${type}`);
        if (value && type === 'object' && !Array.isArray(value)) {
          console.log(`     Conteúdo: ${JSON.stringify(value, null, 2)}`);
        } else if (Array.isArray(value)) {
          console.log(`     Conteúdo (${value.length} itens): ${JSON.stringify(value.slice(0, 3))}`);
        }
      });
    }

    console.log('\n\n📋 Campos da tabela car_photos:\n');
    const { data: photos, error: photosError } = await supabase
      .from('car_photos')
      .select('*')
      .limit(1);

    if (photosError) {
      console.error('❌ Erro ao buscar car_photos:', photosError);
    } else if (photos && photos.length > 0) {
      const photo = photos[0];
      Object.keys(photo).forEach((key) => {
        const value = photo[key];
        const type = Array.isArray(value) ? 'array' : typeof value;
        console.log(`   - ${key}: ${type}`);
      });
    } else {
      console.log('   Nenhuma foto encontrada');
    }

  } catch (error: any) {
    console.error('❌ Erro:', error.message);
  }
}

debugSchema();
