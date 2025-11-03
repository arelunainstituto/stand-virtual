import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzkgjtxrzwzoibzesphi.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugProfilePhotos() {
  console.log('🔍 Verificando fotos de perfil de todos os carros...\n');

  try {
    // Buscar todos os carros (exceto vendidos)
    const { data: cars, error: carsError } = await supabase
      .from('cars')
      .select('id, brand, model, photo_url, status')
      .neq('status', 'vendido')
      .order('created_at', { ascending: false });

    if (carsError) {
      console.error('❌ Erro ao buscar carros:', carsError);
      return;
    }

    console.log(`📊 Total de carros (não vendidos): ${cars?.length || 0}\n`);

    for (const car of cars || []) {
      console.log(`\n${'='.repeat(80)}`);
      console.log(`🚗 ${car.brand} ${car.model} (ID: ${car.id})`);
      console.log(`${'='.repeat(80)}`);

      // Verificar foto_url na tabela cars
      console.log('\n1️⃣ photo_url na tabela cars:');
      if (car.photo_url) {
        console.log(`   ✓ ${car.photo_url}`);
        if (car.photo_url.includes('_profile_')) {
          console.log('   ⭐ É uma foto de perfil!');
        } else if (car.photo_url.includes('_gallery_')) {
          console.log('   🖼️  É uma foto de galeria');
        }
      } else {
        console.log('   ✗ Sem photo_url definida');
      }

      // Buscar foto de perfil na car_photos
      const { data: profilePhoto, error: profileError } = await supabase
        .from('car_photos')
        .select('photo_url')
        .eq('car_id', car.id)
        .ilike('photo_url', '%_profile_%')
        .limit(1)
        .single();

      console.log('\n2️⃣ Foto de perfil na car_photos:');
      if (profilePhoto && !profileError) {
        console.log(`   ✓ ${profilePhoto.photo_url}`);
      } else {
        console.log('   ✗ Nenhuma foto de perfil encontrada');
        if (profileError) {
          console.log(`   Erro: ${profileError.message}`);
        }
      }

      // Buscar todas as fotos
      const { data: allPhotos, error: allError } = await supabase
        .from('car_photos')
        .select('photo_url')
        .eq('car_id', car.id);

      console.log('\n3️⃣ Todas as fotos na car_photos:');
      if (allPhotos && allPhotos.length > 0) {
        console.log(`   Total: ${allPhotos.length} fotos`);
        allPhotos.forEach((photo, i) => {
          const isProfile = photo.photo_url.includes('_profile_');
          const icon = isProfile ? '⭐' : '  ';
          console.log(`   ${icon} ${i + 1}. ${photo.photo_url}`);
        });
      } else {
        console.log('   ✗ Nenhuma foto na car_photos');
      }

      // Determinar qual foto deveria ser usada
      console.log('\n4️⃣ Foto que DEVERIA ser usada (segundo a lógica):');
      if (profilePhoto && !profileError) {
        console.log(`   🎯 FOTO DE PERFIL (da car_photos)`);
        console.log(`   ${profilePhoto.photo_url}`);
      } else if (car.photo_url) {
        console.log(`   🎯 PHOTO_URL (da tabela cars)`);
        console.log(`   ${car.photo_url}`);
      } else if (allPhotos && allPhotos.length > 0) {
        console.log(`   🎯 PRIMEIRA FOTO (da car_photos)`);
        console.log(`   ${allPhotos[0].photo_url}`);
      } else {
        console.log(`   ❌ SEM FOTO DISPONÍVEL`);
      }
    }

    console.log(`\n\n${'='.repeat(80)}`);
    console.log('🧪 Agora testando a API /api/vehicles...\n');

    // Testar a API
    const apiResponse = await fetch('http://localhost:5001/api/vehicles');
    const apiData = await apiResponse.json();

    if (apiData.success) {
      console.log(`✅ API retornou ${apiData.count} veículos\n`);

      for (const vehicle of apiData.vehicles) {
        const carData = cars?.find(c => c.id === vehicle.id);
        console.log(`\n🚗 ${vehicle.marca} ${vehicle.modelo}`);
        console.log(`   API retorna: ${vehicle.imagem}`);

        // Comparar com o esperado
        const { data: expectedProfile } = await supabase
          .from('car_photos')
          .select('photo_url')
          .eq('car_id', vehicle.id)
          .ilike('photo_url', '%_profile_%')
          .limit(1)
          .single();

        if (expectedProfile) {
          if (vehicle.imagem === expectedProfile.photo_url) {
            console.log('   ✅ CORRETO - Usando foto de perfil');
          } else {
            console.log('   ❌ INCORRETO - Deveria usar:');
            console.log(`      ${expectedProfile.photo_url}`);
          }
        } else if (carData?.photo_url) {
          if (vehicle.imagem === carData.photo_url) {
            console.log('   ✅ CORRETO - Usando photo_url da tabela cars');
          } else {
            console.log('   ❌ INCORRETO - Deveria usar:');
            console.log(`      ${carData.photo_url}`);
          }
        }
      }
    } else {
      console.error('❌ API retornou erro:', apiData.error);
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

debugProfilePhotos();
