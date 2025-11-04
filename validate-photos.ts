import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://bzkgjtxrzwzoibzesphi.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY || '');

async function validatePhotos(carId: string) {
  console.log(`🔍 Validando fotos do carro ${carId}...\n`);

  // Buscar todas as fotos
  const { data: photos, error } = await supabase
    .from('car_photos')
    .select('id, photo_url, photo_name')
    .eq('car_id', carId);

  if (error) {
    console.error('❌ Erro ao buscar fotos:', error);
    return;
  }

  console.log(`📊 Total de fotos no banco: ${photos?.length || 0}\n`);

  const validPhotos: string[] = [];
  const invalidPhotos: { id: string; url: string; name: string }[] = [];

  for (const photo of photos || []) {
    try {
      // Testar se a URL é acessível
      const response = await fetch(photo.photo_url, { method: 'HEAD' });

      if (response.ok) {
        console.log(`✅ ${photo.photo_name}`);
        validPhotos.push(photo.photo_url);
      } else {
        console.log(`❌ ${photo.photo_name} - Status: ${response.status}`);
        invalidPhotos.push({ id: photo.id, url: photo.photo_url, name: photo.photo_name });
      }
    } catch (err) {
      console.log(`❌ ${photo.photo_name} - Erro: ${err}`);
      invalidPhotos.push({ id: photo.id, url: photo.photo_url, name: photo.photo_name });
    }
  }

  console.log(`\n📈 Resumo:`);
  console.log(`   Válidas: ${validPhotos.length}`);
  console.log(`   Inválidas: ${invalidPhotos.length}`);

  if (invalidPhotos.length > 0) {
    console.log(`\n❌ Fotos inválidas:`);
    invalidPhotos.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.name} (ID: ${p.id})`);
    });

    console.log(`\n💡 Para remover fotos inválidas, execute:`);
    console.log(`   DELETE FROM car_photos WHERE id IN ('${invalidPhotos.map(p => p.id).join("', '")}');`);
  }
}

// Pegar ID do carro da linha de comando
const carId = process.argv[2] || '671354cf-c4d3-4bff-bcc6-673bcacbd87d';
validatePhotos(carId);
