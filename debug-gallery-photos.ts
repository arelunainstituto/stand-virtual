import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzkgjtxrzwzoibzesphi.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugGalleryPhotos(vehicleId?: string) {
  console.log('🔍 Analisando fotos de galeria dos carros...\n');

  try {
    // Se um ID foi fornecido, buscar apenas esse carro, senão buscar todos
    let query = supabase
      .from('cars')
      .select('id, brand, model, photo_url, gallery, status');

    if (vehicleId) {
      query = query.eq('id', vehicleId);
    } else {
      query = query.neq('status', 'vendido').limit(5); // Limitar a 5 carros se não especificado
    }

    const { data: cars, error: carsError } = await query;

    if (carsError) {
      console.error('❌ Erro ao buscar carros:', carsError);
      return;
    }

    if (!cars || cars.length === 0) {
      console.log('❌ Nenhum carro encontrado');
      return;
    }

    console.log(`📊 Analisando ${cars.length} carro(s)\n`);

    for (const car of cars) {
      console.log(`\n${'='.repeat(100)}`);
      console.log(`🚗 ${car.brand} ${car.model} (ID: ${car.id})`);
      console.log(`Status: ${car.status}`);
      console.log(`${'='.repeat(100)}`);

      // 1. Verificar foto_url
      console.log('\n1️⃣ photo_url (tabela cars):');
      if (car.photo_url) {
        console.log(`   ✓ ${car.photo_url}`);
      } else {
        console.log('   ✗ Vazio/null');
      }

      // 2. Verificar campo gallery
      console.log('\n2️⃣ Campo gallery (tabela cars - JSONB):');
      if (car.gallery && Array.isArray(car.gallery) && car.gallery.length > 0) {
        console.log(`   ✓ ${car.gallery.length} foto(s) encontrada(s):`);
        car.gallery.forEach((url, i) => {
          console.log(`      ${i + 1}. ${url}`);
        });
      } else if (car.gallery) {
        console.log(`   ⚠️ Existe mas não é array válido: ${JSON.stringify(car.gallery)}`);
      } else {
        console.log('   ✗ Vazio/null');
      }

      // 3. Buscar fotos na tabela car_photos
      const { data: photos, error: photosError } = await supabase
        .from('car_photos')
        .select('photo_url, display_order, is_primary, created_at')
        .eq('car_id', car.id)
        .order('is_primary', { ascending: false })
        .order('display_order', { ascending: true });

      console.log('\n3️⃣ Tabela car_photos:');
      if (photosError) {
        console.log(`   ❌ Erro: ${photosError.message}`);
      } else if (photos && photos.length > 0) {
        console.log(`   ✓ ${photos.length} foto(s) encontrada(s):`);
        photos.forEach((photo, i) => {
          const isPrimary = photo.is_primary ? '⭐' : '  ';
          const order = photo.display_order !== null ? photo.display_order : 'N/A';
          console.log(`      ${isPrimary} ${i + 1}. [Ordem: ${order}] ${photo.photo_url}`);
        });
      } else {
        console.log('   ✗ Nenhuma foto encontrada');
      }

      // 4. Simular o que a API retorna
      console.log('\n4️⃣ Fotos que a API retornaria (simulação):');

      const sortedFromPhotos = (photos && photos.length > 0)
        ? photos.map((p) => p.photo_url)
        : [];

      const galleryFromCar = Array.isArray(car.gallery)
        ? (car.gallery as string[]).filter(Boolean)
        : [];

      const fallbackPhoto = car.photo_url ? [car.photo_url] : [];

      console.log(`   - De car_photos: ${sortedFromPhotos.length} foto(s)`);
      console.log(`   - De gallery (JSONB): ${galleryFromCar.length} foto(s)`);
      console.log(`   - De photo_url (fallback): ${fallbackPhoto.length} foto(s)`);

      const combined = [...sortedFromPhotos, ...galleryFromCar, ...fallbackPhoto];
      const deduped = combined.filter((url, idx) => combined.indexOf(url) === idx);

      console.log(`\n   ✓ Total após deduplicação: ${deduped.length} foto(s)`);
      if (deduped.length > 0) {
        console.log(`   - Foto de capa (imagem): ${deduped[0]}`);
        if (deduped.length > 1) {
          console.log(`   - Miniaturas (${deduped.length - 1}):`);
          deduped.slice(1).forEach((url, i) => {
            console.log(`      ${i + 1}. ${url}`);
          });
        } else {
          console.log('   ⚠️ PROBLEMA: Apenas 1 foto, sem miniaturas!');
        }
      } else {
        console.log('   ❌ PROBLEMA: Nenhuma foto disponível!');
      }

      // 5. Verificar dados brutos
      console.log('\n5️⃣ Dados brutos da tabela cars (para debug):');
      console.log(`   gallery (bruto): ${JSON.stringify(car.gallery)}`);
      console.log(`   gallery (tipo): ${typeof car.gallery}`);
      console.log(`   gallery (é array): ${Array.isArray(car.gallery)}`);
    }

  } catch (error: any) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Pegar ID do carro da linha de comando, se fornecido
const vehicleId = process.argv[2];
if (vehicleId) {
  console.log(`🎯 Analisando carro específico: ${vehicleId}\n`);
}

debugGalleryPhotos(vehicleId);
