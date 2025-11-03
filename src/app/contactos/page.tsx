import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageSquare } from "react-icons/fi";

export default function ContactosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-stand-primary to-stand-primary-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contactos
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              Estamos aqui para ajudá-lo. Entre em contacto connosco através 
              dos canais mais convenientes para si.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Envie-nos uma Mensagem
                </h2>
                <p className="text-gray-600 mb-8">
                  Preencha o formulário abaixo e entraremos em contacto consigo 
                  o mais rapidamente possível.
                </p>
                <ContactForm />
              </div>

              {/* Contact Details */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Informações de Contacto
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-stand-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <FiPhone className="w-6 h-6 text-stand-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Telefone</h4>
                        <p className="text-gray-600">+351 910 048 205</p>
                        <p className="text-sm text-gray-500">Segunda a Sexta: 9h00 - 18h00</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-stand-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <FiMail className="w-6 h-6 text-stand-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                        <p className="text-gray-600">info@pinklegion.pt</p>
                        <p className="text-sm text-gray-500">Resposta em 24 horas</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-stand-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <FiMapPin className="w-6 h-6 text-stand-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Morada</h4>
                        <p className="text-gray-600">
                          Rua das Viaturas, 123<br />
                          4700-000 Braga, Portugal
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-stand-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <FiClock className="w-6 h-6 text-stand-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Horário de Funcionamento</h4>
                        <div className="text-gray-600 space-y-1">
                          <p>Segunda a Sexta: 9h00 - 18h00</p>
                          <p>Sábado: 9h00 - 13h00</p>
                          <p>Domingo: Encerrado</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <FiMessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Para uma resposta mais rápida, contacte-nos via WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/351910048205"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center"
                  >
                    <FiMessageSquare className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Encontre-nos
              </h2>
              <p className="text-lg text-gray-600">
                Visite-nos nas nossas instalações em Braga
              </p>
            </div>
            
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FiMapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Mapa Interativo</p>
                <p className="text-gray-400 text-sm">
                  Rua das Viaturas, 123 - Braga, Portugal
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-gray-600">
                Respostas às questões mais comuns
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Posso testar o veículo antes de comprar?
                </h3>
                <p className="text-gray-600">
                  Sim, encorajamos todos os clientes a testarem os veículos antes da compra. 
                  Pode agendar um teste de condução através dos nossos contactos.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Que garantia oferecem?
                </h3>
                <p className="text-gray-600">
                  Todos os nossos veículos incluem garantia de 12 meses ou 20.000 km, 
                  com possibilidade de extensão da garantia.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Fazem financiamento?
                </h3>
                <p className="text-gray-600">
                  Sim, trabalhamos com várias entidades financeiras para oferecer as 
                  melhores condições de financiamento.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tratam da documentação?
                </h3>
                <p className="text-gray-600">
                  Sim, tratamos de toda a documentação necessária para a transferência 
                  de propriedade do veículo.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

