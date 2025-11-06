"use client";

import { useState } from "react";
import { FiCreditCard, FiDollarSign } from "react-icons/fi";

interface FinancingSimulatorProps {
  vehiclePrice: number;
  vehicleName: string;
}

export default function FinancingSimulator({ vehiclePrice, vehicleName }: FinancingSimulatorProps) {
  const downPaymentPercent = 30;
  const downPayment = vehiclePrice * (downPaymentPercent / 100);
  const financedAmount = vehiclePrice - downPayment;

  // Opções de parcelas disponíveis
  const installmentOptions = [6, 12, 18, 24];

  // Sem juros - valor já incluso no preço
  const monthlyInterestRate = 0;

  const [selectedInstallments, setSelectedInstallments] = useState(24);

  // Cálculo da prestação mensal usando a fórmula de Price
  const calculateMonthlyPayment = (months: number) => {
    if (monthlyInterestRate === 0) {
      return financedAmount / months;
    }

    const payment = financedAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
                    (Math.pow(1 + monthlyInterestRate, months) - 1);
    return payment;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const monthlyPayment = calculateMonthlyPayment(selectedInstallments);
  const totalToPay = downPayment + (monthlyPayment * selectedInstallments);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-stand-primary to-pink-600 p-4">
        <div className="flex items-center text-white">
          <FiCreditCard className="w-6 h-6 mr-2" />
          <h3 className="text-lg font-bold">Simulação de Financiamento</h3>
        </div>
        <p className="text-white/90 text-sm mt-1">
          Calcule as prestações para o seu {vehicleName}
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Down Payment Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Valor do Veículo</span>
            <span className="font-semibold text-gray-900">{formatPrice(vehiclePrice)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Entrada ({downPaymentPercent}%)</span>
            <span className="font-semibold text-stand-primary">{formatPrice(downPayment)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Valor a Financiar</span>
              <span className="font-bold text-gray-900">{formatPrice(financedAmount)}</span>
            </div>
          </div>
        </div>

        {/* Installments Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Número de Prestações
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {installmentOptions.map((months) => (
              <button
                key={months}
                onClick={() => setSelectedInstallments(months)}
                className={`py-3 px-2 rounded-lg text-center transition-all ${
                  selectedInstallments === months
                    ? "bg-stand-primary text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <div className="font-bold">{months}x</div>
                <div className="text-xs mt-1 opacity-90">
                  {formatPrice(calculateMonthlyPayment(months))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result Highlight */}
        <div className="bg-gradient-to-br from-stand-primary/10 to-pink-100 p-6 rounded-lg border-2 border-stand-primary/20">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Prestação Mensal</div>
            <div className="text-4xl font-bold text-stand-primary mb-2">
              {formatPrice(monthlyPayment)}
            </div>
            <div className="text-sm text-gray-600">
              em {selectedInstallments} prestações
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <FiDollarSign className="w-5 h-5 mr-2" />
              <span className="font-medium">Total a Pagar</span>
            </div>
            <span className="font-bold text-lg text-gray-900">{formatPrice(totalToPay)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Entrada de {formatPrice(downPayment)} + {selectedInstallments} prestações de {formatPrice(monthlyPayment)}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-xs text-yellow-800">
            <strong>Nota:</strong> Esta é uma simulação indicativa. Os valores podem variar conforme análise de crédito e condições específicas.
            Entre em contacto connosco para uma proposta personalizada e detalhada.
          </p>
        </div>

        {/* CTA Button */}
        <a
          href={`https://wa.me/351910048205?text=Olá! Gostaria de mais informações sobre o financiamento do ${vehicleName}. Vi a simulação de ${selectedInstallments}x de ${formatPrice(monthlyPayment)}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center font-semibold"
        >
          <FiCreditCard className="w-5 h-5 mr-2" />
          Solicitar Proposta de Financiamento
        </a>
      </div>
    </div>
  );
}
