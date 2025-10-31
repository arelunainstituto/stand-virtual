export interface Vehicle {
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

export const mockVehicles: Vehicle[] = [
  {
    id: "1",
    marca: "BMW",
    modelo: "Série 3",
    ano: 2020,
    preco: 35000,
    quilometragem: 45000,
    combustivel: "Gasolina",
    cambio: "Automático",
    imagem: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop",
    status: "disponivel",
    descricao: "BMW Série 3 em excelente estado, com histórico de manutenção completo. Equipado com sistema de navegação, bancos em pele e sensores de estacionamento.",
    especificacoes: {
      potencia: "184 cv",
      cilindrada: "2.0L",
      cor: "Azul",
      portas: 4,
      lugares: 5
    },
    galeria: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "2",
    marca: "Audi",
    modelo: "A4",
    ano: 2019,
    preco: 28000,
    quilometragem: 52000,
    combustivel: "Diesel",
    cambio: "Manual",
    imagem: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop",
    status: "disponivel",
    descricao: "Audi A4 com motor diesel económico e excelente performance. Interior em excelente estado e equipamentos de série completos.",
    especificacoes: {
      potencia: "150 cv",
      cilindrada: "2.0L",
      cor: "Branco",
      portas: 4,
      lugares: 5
    },
    galeria: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "3",
    marca: "Mercedes-Benz",
    modelo: "Classe C",
    ano: 2021,
    preco: 42000,
    quilometragem: 28000,
    combustivel: "Híbrido",
    cambio: "Automático",
    imagem: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop",
    status: "disponivel",
    descricao: "Mercedes-Benz Classe C híbrida, tecnologia de ponta e eficiência energética. Equipamentos premium e conforto excecional.",
    especificacoes: {
      potencia: "204 cv",
      cilindrada: "2.0L",
      cor: "Preto",
      portas: 4,
      lugares: 5
    },
    galeria: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "4",
    marca: "Volkswagen",
    modelo: "Golf",
    ano: 2018,
    preco: 18500,
    quilometragem: 68000,
    combustivel: "Gasolina",
    cambio: "Manual",
    imagem: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=500&h=300&fit=crop",
    status: "vendido",
    descricao: "Volkswagen Golf confiável e económico. Ideal para uso urbano e viagens. Manutenção acessível e peças facilmente disponíveis.",
    especificacoes: {
      potencia: "115 cv",
      cilindrada: "1.4L",
      cor: "Cinza",
      portas: 5,
      lugares: 5
    }
  },
  {
    id: "5",
    marca: "Ford",
    modelo: "Focus",
    ano: 2020,
    preco: 22000,
    quilometragem: 35000,
    combustivel: "Diesel",
    cambio: "Automático",
    imagem: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=500&h=300&fit=crop",
    status: "disponivel",
    descricao: "Ford Focus com excelente relação qualidade-preço. Equipamentos modernos e condução agradável.",
    especificacoes: {
      potencia: "125 cv",
      cilindrada: "1.5L",
      cor: "Vermelho",
      portas: 5,
      lugares: 5
    }
  },
  {
    id: "6",
    marca: "Peugeot",
    modelo: "308",
    ano: 2019,
    preco: 19500,
    quilometragem: 42000,
    combustivel: "Gasolina",
    cambio: "Manual",
    imagem: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop",
    status: "reservado",
    descricao: "Peugeot 308 com design moderno e interior espaçoso. Tecnologia de ponta e eficiência energética.",
    especificacoes: {
      potencia: "130 cv",
      cilindrada: "1.2L",
      cor: "Branco",
      portas: 5,
      lugares: 5
    }
  }
];

