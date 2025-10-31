import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FiTruck, FiCreditCard, FiShield, FiSettings, FiFileText, FiUser, FiPlay } from "react-icons/fi";

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-stand-primary to-stand-primary-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Os Nossos Serviços
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              Soluções completas para todas as suas necessidades automóveis, 
              desde a compra até ao pós-venda.
            </p>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Serviços Principais</h2>
              <p className="text-lg text-gray-600">
                Oferecemos uma gama completa de serviços para a sua comodidade
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <FiTruck className="w-8 h-8 text-stand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Venda de Viaturas</h3>
                <p className="text-gray-600 mb-4">
                  Seleção cuidadosa de viaturas usadas com qualidade garantida, 
                  inspecionadas por técnicos especializados.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Inspeção técnica completa</li>
                  <li>• Histórico de manutenção</li>
                  <li>• Garantia incluída</li>
                  <li>• Teste de condução</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <FiCreditCard className="w-8 h-8 text-stand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Financiamento</h3>
                <p className="text-gray-600 mb-4">
                  Soluções de financiamento personalizadas com as melhores condições 
                  do mercado e aprovação rápida.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Taxas competitivas</li>
                  <li>• Aprovação em 24h</li>
                  <li>• Prazos flexíveis</li>
                  <li>• Sem comissões ocultas</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <FiShield className="w-8 h-8 text-stand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Garantia Estendida</h3>
                <p className="text-gray-600 mb-4">
                  Proteção adicional para a sua tranquilidade, com cobertura 
                  abrangente e assistência 24/7.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Cobertura mecânica</li>
                  <li>• Assistência em viagem</li>
                  <li>• Carro de substituição</li>
                  <li>• Suporte 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Serviços Adicionais</h2>
              <p className="text-lg text-gray-600">
                Serviços complementares para uma experiência completa
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-stand-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FiSettings className="w-6 h-6 text-stand-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Manutenção</h3>
                <p className="text-gray-600 text-sm">
                  Serviços de manutenção preventiva e corretiva com peças originais.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-stand-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FiFileText className="w-6 h-6 text-stand-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Documentação</h3>
                <p className="text-gray-600 text-sm">
                  Tratamento completo de toda a documentação necessária.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-stand-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FiUser className="w-6 h-6 text-stand-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Atendimento Personalizado</h3>
                <p className="text-gray-600 text-sm">
                  Consultoria especializada para encontrar o veículo ideal.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-stand-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FiPlay className="w-6 h-6 text-stand-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Teste de Condução</h3>
                <p className="text-gray-600 text-sm">
                  Experimente o veículo antes de decidir, sem compromisso.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Como Funciona</h2>
              <p className="text-lg text-gray-600">
                Processo simples e transparente em apenas alguns passos
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-stand-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Escolha o Veículo</h3>
                <p className="text-gray-600 text-sm">
                  Navegue pela nossa seleção e encontre o veículo que mais se adequa às suas necessidades.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-stand-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Teste de Condução</h3>
                <p className="text-gray-600 text-sm">
                  Agende um teste de condução para experimentar o veículo em condições reais.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-stand-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Negociação</h3>
                <p className="text-gray-600 text-sm">
                  Discutimos as condições de venda e financiamento que melhor se adequam ao seu orçamento.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-stand-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Entrega</h3>
                <p className="text-gray-600 text-sm">
                  Tratamos de toda a documentação e entregamos o seu novo veículo pronto para usar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-stand-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Entre em contacto connosco e descubra como podemos ajudá-lo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/viaturas"
                className="bg-white text-stand-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Ver Viaturas
              </a>
              <a
                href="/contactos"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-stand-primary transition-colors"
              >
                Contactar Agora
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}