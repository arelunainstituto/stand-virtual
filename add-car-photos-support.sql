-- Script para adicionar suporte a múltiplas fotos na tabela cars

-- Verificar se a coluna já existe antes de adicionar
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'cars'
        AND column_name = 'gallery'
    ) THEN
        ALTER TABLE public.cars ADD COLUMN gallery JSONB;
    END IF;
END $$;

-- Criar tabela separada para fotos dos carros (alternativa mais robusta)
CREATE TABLE IF NOT EXISTS public.car_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_car_photos_car_id ON public.car_photos(car_id);
CREATE INDEX IF NOT EXISTS idx_car_photos_order ON public.car_photos(car_id, display_order);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.car_photos ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura pública
CREATE POLICY "Allow public read access" ON public.car_photos
  FOR SELECT
  USING (true);

-- Criar política para permitir insert/update/delete apenas para usuários autenticados
CREATE POLICY "Allow authenticated insert" ON public.car_photos
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Allow authenticated update" ON public.car_photos
  FOR UPDATE
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Allow authenticated delete" ON public.car_photos
  FOR DELETE
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Migrar fotos existentes da tabela cars para car_photos
INSERT INTO public.car_photos (car_id, photo_url, is_primary, display_order)
SELECT
  id as car_id,
  photo_url,
  true as is_primary,
  0 as display_order
FROM public.cars
WHERE photo_url IS NOT NULL AND photo_url != ''
ON CONFLICT DO NOTHING;

COMMENT ON TABLE public.car_photos IS 'Tabela para armazenar múltiplas fotos de cada veículo';
COMMENT ON COLUMN public.car_photos.display_order IS 'Ordem de exibição das fotos (0 = primeira foto)';
COMMENT ON COLUMN public.car_photos.is_primary IS 'Indica se é a foto principal do veículo';
