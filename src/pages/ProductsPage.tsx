import { useMemo, useState } from 'react'
import ProductGrid from '../components/ProductGrid'
import CategoryFilter from '../components/CategoryFilter'
import SortFilter from '../components/SortFilter'
import type { SortOption } from '../components/SortFilter/SortFilter'
import PriceFilter from '../components/PriceFilter'
import type { PriceRange } from '../components/PriceFilter/PriceFilter'
import RatingFilter from '../components/RatingFilter'
import { ProductGridSkeleton } from '../components/Skeleton'
import ErrorMessage from '../components/ErrorMessage'
import { useProducts } from '../hooks/useProducts'
import { useURLParams } from '../hooks/useURLParams'
import { translateCategory, convertToCLP } from '../utils/formatters'
import '../App.css'

function ProductsPage() {
  const { products, loading, error, refetch } = useProducts();
  const { params, updateURLParams } = useURLParams();

  // Calcular el precio máximo de los productos para el rango inicial
  const maxProductPrice = useMemo(() => {
    if (!products || products.length === 0) return 1000000; // 1M CLP por defecto
    return Math.ceil(Math.max(...products.map(p => convertToCLP(p.price))) / 100000) * 100000;
  }, [products]);

  // Estados locales para filtros avanzados
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 0 }); // Se inicializará con maxProductPrice
  const [minRating, setMinRating] = useState<number>(0);

  // Actualizar el rango de precio cuando se carguen los productos
  useMemo(() => {
    if (priceRange.max === 0 && maxProductPrice > 0) {
      setPriceRange({ min: 0, max: maxProductPrice });
    }
  }, [maxProductPrice, priceRange.max]);

  const handleCategoryChange = (category: string) => {
    updateURLParams({ category });
  }

  const handleRemoveSearch = () => {
    updateURLParams({ search: '' });
  }

  const handleRemoveCategory = () => {
    updateURLParams({ category: '' });
  }

  const handleClearAllFilters = () => {
    updateURLParams({ search: '', category: '' });
  }

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    // Filtrar por búsqueda
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }

    // Filtrar por categoría
    if (params.category) {
      filtered = filtered.filter(product =>
        product.category === params.category
      );
    }

    // Filtrar por precio (solo si el rango no es el máximo por defecto)
    if (priceRange.max > 0 && (priceRange.min > 0 || priceRange.max < maxProductPrice)) {
      filtered = filtered.filter(product => {
        const priceCLP = convertToCLP(product.price);
        return priceCLP >= priceRange.min && priceCLP <= priceRange.max;
      });
    }

    // Filtrar por rating
    if (minRating > 0) {
      filtered = filtered.filter(product => product.rating.rate >= minRating);
    }

    // Ordenar
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Mantener orden original
        break;
    }

    return filtered;
  }, [products, params.search, params.category, priceRange, minRating, sortBy, maxProductPrice]);

  // Obtener categorías únicas
  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories;
  }, [products]);

  const hasActiveFilters = params.search || params.category;

  // Manejar estado de carga
  if (loading) {
    return (
      <div className="app__content">
        <div className="app__header">
          <h1 className="app__title">Todos los Productos</h1>
          <p className="app__subtitle">Explora nuestro catálogo completo</p>
        </div>
        <ProductGridSkeleton count={12} />
      </div>
    );
  }

  // Manejar error
  if (error) {
    return (
      <div className="app__content">
        <div className="app__header">
          <h1 className="app__title">Todos los Productos</h1>
          <p className="app__subtitle">Explora nuestro catálogo completo</p>
        </div>
        <ErrorMessage
          title="Error al cargar productos"
          message={error}
          onRetry={refetch}
          variant="error"
        />
      </div>
    );
  }

  return (
    <div className="app__content">
      <div className="app__header">
        <h1 className="app__title">Todos los Productos</h1>
        <p className="app__subtitle">Explora nuestro catálogo completo</p>
      </div>

      {/* Barra de Filtros y Ordenamiento */}
      <div className="filters-bar">
        <div className="filters-bar__main">
          <CategoryFilter
            categories={categories}
            selectedCategory={params.category}
            onCategoryChange={handleCategoryChange}
          />
          <SortFilter value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Filtros Avanzados (Sidebar) */}
      <div className="products-layout">
        <aside className="products-sidebar">
          <h3 className="products-sidebar__title">Filtros</h3>

          <PriceFilter
            value={priceRange}
            onChange={setPriceRange}
            minPrice={0}
            maxPrice={maxProductPrice}
          />

          <RatingFilter
            value={minRating}
            onChange={setMinRating}
          />
        </aside>

        <div className="products-main">

          {/* Filtros Activos */}
          {hasActiveFilters && (
            <div className="app__active-filters">
              <div className="app__active-filters-header">
                <span className="app__active-filters-title">Filtros activos:</span>
                <button
                  onClick={handleClearAllFilters}
                  className="app__clear-all-button"
                  aria-label="Limpiar todos los filtros"
                >
                  Limpiar todo
                </button>
              </div>
              <div className="app__active-filters-list">
                {params.search && (
                  <div className="app__filter-tag">
                    <span className="app__filter-tag-label">Búsqueda:</span>
                    <span className="app__filter-tag-value">{params.search}</span>
                    <button
                      onClick={handleRemoveSearch}
                      className="app__filter-tag-remove"
                      aria-label="Eliminar filtro de búsqueda"
                    >
                      ×
                    </button>
                  </div>
                )}
                {params.category && (
                  <div className="app__filter-tag">
                    <span className="app__filter-tag-label">Categoría:</span>
                    <span className="app__filter-tag-value">{translateCategory(params.category)}</span>
                    <button
                      onClick={handleRemoveCategory}
                      className="app__filter-tag-remove"
                      aria-label="Eliminar filtro de categoría"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Resultados */}
          <div className="app__results">
            <p className="app__results-count">
              Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products?.length || 0}</strong> productos
            </p>
          </div>

          {/* Grid de Productos */}
          <ProductGrid
            products={filteredProducts}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;

