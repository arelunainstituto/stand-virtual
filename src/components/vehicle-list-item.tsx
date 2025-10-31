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

interface VehicleListItemProps {
  vehicle: Vehicle;
}

export function VehicleListItem({ vehicle }: VehicleListItemProps) {
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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden">
          {!imageError ? (
            <Image
              src={vehicle.imagem}
              alt={`${vehicle.marca} ${vehicle.modelo}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Imagem não disponível</span>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
              {getStatusText(vehicle.status)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-stand-primary transition-colors">
                {vehicle.marca} {vehicle.modelo}
              </h3>
              <p className="text-2xl font-bold text-stand-primary">
                {formatPrice(vehicle.preco)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                  isLiked ? "text-red-500" : "text-gray-600"
                }`}
              >
                <FiHeart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                <FiShare2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
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
              <span>{vehicle.combustivel}</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2"></span>
              <span>{vehicle.cambio}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href={`/viaturas/${vehicle.id}`}
              className="flex-1 bg-stand-primary text-white py-2 px-4 rounded-md hover:bg-stand-primary-dark transition-colors text-center flex items-center justify-center"
            >
              <FiEye className="w-4 h-4 mr-2" />
              Ver Detalhes
            </Link>
            <a
              href={`https://wa.me/351212345678?text=Olá! Tenho interesse no ${vehicle.marca} ${vehicle.modelo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors text-center flex items-center justify-center"
            >
              <FiPhone className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
