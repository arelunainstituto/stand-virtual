# Pinklegion - Plataforma de Venda de Viaturas

Uma plataforma moderna e responsiva para venda de viaturas usadas, desenvolvida com Next.js 14, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

### Páginas Principais
- **Página Inicial** - Apresentação da empresa e viaturas em destaque
- **Viaturas** - Catálogo completo com filtros avançados e visualização em grid/lista
- **Detalhes da Viatura** - Página individual com galeria de imagens e especificações
- **Sobre** - Informações sobre a empresa, valores e equipa
- **Serviços** - Descrição dos serviços oferecidos
- **Importação** - Módulo de importação de dados de viaturas
- **Contactos** - Formulário de contacto e informações da empresa

### Funcionalidades Avançadas
- ✅ Filtros dinâmicos (marca, preço, ano, combustível, transmissão)
- ✅ Pesquisa em tempo real
- ✅ Visualização em grid e lista
- ✅ Galeria de imagens com navegação
- ✅ Formulários funcionais (newsletter, contacto)
- ✅ Links para WhatsApp e email
- ✅ Design responsivo
- ✅ Componentes reutilizáveis
- ✅ Dados mock para desenvolvimento

## 🛠️ Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **React Icons** - Ícones
- **React Hooks** - Gestão de estado

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd stand-virtual-organized
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Execute o projeto em desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu browser.

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Páginas da aplicação
│   ├── page.tsx           # Página inicial
│   ├── viaturas/          # Páginas de viaturas
│   │   ├── page.tsx       # Lista de viaturas
│   │   └── [id]/          # Detalhes da viatura
│   ├── sobre/             # Página sobre
│   ├── servicos/          # Página de serviços
│   ├── importacao/        # Módulo de importação
│   └── contactos/         # Página de contactos
├── components/            # Componentes reutilizáveis
│   ├── header.tsx         # Cabeçalho
│   ├── footer.tsx         # Rodapé
│   ├── vehicle-card.tsx   # Card de viatura
│   ├── vehicle-list-item.tsx # Item de lista
│   ├── vehicle-grid.tsx   # Grid de viaturas
│   ├── newsletter-form.tsx # Formulário newsletter
│   └── contact-form.tsx   # Formulário contacto
├── data/                  # Dados mock
│   └── mock-vehicles.ts   # Dados das viaturas
└── styles/               # Estilos globais
    └── globals.css
```

## 🎨 Personalização

### Cores
As cores principais podem ser personalizadas no ficheiro `tailwind.config.ts`:
- `stand-primary` - Cor principal
- `stand-primary-dark` - Cor principal escura

### Dados
Os dados das viaturas podem ser modificados no ficheiro `src/data/mock-vehicles.ts`.

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa o linter

## 📄 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para a sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit as suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, contacte:
- Email: info@pinklegion.pt
- Telefone: +351 212 345 678
- Website: [http://localhost:3000](http://localhost:3000)

