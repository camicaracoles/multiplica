import { useMemo } from 'react'
import ProductGrid from '../components/ProductGrid'
import CategoryFilter from '../components/CategoryFilter'
import { useProducts } from '../hooks/useProducts'
import { useURLParams } from '../hooks/useURLParams'
import { translateCategory } from '../utils/formatters'
import type { Product } from '../types/product'
import '../App.css'

function ProductsPage() {
  const { products, loading, error, refetch } = useProducts();
  const { params, updateURLParams } = useURLParams();

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

  // Filtrar productos según búsqueda y categoría
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

    return filtered;
  }, [products, params.search, params.category]);

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
        <ProductGrid products={[]} loading={true} />
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
        <div className="error-message">
          <p className="error-message__text">Error al cargar los productos</p>
          <button onClick={refetch} className="error-message__button">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app__content">
      <div className="app__header">
        <h1 className="app__title">Todos los Productos</h1>
        <p className="app__subtitle">Explora nuestro catálogo completo</p>
      </div>

      {/* Filtros */}
      <div className="app__filters">
        <CategoryFilter
          categories={categories}
          selectedCategory={params.category}
          onCategoryChange={handleCategoryChange}
        />
      </div>

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
  );
}

export default ProductsPage;

