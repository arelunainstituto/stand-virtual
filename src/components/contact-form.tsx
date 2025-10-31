"use client";

import { useState } from "react";
import { FiUser, FiMail, FiMessageSquare, FiSend } from "react-icons/fi";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-lg font-semibold mb-2">
          Mensagem enviada com sucesso!
        </div>
        <p className="text-green-700">
          Obrigado pelo seu contacto. Entraremos em contacto consigo brevemente.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nome *
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent"
              placeholder="O seu nome completo"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent"
              placeholder="O seu email"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Mensagem *
        </label>
        <div className="relative">
          <FiMessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent resize-none"
            placeholder="Escreva a sua mensagem..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-stand-primary text-white py-3 px-4 rounded-md hover:bg-stand-primary-dark focus:outline-none focus:ring-2 focus:ring-stand-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center justify-center"
      >
        {isSubmitting ? (
          "A enviar..."
        ) : (
          <>
            <FiSend className="w-4 h-4 mr-2" />
            Enviar Mensagem
          </>
        )}
      </button>
    </form>
  );
}

