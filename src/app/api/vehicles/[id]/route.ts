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
  gallery?: any;
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
    especificacoes: {
      cilindrada: formatarCilindrada(car.engine),
      cor: normalizarCor(car.color),
    },
    galeria: Array.isArray(car.gallery)
      ? (car.gallery as string[]).filter(Boolean)
      : (car.photo_url ? [car.photo_url] : []),
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
      .select('photo_url, photo_name, created_at')
      .eq('car_id', id)
      .order('created_at', { ascending: true });

    // Mapear os dados para o formato esperado pelo frontend
    const vehicle = mapCarToVehicle(data);

    // Combinar fotos de car_photos com fallback 'photo_url'
    const photosFromCarPhotos = (photos && photos.length > 0 && !photosError)
      ? photos.map((p) => p.photo_url)
      : [];

    const fallbackPhoto = data.photo_url ? [data.photo_url] : [];

    const combined = [...photosFromCarPhotos, ...fallbackPhoto];
    const deduped = combined.filter((url, idx) => combined.indexOf(url) === idx);

    if (deduped.length > 0) {
      vehicle.galeria = deduped;
      vehicle.imagem = deduped[0];
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
