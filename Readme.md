# 📚 Documentación del Proyecto - Multiplica E-commerce

## 🌐 Demo en Vivo

**🚀 Ver aplicación desplegada**: [https://multiplica-hipl.vercel.app/](https://multiplica-hipl.vercel.app/)

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Componentes Principales](#componentes-principales)
4. [Hooks Personalizados](#hooks-personalizados)
5. [Servicios y API](#servicios-y-api)
6. [Utilidades](#utilidades)
7. [Sistema de Diseño](#sistema-de-diseño)
8. [Guía de Desarrollo](#guía-de-desarrollo)

---

## 🎯 Descripción General

**Multiplica** es una aplicación de e-commerce desarrollada con React + TypeScript + Vite que consume la API de FakeStore. El proyecto implementa un catálogo de productos completo con funcionalidades avanzadas de filtrado, búsqueda y navegación.

### Características Principales

- ✅ **Catálogo de productos** con grid responsivo
- ✅ **Sistema de filtros avanzados** (precio, categoría, valoración, ordenamiento)
- ✅ **Búsqueda en tiempo real** con sincronización de URL
- ✅ **Navegación por categorías** con visualización de tarjetas
- ✅ **Detalle de productos** con modal y página dedicada
- ✅ **Estados de carga** con skeleton loaders animados
- ✅ **Manejo de errores** con componentes de error personalizados
- ✅ **Traducciones** de productos al español
- ✅ **Conversión de moneda** USD → CLP
- ✅ **Diseño responsivo** mobile-first
- ✅ **Sistema de variables CSS** para consistencia visual

---

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── CategoryFilter/  # Filtro de categorías
│   ├── ErrorMessage/    # Mensajes de error con variantes
│   ├── Header/          # Cabecera con navegación
│   ├── LoadingSpinner/  # Spinner de carga
│   ├── PriceFilter/     # Filtro de rango de precios
│   ├── ProductCard/     # Tarjeta de producto
│   ├── ProductGrid/     # Grid de productos
│   ├── RatingFilter/    # Filtro de valoración
│   ├── Skeleton/        # Componentes de carga skeleton
│   └── SortFilter/      # Filtro de ordenamiento
│
├── hooks/               # Custom hooks
│   ├── useProducts.ts   # Hook para gestión de productos
│   └── useURLParams.ts  # Hook para parámetros de URL
│
├── pages/               # Páginas de la aplicación
│   ├── Home.tsx         # Página de inicio
│   ├── ProductsPage.tsx # Catálogo completo con filtros
│   ├── CategoriesPage.tsx # Navegación por categorías
│   ├── OffersPage.tsx   # Página de ofertas
│   └── ProductDetailPage.tsx # Detalle de producto
│
├── services/            # Servicios de API
│   └── api.ts           # Cliente HTTP y funciones de API
│
├── utils/               # Utilidades
│   └── formatters.ts    # Funciones de formateo
│
├── types/               # Definiciones de tipos
│   └── product.ts       # Tipos de productos
│
└── styles/              # Estilos globales
    ├── variables.css    # Variables CSS del sistema de diseño
    └── global.css       # Estilos globales
```

---

## 🧩 Componentes Principales

### 1. **SortFilter** - Filtro de Ordenamiento

**Ubicación**: `src/components/SortFilter/SortFilter.tsx`

**Descripción**: Selector dropdown para ordenar productos por diferentes criterios.

**Opciones de ordenamiento**:
- Predeterminado (sin ordenamiento)
- Precio: Menor a Mayor
- Precio: Mayor a Menor
- Mejor Valorados
- Nombre A-Z

**Uso**:
```tsx
const [sortBy, setSortBy] = useState<SortOption>('default');
<SortFilter value={sortBy} onChange={setSortBy} />
```

---

### 2. **PriceFilter** - Filtro de Rango de Precios

**Ubicación**: `src/components/PriceFilter/PriceFilter.tsx`

**Descripción**: Inputs numéricos para establecer un rango de precios mínimo y máximo.

**Características**:
- Validación de rangos (min ≤ max)
- Estado local para evitar re-renders
- Botón de limpiar cuando hay filtros activos
- Visualización del rango en formato CLP

**Uso**:
```tsx
const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 1000000 });
<PriceFilter 
  value={priceRange} 
  onChange={setPriceRange}
  minPrice={0}
  maxPrice={1000000}
/>
```

---

### 3. **RatingFilter** - Filtro de Valoración

**Ubicación**: `src/components/RatingFilter/RatingFilter.tsx`

**Descripción**: Botones para filtrar productos por calificación mínima.

**Opciones**:
- Todas las valoraciones
- 4★ o más
- 3★ o más
- 2★ o más
- 1★ o más

**Uso**:
```tsx
const [minRating, setMinRating] = useState<number>(0);
<RatingFilter value={minRating} onChange={setMinRating} />
```

---

### 4. **Skeleton** - Componentes de Carga

**Ubicación**: `src/components/Skeleton/Skeleton.tsx`

**Descripción**: Placeholders animados con efecto shimmer para estados de carga.

**Variantes**:
- `text`: Líneas de texto
- `circular`: Avatares o iconos circulares
- `rectangular`: Imágenes o bloques
- `card`: Tarjetas completas

**Componentes especializados**:
- `ProductCardSkeleton`: Skeleton de tarjeta de producto
- `ProductGridSkeleton`: Grid completo de skeletons

**Uso**:
```tsx
{loading && <ProductGridSkeleton count={20} />}
{loading && <ProductCardSkeleton />}
```

---

### 5. **ErrorMessage** - Mensajes de Error

**Ubicación**: `src/components/ErrorMessage/ErrorMessage.tsx`

**Descripción**: Componente para mostrar mensajes de error con diferentes variantes.

**Variantes**:
- `error`: Errores críticos (rojo)
- `warning`: Advertencias (amarillo)
- `info`: Información (azul)

**Uso**:
```tsx
<ErrorMessage 
  message="No se pudieron cargar los productos" 
  variant="error"
  onRetry={refetch}
/>
```

---

## 🪝 Hooks Personalizados

### 1. **useProducts** - Gestión de Productos

**Ubicación**: `src/hooks/useProducts.ts`

**Descripción**: Hook para cargar y gestionar el estado de productos desde la API.

**Retorna**:
```typescript
{
  products: Product[];      // Array de productos
  loading: boolean;         // Estado de carga
  error: string | null;     // Mensaje de error
  refetch: () => Promise<void>; // Función para recargar
}
```

**Uso**:
```tsx
function ProductList() {
  const { products, loading, error, refetch } = useProducts();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  
  return <ProductGrid products={products} />;
}
```

---

### 2. **useURLParams** - Sincronización con URL

**Ubicación**: `src/hooks/useURLParams.ts`

**Descripción**: Hook para sincronizar el estado de React con los parámetros de la URL.

**Características**:
- Lee parámetros de la URL al montar
- Actualiza la URL sin recargar la página
- Mantiene sincronización bidireccional

**Retorna**:
```typescript
{
  params: URLParams;        // { search: string, category: string }
  updateURLParams: (newParams: Partial<URLParams>) => void;
}
```

**Uso**:
```tsx
const { params, updateURLParams } = useURLParams();

const handleSearch = (searchTerm: string) => {
  updateURLParams({ search: searchTerm });
};
```

---

## 🌐 Servicios y API

### Cliente HTTP - `api.ts`

**Ubicación**: `src/services/api.ts`

**Descripción**: Cliente Axios configurado para interactuar con FakeStore API.

**Configuración**:
- Base URL: `https://fakestoreapi.com`
- Timeout: 10 segundos
- Headers: `Content-Type: application/json`

**Funciones disponibles**:

#### `getAllProducts()`
Obtiene todos los productos traducidos al español.
```typescript
const products = await getAllProducts();
```

#### `getProductById(id: number)`
Obtiene un producto específico por ID.
```typescript
const product = await getProductById(1);
```

#### `getProductsByCategory(category: string)`
Obtiene productos de una categoría específica.
```typescript
const electronics = await getProductsByCategory('electronics');
```

#### `getCategories()`
Obtiene todas las categorías disponibles.
```typescript
const categories = await getCategories();
// ["electronics", "jewelery", "men's clothing", "women's clothing"]
```

---

## 🛠️ Utilidades

### Formatters - `formatters.ts`

**Ubicación**: `src/utils/formatters.ts`

**Descripción**: Funciones de formateo para precios, categorías y números.

#### Funciones de Precio

**`convertToCLP(priceUSD: number): number`**
Convierte USD a CLP (tasa: 1 USD = 950 CLP).
```typescript
convertToCLP(100) // 95000
```

**`formatPrice(priceUSD: number): string`**
Formatea precio en formato CLP.
```typescript
formatPrice(100) // "$95.000"
```

**`calculateDiscountPrice(priceUSD: number, discountPercent: number): number`**
Calcula precio con descuento.
```typescript
calculateDiscountPrice(100, 20) // 76000 (95000 - 20%)
```

**`formatDiscountPrice(priceUSD: number, discountPercent: number): string`**
Formatea precio con descuento.
```typescript
formatDiscountPrice(100, 20) // "$76.000"
```

#### Funciones de Categorías

**`translateCategory(category: string): string`**
Traduce categoría de inglés a español.
```typescript
translateCategory("electronics") // "Electrónica"
```

**`getCategoryKey(translatedCategory: string): string`**
Obtiene la clave original en inglés.
```typescript
getCategoryKey("Electrónica") // "electronics"
```

**`getTranslatedCategories(categories: string[]): Array<{key: string, label: string}>`**
Convierte array de categorías a objetos con clave y etiqueta.
```typescript
getTranslatedCategories(["electronics", "jewelery"])
// [{ key: "electronics", label: "Electrónica" }, { key: "jewelery", label: "Joyería" }]
```

#### Funciones de Formateo General

**`formatCompactNumber(num: number): string`**
Formatea números grandes (K, M).
```typescript
formatCompactNumber(1000) // "1 K"
formatCompactNumber(1500000) // "1,5 M"
```

**`formatPercent(value: number): string`**
Formatea porcentaje.
```typescript
formatPercent(25) // "25 %"
```

**`formatRating(rating: number): string`**
Formatea calificación con estrella.
```typescript
formatRating(4.5) // "4.5 ★"
```

---

## 🎨 Sistema de Diseño

### Variables CSS

**Ubicación**: `src/styles/variables.css`

El proyecto utiliza un sistema completo de variables CSS para mantener consistencia visual.

#### Paleta de Colores

```css
/* Colores primarios */
--color-primary: #3b82f6;
--color-primary-dark: #2563eb;
--color-primary-light: #60a5fa;

/* Colores semánticos */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;

/* Colores de producto */
--color-sale: #ef4444;
--color-new: #10b981;
--color-featured: #8b5cf6;
```

#### Espaciado

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
```

#### Tipografía

```css
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px */
--font-size-lg: 1.125rem;  /* 18px */
--font-size-xl: 1.25rem;   /* 20px */
--font-size-2xl: 1.5rem;   /* 24px */
--font-size-3xl: 1.875rem; /* 30px */
--font-size-4xl: 2.25rem;  /* 36px */
```

---

## 🚀 Guía de Desarrollo

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

---

## 📝 Notas para Revisores

### Decisiones de Diseño

1. **Conversión de Moneda**: Se usa una tasa fija de 950 CLP por USD para simplificar. En producción, esto debería obtenerse de una API de tasas de cambio.

2. **Traducciones**: Los productos están traducidos manualmente en `api.ts`. En producción, se recomienda usar un sistema de i18n como `react-i18next`.

3. **Filtros**: Los filtros se aplican en el cliente para mejor UX. Con grandes volúmenes de datos, se recomienda filtrado en el servidor.

4. **Estado de Carga**: Se usan skeleton loaders en lugar de spinners para mejor percepción de rendimiento.

5. **Sincronización de URL**: Los parámetros de búsqueda y categoría se sincronizan con la URL para permitir compartir enlaces y navegación con botones del navegador.

### Mejoras Futuras

- [ ] Implementar paginación para grandes volúmenes de datos
- [ ] Agregar carrito de compras persistente
- [ ] Implementar autenticación de usuarios
- [ ] Agregar sistema de favoritos
- [ ] Implementar comparación de productos
- [ ] Agregar filtros adicionales (marca, color, talla)
- [ ] Implementar búsqueda avanzada con sugerencias
- [ ] Agregar sistema de reseñas de usuarios

---

**Desarrollado con ❤️ para Multiplica**

