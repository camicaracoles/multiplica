import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchValue?: string;
}

function Header({ onSearch, searchValue = '' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchValue);
  const location = useLocation();

  // Sincronizar con el valor externo (URL)
  useEffect(() => {
    setSearchQuery(searchValue);
  }, [searchValue]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleHomeClick = () => {
    // Limpiar búsqueda y cerrar menú
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
    setIsMenuOpen(false);
  };

  // Función para verificar si una ruta está activa
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <div className="header__logo">
          <Link to="/" className="header__logo-link" onClick={handleHomeClick}>
            <span className="header__logo-icon">🛍️</span>
            <span className="header__logo-text">Multiplica</span>
          </Link>
        </div>

        {/* Navegación Desktop */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link
                to="/"
                className={`header__nav-link ${isActive('/') ? 'header__nav-link--active' : ''}`}
                onClick={handleHomeClick}
              >
                Inicio
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/productos"
                className={`header__nav-link ${isActive('/productos') ? 'header__nav-link--active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/categorias"
                className={`header__nav-link ${isActive('/categorias') ? 'header__nav-link--active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categorías
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/ofertas"
                className={`header__nav-link ${isActive('/ofertas') ? 'header__nav-link--active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Ofertas
              </Link>
            </li>
          </ul>
        </nav>

        {/* Buscador */}
        <div className="header__search">
          <form onSubmit={handleSearchSubmit} className="header__search-form">
            <input
              type="search"
              className="header__search-input"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Buscar productos"
            />
            <button 
              type="submit" 
              className="header__search-button"
              aria-label="Buscar"
            >
              🔍
            </button>
          </form>
        </div>

        {/* Botón Menú Hamburguesa (Móvil) */}
        <button
          className={`header__menu-toggle ${isMenuOpen ? 'header__menu-toggle--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú de navegación"
          aria-expanded={isMenuOpen}
        >
          <span className="header__menu-icon"></span>
          <span className="header__menu-icon"></span>
          <span className="header__menu-icon"></span>
        </button>
      </div>

      {/* Menú Móvil */}
      <div className={`header__mobile-menu ${isMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <nav className="header__mobile-nav">
          <ul className="header__mobile-nav-list">
            <li className="header__mobile-nav-item">
              <Link
                to="/"
                className={`header__mobile-nav-link ${isActive('/') ? 'header__mobile-nav-link--active' : ''}`}
                onClick={handleHomeClick}
              >
                Inicio
              </Link>
            </li>
            <li className="header__mobile-nav-item">
              <Link
                to="/productos"
                className={`header__mobile-nav-link ${isActive('/productos') ? 'header__mobile-nav-link--active' : ''}`}
                onClick={toggleMenu}
              >
                Productos
              </Link>
            </li>
            <li className="header__mobile-nav-item">
              <Link
                to="/categorias"
                className={`header__mobile-nav-link ${isActive('/categorias') ? 'header__mobile-nav-link--active' : ''}`}
                onClick={toggleMenu}
              >
                Categorías
              </Link>
            </li>
            <li className="header__mobile-nav-item">
              <Link
                to="/ofertas"
                className={`header__mobile-nav-link ${isActive('/ofertas') ? 'header__mobile-nav-link--active' : ''}`}
                onClick={toggleMenu}
              >
                Ofertas
              </Link>
            </li>
          </ul>
        </nav>

        {/* Buscador Móvil */}
        <div className="header__mobile-search">
          <form onSubmit={handleSearchSubmit} className="header__search-form">
            <input
              type="search"
              className="header__search-input"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Buscar productos"
            />
            <button 
              type="submit" 
              className="header__search-button"
              aria-label="Buscar"
            >
              🔍
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;

