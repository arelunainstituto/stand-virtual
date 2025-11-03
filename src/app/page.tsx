"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { VehicleCard } from "@/components/vehicle-card";
import { Vehicle } from "@/data/mock-vehicles";
import { FiArrowRight, FiCheck, FiStar, FiUsers, FiTruck, FiShield, FiCreditCard, FiPercent } from "react-icons/fi";
import Link from "next/link";

export default function Home() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const response = await fetch('/api/vehicles');
        const result = await response.json();

        if (result.success && result.vehicles) {
          // Filtrar apenas disponíveis e pegar os primeiros 6
          const available = result.vehicles.filter((v: Vehicle) => v.status === "disponivel").slice(0, 6);
          setFeaturedVehicles(available);
        }
      } catch (err) {
        console.error('Erro ao buscar veículos:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-r from-stand-primary to-stand-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Encontre o Carro dos Seus Sonhos
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              A melhor seleção de viaturas usadas com qualidade garantida
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/viaturas"
                className="bg-white text-stand-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Ver Viaturas
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/contactos"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-stand-primary transition-colors"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Porquê Escolher a Pinklegion?
            </h2>
            <p className="text-lg text-gray-600">
              Oferecemos o melhor serviço e garantia para a sua compra
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-stand-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualidade Garantida</h3>
              <p className="text-gray-600">
                Todos os veículos passam por uma inspeção rigorosa antes da venda
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-8 h-8 text-stand-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantia Incluída</h3>
              <p className="text-gray-600">
                Oferecemos garantia em todos os veículos para sua tranquilidade
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-stand-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Atendimento Personalizado</h3>
              <p className="text-gray-600">
                Equipa especializada para ajudá-lo a encontrar o veículo ideal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installment Promotion Section */}
      <section className="py-16 bg-gradient-to-r from-stand-primary to-stand-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCreditCard className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Parcelamento Sem Juros
            </h2>
            <p className="text-xl md:text-2xl mb-6 text-gray-100">
              Parcele o seu veículo em até <span className="font-bold text-yellow-300">24 vezes sem juros</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="flex items-center bg-white/10 px-6 py-3 rounded-lg">
                <FiPercent className="w-6 h-6 mr-3 text-yellow-300" />
                <span className="text-lg font-semibold">0% de Juros</span>
              </div>
              <div className="flex items-center bg-white/10 px-6 py-3 rounded-lg">
                <FiCreditCard className="w-6 h-6 mr-3 text-yellow-300" />
                <span className="text-lg font-semibold">Até 24 Parcelas</span>
              </div>
            </div>
            <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto">
              Realize o sonho do seu carro novo com condições especiais de pagamento. 
              Sem entrada, sem juros, sem complicações. Consulte-nos para mais detalhes!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contactos"
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center"
              >
                Simular Financiamento
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/viaturas"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-stand-primary transition-colors"
              >
                Ver Viaturas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Viaturas em Destaque
            </h2>
            <p className="text-lg text-gray-600">
              Descubra a nossa seleção de veículos mais procurados
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stand-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando veículos...</p>
              </div>
            </div>
          ) : featuredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Nenhum veículo disponível no momento.</p>
            </div>
          )}
          
          <div className="text-center">
            <Link
              href="/viaturas"
              className="bg-stand-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-stand-primary-dark transition-colors inline-flex items-center"
            >
              Ver Todas as Viaturas
              <FiArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-stand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-200">Viaturas Vendidas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-gray-200">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-gray-200">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-200">Suporte Disponível</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para Encontrar o Seu Próximo Carro?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Entre em contacto connosco e deixe-nos ajudá-lo a encontrar o veículo perfeito
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/viaturas"
              className="bg-stand-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-stand-primary-dark transition-colors"
            >
              Explorar Viaturas
            </Link>
            <Link
              href="/contactos"
              className="border-2 border-stand-primary text-stand-primary px-8 py-3 rounded-lg font-semibold hover:bg-stand-primary hover:text-white transition-colors"
            >
              Contactar Agora
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
