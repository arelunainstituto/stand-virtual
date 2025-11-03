import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FiUsers, FiAward, FiShield, FiHeart, FiStar, FiTrendingUp } from "react-icons/fi";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-stand-primary to-stand-primary-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sobre a Pinklegion
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              A sua plataforma de confiança para compra e venda de viaturas usadas, 
              com mais de 15 anos de experiência no mercado automóvel.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">A Nossa História</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Fundada em 2008, a Pinklegion nasceu da paixão por automóveis e do desejo
                    de revolucionar a forma como as pessoas compram e vendem viaturas usadas.
                  </p>
                  <p>
                    Ao longo dos anos, construímos uma reputação sólida baseada na transparência, 
                    qualidade e atendimento personalizado. Cada veículo que passa pelas nossas mãos 
                    é cuidadosamente inspecionado e preparado para oferecer a melhor experiência 
                    de condução aos nossos clientes.
                  </p>
                  <p>
                    Hoje, somos reconhecidos como uma das principais plataformas de venda de 
                    viaturas usadas em Portugal, com milhares de clientes satisfeitos e uma 
                    equipa dedicada de profissionais especializados.
                  </p>
                </div>
              </div>
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-lg">Imagem da equipa</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Os Nossos Valores</h2>
              <p className="text-lg text-gray-600">
                Princípios que guiam o nosso trabalho e definem a nossa identidade
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiShield className="w-8 h-8 text-stand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Transparência</h3>
                <p className="text-gray-600">
                  Informação completa e honesta sobre cada veículo, sem surpresas desagradáveis.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAward className="w-8 h-8 text-stand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Qualidade</h3>
                <p className="text-gray-600">
                  Rigorosa inspeção e preparação de todos os veículos antes da venda.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiHeart className="w-8 h-8 text-stand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Atendimento</h3>
                <p className="text-gray-600">
                  Suporte personalizado e dedicado para cada cliente, antes e depois da venda.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrendingUp className="w-8 h-8 text-stand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Inovação</h3>
                <p className="text-gray-600">
                  Tecnologia avançada para facilitar a compra e venda de viaturas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 bg-stand-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Números que Falam</h2>
              <p className="text-xl text-gray-200">
                Resultados que comprovam a nossa excelência
              </p>
            </div>
            
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

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">A Nossa Equipa</h2>
              <p className="text-lg text-gray-600">
                Profissionais especializados e apaixonados por automóveis
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FiUsers className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">João Silva</h3>
                <p className="text-stand-primary mb-2">Diretor Geral</p>
                <p className="text-gray-600 text-sm">
                  Mais de 20 anos de experiência no mercado automóvel, especialista em 
                  avaliação e negociação de viaturas.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FiUsers className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Maria Santos</h3>
                <p className="text-stand-primary mb-2">Responsável de Vendas</p>
                <p className="text-gray-600 text-sm">
                  Especialista em atendimento ao cliente e acompanhamento pós-venda, 
                  com foco na satisfação total do cliente.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FiUsers className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Carlos Pereira</h3>
                <p className="text-stand-primary mb-2">Técnico Especializado</p>
                <p className="text-gray-600 text-sm">
                  Mecânico certificado responsável pela inspeção e preparação técnica 
                  de todos os veículos do nosso stock.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pronto para Encontrar o Seu Próximo Carro?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Junte-se aos milhares de clientes satisfeitos que confiam na Pinklegion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/viaturas"
                className="bg-stand-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-stand-primary-dark transition-colors"
              >
                Ver Viaturas
              </a>
              <a
                href="/contactos"
                className="border-2 border-stand-primary text-stand-primary px-8 py-3 rounded-lg font-semibold hover:bg-stand-primary hover:text-white transition-colors"
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