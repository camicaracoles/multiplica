/**
 * @fileoverview Hook personalizado para gestionar parámetros de URL
 * @description Sincroniza el estado de React con los parámetros de búsqueda de la URL
 */

import { useEffect, useState } from 'react';

/**
 * Interfaz para los parámetros de URL gestionados
 * @interface URLParams
 * @property {string} search - Término de búsqueda
 * @property {string} category - Categoría seleccionada
 */
interface URLParams {
  search: string;
  category: string;
}

/**
 * Hook personalizado para gestionar parámetros de URL de forma reactiva
 *
 * @description
 * Este hook proporciona una forma declarativa de trabajar con parámetros de URL:
 * - Lee los parámetros de la URL al montar el componente
 * - Sincroniza cambios de estado con la URL del navegador
 * - Actualiza la URL sin recargar la página (usando History API)
 * - Mantiene el estado sincronizado con la URL
 *
 * @returns {Object} Objeto con parámetros actuales y función de actualización
 * @returns {URLParams} params - Parámetros actuales de la URL
 * @returns {(newParams: Partial<URLParams>) => void} updateURLParams - Función para actualizar parámetros
 *
 * @example
 * ```tsx
 * function SearchPage() {
 *   const { params, updateURLParams } = useURLParams();
 *
 *   const handleSearch = (searchTerm: string) => {
 *     updateURLParams({ search: searchTerm });
 *   };
 *
 *   const handleCategoryChange = (category: string) => {
 *     updateURLParams({ category });
 *   };
 *
 *   return (
 *     <div>
 *       <input value={params.search} onChange={(e) => handleSearch(e.target.value)} />
 *       <select value={params.category} onChange={(e) => handleCategoryChange(e.target.value)}>
 *         <option value="">Todas</option>
 *       </select>
 *     </div>
 *   );
 * }
 * ```
 */
export function useURLParams() {
  const [params, setParams] = useState<URLParams>({
    search: '',
    category: ''
  });

  /**
   * Efecto para leer parámetros de la URL al montar el componente
   * Inicializa el estado con los valores presentes en la URL
   */
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setParams({
      search: urlParams.get('search') || '',
      category: urlParams.get('category') || ''
    });
  }, []);

  /**
   * Actualiza los parámetros de URL y sincroniza con el navegador
   *
   * @param {Partial<URLParams>} newParams - Parámetros a actualizar (puede ser parcial)
   *
   * @description
   * - Combina los parámetros actuales con los nuevos
   * - Actualiza el estado de React
   * - Actualiza la URL del navegador sin recargar la página
   * - Omite parámetros vacíos de la URL
   *
   * @example
   * updateURLParams({ search: 'laptop' }) // URL: ?search=laptop
   * updateURLParams({ category: 'electronics' }) // URL: ?search=laptop&category=electronics
   * updateURLParams({ search: '' }) // URL: ?category=electronics (elimina search)
   */
  const updateURLParams = (newParams: Partial<URLParams>) => {
    const updatedParams = { ...params, ...newParams };
    setParams(updatedParams);

    const urlParams = new URLSearchParams();

    // Solo agregar parámetros no vacíos a la URL
    if (updatedParams.search) {
      urlParams.set('search', updatedParams.search);
    }

    if (updatedParams.category) {
      urlParams.set('category', updatedParams.category);
    }

    // Construir nueva URL con o sin query string
    const newURL = urlParams.toString()
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;

    // Actualizar URL sin recargar la página
    window.history.pushState({}, '', newURL);
  };

  return { params, updateURLParams };
}

