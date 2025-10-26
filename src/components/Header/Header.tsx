import { useState, useEffect } from 'react';
import './Header.css';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchValue?: string;
}

function Header({ onSearch, searchValue = '' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchValue);

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

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <div className="header__logo">
          <a href="/" className="header__logo-link">
            <span className="header__logo-icon">🛍️</span>
            <span className="header__logo-text">Multiplica</span>
          </a>
        </div>

        {/* Navegación Desktop */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <a href="/" className="header__nav-link">Inicio</a>
            </li>
            <li className="header__nav-item">
              <a href="#productos" className="header__nav-link">Productos</a>
            </li>
            <li className="header__nav-item">
              <a href="#categorias" className="header__nav-link">Categorías</a>
            </li>
            <li className="header__nav-item">
              <a href="#ofertas" className="header__nav-link">Ofertas</a>
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
              <a href="/" className="header__mobile-nav-link" onClick={toggleMenu}>
                Inicio
              </a>
            </li>
            <li className="header__mobile-nav-item">
              <a href="#productos" className="header__mobile-nav-link" onClick={toggleMenu}>
                Productos
              </a>
            </li>
            <li className="header__mobile-nav-item">
              <a href="#categorias" className="header__mobile-nav-link" onClick={toggleMenu}>
                Categorías
              </a>
            </li>
            <li className="header__mobile-nav-item">
              <a href="#ofertas" className="header__mobile-nav-link" onClick={toggleMenu}>
                Ofertas
              </a>
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

