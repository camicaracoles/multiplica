import { useMemo, useEffect } from 'react'
import ProductGrid from '../components/ProductGrid'
import CategoryFilter from '../components/CategoryFilter'
import { useProducts } from '../hooks/useProducts'
import { useURLParams } from '../hooks/useURLParams'
import { translateCategory } from '../utils/formatters'
import type { Product } from '../types/product'
import '../App.css'

function CatalogPage() {
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

  // Obtener categorías únicas de los productos
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories;
  }, [products]);

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = useMemo(() => {
    let filtered: Product[] = products;

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

  // Actualizar el input de búsqueda cuando cambia la URL
  useEffect(() => {
    // Este efecto se ejecuta cuando los parámetros de URL cambian
    // (por ejemplo, al navegar con el botón atrás del navegador)
  }, [params]);

  const hasActiveFilters = params.search || params.category;

  if (loading) {
    return (
      <div className="app__container">
        <h1>Catálogo de Productos</h1>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          Cargando productos...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app__container">
        <h1>Catálogo de Productos</h1>
        <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
          Error: {error}
          <br />
          <button onClick={refetch} style={{ marginTop: '20px' }}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app__container">
      <h1>Catálogo de Productos</h1>

      {/* Filtro de categorías */}
      <CategoryFilter
        categories={categories}
        selectedCategory={params.category}
        onCategoryChange={handleCategoryChange}
      />

      {/* Tags de filtros activos */}
      {hasActiveFilters && (
        <div className="app__active-filters">
          <div className="app__filter-tags">
            {params.search && (
              <div className="app__filter-tag">
                <span className="app__filter-tag-label">Búsqueda:</span>
                <span className="app__filter-tag-value">{params.search}</span>
                <button
                  className="app__filter-tag-remove"
                  onClick={handleRemoveSearch}
                  aria-label="Quitar búsqueda"
                  title="Quitar búsqueda"
                >
                  ×
                </button>
              </div>
            )}
            {params.category && (
              <div className="app__filter-tag">
                <span className="app__filter-tag-label">Categoría:</span>
                <span className="app__filter-tag-value">
                  {translateCategory(params.category)}
                </span>
                <button
                  className="app__filter-tag-remove"
                  onClick={handleRemoveCategory}
                  aria-label="Quitar categoría"
                  title="Quitar categoría"
                >
                  ×
                </button>
              </div>
            )}
            {hasActiveFilters && (
              <button
                className="app__clear-filters"
                onClick={handleClearAllFilters}
              >
                Limpiar todo
              </button>
            )}
          </div>
          <span className="app__filter-count">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Product Grid con paginación */}
      <ProductGrid
        products={filteredProducts}
        itemsPerPage={12}
      />
    </div>
  );
}

export default CatalogPage;

