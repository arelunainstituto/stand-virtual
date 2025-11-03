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

    // Buscar todos os veículos da tabela cars (com e sem foto)
    const { data, error } = await supabase
      .from('cars')
      .select('*')
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
    const vehicles = await Promise.all(
      (data || []).map(async (car) => {
        const vehicle = mapCarToVehicle(car);

        // Buscar foto de perfil (prioridade) - URLs que contêm "_profile_"
        const { data: profilePhoto, error: profileError } = await supabase
          .from('car_photos')
          .select('photo_url')
          .eq('car_id', car.id)
          .ilike('photo_url', '%_profile_%')
          .limit(1)
          .single();

        if (profilePhoto && !profileError) {
          // Usar foto de perfil se existir
          vehicle.imagem = profilePhoto.photo_url;
        } else {
          // Se não houver foto de perfil, buscar a primeira foto disponível
          const { data: photos, error: photosError } = await supabase
            .from('car_photos')
            .select('photo_url')
            .eq('car_id', car.id)
            .limit(1);

          if (photos && photos.length > 0 && !photosError) {
            vehicle.imagem = photos[0].photo_url;
          }
          // Se não houver fotos na tabela car_photos, usar photo_url da tabela cars (já mapeado)
        }

        return vehicle;
      })
    );

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
