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
  galeria?: string[];
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

  // Formatar cilindrada (engine)
  const formatarCilindrada = (engineRaw: string | null | undefined): string => {
    if (!engineRaw) return '';
    const engine = engineRaw.toString().trim();

    if (/\d+(\.\d+)?\s*[lL]/.test(engine)) {
      const match = engine.match(/\d+(?:\.\d+)?/);
      return match ? `${match[0]} L` : engine;
    }

    const numMatch = engine.match(/\d+(?:\.\d+)?/);
    if (!numMatch) return engine;

    const numStr = numMatch[0];
    if (numStr.includes('.')) {
      return `${numStr} L`;
    }

    const cm3 = parseInt(numStr, 10);
    if (!isNaN(cm3) && cm3 > 50) {
      const litros = (cm3 / 1000).toFixed(1);
      return `${litros} L`;
    }

    return engine;
  };

  // Normalizar cor para Title Case
  const normalizarCor = (colorRaw: string | null | undefined): string => {
    if (!colorRaw) return '';
    return colorRaw
      .toString()
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
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
      cilindrada: formatarCilindrada(car.engine),
      cor: normalizarCor(car.color),
    },
    galeria: car.photo_url ? [car.photo_url] : [],
  };
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient();
    const { id } = params;

    // Buscar veículo específico por ID
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao buscar veículo:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          vehicle: null,
        },
        { status: 404 }
      );
    }

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          error: 'Veículo não encontrado',
          vehicle: null,
        },
        { status: 404 }
      );
    }

    // Buscar fotos do veículo da tabela car_photos
    const { data: photos, error: photosError } = await supabase
      .from('car_photos')
      .select('photo_url')
      .eq('car_id', id);

    // Mapear os dados para o formato esperado pelo frontend
    const vehicle = mapCarToVehicle(data);

    // Se houver fotos na tabela car_photos, usar essas fotos
    if (photos && photos.length > 0 && !photosError) {
      // Ordenar com prioridade para fotos de perfil/capa
      const isProfile = (url: string) => {
        const u = url.toLowerCase();
        return (
          u.includes('profile') ||
          u.includes('_profile_') ||
          u.includes('front') ||
          u.includes('frente') ||
          u.includes('cover') ||
          u.includes('capa')
        );
      };

      const sorted = photos
        .map((p) => p.photo_url)
        .sort((a, b) => {
          const ap = isProfile(a) ? 0 : 1;
          const bp = isProfile(b) ? 0 : 1;
          return ap - bp;
        });

      vehicle.galeria = sorted;

      // Definir imagem principal com a melhor foto disponível
      const preferred = sorted.find((url) => isProfile(url));
      if (preferred) {
        vehicle.imagem = preferred;
      } else if (!vehicle.imagem && sorted.length > 0) {
        vehicle.imagem = sorted[0];
      }
    } else {
      // Sem fotos em car_photos: manter photo_url da tabela cars se existir
      // Caso contrário, imagem fica vazia e o frontend mostrará placeholder
    }

    return NextResponse.json({
      success: true,
      vehicle,
    });
  } catch (error: any) {
    console.error('Erro no servidor:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        vehicle: null,
      },
      { status: 500 }
    );
  }
}
