import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

// Interface para o formato da tabela cars do Supabase
interface CarFromDB {
  id: string;
  brand: string;
  model: string;
  license_plate: string;
  year: number;
  mileage: number;
  color: string;
  engine: string;
  status: string;
  sale_price: number;
  photo_url: string | null;
  notes: string | null;
  created_at: string;
}

// Interface para o formato esperado pelo frontend
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
  descricao?: string;
  especificacoes?: {
    potencia?: string;
    cilindrada?: string;
    cor?: string;
    portas?: number;
    lugares?: number;
  };
}

// Função para mapear os dados da tabela cars para o formato Vehicle
function mapCarToVehicle(car: CarFromDB): Vehicle {
  // Inferir tipo de combustível baseado na cilindrada/motor
  const inferirCombustivel = (engine: string): string => {
    // Lógica básica - pode ser melhorada com dados reais
    return 'Gasolina'; // Default
  };

  // Inferir tipo de câmbio - pode ser adicionado à tabela cars futuramente
  const inferirCambio = (): string => {
    return 'Manual'; // Default
  };

  return {
    id: car.id,
    marca: car.brand.trim(),
    modelo: car.model.trim(),
    ano: car.year,
    preco: car.sale_price || 0,
    quilometragem: car.mileage,
    combustivel: inferirCombustivel(car.engine),
    cambio: inferirCambio(),
    imagem: car.photo_url || '',
    status: car.status === 'vendido' ? 'vendido' : car.status === 'reservado' ? 'reservado' : 'disponivel',
    descricao: car.notes || `${car.brand.trim()} ${car.model.trim()} - ${car.year}`,
    especificacoes: {
      cilindrada: car.engine,
      cor: car.color,
    },
  };
}

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    // Buscar todos os veículos da tabela cars que tenham foto
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .not('photo_url', 'is', null)
      .neq('photo_url', '')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar veículos:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          vehicles: [],
        },
        { status: 400 }
      );
    }

    // Mapear os dados para o formato esperado pelo frontend
    const vehicles = (data || []).map(mapCarToVehicle);

    return NextResponse.json({
      success: true,
      vehicles,
      count: vehicles.length,
    });
  } catch (error: any) {
    console.error('Erro no servidor:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        vehicles: [],
      },
      { status: 500 }
    );
  }
}
