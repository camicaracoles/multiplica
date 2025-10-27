import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { formatPrice } from '../utils/formatters';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import type { Product } from '../types/product';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('ID de producto no válido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(parseInt(id));
        setProduct(data);
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError('No se pudo cargar el producto. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleBack = () => {
    navigate('/');
  };

  // Renderizar estrellas de rating
  const renderStars = (rate: number) => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="product-page__star product-page__star--full">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="product-page__star product-page__star--half">★</span>);
      } else {
        stars.push(<span key={i} className="product-page__star product-page__star--empty">★</span>);
      }
    }

    return stars;
  };

  // Obtener especificaciones técnicas según categoría
  const getSpecifications = (product: Product) => {
    const specs: { label: string; value: string }[] = [
      { label: 'Categoría', value: getCategoryName(product.category) },
      { label: 'ID del Producto', value: `#${product.id}` },
    ];

    // Agregar especificaciones específicas según categoría
    if (product.category === 'electronics') {
      specs.push(
        { label: 'Tipo', value: 'Electrónica' },
        { label: 'Garantía', value: '1 año' },
        { label: 'Envío', value: 'Gratis' }
      );
    } else if (product.category === 'jewelery') {
      specs.push(
        { label: 'Material', value: 'Metales preciosos' },
        { label: 'Garantía', value: '6 meses' },
        { label: 'Certificado', value: 'Incluido' }
      );
    } else if (product.category.includes('clothing')) {
      specs.push(
        { label: 'Material', value: 'Ver descripción' },
        { label: 'Tallas', value: 'S, M, L, XL' },
        { label: 'Cuidado', value: 'Ver etiqueta' }
      );
    }

    return specs;
  };

  const getCategoryName = (category: string): string => {
    const categories: Record<string, string> = {
      'electronics': 'Electrónica',
      'jewelery': 'Joyería',
      "men's clothing": 'Ropa de Hombre',
      "women's clothing": 'Ropa de Mujer'
    };
    return categories[category] || category;
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Cargando producto..." />;
  }

  if (error || !product) {
    return (
      <div className="product-page">
        <div className="product-page__container">
          <ErrorMessage 
            message={error || 'Producto no encontrado'} 
            onRetry={() => window.location.reload()}
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/" className="product-page__back-link">
              ← Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-page__container">
        {/* Breadcrumb */}
        <nav className="product-page__breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="product-page__breadcrumb-link">
            Inicio
          </Link>
          <span className="product-page__breadcrumb-separator">/</span>
          <Link to={`/?category=${product.category}`} className="product-page__breadcrumb-link">
            {getCategoryName(product.category)}
          </Link>
          <span className="product-page__breadcrumb-separator">/</span>
          <span className="product-page__breadcrumb-current">
            {product.title}
          </span>
        </nav>

        {/* Botón volver */}
        <button 
          className="product-page__back-button"
          onClick={handleBack}
          aria-label="Volver al catálogo"
        >
          ← Volver al catálogo
        </button>

        {/* Contenido principal */}
        <div className="product-page__content">
          {/* Sección de imagen */}
          <div className="product-page__image-section">
            <div className="product-page__image-container">
              {!imageLoaded && (
                <div className="product-page__image-skeleton">
                  Cargando imagen...
                </div>
              )}
              <img
                src={product.image}
                alt={product.title}
                className={`product-page__image ${imageLoaded ? 'product-page__image--loaded' : ''}`}
                onLoad={handleImageLoad}
              />
            </div>
          </div>

          {/* Sección de información */}
          <div className="product-page__info-section">
            {/* Título */}
            <h1 className="product-page__title">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="product-page__rating">
              <div className="product-page__stars">
                {renderStars(product.rating.rate)}
              </div>
              <span className="product-page__rating-text">
                {product.rating.rate.toFixed(1)} ({product.rating.count} valoraciones)
              </span>
            </div>

            {/* Precio */}
            <div className="product-page__price-section">
              <div className="product-page__price">
                {formatPrice(product.price)}
              </div>
              <div className="product-page__price-note">
                Precio incluye IVA
              </div>
            </div>

            {/* Descripción */}
            <div className="product-page__description">
              <h2 className="product-page__section-title">Descripción del Producto</h2>
              <p className="product-page__description-text">
                {product.description}
              </p>
            </div>

            {/* Especificaciones */}
            <div className="product-page__specifications">
              <h2 className="product-page__section-title">Especificaciones Técnicas</h2>
              <dl className="product-page__specs-list">
                {getSpecifications(product).map((spec, index) => (
                  <div key={index} className="product-page__spec-item">
                    <dt className="product-page__spec-label">{spec.label}:</dt>
                    <dd className="product-page__spec-value">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Botones de acción */}
            <div className="product-page__actions">
              <button className="product-page__button product-page__button--primary">
                🛒 Agregar al Carrito
              </button>
              <button className="product-page__button product-page__button--secondary">
                ❤️ Agregar a Favoritos
              </button>
              <button className="product-page__button product-page__button--share">
                🔗 Compartir
              </button>
            </div>

            {/* Información adicional */}
            <div className="product-page__additional-info">
              <div className="product-page__info-item">
                <span className="product-page__info-icon">🚚</span>
                <div className="product-page__info-content">
                  <strong>Envío gratis</strong>
                  <p>En compras sobre $50.000</p>
                </div>
              </div>
              <div className="product-page__info-item">
                <span className="product-page__info-icon">↩️</span>
                <div className="product-page__info-content">
                  <strong>Devolución gratis</strong>
                  <p>30 días para devolver</p>
                </div>
              </div>
              <div className="product-page__info-item">
                <span className="product-page__info-icon">🔒</span>
                <div className="product-page__info-content">
                  <strong>Compra segura</strong>
                  <p>Pago protegido</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;

