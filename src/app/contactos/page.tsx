import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site-config";
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageSquare } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Contactos Pinklegion",
  description:
    "Fale com a Pinklegion em Braga: telefone +351 910 048 205, email info@pinklegion.pt e atendimento personalizado no stand.",
  alternates: {
    canonical: "/contactos",
  },
  openGraph: {
    title: "Contacte a Pinklegion | Stand de Carros em Braga",
    description:
      "Marque a sua visita, peça simulação de financiamento ou fale com a equipa Pinklegion através de telefone, email ou WhatsApp.",
    url: `${siteConfig.url}/contactos`,
  },
};

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
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Como Nos Contactar
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Utilize qualquer um dos nossos canais de contacto para esclarecer dúvidas, 
                agendar visitas ou obter mais informações sobre os nossos veículos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <FiPhone className="w-8 h-8 text-stand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Telefone</h3>
                    <p className="text-lg text-gray-700 font-medium mb-1">+351 910 048 205</p>
                    <p className="text-gray-500">Segunda a Sexta: 9h00 - 18h00</p>
                    <p className="text-gray-500">Sábado: 9h00 - 13h00</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <FiMail className="w-8 h-8 text-stand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-lg text-gray-700 font-medium mb-1">info@pinklegion.pt</p>
                    <p className="text-gray-500">Resposta em 24 horas</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <FiMapPin className="w-8 h-8 text-stand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Morada</h3>
                    <p className="text-lg text-gray-700 font-medium">
                      Rua das Viaturas, 123<br />
                      4700-000 Braga, Portugal
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className="bg-stand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <FiClock className="w-8 h-8 text-stand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Horário de Funcionamento</h3>
                    <div className="text-gray-700 space-y-1">
                      <p>Segunda a Sexta: 9h00 - 18h00</p>
                      <p>Sábado: 9h00 - 13h00</p>
                      <p>Domingo: Encerrado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA - Destacado */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                  <FiMessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold">WhatsApp</h3>
              </div>
              <p className="text-lg mb-6 text-green-50">
                Para uma resposta mais rápida e direta, contacte-nos via WhatsApp. 
                Estamos disponíveis para esclarecer todas as suas dúvidas.
              </p>
              <a
                href="https://wa.me/351910048205"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center text-lg"
              >
                <FiMessageSquare className="w-5 h-5 mr-3" />
                Enviar Mensagem WhatsApp
              </a>
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
            
            {/* Responsive Google Maps iframe */}
            <div className="relative w-full h-96 md:h-[450px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2125.7493931962517!2d-8.428421266005595!3d41.60411971073762!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24ff4089685547%3A0x305d24f44780ad47!2sBrazzauto%20Autom%C3%B3veis!5e0!3m2!1spt-PT!2spt!4v1762195469384!5m2!1spt-PT!2spt"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Brazzauto Automóveis"
              />
            </div>
            
            {/* Additional location info */}
            <div className="mt-8 text-center">
              <div className="bg-white rounded-lg p-6 shadow-md inline-block">
                <div className="flex items-center justify-center mb-2">
                  <FiMapPin className="w-5 h-5 text-stand-primary mr-2" />
                  <span className="font-semibold text-gray-900">Brazzauto Automóveis</span>
                </div>
                <p className="text-gray-600">
                  Rua das Viaturas, 123 - 4700-000 Braga, Portugal
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

