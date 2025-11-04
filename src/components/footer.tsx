import Link from "next/link";
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-stand-primary">Pinklegion</h3>
            <p className="text-gray-300 text-sm">
              A sua plataforma de confiança para compra e venda de viaturas usadas.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-stand-primary transition-colors"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-stand-primary transition-colors"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-stand-primary transition-colors"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/viaturas" className="text-gray-300 hover:text-stand-primary transition-colors text-sm">
                  Viaturas
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-gray-300 hover:text-stand-primary transition-colors text-sm">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/contactos" className="text-gray-300 hover:text-stand-primary transition-colors text-sm">
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contactos</h4>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300 text-sm">
                <FiPhone className="w-4 h-4 mr-2" />
                +351 910 048 205
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <FiMail className="w-4 h-4 mr-2" />
                info@pinklegion.pt
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <FiMapPin className="w-4 h-4 mr-2" />
                Braga, Portugal
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Pinklegion. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

