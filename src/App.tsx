import { useMemo, useEffect, useState } from 'react'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import CategoryFilter from './components/CategoryFilter'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import ProductDetailModal from './components/ProductDetailModal'
import { useProducts } from './hooks/useProducts'
import { useURLParams } from './hooks/useURLParams'
import { translateCategory } from './utils/formatters'
import type { Product } from './types/product'
import './App.css'

function App() {
  const { products, loading, error, refetch } = useProducts();
  const { params, updateURLParams } = useURLParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSearch = (query: string) => {
    updateURLParams({ search: query });
  }

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

  const handleProductClick = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  }

  const handleCloseModal = () => {
    setSelectedProduct(null);
  }

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category));
    return Array.from(uniqueCategories).sort();
  }, [products]);

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtrar por categoría
    if (params.category) {
      filtered = filtered.filter(product =>
        product.category === params.category
      );
    }

    // Filtrar por búsqueda
    if (params.search.trim()) {
      const query = params.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
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

  return (
    <div className="app">
      <Header onSearch={handleSearch} searchValue={params.search} />
      <main className="app__main">
        <div className="app__container">
          <h1>Catálogo de Productos</h1>

          {/* Estado de carga */}
          {loading && <LoadingSpinner fullPage message="Cargando productos desde la API..." />}

          {/* Estado de error */}
          {error && !loading && <ErrorMessage message={error} onRetry={refetch} />}

          {/* Contenido principal */}
          {!loading && !error && (
            <>

          {/* Filtros */}
          <div className="app__filters">
            <CategoryFilter
              categories={categories}
              selectedCategory={params.category}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Info de búsqueda/filtros */}
          {hasActiveFilters && (
            <div className="app__filter-info">
              <div className="app__filter-tags">
                {params.search && (
                  <span className="app__filter-tag">
                    Búsqueda: <strong>{params.search}</strong>
                    <button
                      className="app__filter-tag-remove"
                      onClick={handleRemoveSearch}
                      aria-label="Quitar filtro de búsqueda"
                      title="Quitar búsqueda"
                    >
                      ×
                    </button>
                  </span>
                )}
                {params.category && (
                  <span className="app__filter-tag">
                    Categoría: <strong>{translateCategory(params.category)}</strong>
                    <button
                      className="app__filter-tag-remove"
                      onClick={handleRemoveCategory}
                      aria-label="Quitar filtro de categoría"
                      title="Quitar categoría"
                    >
                      ×
                    </button>
                  </span>
                )}
                {(params.search || params.category) && (
                  <button
                    className="app__filter-clear-all"
                    onClick={handleClearAllFilters}
                    aria-label="Limpiar todos los filtros"
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
            onProductClick={handleProductClick}
          />
            </>
          )}
        </div>
      </main>

      {/* Modal de detalle de producto */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default App
