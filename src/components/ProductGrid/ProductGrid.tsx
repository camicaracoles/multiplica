import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import type { Product } from '../../types/product';
import './ProductGrid.css';

type ViewMode = 'grid' | 'list';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  itemsPerPage?: number;
}

function ProductGrid({ products, loading = false, itemsPerPage = 12 }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular paginación
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Reset a página 1 cuando cambian los productos
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll suave al inicio de la grilla
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };



  // Generar números de página para mostrar
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas con ellipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="product-grid__loading">
        <div className="product-grid__spinner">⏳</div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-grid__empty">
        <div className="product-grid__empty-icon">📦</div>
        <h3>No se encontraron productos</h3>
        <p>Intenta ajustar los filtros o la búsqueda</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {/* Header con controles */}
      <div className="product-grid__header">
        <div className="product-grid__info">
          <p className="product-grid__count">
            Mostrando <strong>{startIndex + 1}-{Math.min(endIndex, products.length)}</strong> de <strong>{products.length}</strong> productos
          </p>
        </div>

        {/* Toggle de vista */}
        <div className="product-grid__view-toggle">
          <button
            className={`product-grid__view-button ${viewMode === 'grid' ? 'product-grid__view-button--active' : ''}`}
            onClick={() => handleViewModeChange('grid')}
            aria-label="Vista de grilla"
            aria-pressed={viewMode === 'grid'}
          >
            <span className="product-grid__view-icon">⊞</span>
            <span className="product-grid__view-text">Grilla</span>
          </button>
          <button
            className={`product-grid__view-button ${viewMode === 'list' ? 'product-grid__view-button--active' : ''}`}
            onClick={() => handleViewModeChange('list')}
            aria-label="Vista de lista"
            aria-pressed={viewMode === 'list'}
          >
            <span className="product-grid__view-icon">☰</span>
            <span className="product-grid__view-text">Lista</span>
          </button>
        </div>
      </div>

      {/* Grid/List de productos */}
      <div className={`product-grid__container product-grid__container--${viewMode}`}>
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="product-grid__pagination">
          <button
            className="product-grid__pagination-button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            ← Anterior
          </button>

          <div className="product-grid__pagination-numbers">
            {getPageNumbers().map((page, index) => (
              typeof page === 'number' ? (
                <button
                  key={index}
                  className={`product-grid__pagination-number ${currentPage === page ? 'product-grid__pagination-number--active' : ''}`}
                  onClick={() => handlePageChange(page)}
                  aria-label={`Página ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="product-grid__pagination-ellipsis">
                  {page}
                </span>
              )
            ))}
          </div>

          <button
            className="product-grid__pagination-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;

