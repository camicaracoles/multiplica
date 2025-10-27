import { useState, useEffect } from 'react';
import { formatPrice } from '../../utils/formatters';
import './PriceFilter.css';

export interface PriceRange {
  min: number;
  max: number;
}

interface PriceFilterProps {
  value: PriceRange;
  onChange: (range: PriceRange) => void;
  minPrice?: number;
  maxPrice?: number;
}

function PriceFilter({ 
  value, 
  onChange, 
  minPrice = 0, 
  maxPrice = 1000 
}: PriceFilterProps) {
  const [localMin, setLocalMin] = useState(value.min.toString());
  const [localMax, setLocalMax] = useState(value.max.toString());

  useEffect(() => {
    setLocalMin(value.min.toString());
    setLocalMax(value.max.toString());
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalMin(newValue);
    
    const numValue = parseFloat(newValue) || minPrice;
    if (numValue <= value.max) {
      onChange({ min: numValue, max: value.max });
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalMax(newValue);
    
    const numValue = parseFloat(newValue) || maxPrice;
    if (numValue >= value.min) {
      onChange({ min: value.min, max: numValue });
    }
  };

  const handleReset = () => {
    onChange({ min: minPrice, max: maxPrice });
  };

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

