async function testOpelFix() {
  console.log('🧪 Testando correção da foto do OPEL...\n');

  try {
    // Testar API de listagem
    const response = await fetch('http://localhost:5001/api/vehicles');
    const data = await response.json();

    if (data.success) {
      // Verificar OPEL INSIGNIA
      const opel = data.vehicles.find((v: any) => v.id === 'e27d74b5-f7c9-4e59-b657-f35739ef7717');

      if (opel) {
        console.log('🚗 OPEL INSIGNIA:');
        console.log('   Imagem retornada pela API:');
        console.log(`   ${opel.imagem}`);

        const expectedPhoto = 'https://bzkgjtxrzwzoibzesphi.supabase.co/storage/v1/object/public/car-photos/e27d74b5-f7c9-4e59-b657-f35739ef7717_gallery_1762163689078_cx884hasg.jpeg';

        console.log('\n   Foto esperada (da tabela cars):');
        console.log(`   ${expectedPhoto}`);

        if (opel.imagem === expectedPhoto) {
          console.log('\n   ✅ CORRETO! Usando a foto definida na tabela cars');
        } else {
          console.log('\n   ❌ INCORRETO! Não está usando a foto da tabela cars');
        }
      } else {
        console.log('❌ OPEL não encontrado');
      }

      // Verificar NISSAN (deve continuar usando foto de perfil)
      console.log('\n\n🚗 NISSAN QASHQAI (verificação):');
      const nissan = data.vehicles.find((v: any) => v.id === 'b93adb28-6458-4cb8-bb2c-15397c22df53');

      if (nissan) {
        console.log('   Imagem:', nissan.imagem);
        if (nissan.imagem.includes('_profile_')) {
          console.log('   ✅ Correto! Usando foto de perfil');
        } else {
          console.log('   ⚠️  Deveria usar foto de perfil');
        }
      }

    } else {
      console.error('❌ API retornou erro:', data.error);
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

testOpelFix();
