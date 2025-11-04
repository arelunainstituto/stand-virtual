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

    // Se houver carros, buscar todas as fotos de uma só vez para evitar N+1
    let vehicles: Vehicle[] = [];
    if (data && data.length > 0) {
      const carIds = data.map((c) => c.id);

      const { data: allPhotos, error: photosError } = await supabase
        .from('car_photos')
        .select('car_id, photo_url, created_at')
        .in('car_id', carIds)
        .order('created_at', { ascending: true });

      if (photosError) {
        // Não bloquear a resposta por erro nas fotos; seguimos apenas com os dados dos carros
        console.warn('Aviso ao buscar fotos:', photosError.message);
      }

      // Organizar fotos por carro (primeira foto é a de capa)
      const photosByCarId = new Map<string, string[]>();
      (allPhotos || []).forEach((p) => {
        const list = photosByCarId.get(p.car_id) || [];
        list.push(p.photo_url);
        photosByCarId.set(p.car_id, list);
      });

      // Função para escolher foto de capa (prioriza photo_url da tabela cars)
      const chooseBestPhoto = (carId: string, photoUrl: string | null): string => {
        // SEMPRE usar photo_url se existir (é o campo oficial de capa)
        if (photoUrl && photoUrl !== '') {
          return photoUrl;
        }

        // Fallback: usar primeira foto de car_photos se não houver photo_url
        const list = photosByCarId.get(carId) || [];
        if (list.length > 0) {
          return list[0];
        }

        return '';
      };

      vehicles = data.map((car) => {
        const v = mapCarToVehicle(car);
        v.imagem = chooseBestPhoto(car.id, car.photo_url);
        return v;
      });
    }

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
