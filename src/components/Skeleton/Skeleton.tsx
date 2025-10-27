/**
 * @fileoverview Componentes de skeleton loading (placeholders animados)
 * @description Proporciona componentes de carga con animación shimmer para mejorar la UX
 */

import './Skeleton.css';

/**
 * Props del componente Skeleton base
 * @interface SkeletonProps
 * @property {'text' | 'circular' | 'rectangular' | 'card'} [variant='text'] - Tipo de skeleton
 * @property {string | number} [width] - Ancho del skeleton (px o string CSS)
 * @property {string | number} [height] - Alto del skeleton (px o string CSS)
 * @property {string} [className=''] - Clases CSS adicionales
 */
interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  className?: string;
}

/**
 * Componente base de Skeleton (placeholder animado)
 *
 * @component
 * @description
 * Renderiza un placeholder animado con efecto shimmer para indicar contenido en carga.
 * Soporta diferentes variantes:
 * - text: Para líneas de texto
 * - circular: Para avatares o iconos circulares
 * - rectangular: Para imágenes o bloques rectangulares
 * - card: Para tarjetas completas
 *
 * Características:
 * - Animación shimmer suave
 * - Atributos ARIA para accesibilidad
 * - Dimensiones personalizables
 * - Variantes predefinidas
 *
 * @param {SkeletonProps} props - Props del componente
 * @returns {JSX.Element} Skeleton placeholder
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" width="80%" height={16} />
 * <Skeleton variant="circular" width={40} height={40} />
 * <Skeleton variant="rectangular" width="100%" height={200} />
 * ```
 */
function Skeleton({
  variant = 'text',
  width,
  height,
  className = ''
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`skeleton skeleton--${variant} ${className}`}
      style={style}
      aria-busy="true"
      aria-live="polite"
    />
  );
}

/**
 * Componente de skeleton específico para tarjetas de producto
 *
 * @component
 * @description
 * Renderiza un placeholder que imita la estructura de una ProductCard:
 * - Imagen rectangular (200px de alto)
 * - Título (línea de texto al 60%)
 * - Descripción (2 líneas de texto)
 * - Footer con precio y botón
 *
 * @returns {JSX.Element} Skeleton de tarjeta de producto
 *
 * @example
 * ```tsx
 * {loading && <ProductCardSkeleton />}
 * ```
 */
export function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      <Skeleton variant="rectangular" height={200} className="product-card-skeleton__image" />
      <div className="product-card-skeleton__content">
        <Skeleton variant="text" width="60%" height={16} />
        <Skeleton variant="text" width="100%" height={14} />
        <Skeleton variant="text" width="80%" height={14} />
        <div className="product-card-skeleton__footer">
          <Skeleton variant="text" width={80} height={24} />
          <Skeleton variant="rectangular" width={100} height={36} />
        </div>
      </div>
    </div>
  );
}

/**
 * Componente de skeleton para grid de productos
 *
 * @component
 * @description
 * Renderiza un grid completo de skeletons de productos.
 * Útil para mostrar durante la carga inicial de la página de productos.
 *
 * @param {Object} props - Props del componente
 * @param {number} [props.count=12] - Número de skeletons a mostrar
 * @returns {JSX.Element} Grid de skeletons de productos
 *
 * @example
 * ```tsx
 * {loading && <ProductGridSkeleton count={20} />}
 * {loading && <ProductGridSkeleton />} // Por defecto muestra 12
 * ```
 */
export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="product-grid-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default Skeleton;

