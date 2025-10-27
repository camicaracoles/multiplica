import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ProductsPage from './pages/ProductsPage'
import CategoriesPage from './pages/CategoriesPage'
import OffersPage from './pages/OffersPage'
import ProductDetailPage from './pages/ProductDetailPage'
import { useURLParams } from './hooks/useURLParams'
import './App.css'

function AppContent() {
  const { params, updateURLParams } = useURLParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    // Si estamos en una página de producto, ir a productos con búsqueda
    if (location.pathname.startsWith('/producto/')) {
      navigate('/productos');
    }
    updateURLParams({ search: query });
  }

  return (
    <div className="app">
      <Header onSearch={handleSearch} searchValue={params.search} />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/ofertas" element={<OffersPage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
