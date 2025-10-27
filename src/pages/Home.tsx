import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import '../App.css'

function Home() {
  const { products, loading } = useProducts();

  // Obtener productos destacados (primeros 4)
  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div className="app__content">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Bienvenido a Multiplica</h1>
          <p className="hero__subtitle">
            Descubre los mejores productos al mejor precio
          </p>
          <div className="hero__actions">
            <Link to="/productos" className="hero__button hero__button--primary">
              Ver Productos
            </Link>
            <Link to="/ofertas" className="hero__button hero__button--secondary">
              Ver Ofertas 🔥
            </Link>
          </div>
        </div>
      </div>

      {/* Categorías Rápidas */}
      <section className="home-section">
        <h2 className="home-section__title">Explora por Categoría</h2>
        <div className="quick-categories">
          <Link to="/productos?category=electronics" className="quick-category">
            <span className="quick-category__icon">💻</span>
            <span className="quick-category__name">Electrónica</span>
          </Link>
          <Link to="/productos?category=jewelery" className="quick-category">
            <span className="quick-category__icon">💎</span>
            <span className="quick-category__name">Joyería</span>
          </Link>
          <Link to="/productos?category=men's clothing" className="quick-category">
            <span className="quick-category__icon">👔</span>
            <span className="quick-category__name">Ropa Hombre</span>
          </Link>
          <Link to="/productos?category=women's clothing" className="quick-category">
            <span className="quick-category__icon">👗</span>
            <span className="quick-category__name">Ropa Mujer</span>
          </Link>
        </div>
      </section>

      {/* Productos Destacados */}
      {!loading && featuredProducts.length > 0 && (
        <section className="home-section">
          <div className="home-section__header">
            <h2 className="home-section__title">Productos Destacados</h2>
            <Link to="/productos" className="home-section__link">
              Ver todos →
            </Link>
          </div>
          <div className="featured-products">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <style>{`
        .hero {
          background: linear-gradient(135deg, var(--color-primary) 0%, #667eea 100%);
          border-radius: var(--border-radius-lg);
          padding: var(--spacing-3xl) var(--spacing-xl);
          margin-bottom: var(--spacing-2xl);
          color: white;
          text-align: center;
        }

        .hero__title {
          font-size: var(--font-size-3xl);
          font-weight: 700;
          margin: 0 0 var(--spacing-md) 0;
        }

        .hero__subtitle {
          font-size: var(--font-size-xl);
          margin: 0 0 var(--spacing-xl) 0;
          opacity: 0.95;
        }

        .hero__actions {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero__button {
          padding: var(--spacing-md) var(--spacing-xl);
          border-radius: var(--border-radius-md);
          font-weight: 600;
          text-decoration: none;
          transition: all var(--transition-fast);
          font-size: var(--font-size-lg);
        }

        .hero__button--primary {
          background: white;
          color: var(--color-primary);
        }

        .hero__button--primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .hero__button--secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
        }

        .hero__button--secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .home-section {
          margin: var(--spacing-2xl) 0;
        }

        .home-section__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
        }

        .home-section__title {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .home-section__link {
          color: var(--color-primary);
          text-decoration: none;
          font-weight: 600;
          transition: color var(--transition-fast);
        }

        .home-section__link:hover {
          color: var(--color-primary-dark);
        }

        .quick-categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: var(--spacing-md);
        }

        .quick-category {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-xl);
          background: var(--bg-primary);
          border: 2px solid var(--border-color);
          border-radius: var(--border-radius-lg);
          text-decoration: none;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .quick-category:hover {
          border-color: var(--color-primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .quick-category__icon {
          font-size: var(--font-size-3xl);
        }

        .quick-category__name {
          font-weight: 600;
          text-align: center;
        }

        .featured-products {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: var(--spacing-lg);
        }

        @media (max-width: 768px) {
          .hero {
            padding: var(--spacing-xl) var(--spacing-md);
          }

          .hero__title {
            font-size: var(--font-size-2xl);
          }

          .hero__subtitle {
            font-size: var(--font-size-lg);
          }

          .quick-categories {
            grid-template-columns: repeat(2, 1fr);
          }

          .featured-products {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

export default Home;

