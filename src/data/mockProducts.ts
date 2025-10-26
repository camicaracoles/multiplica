import type { Product } from '../types/product';

// Datos mock para testing (20+ productos)
export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Mochila Fjallraven Foldsack No. 1 para Laptop 15 Pulgadas",
    price: 109.95,
    description: "Tu mochila perfecta para uso diario y caminatas en el bosque. Guarda tu laptop (hasta 15 pulgadas) en el compartimento acolchado. Ideal para el día a día con múltiples bolsillos y diseño ergonómico.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Camisetas Premium Ajuste Slim para Hombre",
    price: 22.3,
    description: "Estilo ajustado, mangas largas tipo raglan con contraste, cuello henley de tres botones. Tela ligera y suave para mayor transpirabilidad y comodidad durante todo el día.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Chaqueta de Algodón para Hombre",
    price: 55.99,
    description: "Excelente chaqueta exterior para primavera, otoño e invierno. Adecuada para muchas ocasiones como trabajo, senderismo, camping, escalada en montaña, ciclismo, viajes u otras actividades al aire libre.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: "Camisa Casual Ajuste Slim para Hombre",
    price: 15.99,
    description: "El color puede variar ligeramente entre la pantalla y el producto real. Ten en cuenta que las tallas pueden variar según la contextura de cada persona, por lo que se recomienda revisar la tabla de tallas detallada.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 }
  },
  {
    id: 5,
    title: "Pulsera John Hardy Legends Naga Dragón Oro y Plata para Mujer",
    price: 695,
    description: "De nuestra Colección Legends, la Naga fue inspirada por el mítico dragón de agua que protege la perla del océano. Úsala hacia adentro para recibir amor y abundancia, o hacia afuera para protección.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 }
  },
  {
    id: 6,
    title: "Anillo de Oro Macizo con Micropavé",
    price: 168,
    description: "Satisfacción garantizada. Devolución o cambio de cualquier pedido dentro de 30 días. Diseñado y vendido por Hafeez Center. Joyería de alta calidad con acabado impecable.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.9, count: 70 }
  },
  {
    id: 7,
    title: "Anillo de Compromiso Solitario Bañado en Oro Blanco",
    price: 9.99,
    description: "Anillo clásico de compromiso con diamante solitario para ella. Regalo perfecto para consentir a tu amor en compromisos, bodas, aniversarios, día de San Valentín y ocasiones especiales.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3, count: 400 }
  },
  {
    id: 8,
    title: "Aros Túnel de Acero Inoxidable Bañados en Oro Rosa",
    price: 10.99,
    description: "Aros tipo túnel con doble ensanchamiento bañados en oro rosa. Fabricados en acero inoxidable 316L de alta calidad. Diseño moderno y elegante.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 1.9, count: 100 }
  },
  {
    id: 9,
    title: "Disco Duro Externo Portátil WD Elements 2TB USB 3.0",
    price: 64,
    description: "Compatibilidad USB 3.0 y USB 2.0. Transferencias rápidas de datos. Mejora el rendimiento de tu PC. Alta capacidad de almacenamiento. Formateado NTFS para Windows 10, 8.1 y 7. Puede requerir reformateo para otros sistemas operativos.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: { rate: 3.3, count: 203 }
  },
  {
    id: 10,
    title: "SSD Interno SanDisk PLUS 1TB SATA III 6 Gb/s",
    price: 109,
    description: "Actualización fácil para un arranque, apagado, carga de aplicaciones y respuesta más rápidos. Comparado con discos duros SATA de 2.5 pulgadas a 5400 RPM. Basado en especificaciones publicadas y pruebas internas.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 470 }
  },
  {
    id: 11,
    title: "SSD Silicon Power 256GB 3D NAND A55 SATA III 2.5",
    price: 109,
    description: "Tecnología 3D NAND flash para ofrecer altas velocidades de transferencia. Velocidades notables que permiten un arranque más rápido y un mejor rendimiento general del sistema.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 319 }
  },
  {
    id: 12,
    title: "Disco Duro Externo WD 4TB para Gaming PlayStation 4",
    price: 114,
    description: "Expande tu experiencia de juego en PS4. Juega en cualquier lugar. Configuración rápida y fácil. Diseño elegante con alta capacidad. Garantía limitada del fabricante de 3 años.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 400 }
  },
  {
    id: 13,
    title: "Monitor Acer SB220Q 21.5 Pulgadas Full HD IPS Ultra Delgado",
    price: 599,
    description: "Pantalla IPS Full HD de 21.5 pulgadas (1920 x 1080) con tecnología Radeon FreeSync. Tasa de refresco de 75Hz por puerto HDMI. Diseño sin marco ultra delgado. Tiempo de respuesta de 4ms. Panel IPS. Relación de aspecto 16:9. Soporte para 16.7 millones de colores. Brillo de 250 nits. Ángulo de inclinación de -5 a 15 grados. Ángulos de visión horizontal y vertical de 178 grados.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 250 }
  },
  {
    id: 14,
    title: "Monitor Gamer Samsung Curvo 49 Pulgadas CHG90 144Hz QLED Ultra Ancho",
    price: 999.99,
    description: "Monitor gamer super ultra ancho de 49 pulgadas curvo 32:9 equivalente a dos pantallas de 27 pulgadas lado a lado. Tecnología QUANTUM DOT (QLED), soporte HDR y calibración de fábrica que proporciona colores y contraste increíblemente realistas y precisos. Tasa de refresco alta de 144Hz y tiempo de respuesta ultra rápido de 1ms que eliminan el desenfoque de movimiento y reducen el retraso de entrada.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: { rate: 2.2, count: 140 }
  },
  {
    id: 15,
    title: "Chaqueta de Invierno 3 en 1 para Mujer Snowboard",
    price: 56.99,
    description: "Nota: La chaqueta es talla estándar, elige tu talla habitual. Material: 100% Poliéster. Forro desmontable de polar cálido. Forro funcional desmontable amigable con la piel, liviano y cálido. Chaqueta con cuello alto te mantiene abrigada en clima frío. Bolsillos con cierre: 2 bolsillos de mano, 2 bolsillos en el pecho y 1 bolsillo oculto interno. Diseño humanizado: capucha ajustable y desmontable, puños ajustables para prevenir viento y agua. Diseño 3 en 1 desmontable brinda más conveniencia, puedes separar el abrigo y el forro según necesites. Adecuada para diferentes estaciones.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: { rate: 2.6, count: 235 }
  },
  {
    id: 16,
    title: "Chaqueta Moto de Cuero Sintético con Capucha para Mujer",
    price: 29.95,
    description: "100% POLIURETANO (exterior) 100% POLIÉSTER (forro) 75% POLIÉSTER 25% ALGODÓN (suéter). Material de cuero sintético para estilo y comodidad. 2 bolsillos frontales. Chaqueta estilo mezclilla con capucha 2 en 1. Detalle de botones en la cintura. Costuras detalladas en los lados. LAVAR SOLO A MANO / NO USAR CLORO / SECAR AL AIRE / NO PLANCHAR.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    rating: { rate: 2.9, count: 340 }
  },
  {
    id: 17,
    title: "Chaqueta Impermeable Cortaviento a Rayas para Mujer",
    price: 39.99,
    description: "Liviana, perfecta para viajes o uso casual. Manga larga con capucha, diseño de cintura ajustable con cordón. Cierre frontal con botones y cremallera. Completamente forrada a rayas. Tiene 2 bolsillos laterales de buen tamaño para guardar todo tipo de cosas. Cubre las caderas y la capucha es generosa sin exagerar. Capucha forrada en algodón con cordones ajustables le dan un aspecto realmente elegante.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    rating: { rate: 3.8, count: 679 }
  },
  {
    id: 18,
    title: "Blusa de Manga Corta Cuello Barco para Mujer",
    price: 9.85,
    description: "95% RAYÓN 5% SPANDEX. Hecho en USA o importado. No usar cloro. Tela liviana con gran elasticidad para mayor comodidad. Acanalado en mangas y cuello. Doble costura en el dobladillo inferior. Perfecta para uso diario.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    rating: { rate: 4.7, count: 130 }
  },
  {
    id: 19,
    title: "Polera Deportiva Manga Corta Absorbe Humedad para Mujer",
    price: 7.95,
    description: "100% Poliéster. Lavable a máquina. Poliéster catiónico 100% interlock. Preencogida para un gran ajuste. Liviana, holgada y altamente transpirable con tela que absorbe la humedad. Tela suave y liviana con cuello en V cómodo y ajuste más delgado. Ofrece una silueta elegante y más femenina con comodidad adicional.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    rating: { rate: 4.5, count: 146 }
  },
  {
    id: 20,
    title: "Polera Casual de Algodón Manga Corta para Mujer",
    price: 12.99,
    description: "95% Algodón, 5% Spandex. Características: Casual, manga corta, estampado de letras, cuello en V, poleras de moda. La tela es suave y tiene algo de elasticidad. Ocasión: Casual, oficina, playa, escuela, hogar, calle. Temporada: Primavera, verano, otoño, invierno.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    rating: { rate: 3.6, count: 145 }
  }
];

