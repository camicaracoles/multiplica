import { useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import type { Product } from './types/product'
import './App.css'

// Producto de ejemplo para testing
const sampleProduct: Product = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120
  }
}

const sampleProduct2: Product = {
  id: 2,
  title: "Mens Casual Premium Slim Fit T-Shirts",
  price: 22.3,
  description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  rating: {
    rate: 4.1,
    count: 259
  }
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    console.log('Buscando:', query)
  }

  const handleViewDetail = (productId: number) => {
    console.log('Ver detalle del producto:', productId)
  }

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <main className="app__main">
        <div className="app__container">
          <h1>Catálogo de Productos</h1>
          {searchQuery && (
            <p>Buscando: <strong>{searchQuery}</strong></p>
          )}

          {/* Grid de ejemplo con ProductCards */}
          <div className="app__products-grid">
            <ProductCard
              product={sampleProduct}
              onViewDetail={handleViewDetail}
              isNew={true}
            />
            <ProductCard
              product={sampleProduct2}
              onViewDetail={handleViewDetail}
              isOnSale={true}
            />
            <ProductCard
              product={sampleProduct}
              onViewDetail={handleViewDetail}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
