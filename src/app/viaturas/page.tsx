"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { VehicleGrid } from "@/components/vehicle-grid";
import { mockVehicles } from "@/data/mock-vehicles";
import { FiFilter, FiGrid, FiList, FiSearch, FiX } from "react-icons/fi";

export default function ViaturasPage() {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter states
  const [filters, setFilters] = useState({
    marca: "",
    precoMin: "",
    precoMax: "",
    anoMin: "",
    anoMax: "",
    combustivel: "",
    cambio: "",
  });

  const [filterFeedback, setFilterFeedback] = useState("");

  // Available options for dropdowns
  const marcas = Array.from(new Set(vehicles.map(v => v.marca))).sort();
  const combustiveis = Array.from(new Set(vehicles.map(v => v.combustivel))).sort();
  const cambios = Array.from(new Set(vehicles.map(v => v.cambio))).sort();

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Apply filters immediately
    const newFilters = { ...filters, [key]: value };
    applyFilters(newFilters, searchTerm);
  };

  const applyFilters = (currentFilters: typeof filters, currentSearch: string) => {
    let filtered = vehicles;

    // Search filter
    if (currentSearch) {
      filtered = filtered.filter(vehicle =>
        vehicle.marca.toLowerCase().includes(currentSearch.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(currentSearch.toLowerCase())
      );
    }

    // Brand filter
    if (currentFilters.marca) {
      filtered = filtered.filter(vehicle => vehicle.marca === currentFilters.marca);
    }

    // Price filters
    if (currentFilters.precoMin) {
      filtered = filtered.filter(vehicle => vehicle.preco >= parseInt(currentFilters.precoMin));
    }
    if (currentFilters.precoMax) {
      filtered = filtered.filter(vehicle => vehicle.preco <= parseInt(currentFilters.precoMax));
    }

    // Year filters
    if (currentFilters.anoMin) {
      filtered = filtered.filter(vehicle => vehicle.ano >= parseInt(currentFilters.anoMin));
    }
    if (currentFilters.anoMax) {
      filtered = filtered.filter(vehicle => vehicle.ano <= parseInt(currentFilters.anoMax));
    }

    // Fuel filter
    if (currentFilters.combustivel) {
      filtered = filtered.filter(vehicle => vehicle.combustivel === currentFilters.combustivel);
    }

    // Transmission filter
    if (currentFilters.cambio) {
      filtered = filtered.filter(vehicle => vehicle.cambio === currentFilters.cambio);
    }

    setFilteredVehicles(filtered);

    // Update feedback
    const activeFilters = Object.entries(currentFilters).filter(([_, value]) => value);
    if (activeFilters.length > 0 || currentSearch) {
      setFilterFeedback(`${filtered.length} veículos encontrados com os filtros aplicados`);
    } else {
      setFilterFeedback("");
    }
  };

  const clearFilters = () => {
    setFilters({
      marca: "",
      precoMin: "",
      precoMax: "",
      anoMin: "",
      anoMax: "",
      combustivel: "",
      cambio: "",
    });
    setSearchTerm("");
    setFilteredVehicles(vehicles);
    setFilterFeedback("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(filters, searchTerm);
  };

  useEffect(() => {
    applyFilters(filters, searchTerm);
  }, [vehicles]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Viaturas</h1>
            <p className="text-lg text-gray-600">
              Descubra a nossa seleção de veículos usados com qualidade garantida
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar por marca ou modelo..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent"
                />
              </div>
            </form>

            {/* Filter Toggle and View Mode */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                <FiFilter className="w-4 h-4 mr-2" />
                Filtros
                {Object.values(filters).some(f => f) && (
                  <span className="ml-2 bg-stand-primary text-white text-xs px-2 py-1 rounded-full">
                    {Object.values(filters).filter(f => f).length}
                  </span>
                )}
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Vista:</span>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-stand-primary text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-stand-primary text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Brand Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marca
                    </label>
                    <select
                      value={filters.marca}
                      onChange={(e) => handleFilterChange("marca", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent"
                    >
                      <option value="">Todas as marcas</option>
                      {marcas.map(marca => (
                        <option key={marca} value={marca}>{marca}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preço Mínimo (€)
                    </label>
                    <input
                      type="number"
                      value={filters.precoMin}
                      onChange={(e) => handleFilterChange("precoMin", e.target.value)}
                      placeholder="Ex: 10000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preço Máximo (€)
                    </label>
                    <input
                      type="number"
                      value={filters.precoMax}
                      onChange={(e) => handleFilterChange("precoMax", e.target.value)}
                      placeholder="Ex: 50000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent"
                    />
                  </div>

                  {/* Year Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ano Mínimo
                    </label>
                    <input
                      type="number"
                      value={filters.anoMin}
                      onChange={(e) => handleFilterChange("anoMin", e.target.value)}
                      placeholder="Ex: 2015"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ano Máximo
                    </label>
                    <input
                      type="number"
                      value={filters.anoMax}
                      onChange={(e) => handleFilterChange("anoMax", e.target.value)}
                      placeholder="Ex: 2023"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent"
                    />
                  </div>

                  {/* Fuel Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Combustível
                    </label>
                    <select
                      value={filters.combustivel}
                      onChange={(e) => handleFilterChange("combustivel", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent"
                    >
                      <option value="">Todos os combustíveis</option>
                      {combustiveis.map(combustivel => (
                        <option key={combustivel} value={combustivel}>{combustivel}</option>
                      ))}
                    </select>
                  </div>

                  {/* Transmission Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transmissão
                    </label>
                    <select
                      value={filters.cambio}
                      onChange={(e) => handleFilterChange("cambio", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent"
                    >
                      <option value="">Todas as transmissões</option>
                      {cambios.map(cambio => (
                        <option key={cambio} value={cambio}>{cambio}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={clearFilters}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <FiX className="w-4 h-4 mr-2" />
                    Limpar Filtros
                  </button>
                </div>
              </div>
            )}

            {/* Filter Feedback */}
            {filterFeedback && (
              <div className="mt-4 p-3 bg-stand-primary/10 text-stand-primary rounded-lg">
                {filterFeedback}
              </div>
            )}
          </div>

          {/* Vehicles Grid */}
          <VehicleGrid vehicles={filteredVehicles} viewMode={viewMode} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

