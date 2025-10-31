"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Viaturas", href: "/viaturas" },
    { name: "Sobre", href: "/sobre" },
    { name: "Serviços", href: "/servicos" },
    { name: "Importação", href: "/importacao" },
    { name: "Contactos", href: "/contactos" },
  ];

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-stand-primary">
              Stand Virtual
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-stand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Contact Button */}
          <div className="hidden md:block">
            <a
              href="tel:+351212345678"
              className="bg-stand-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-stand-primary-dark transition-colors flex items-center"
            >
              <FiPhone className="w-4 h-4 mr-2" />
              Ligar
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-stand-primary focus:outline-none focus:text-stand-primary"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-stand-primary block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="tel:+351212345678"
                className="bg-stand-primary text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-stand-primary-dark transition-colors flex items-center"
              >
                <FiPhone className="w-4 h-4 mr-2" />
                Ligar
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

