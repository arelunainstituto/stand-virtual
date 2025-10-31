"use client";

import { VehicleCard } from "./vehicle-card";
import { VehicleListItem } from "./vehicle-list-item";

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

interface VehicleGridProps {
  vehicles: Vehicle[];
  viewMode: "grid" | "list";
}

export function VehicleGrid({ vehicles, viewMode }: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">
          Nenhum veículo encontrado com os filtros aplicados.
        </div>
        <p className="text-gray-400">
          Tente ajustar os filtros para ver mais resultados.
        </p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <VehicleListItem key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}

