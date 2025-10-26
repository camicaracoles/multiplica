import { useEffect } from 'react';
import { formatPrice } from '../../utils/formatters';
import type { Product } from '../../types/product';
import './ProductDetailModal.css';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Cerrar al hacer click en el backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Renderizar estrellas de rating
  const renderStars = (rate: number) => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="product-detail__star product-detail__star--full">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="product-detail__star product-detail__star--half">★</span>);
      } else {
        stars.push(<span key={i} className="product-detail__star product-detail__star--empty">★</span>);
      }
    }

    return stars;
  };

  // Obtener especificaciones técnicas según categoría
  const getSpecifications = () => {
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

  return (
    <div 
      className="product-detail-modal" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
    >
      <div className="product-detail-modal__content">
        {/* Botón cerrar */}
        <button
          className="product-detail-modal__close"
          onClick={onClose}
          aria-label="Cerrar modal"
          title="Cerrar (ESC)"
        >
          ×
        </button>

        <div className="product-detail-modal__body">
          {/* Imagen grande */}
          <div className="product-detail-modal__image-section">
            <img
              src={product.image}
              alt={product.title}
              className="product-detail-modal__image"
            />
          </div>

          {/* Información del producto */}
          <div className="product-detail-modal__info-section">
            {/* Título */}
            <h2 id="product-detail-title" className="product-detail-modal__title">
              {product.title}
            </h2>

            {/* Rating */}
            <div className="product-detail-modal__rating">
              <div className="product-detail-modal__stars">
                {renderStars(product.rating.rate)}
              </div>
              <span className="product-detail-modal__rating-text">
                {product.rating.rate.toFixed(1)} ({product.rating.count} valoraciones)
              </span>
            </div>

            {/* Precio */}
            <div className="product-detail-modal__price">
              {formatPrice(product.price)}
            </div>

            {/* Descripción completa */}
            <div className="product-detail-modal__description">
              <h3 className="product-detail-modal__section-title">Descripción</h3>
              <p className="product-detail-modal__description-text">
                {product.description}
              </p>
            </div>

            {/* Especificaciones técnicas */}
            <div className="product-detail-modal__specifications">
              <h3 className="product-detail-modal__section-title">Especificaciones</h3>
              <dl className="product-detail-modal__specs-list">
                {getSpecifications().map((spec, index) => (
                  <div key={index} className="product-detail-modal__spec-item">
                    <dt className="product-detail-modal__spec-label">{spec.label}:</dt>
                    <dd className="product-detail-modal__spec-value">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Botones de acción */}
            <div className="product-detail-modal__actions">
              <button className="product-detail-modal__button product-detail-modal__button--primary">
                Agregar al Carrito
              </button>
              <button className="product-detail-modal__button product-detail-modal__button--secondary">
                Agregar a Favoritos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

