"use client";

import { useState } from "react";
import { FiMail, FiCheck } from "react-icons/fi";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simular chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setEmail("");
    setIsSubmitting(false);
  };

  if (isSubscribed) {
    return (
      <div className="flex items-center text-green-400 text-sm">
        <FiCheck className="w-4 h-4 mr-2" />
        Subscrição realizada com sucesso!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex">
        <div className="relative flex-1">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="O seu email"
            className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-stand-primary text-white rounded-r-md hover:bg-stand-primary-dark focus:outline-none focus:ring-2 focus:ring-stand-primary focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
        >
          {isSubmitting ? "..." : "Subscrever"}
        </button>
      </div>
    </form>
  );
}

