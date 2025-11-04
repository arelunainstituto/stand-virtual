"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { VehicleGrid } from "@/components/vehicle-grid";
import { Vehicle } from "@/data/mock-vehicles";
import { FiFilter, FiGrid, FiList, FiSearch, FiX } from "react-icons/fi";

// Storage key for view mode persistence
const VIEW_MODE_STORAGE_KEY = "viaturas_view_mode";

export default function ViaturasPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('🚀 Estado inicial:', { vehicles: vehicles.length, filteredVehicles: filteredVehicles.length, loading, error });
  
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

  // Função para carregar apenas o modo de visualização do localStorage
  const loadViewModeFromStorage = () => {
    try {
      const savedViewMode = localStorage.getItem(VIEW_MODE_STORAGE_KEY);

      if (savedViewMode && (savedViewMode === "grid" || savedViewMode === "list")) {
        setViewMode(savedViewMode);
      }
    } catch (error) {
      console.warn("Erro ao carregar modo de visualização do localStorage:", error);
    }
  };

  // Carregar configurações salvas (apenas viewMode) e limpar filtros ao montar o componente
  useEffect(() => {
    // Limpar filtros automaticamente sempre que entrar na página
    const clearedFilters = {
      marca: "",
      precoMin: "",
      precoMax: "",
      anoMin: "",
      anoMax: "",
      combustivel: "",
      cambio: "",
    };
    
    setFilters(clearedFilters);
    setSearchTerm("");
    
    // Carregar apenas o modo de visualização salvo
    loadViewModeFromStorage();
  }, []);

  // Available options for dropdowns
  const marcas = Array.from(new Set(vehicles.map(v => v.marca))).sort();
  const combustiveis = Array.from(new Set(vehicles.map(v => v.combustivel))).sort();
  const cambios = Array.from(new Set(vehicles.map(v => v.cambio))).sort();

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Apply filters immediately
    applyFilters(newFilters, searchTerm, vehicles);
  };

  // Apply search in real-time with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      applyFilters(filters, searchTerm, vehicles);
    }, 300);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, vehicles]);

  const applyFilters = (currentFilters: typeof filters, currentSearch: string, currentVehicles: Vehicle[]) => {
    // Se não houver filtros ativos nem busca, mostrar lista completa
    const hasActiveFilters = Object.values(currentFilters).some((v) => Boolean(v));
    if (!hasActiveFilters && !currentSearch) {
      setFilteredVehicles(currentVehicles);
      setFilterFeedback("");
      return;
    }

    let filtered = currentVehicles;

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
    const clearedFilters = {
      marca: "",
      precoMin: "",
      precoMax: "",
      anoMin: "",
      anoMax: "",
      combustivel: "",
      cambio: "",
    };

    setFilters(clearedFilters);
    setSearchTerm("");

    setFilteredVehicles(vehicles);
    setFilterFeedback("");
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(filters, searchTerm, vehicles);
  };

  // Handle view mode change
  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    
    // Salvar modo de visualização no localStorage
    try {
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
    } catch (error) {
      console.warn("Erro ao salvar modo de visualização no localStorage:", error);
    }
  };

  // Buscar veículos do Supabase
  useEffect(() => {
    async function fetchVehicles(retryCount = 0) {
      try {
        console.log('🚗 Iniciando busca de veículos...');
        setLoading(true);
        setError(null);

        const response = await fetch('/api/vehicles', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store', // Evitar cache para sempre buscar dados atualizados
        });

        console.log('📡 Resposta da API:', response.status, response.statusText);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('📊 Dados recebidos:', result);

        if (result.success && result.vehicles) {
          console.log(`✅ ${result.vehicles.length} veículos carregados com sucesso`);
          setVehicles(result.vehicles);
          setFilteredVehicles(result.vehicles);
        } else {
          console.error('❌ Erro na resposta da API:', result.error);
          setError(result.error || 'Erro ao carregar veículos');
        }
      } catch (err: any) {
        console.error('❌ Erro ao buscar veículos:', err);
        
        // Tentar novamente até 2 vezes em caso de erro de rede
        if (retryCount < 2 && (err.name === 'TypeError' || err.message.includes('Failed to fetch'))) {
          console.log(`🔄 Tentando novamente... (tentativa ${retryCount + 1})`);
          setTimeout(() => fetchVehicles(retryCount + 1), 1000);
          return;
        }
        
        setError('Erro ao conectar com o servidor');
      } finally {
        setLoading(false);
        console.log('🏁 Busca de veículos finalizada');
      }
    }

    fetchVehicles();
  }, []);

  useEffect(() => {
    if (vehicles.length > 0) {
      applyFilters(filters, searchTerm, vehicles);
    }
  }, [filters, searchTerm, vehicles]);

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
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent text-gray-900 placeholder:text-gray-500"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => { setSearchTerm(""); applyFilters(filters, "", vehicles); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Limpar busca"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>

            {/* Filter Toggle and View Mode */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors border font-medium ${Object.values(filters).some(f => f) || showFilters ? "bg-stand-primary text-white border-stand-primary hover:bg-stand-primary-dark" : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"}`}
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
                  onClick={() => handleViewModeChange("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-stand-primary text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleViewModeChange("list")}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent text-gray-900"
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
                      type="text"
                      inputMode="numeric"
                      value={filters.precoMin}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        handleFilterChange("precoMin", val);
                      }}
                      placeholder="Ex: 10000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preço Máximo (€)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={filters.precoMax}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        handleFilterChange("precoMax", val);
                      }}
                      placeholder="Ex: 50000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    />
                  </div>

                  {/* Year Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ano Mínimo
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={filters.anoMin}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        handleFilterChange("anoMin", val);
                      }}
                      placeholder="Ex: 2015"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ano Máximo
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={filters.anoMax}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        handleFilterChange("anoMax", val);
                      }}
                      placeholder="Ex: 2023"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent text-gray-900 placeholder:text-gray-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent text-gray-900"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stand-primary focus:border-transparent text-gray-900"
                    >
                      <option value="">Todas as transmissões</option>
                      {cambios.map(cambio => (
                        <option key={cambio} value={cambio}>{cambio}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  >
                    <FiX className="w-4 h-4" />
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

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stand-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando veículos...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 mb-2">⚠️ {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-stand-primary hover:underline"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* Vehicles Grid */}
          {!loading && !error && (
            <>
              {(() => {
                console.log('🎯 Renderizando veículos:', {
                  vehiclesLength: vehicles.length,
                  filteredVehiclesLength: filteredVehicles.length,
                  viewMode,
                  vehicles: vehicles.slice(0, 2) // Mostrar apenas os primeiros 2 para debug
                });
                return null;
              })()}
              {filteredVehicles.length > 0 ? (
                <VehicleGrid vehicles={filteredVehicles} viewMode={viewMode} />
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">
                    {vehicles.length === 0
                      ? "Nenhum veículo disponível no momento."
                      : "Nenhum veículo encontrado com os filtros aplicados."}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

