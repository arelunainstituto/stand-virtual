-- Criar tabela de veículos
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  marca VARCHAR(100) NOT NULL,
  modelo VARCHAR(100) NOT NULL,
  ano INTEGER NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  quilometragem INTEGER NOT NULL,
  combustivel VARCHAR(50) NOT NULL,
  cambio VARCHAR(50) NOT NULL,
  imagem TEXT,
  status VARCHAR(20) DEFAULT 'disponivel',
  descricao TEXT,
  especificacoes JSONB,
  galeria JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_vehicles_marca ON public.vehicles(marca);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON public.vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_ano ON public.vehicles(ano);
CREATE INDEX IF NOT EXISTS idx_vehicles_preco ON public.vehicles(preco);

-- Inserir dados de exemplo
INSERT INTO public.vehicles (marca, modelo, ano, preco, quilometragem, combustivel, cambio, imagem, status, descricao, especificacoes, galeria)
VALUES
(
  'BMW',
  'Série 3',
  2020,
  35000,
  45000,
  'Gasolina',
  'Automático',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop',
  'disponivel',
  'BMW Série 3 em excelente estado, com histórico de manutenção completo. Equipado com sistema de navegação, bancos em pele e sensores de estacionamento.',
  '{"potencia": "184 cv", "cilindrada": "2.0L", "cor": "Azul", "portas": 4, "lugares": 5}'::jsonb,
  '["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop"]'::jsonb
),
(
  'Audi',
  'A4',
  2019,
  28000,
  52000,
  'Diesel',
  'Manual',
  'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop',
  'disponivel',
  'Audi A4 com motor diesel económico e excelente performance. Interior em excelente estado e equipamentos de série completos.',
  '{"potencia": "150 cv", "cilindrada": "2.0L", "cor": "Branco", "portas": 4, "lugares": 5}'::jsonb,
  '["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop"]'::jsonb
),
(
  'Mercedes-Benz',
  'Classe C',
  2021,
  42000,
  28000,
  'Híbrido',
  'Automático',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop',
  'disponivel',
  'Mercedes-Benz Classe C híbrida, tecnologia de ponta e eficiência energética. Equipamentos premium e conforto excecional.',
  '{"potencia": "204 cv", "cilindrada": "2.0L", "cor": "Preto", "portas": 4, "lugares": 5}'::jsonb,
  '["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop"]'::jsonb
),
(
  'Volkswagen',
  'Golf',
  2018,
  18500,
  68000,
  'Gasolina',
  'Manual',
  'https://images.unsplash.com/photo-1549924231-f129b911e442?w=500&h=300&fit=crop',
  'vendido',
  'Volkswagen Golf confiável e económico. Ideal para uso urbano e viagens. Manutenção acessível e peças facilmente disponíveis.',
  '{"potencia": "115 cv", "cilindrada": "1.4L", "cor": "Cinza", "portas": 5, "lugares": 5}'::jsonb,
  NULL
),
(
  'Ford',
  'Focus',
  2020,
  22000,
  35000,
  'Diesel',
  'Automático',
  'https://images.unsplash.com/photo-1549317336-206569e8475c?w=500&h=300&fit=crop',
  'disponivel',
  'Ford Focus com excelente relação qualidade-preço. Equipamentos modernos e condução agradável.',
  '{"potencia": "125 cv", "cilindrada": "1.5L", "cor": "Vermelho", "portas": 5, "lugares": 5}'::jsonb,
  NULL
),
(
  'Peugeot',
  '308',
  2019,
  19500,
  42000,
  'Gasolina',
  'Manual',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop',
  'reservado',
  'Peugeot 308 com design moderno e interior espaçoso. Tecnologia de ponta e eficiência energética.',
  '{"potencia": "130 cv", "cilindrada": "1.2L", "cor": "Branco", "portas": 5, "lugares": 5}'::jsonb,
  NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura pública
CREATE POLICY "Allow public read access" ON public.vehicles
  FOR SELECT
  USING (true);

-- Criar política para permitir insert/update/delete apenas para usuários autenticados
CREATE POLICY "Allow authenticated insert" ON public.vehicles
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON public.vehicles
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON public.vehicles
  FOR DELETE
  USING (auth.role() = 'authenticated');
