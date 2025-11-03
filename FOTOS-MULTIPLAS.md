# Sistema de Múltiplas Fotos para Veículos

## Visão Geral

O sistema agora suporta múltiplas fotos por veículo através de um carrossel interativo na página de detalhes.

## Funcionalidades Implementadas

### ✅ Carrossel de Fotos
- **Navegação com setas**: Botões esquerda/direita para navegar entre as fotos
- **Contador de fotos**: Mostra "X / Y" fotos na parte inferior
- **Miniaturas**: Grade de thumbnails clicáveis abaixo da foto principal
- **Responsivo**: Funciona bem em desktop e mobile

### ✅ Suporte a Carros Sem Foto
- Carros sem foto agora aparecem na listagem
- Ícone de placeholder (🚗) exibido quando não há fotos
- Mensagem "Sem fotos disponíveis" na página de detalhes

## Estrutura do Banco de Dados

### Opção 1: Tabela Separada (Recomendado)

Para adicionar suporte a múltiplas fotos, execute o SQL:

\`\`\`bash
# No painel do Supabase > SQL Editor, cole o conteúdo de:
cat add-car-photos-support.sql
\`\`\`

Isso cria a tabela `car_photos`:
- `id`: UUID (chave primária)
- `car_id`: UUID (referência ao carro)
- `photo_url`: TEXT (URL da foto)
- `display_order`: INTEGER (ordem de exibição)
- `is_primary`: BOOLEAN (foto principal)

### Opção 2: Campo JSONB (Mais Simples)

Adicione um campo `gallery` do tipo JSONB à tabela `cars`:

\`\`\`sql
ALTER TABLE public.cars ADD COLUMN gallery JSONB;

-- Exemplo de dados:
UPDATE public.cars SET gallery = '["url1.jpg", "url2.jpg", "url3.jpg"]'::jsonb WHERE id = 'car-id';
\`\`\`

## Como Adicionar Fotos aos Carros

### Via SQL (Tabela car_photos)

\`\`\`sql
-- Adicionar múltiplas fotos para um carro
INSERT INTO public.car_photos (car_id, photo_url, display_order, is_primary)
VALUES
  ('car-uuid-aqui', 'https://exemplo.com/foto1.jpg', 0, true),
  ('car-uuid-aqui', 'https://exemplo.com/foto2.jpg', 1, false),
  ('car-uuid-aqui', 'https://exemplo.com/foto3.jpg', 2, false);
\`\`\`

### Via Script TypeScript

\`\`\`bash
# Adicionar fotos de exemplo aos carros
SUPABASE_SERVICE_ROLE_KEY=sua-chave npx ts-node add-sample-photos.ts
\`\`\`

### Via Painel Supabase

1. Acesse: https://bzkgjtxrzwzoibzesphi.supabase.co
2. Navegue até: Table Editor > car_photos
3. Clique em "Insert row"
4. Preencha:
   - `car_id`: UUID do carro
   - `photo_url`: URL da foto
   - `display_order`: Ordem (0, 1, 2...)
   - `is_primary`: true para foto principal

## Fontes de Fotos

### Unsplash (Gratuito)
\`\`\`
https://images.unsplash.com/photo-{id}?w=800&h=600&fit=crop
\`\`\`

### Exemplos de URLs:
\`\`\`
https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop
\`\`\`

### Supabase Storage (Recomendado para produção)
1. Criar bucket público no Supabase Storage
2. Upload de fotos
3. Usar URLs do tipo: `https://bzkgjtxrzwzoibzesphi.supabase.co/storage/v1/object/public/car-photos/nome-arquivo.jpg`

## Como Funciona

### API
- `GET /api/vehicles`: Lista todos os carros (com e sem foto)
- `GET /api/vehicles/[id]`: Busca detalhes + fotos do carro
  - Busca fotos de `car_photos` ordenadas por `display_order`
  - Se não houver fotos, usa `photo_url` da tabela `cars`
  - Se não houver nenhuma foto, retorna array vazio

### Frontend
- **Página de Detalhes**: Carrossel completo com navegação
- **Listagem**: Mostra primeira foto ou placeholder
- **Sem Foto**: Exibe ícone de carro e mensagem amigável

## Próximos Passos

1. **Executar SQL**: `add-car-photos-support.sql`
2. **Adicionar Fotos**: Usar script ou manualmente
3. **Testar**: Navegar pelos carros e ver o carrossel
4. **Upload Real**: Configurar Supabase Storage para fotos próprias

## Troubleshooting

### Carrossel não aparece?
- Verifique se há múltiplas fotos na tabela `car_photos`
- Verifique o console do navegador por erros
- Confirme que as URLs das fotos estão acessíveis

### Fotos não carregam?
- Verifique CORS (URLs externas precisam permitir)
- Adicione domínios em `next.config.js > images.remotePatterns`
- Use Supabase Storage para controle total

### Carros sem foto não aparecem?
- Confirme que o filtro foi removido da API
- Verifique `/src/app/api/vehicles/route.ts` linha 79-83
