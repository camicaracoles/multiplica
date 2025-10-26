import { useMemo, useEffect } from 'react'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import CategoryFilter from './components/CategoryFilter'
import { mockProducts } from './data/mockProducts'
import { useURLParams } from './hooks/useURLParams'
import { translateCategory } from './utils/formatters'
import './App.css'

function App() {
  const { params, updateURLParams } = useURLParams();

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

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = new Set(mockProducts.map(p => p.category));
    return Array.from(uniqueCategories).sort();
  }, []);

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

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
  }, [params.search, params.category]);

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
          />
        </div>
      </main>
    </div>
  )
}

export default App
