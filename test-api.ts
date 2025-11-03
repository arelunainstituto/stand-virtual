import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzkgjtxrzwzoibzesphi.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAPI() {
  console.log('🧪 Testando API de veículos...\n');

  try {
    // Buscar um carro específico que tem fotos
    const carId = 'b93adb28-6458-4cb8-bb2c-15397c22df53'; // NISSAN QASHQAI

    // Buscar fotos do veículo
    const { data: photos, error: photosError } = await supabase
      .from('car_photos')
      .select('photo_url')
      .eq('car_id', carId);

    if (photosError) {
      console.error('❌ Erro ao buscar fotos:', photosError);
    } else {
      console.log(`✅ Fotos encontradas para ${carId}:`);
      console.log(`   Total: ${photos?.length || 0}`);
      photos?.forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.photo_url}`);
      });
    }

    // Testar API local
    console.log('\n📡 Testando endpoint /api/vehicles...');
    const response = await fetch('http://localhost:5001/api/vehicles');
    const data = await response.json();

    if (data.success) {
      console.log(`✅ API funcionando! ${data.count} veículos encontrados`);

      // Verificar o NISSAN QASHQAI
      const nissan = data.vehicles.find((v: any) => v.id === carId);
      if (nissan) {
        console.log('\n🚗 NISSAN QASHQAI:');
        console.log('   Imagem principal:', nissan.imagem || 'SEM FOTO');
      }
    } else {
      console.error('❌ API retornou erro:', data.error);
    }

    // Testar API de detalhes
    console.log('\n📡 Testando endpoint /api/vehicles/[id]...');
    const detailsResponse = await fetch(`http://localhost:5001/api/vehicles/${carId}`);
    const detailsData = await detailsResponse.json();

    if (detailsData.success) {
      console.log('✅ API de detalhes funcionando!');
      console.log('   Galeria:', detailsData.vehicle.galeria?.length || 0, 'fotos');
      detailsData.vehicle.galeria?.forEach((url: string, i: number) => {
        console.log(`   ${i + 1}. ${url}`);
      });
    } else {
      console.error('❌ API de detalhes retornou erro:', detailsData.error);
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

testAPI();
