/**
 * @fileoverview Componente de filtro de rango de precios
 * @description Permite filtrar productos por rango de precio mínimo y máximo
 */

import { useState, useEffect } from 'react';
import { formatPrice } from '../../utils/formatters';
import './PriceFilter.css';

/**
 * Interfaz para el rango de precios
 * @interface PriceRange
 * @property {number} min - Precio mínimo en CLP
 * @property {number} max - Precio máximo en CLP
 */
export interface PriceRange {
  min: number;
  max: number;
}

/**
 * Props del componente PriceFilter
 * @interface PriceFilterProps
 * @property {PriceRange} value - Rango de precio actual
 * @property {(range: PriceRange) => void} onChange - Callback cuando cambia el rango
 * @property {number} [minPrice=0] - Precio mínimo permitido
 * @property {number} [maxPrice=1000] - Precio máximo permitido
 */
interface PriceFilterProps {
  value: PriceRange;
  onChange: (range: PriceRange) => void;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Componente de filtro de rango de precios
 *
 * @component
 * @description
 * Renderiza dos inputs numéricos para establecer un rango de precios:
 * - Input de precio mínimo
 * - Input de precio máximo
 * - Validación para evitar rangos inválidos (min > max)
 * - Botón de limpiar cuando hay filtros activos
 * - Visualización del rango seleccionado en formato CLP
 *
 * Características:
 * - Estado local para evitar re-renders excesivos durante la escritura
 * - Sincronización con props mediante useEffect
 * - Validación de rangos en tiempo real
 * - Formateo automático de precios en CLP
 *
 * @param {PriceFilterProps} props - Props del componente
 * @returns {JSX.Element} Filtro de rango de precios
 *
 * @example
 * ```tsx
 * const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 1000000 });
 *
 * <PriceFilter
 *   value={priceRange}
 *   onChange={setPriceRange}
 *   minPrice={0}
 *   maxPrice={1000000}
 * />
 * ```
 */
function PriceFilter({
  value,
  onChange,
  minPrice = 0,
  maxPrice = 1000
}: PriceFilterProps) {
  // Estado local para los inputs (evita re-renders durante la escritura)
  const [localMin, setLocalMin] = useState(value.min.toString());
  const [localMax, setLocalMax] = useState(value.max.toString());

  /**
   * Sincroniza el estado local con los valores de las props
   * cuando cambian externamente
   */
  useEffect(() => {
    setLocalMin(value.min.toString());
    setLocalMax(value.max.toString());
  }, [value]);

  /**
   * Maneja el cambio del precio mínimo
   * Valida que no sea mayor al precio máximo
   */
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalMin(newValue);

    const numValue = parseFloat(newValue) || minPrice;
    if (numValue <= value.max) {
      onChange({ min: numValue, max: value.max });
    }
  };

  /**
   * Maneja el cambio del precio máximo
   * Valida que no sea menor al precio mínimo
   */
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalMax(newValue);

    const numValue = parseFloat(newValue) || maxPrice;
    if (numValue >= value.min) {
      onChange({ min: value.min, max: numValue });
    }
  };

  /**
   * Resetea el filtro a los valores por defecto
   */
  const handleReset = () => {
    onChange({ min: minPrice, max: maxPrice });
  };

  // Determina si hay un filtro activo
  const isFiltered = value.min !== minPrice || value.max !== maxPrice;

  return (
    <div className="price-filter">
      <div className="price-filter__header">
        <label className="price-filter__label">Rango de Precio</label>
        {isFiltered && (
          <button 
            className="price-filter__reset"
            onClick={handleReset}
            type="button"
          >
            Limpiar
          </button>
        )}
      </div>
      <div className="price-filter__inputs">
        <div className="price-filter__input-group">
          <label htmlFor="price-min" className="price-filter__input-label">
            Mínimo
          </label>
          <input
            id="price-min"
            type="number"
            className="price-filter__input"
            value={localMin}
            onChange={handleMinChange}
            min={minPrice}
            max={maxPrice}
            placeholder={formatPrice(minPrice)}
          />
        </div>
        <span className="price-filter__separator">-</span>
        <div className="price-filter__input-group">
          <label htmlFor="price-max" className="price-filter__input-label">
            Máximo
          </label>
          <input
            id="price-max"
            type="number"
            className="price-filter__input"
            value={localMax}
            onChange={handleMaxChange}
            min={minPrice}
            max={maxPrice}
            placeholder={formatPrice(maxPrice)}
          />
        </div>
      </div>
      <div className="price-filter__display">
        {formatPrice(value.min)} - {formatPrice(value.max)}
      </div>
    </div>
  );
}

export default PriceFilter;

