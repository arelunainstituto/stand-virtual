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

  // Formatar cilindrada (engine)
  const formatarCilindrada = (engineRaw: string | null | undefined): string => {
    if (!engineRaw) return '';
    const engine = engineRaw.toString().trim();

    // Se já contém "L" (litros), normaliza espaço
    if (/\d+(\.\d+)?\s*[lL]/.test(engine)) {
      const match = engine.match(/\d+(?:\.\d+)?/);
      return match ? `${match[0]} L` : engine;
    }

    // Extrai primeiro número (ex.: "1.5", "1598")
    const numMatch = engine.match(/\d+(?:\.\d+)?/);
    if (!numMatch) return engine; // Sem número, retorna como está

    const numStr = numMatch[0];
    // Se for decimal, assume litros
    if (numStr.includes('.')) {
      return `${numStr} L`;
    }

    // Se for inteiro, assume cm³ e converte para L com uma casa decimal
    const cm3 = parseInt(numStr, 10);
    if (!isNaN(cm3) && cm3 > 50) {
      const litros = (cm3 / 1000).toFixed(1);
      return `${litros} L`;
    }

    return engine; // fallback
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
  };
}

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    // Buscar veículos disponíveis ou reservados (excluir vendidos)
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .neq('status', 'vendido')
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

        // Prioridade de fotos:
        // 1. Foto de perfil (_profile_) da car_photos
        // 2. photo_url da tabela cars (já mapeado no vehicle.imagem)
        // 3. Primeira foto disponível na car_photos (se não houver photo_url)

        // Tentar encontrar uma foto de perfil por vários padrões comuns
        const { data: profilePhotos, error: profileError } = await supabase
          .from('car_photos')
          .select('photo_url')
          .eq('car_id', car.id)
          .or(
            [
              'photo_url.ilike.%profile%',
              'photo_url.ilike.%_profile_%',
              'photo_url.ilike.%front%',
              'photo_url.ilike.%frente%',
              'photo_url.ilike.%cover%',
              'photo_url.ilike.%capa%'
            ].join(',')
          )
          .limit(1);

        if (profilePhotos && profilePhotos.length > 0 && !profileError) {
          // 1ª prioridade: Usar foto de perfil se existir
          vehicle.imagem = profilePhotos[0].photo_url;
        } else if (!car.photo_url || car.photo_url === '') {
          // 3ª prioridade: Se não houver photo_url na tabela cars, buscar primeira foto disponível
          const { data: photos, error: photosError } = await supabase
            .from('car_photos')
            .select('photo_url')
            .eq('car_id', car.id)
            .limit(1);

          if (photos && photos.length > 0 && !photosError) {
            vehicle.imagem = photos[0].photo_url;
          }
        }
        // 2ª prioridade: Manter photo_url da tabela cars (já mapeado no vehicle.imagem)

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
