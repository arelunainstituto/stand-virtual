import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FiUpload, FiDatabase, FiSettings, FiShield, FiZap, FiExternalLink, FiCheck, FiArrowRight } from "react-icons/fi";

export default function ImportacaoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-stand-primary to-stand-primary-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Módulo de Importação
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              Plataforma avançada para importação e gestão de dados de viaturas 
              com tecnologia de ponta e segurança garantida.
            </p>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Funcionalidades Principais
              </h2>
              <p className="text-lg text-gray-600">
                Ferramentas poderosas para gestão eficiente de dados de viaturas
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiUpload className="w-8 h-8 text-stand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Importação em Massa</h3>
                <p className="text-gray-600">
                  Importe centenas de viaturas de uma só vez através de ficheiros CSV, 
                  Excel ou APIs externas.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiDatabase className="w-8 h-8 text-stand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Gestão de Dados</h3>
                <p className="text-gray-600">
                  Sistema robusto de gestão de dados com validação automática 
                  e correção de erros.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiSettings className="w-8 h-8 text-stand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Configuração Flexível</h3>
                <p className="text-gray-600">
                  Personalize campos, regras de validação e mapeamentos 
                  conforme as suas necessidades.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Como Funciona
              </h2>
              <p className="text-lg text-gray-600">
                Processo simples em 4 passos para importar os seus dados
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-stand-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Preparar Dados</h3>
                <p className="text-gray-600 text-sm">
                  Organize os dados das viaturas no formato adequado (CSV, Excel ou JSON).
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-stand-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Configurar Importação</h3>
                <p className="text-gray-600 text-sm">
                  Defina os campos e regras de validação para a importação.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-stand-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Validar Dados</h3>
                <p className="text-gray-600 text-sm">
                  O sistema valida automaticamente todos os dados antes da importação.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-stand-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Importar</h3>
                <p className="text-gray-600 text-sm">
                  Execute a importação e monitore o progresso em tempo real.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Links */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Aceder à Plataforma
              </h2>
              <p className="text-lg text-gray-600">
                Links para a plataforma de importação e documentação
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiZap className="w-8 h-8 text-stand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Plataforma de Importação</h3>
                <p className="text-gray-600 mb-6">
                  Aceda à plataforma principal para gerir e importar dados de viaturas.
                </p>
                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stand-primary text-white px-6 py-3 rounded-lg hover:bg-stand-primary-dark transition-colors inline-flex items-center"
                >
                  Aceder à Plataforma
                  <FiExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiSettings className="w-8 h-8 text-stand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Documentação da API</h3>
                <p className="text-gray-600 mb-6">
                  Consulte a documentação completa da API para integração.
                </p>
                <a
                  href="http://localhost:3000/api/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center"
                >
                  Ver Documentação
                  <FiExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Características Técnicas
              </h2>
              <p className="text-lg text-gray-600">
                Tecnologia avançada para máxima performance e segurança
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FiShield className="w-6 h-6 text-stand-primary mr-3" />
                  <h3 className="text-lg font-semibold">Segurança</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Criptografia de dados, autenticação robusta e auditoria completa.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FiZap className="w-6 h-6 text-stand-primary mr-3" />
                  <h3 className="text-lg font-semibold">Performance</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Processamento em lote otimizado e cache inteligente.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FiCheck className="w-6 h-6 text-stand-primary mr-3" />
                  <h3 className="text-lg font-semibold">Validação</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Validação automática de dados com relatórios detalhados.
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
              Aceda à plataforma de importação e comece a gerir os seus dados de viaturas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-stand-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Aceder à Plataforma
                <FiArrowRight className="w-5 h-5 ml-2" />
              </a>
              <a
                href="/contactos"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-stand-primary transition-colors"
              >
                Pedir Ajuda
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

