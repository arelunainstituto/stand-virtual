import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://bzkgjtxrzwzoibzesphi.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY || '');

async function removeInvalidPhotos() {
  const invalidPhotoIds = [
    '0b8a85ff-c827-4653-969c-619da615f8cf',
    '66159d5f-5a4f-416c-a4b7-6c2ded36969d'
  ];

  console.log(`🗑️  Removendo ${invalidPhotoIds.length} fotos inválidas...\n`);

  const { data, error } = await supabase
    .from('car_photos')
    .delete()
    .in('id', invalidPhotoIds);

  if (error) {
    console.error('❌ Erro ao remover fotos:', error);
  } else {
    console.log('✅ Fotos inválidas removidas com sucesso!');
    console.log(`   IDs removidos: ${invalidPhotoIds.join(', ')}`);
  }
}

removeInvalidPhotos();
