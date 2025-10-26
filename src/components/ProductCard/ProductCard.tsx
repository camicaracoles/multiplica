import { useState } from 'react';
import type { Product } from '../../types/product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onViewDetail?: (productId: number) => void;
  isNew?: boolean;
  isOnSale?: boolean;
}

function ProductCard({ product, onViewDetail, isNew = false, isOnSale = false }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleViewDetail = () => {
    if (onViewDetail) {
      onViewDetail(product.id);
    }
  };

  // Truncar descripción a 100 caracteres
  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Renderizar estrellas de rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="product-card__star product-card__star--full">
            ★
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="product-card__star product-card__star--half">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="product-card__star product-card__star--empty">
            ★
          </span>
        );
      }
    }

    return stars;
  };

  return (
    <article className="product-card">
      {/* Badges */}
      {(isNew || isOnSale) && (
        <div className="product-card__badges">
          {isNew && <span className="product-card__badge product-card__badge--new">Nuevo</span>}
          {isOnSale && <span className="product-card__badge product-card__badge--sale">Oferta</span>}
        </div>
      )}

      {/* Imagen */}
      <div className="product-card__image-container">
        {!imageLoaded && !imageError && (
          <div className="product-card__image-skeleton" aria-label="Cargando imagen">
            <span className="product-card__loading-spinner">⏳</span>
          </div>
        )}
        {imageError ? (
          <div className="product-card__image-error">
            <span className="product-card__error-icon">📦</span>
            <span className="product-card__error-text">Imagen no disponible</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.title}
            className={`product-card__image ${imageLoaded ? 'product-card__image--loaded' : ''}`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>

      {/* Contenido */}
      <div className="product-card__content">
        {/* Categoría */}
        <span className="product-card__category">{product.category}</span>

        {/* Título */}
        <h3 className="product-card__title">{product.title}</h3>

        {/* Descripción */}
        <p className="product-card__description">
          {truncateDescription(product.description)}
        </p>

        {/* Rating */}
        <div className="product-card__rating">
          <div className="product-card__stars" aria-label={`Rating: ${product.rating.rate} de 5 estrellas`}>
            {renderStars(product.rating.rate)}
          </div>
          <span className="product-card__rating-count">
            ({product.rating.count})
          </span>
        </div>

        {/* Footer */}
        <div className="product-card__footer">
          {/* Precio */}
          <div className="product-card__price-container">
            <span className="product-card__price">{formatPrice(product.price)}</span>
          </div>

          {/* Botón Ver Detalle */}
          <button
            className="product-card__button"
            onClick={handleViewDetail}
            aria-label={`Ver detalles de ${product.title}`}
          >
            Ver detalle
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

