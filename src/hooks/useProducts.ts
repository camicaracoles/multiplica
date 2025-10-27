/**
 * @fileoverview Hook personalizado para gestionar el estado de productos
 * @description Proporciona funcionalidad para cargar, gestionar y recargar productos desde la API
 */

import { useState, useEffect } from 'react';
import { getAllProducts } from '../services/api';
import type { Product } from '../types/product';

/**
 * Tipo de retorno del hook useProducts
 * @interface UseProductsReturn
 * @property {Product[]} products - Array de productos cargados
 * @property {boolean} loading - Indica si los productos están cargando
 * @property {string | null} error - Mensaje de error si la carga falló, null si no hay error
 * @property {() => Promise<void>} refetch - Función para recargar los productos manualmente
 */
interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook personalizado para gestionar el estado de productos
 *
 * @description
 * Este hook maneja la carga de productos desde la API, incluyendo:
 * - Estado de carga (loading)
 * - Manejo de errores
 * - Función de recarga manual (refetch)
 * - Carga automática al montar el componente
 *
 * @returns {UseProductsReturn} Objeto con productos, estado de carga, error y función refetch
 *
 * @example
 * ```tsx
 * function ProductList() {
 *   const { products, loading, error, refetch } = useProducts();
 *
 *   if (loading) return <LoadingSpinner />;
 *   if (error) return <ErrorMessage message={error} onRetry={refetch} />;
 *
 *   return <ProductGrid products={products} />;
 * }
 * ```
 */
export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Función interna para cargar productos desde la API
   * @async
   * @private
   */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('No se pudieron cargar los productos. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}

