import { useMemo } from 'react'
import ProductGrid from '../components/ProductGrid'
import { ProductGridSkeleton } from '../components/Skeleton'
import ErrorMessage from '../components/ErrorMessage'
import { useProducts } from '../hooks/useProducts'
import { formatPrice } from '../utils/formatters'
import '../App.css'

function OffersPage() {
  const { products, loading, error, refetch } = useProducts();

  // Filtrar productos en oferta (precio menor a $50 como ejemplo)
  const offersProducts = useMemo(() => {
    if (!products) return [];
    
    // Consideramos ofertas los productos con precio menor a $50
    // o que tengan un rating alto (4.5+)
    return products.filter(product => 
      product.price < 50 || product.rating.rate >= 4.5
    ).sort((a, b) => {
      // Ordenar por rating descendente
      return b.rating.rate - a.rating.rate;
    });
  }, [products]);

  const totalSavings = useMemo(() => {
    if (!offersProducts.length) return 0;
    // Calcular ahorro promedio (ejemplo: 20% de descuento)
    return offersProducts.reduce((acc, product) => acc + (product.price * 0.2), 0);
  }, [offersProducts]);

  // Manejar estado de carga
  if (loading) {
    return (
      <div className="app__content">
        <div className="app__header">
          <h1 className="app__title">🔥 Ofertas Especiales</h1>
          <p className="app__subtitle">Los mejores precios y productos destacados</p>
        </div>
        <ProductGridSkeleton count={12} />
      </div>
    );
  }

  // Manejar error
  if (error) {
    return (
      <div className="app__content">
        <div className="app__header">
          <h1 className="app__title">🔥 Ofertas Especiales</h1>
          <p className="app__subtitle">Los mejores precios y productos destacados</p>
        </div>
        <ErrorMessage
          title="Error al cargar ofertas"
          message={error}
          onRetry={refetch}
          variant="error"
        />
      </div>
    );
  }

  return (
    <div className="app__content">
      <div className="app__header">
        <h1 className="app__title">🔥 Ofertas Especiales</h1>
        <p className="app__subtitle">Los mejores precios y productos destacados</p>
      </div>

      {/* Banner de Ofertas */}
      <div className="offers-banner">
        <div className="offers-banner__content">
          <div className="offers-banner__stat">
            <span className="offers-banner__stat-number">{offersProducts.length}</span>
            <span className="offers-banner__stat-label">Productos en oferta</span>
          </div>
          <div className="offers-banner__stat">
            <span className="offers-banner__stat-number">
              {formatPrice(totalSavings)}
            </span>
            <span className="offers-banner__stat-label">Ahorro total disponible</span>
          </div>
          <div className="offers-banner__stat">
            <span className="offers-banner__stat-number">20%</span>
            <span className="offers-banner__stat-label">Descuento promedio</span>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="app__results">
        <p className="app__results-count">
          <strong>{offersProducts.length}</strong> productos en oferta
        </p>
      </div>

      {/* Grid de Productos */}
      <ProductGrid
        products={offersProducts}
        loading={false}
      />

      <style>{`
        .offers-banner {
          background: linear-gradient(135deg, var(--color-primary) 0%, #e91e63 100%);
          border-radius: var(--border-radius-lg);
          padding: var(--spacing-xl);
          margin: var(--spacing-xl) 0;
          color: white;
        }

        .offers-banner__content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-lg);
          text-align: center;
        }

        .offers-banner__stat {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .offers-banner__stat-number {
          font-size: var(--font-size-3xl);
          font-weight: 700;
          line-height: 1;
        }

        .offers-banner__stat-label {
          font-size: var(--font-size-sm);
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .offers-banner {
            padding: var(--spacing-lg);
          }

          .offers-banner__content {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }

          .offers-banner__stat-number {
            font-size: var(--font-size-2xl);
          }
        }
      `}</style>
    </div>
  );
}

export default OffersPage;

