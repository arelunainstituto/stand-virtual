"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiShare2, FiEye, FiPhone, FiCalendar, FiActivity, FiDroplet } from "react-icons/fi";

interface Vehicle {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  quilometragem: number;
  combustivel: string;
  cambio: string;
  imagem: string;
  status: "disponivel" | "vendido" | "reservado";
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const formatKilometers = (km: number) => {
    return new Intl.NumberFormat("pt-PT").format(km) + " km";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponivel":
        return "bg-green-100 text-green-800";
      case "vendido":
        return "bg-red-100 text-red-800";
      case "reservado":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "disponivel":
        return "Disponível";
      case "vendido":
        return "Vendido";
      case "reservado":
        return "Reservado";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {vehicle.imagem && !imageError ? (
          <Image
            src={vehicle.imagem}
            alt={`${vehicle.marca} ${vehicle.modelo}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 text-4xl mb-2">🚗</div>
              <span className="text-gray-500 text-sm">Sem foto</span>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
            {getStatusText(vehicle.status)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors ${
              isLiked ? "text-red-500" : "text-gray-600"
            }`}
          >
            <FiHeart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 transition-colors">
            <FiShare2 className="w-4 h-4" />
          </button>
        </div>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <Link
              href={`/viaturas/${vehicle.id}`}
              className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center"
            >
              <FiEye className="w-4 h-4 mr-2" />
              Ver Detalhes
            </Link>
            <a
              href={`https://wa.me/351212345678?text=Olá! Tenho interesse no ${vehicle.marca} ${vehicle.modelo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center"
            >
              <FiPhone className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-stand-primary transition-colors">
            {vehicle.marca} {vehicle.modelo}
          </h3>
          <p className="text-2xl font-bold text-stand-primary">
            {formatPrice(vehicle.preco)}
          </p>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <FiCalendar className="w-4 h-4 mr-2" />
            <span>{vehicle.ano}</span>
          </div>
          <div className="flex items-center">
            <FiActivity className="w-4 h-4 mr-2" />
            <span>{formatKilometers(vehicle.quilometragem)}</span>
          </div>
          <div className="flex items-center">
            <FiDroplet className="w-4 h-4 mr-2" />
            <span>{vehicle.combustivel} • {vehicle.cambio}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
