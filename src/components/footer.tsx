import Link from "next/link";
import Image from "next/image";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/images/logo pink legion.png"
              alt="Pink Legion"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
            <p className="text-gray-300 text-sm">
              A sua plataforma de confiança para compra e venda de viaturas usadas.
            </p>
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

