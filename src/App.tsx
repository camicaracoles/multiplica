import { useState, useMemo } from 'react'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import { mockProducts } from './data/mockProducts'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Filtrar productos según búsqueda
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockProducts;
    }

    const query = searchQuery.toLowerCase();
    return mockProducts.filter(product =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <main className="app__main">
        <div className="app__container">
          <h1>Catálogo de Productos</h1>
          {searchQuery && (
            <p className="app__search-info">
              Resultados para: <strong>{searchQuery}</strong> ({filteredProducts.length} productos)
            </p>
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
