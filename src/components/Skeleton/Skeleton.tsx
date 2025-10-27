import './Skeleton.css';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  className?: string;
}

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

// Componente específico para ProductCard skeleton
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

// Componente para grid de productos skeleton
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

