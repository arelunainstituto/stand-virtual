async function testSoldFilter() {
  console.log('🧪 Testando filtro de carros vendidos...\n');

  try {
    // Testar API de listagem
    const response = await fetch('http://localhost:5001/api/vehicles');
    const data = await response.json();

    if (data.success) {
      console.log(`✅ API funcionando! ${data.count} veículos retornados\n`);

      // Verificar se há carros vendidos
      const soldCars = data.vehicles.filter((v: any) => v.status === 'vendido');
      const availableCars = data.vehicles.filter((v: any) => v.status === 'disponivel');
      const reservedCars = data.vehicles.filter((v: any) => v.status === 'reservado');

      console.log('📊 Status dos carros:');
      console.log(`   Disponíveis: ${availableCars.length}`);
      console.log(`   Reservados: ${reservedCars.length}`);
      console.log(`   Vendidos: ${soldCars.length}`);

      if (soldCars.length > 0) {
        console.log('\n❌ ERRO: Carros vendidos estão sendo exibidos!');
        soldCars.forEach((car: any) => {
          console.log(`   - ${car.marca} ${car.modelo} (${car.id})`);
        });
      } else {
        console.log('\n✅ CORRETO: Nenhum carro vendido está sendo exibido');
      }

      // Listar alguns carros disponíveis
      console.log('\n📋 Alguns carros disponíveis:');
      data.vehicles.slice(0, 5).forEach((car: any) => {
        console.log(`   - ${car.marca} ${car.modelo} [${car.status}]`);
      });

    } else {
      console.error('❌ API retornou erro:', data.error);
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

testSoldFilter();
