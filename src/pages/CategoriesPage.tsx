import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { translateCategory } from '../utils/formatters'
import { ProductGridSkeleton } from '../components/Skeleton'
import ErrorMessage from '../components/ErrorMessage'
import '../App.css'

function CategoriesPage() {
  const { products, loading, error } = useProducts();

  // Obtener categorías con conteo de productos
  const categoriesWithCount = useMemo(() => {
    if (!products) return [];
    
    const categoryMap = new Map<string, number>();
    
    products.forEach(product => {
      const count = categoryMap.get(product.category) || 0;
      categoryMap.set(product.category, count + 1);
    });

    return Array.from(categoryMap.entries()).map(([category, count]) => ({
      id: category,
      name: translateCategory(category),
      count,
      image: products.find(p => p.category === category)?.image || ''
    }));
  }, [products]);

  if (loading) {
    return (
      <div className="app__content">
        <div className="app__header">
          <h1 className="app__title">Categorías</h1>
          <p className="app__subtitle">Explora nuestros productos por categoría</p>
        </div>
        <ProductGridSkeleton count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app__content">
        <div className="app__header">
          <h1 className="app__title">Categorías</h1>
          <p className="app__subtitle">Explora nuestros productos por categoría</p>
        </div>
        <ErrorMessage
          title="Error al cargar categorías"
          message="No pudimos cargar las categorías. Por favor, intenta nuevamente."
          variant="error"
        />
      </div>
    );
  }

  return (
    <div className="app__content">
      <div className="app__header">
        <h1 className="app__title">Categorías</h1>
        <p className="app__subtitle">Explora nuestros productos por categoría</p>
      </div>

      <div className="categories-grid">
        {categoriesWithCount.map(category => (
          <Link
            key={category.id}
            to={`/productos?category=${category.id}`}
            className="category-card"
          >
            <div className="category-card__image-wrapper">
              <img
                src={category.image}
                alt={category.name}
                className="category-card__image"
              />
            </div>
            <div className="category-card__content">
              <h3 className="category-card__title">{category.name}</h3>
              <p className="category-card__count">
                {category.count} {category.count === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: var(--spacing-lg);
          margin-top: var(--spacing-xl);
        }

        .category-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: all var(--transition-normal);
          cursor: pointer;
        }

        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-primary);
        }

        .category-card__image-wrapper {
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: var(--bg-secondary);
        }

        .category-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-normal);
        }

        .category-card:hover .category-card__image {
          transform: scale(1.05);
        }

        .category-card__content {
          padding: var(--spacing-lg);
        }

        .category-card__title {
          font-size: var(--font-size-xl);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-sm) 0;
        }

        .category-card__count {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin: 0;
        }

        @media (max-width: 768px) {
          .categories-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: var(--spacing-md);
          }

          .category-card__image-wrapper {
            height: 150px;
          }

          .category-card__content {
            padding: var(--spacing-md);
          }

          .category-card__title {
            font-size: var(--font-size-lg);
          }
        }
      `}</style>
    </div>
  );
}

export default CategoriesPage;

