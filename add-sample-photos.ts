import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzkgjtxrzwzoibzesphi.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

// Fotos de exemplo para carros (URLs do Unsplash)
const sampleCarPhotos = [
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1549927681-0b673b8243a6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
];

async function addSamplePhotos() {
  console.log('🚗 Adicionando fotos de exemplo aos carros...\n');

  try {
    // Buscar todos os carros
    const { data: cars, error: carsError } = await supabase
      .from('cars')
      .select('id, brand, model, photo_url');

    if (carsError) {
      console.error('❌ Erro ao buscar carros:', carsError);
      return;
    }

    if (!cars || cars.length === 0) {
      console.log('⚠️  Nenhum carro encontrado no banco de dados');
      return;
    }

    console.log(`📊 Encontrados ${cars.length} carros\n`);

    // Tentar criar a tabela car_photos primeiro (executar SQL)
    console.log('📝 Verificando tabela car_photos...');

    // Para cada carro, adicionar 3-5 fotos aleatórias
    for (const car of cars) {
      const numPhotos = Math.floor(Math.random() * 3) + 3; // 3 a 5 fotos
      const selectedPhotos = [];

      // Sempre incluir a foto principal se existir
      if (car.photo_url) {
        selectedPhotos.push({
          car_id: car.id,
          photo_url: car.photo_url,
          display_order: 0,
          is_primary: true,
        });
      }

      // Adicionar fotos aleatórias
      const shuffled = [...sampleCarPhotos].sort(() => Math.random() - 0.5);
      for (let i = 0; i < numPhotos - 1; i++) {
        selectedPhotos.push({
          car_id: car.id,
          photo_url: shuffled[i],
          display_order: i + 1,
          is_primary: false,
        });
      }

      // Verificar se a tabela car_photos existe
      const { error: insertError } = await supabase
        .from('car_photos')
        .insert(selectedPhotos);

      if (insertError) {
        if (insertError.message.includes('relation "public.car_photos" does not exist')) {
          console.log('⚠️  Tabela car_photos não existe. Por favor, execute o script SQL primeiro.');
          console.log('   Execute: psql -h bzkgjtxrzwzoibzesphi.supabase.co -U postgres -d postgres -f add-car-photos-support.sql');
          return;
        }
        console.error(`❌ Erro ao adicionar fotos para ${car.brand} ${car.model}:`, insertError);
      } else {
        console.log(`✅ ${car.brand} ${car.model}: ${selectedPhotos.length} fotos adicionadas`);
      }
    }

    console.log('\n✨ Processo concluído!');
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

addSamplePhotos();
