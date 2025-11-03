async function testProfilePhotos() {
  console.log('🧪 Testando fotos de perfil na listagem...\n');

  try {
    // Testar API de listagem
    const response = await fetch('http://localhost:5001/api/vehicles');
    const data = await response.json();

    if (data.success) {
      console.log(`✅ API funcionando! ${data.count} veículos encontrados\n`);

      // Verificar NISSAN QASHQAI (sabemos que tem foto de perfil)
      const nissan = data.vehicles.find((v: any) => v.id === 'b93adb28-6458-4cb8-bb2c-15397c22df53');

      if (nissan) {
        console.log('🚗 NISSAN QASHQAI:');
        console.log('   Imagem:', nissan.imagem);

        if (nissan.imagem.includes('_profile_')) {
          console.log('   ✅ Usando foto de perfil!');
        } else if (nissan.imagem.includes('_gallery_')) {
          console.log('   ⚠️  Usando foto de galeria (deveria usar perfil)');
        } else {
          console.log('   ℹ️  Usando foto da tabela cars');
        }
      }

      // Mostrar resumo de todos os carros
      console.log('\n📊 Resumo de todas as fotos:');
      let profileCount = 0;
      let galleryCount = 0;
      let carsPhotoCount = 0;
      let noPhotoCount = 0;

      data.vehicles.forEach((v: any) => {
        if (!v.imagem) {
          noPhotoCount++;
        } else if (v.imagem.includes('_profile_')) {
          profileCount++;
        } else if (v.imagem.includes('_gallery_')) {
          galleryCount++;
        } else {
          carsPhotoCount++;
        }
      });

      console.log(`   Fotos de perfil: ${profileCount}`);
      console.log(`   Fotos de galeria: ${galleryCount}`);
      console.log(`   Fotos da tabela cars: ${carsPhotoCount}`);
      console.log(`   Sem foto: ${noPhotoCount}`);

    } else {
      console.error('❌ API retornou erro:', data.error);
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

testProfilePhotos();
