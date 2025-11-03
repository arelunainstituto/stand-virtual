"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Vehicle } from "@/data/mock-vehicles";
import { FiArrowLeft, FiPhone, FiMail, FiCalendar, FiActivity, FiDroplet, FiSettings, FiStar, FiShare2, FiHeart } from "react-icons/fi";

export default function VehicleDetailPage() {
  const params = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function fetchVehicle(retryCount = 0) {
      try {
        const vehicleId = params.id as string;
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/vehicles/${vehicleId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store', // Evitar cache para sempre buscar dados atualizados
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.vehicle) {
          setVehicle(result.vehicle);
        } else {
          setError(result.error || 'Veículo não encontrado');
          setVehicle(null);
        }
      } catch (err: any) {
        console.error('Erro ao buscar veículo:', err);
        
        // Tentar novamente até 2 vezes em caso de erro de rede
        if (retryCount < 2 && (err.name === 'TypeError' || err.message.includes('Failed to fetch'))) {
          console.log(`Tentando novamente... (tentativa ${retryCount + 1})`);
          setTimeout(() => fetchVehicle(retryCount + 1), 1000);
          return;
        }
        
        setError('Erro ao conectar com o servidor');
        setVehicle(null);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicle();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stand-primary mx-auto mb-4"></div>
          <p className="text-gray-600">A carregar...</p>
        </div>
      </div>
    );
  }

  if (!vehicle && !loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Veículo não encontrado'}
            </h1>
            <p className="text-gray-600 mb-6">
              {error === 'Erro ao conectar com o servidor'
                ? 'Não foi possível conectar ao servidor. Por favor, tente novamente.'
                : 'O veículo que procura não existe ou foi removido.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/viaturas"
                className="bg-stand-primary text-white px-6 py-3 rounded-lg hover:bg-stand-primary-dark transition-colors inline-flex items-center justify-center"
              >
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Voltar às Viaturas
              </Link>
              {error && (
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Tentar Novamente
                </button>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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

  // Se não houver veículo, não renderizar a parte de imagens
  if (!vehicle) {
    return null;
  }

  const images = vehicle.galeria && vehicle.galeria.length > 0 ? vehicle.galeria : (vehicle.imagem ? [vehicle.imagem] : []);
  const hasImages = images.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            href="/viaturas"
            className="inline-flex items-center text-gray-600 hover:text-stand-primary transition-colors mb-6"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Voltar às Viaturas
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-4 bg-gray-200">
                {hasImages ? (
                  <>
                    <Image
                      src={images[currentImageIndex]}
                      alt={`${vehicle.marca} ${vehicle.modelo}`}
                      fill
                      className="object-cover"
                    />

                    {/* Navigation Arrows - Only show if multiple images */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                          {currentImageIndex + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-gray-400 text-6xl mb-4">🚗</div>
                      <span className="text-gray-500 text-lg">Sem fotos disponíveis</span>
                    </div>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vehicle.status)}`}>
                    {getStatusText(vehicle.status)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors ${
                      isLiked ? "text-red-500" : "text-gray-600"
                    }`}
                  >
                    <FiHeart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                  </button>
                  <button className="p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 transition-colors">
                    <FiShare2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                        currentImageIndex === index ? "ring-2 ring-stand-primary scale-105" : "ring-1 ring-gray-200 hover:ring-gray-300"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${vehicle.marca} ${vehicle.modelo} - Imagem ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Vehicle Info */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {vehicle.marca} {vehicle.modelo}
                </h1>
                <p className="text-3xl font-bold text-stand-primary mb-4">
                  {formatPrice(vehicle.preco)}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FiCalendar className="w-5 h-5 mr-3" />
                    <span>Ano: {vehicle.ano}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiActivity className="w-5 h-5 mr-3" />
                    <span>Quilometragem: {formatKilometers(vehicle.quilometragem)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiDroplet className="w-5 h-5 mr-3" />
                    <span>Combustível: {vehicle.combustivel}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiSettings className="w-5 h-5 mr-3" />
                    <span>Transmissão: {vehicle.cambio}</span>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/351910048205?text=Olá! Tenho interesse no ${vehicle.marca} ${vehicle.modelo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center font-semibold"
                >
                  <FiPhone className="w-5 h-5 mr-2" />
                  Contactar via WhatsApp
                </a>
                <a
                  href="mailto:info@pinklegion.pt"
                  className="w-full bg-stand-primary text-white py-3 px-4 rounded-lg hover:bg-stand-primary-dark transition-colors flex items-center justify-center font-semibold"
                >
                  <FiMail className="w-5 h-5 mr-2" />
                  Enviar Email
                </a>
              </div>

              {/* Specifications */}
              {vehicle.especificacoes && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Especificações</h3>
                  <div className="space-y-2">
                    {vehicle.especificacoes.potencia && (
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-gray-600">Potência:</span>
                        <span className="font-medium text-gray-900 break-words text-right">{vehicle.especificacoes.potencia}</span>
                      </div>
                    )}
                    {vehicle.especificacoes.cilindrada && (
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-gray-600">Cilindrada:</span>
                        <span className="font-medium text-gray-900 break-words text-right">{vehicle.especificacoes.cilindrada}</span>
                      </div>
                    )}
                    {vehicle.especificacoes.cor && (
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-gray-600">Cor:</span>
                        <span className="font-medium text-gray-900 break-words text-right">{vehicle.especificacoes.cor}</span>
                      </div>
                    )}
                    {vehicle.especificacoes.portas && (
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-gray-600">Portas:</span>
                        <span className="font-medium text-gray-900 break-words text-right">{vehicle.especificacoes.portas}</span>
                      </div>
                    )}
                    {vehicle.especificacoes.lugares && (
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-gray-600">Lugares:</span>
                        <span className="font-medium text-gray-900 break-words text-right">{vehicle.especificacoes.lugares}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}