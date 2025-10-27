/**
 * @fileoverview Componente de filtro de valoración mínima
 * @description Permite filtrar productos por calificación mínima de estrellas
 */

import './RatingFilter.css';

/**
 * Props del componente RatingFilter
 * @interface RatingFilterProps
 * @property {number} value - Valoración mínima seleccionada (0-5)
 * @property {(rating: number) => void} onChange - Callback cuando cambia la valoración
 */
interface RatingFilterProps {
  value: number;
  onChange: (rating: number) => void;
}

/**
 * Opciones de valoración disponibles
 * @constant
 * @description Array de opciones con valor numérico y etiqueta descriptiva
 */
const ratingOptions = [
  { value: 0, label: 'Todas las valoraciones' },
  { value: 4, label: '4★ o más' },
  { value: 3, label: '3★ o más' },
  { value: 2, label: '2★ o más' },
  { value: 1, label: '1★ o más' },
];

/**
 * Componente de filtro de valoración mínima
 *
 * @component
 * @description
 * Renderiza un grupo de botones para filtrar productos por calificación mínima:
 * - Todas las valoraciones (sin filtro)
 * - 4 estrellas o más
 * - 3 estrellas o más
 * - 2 estrellas o más
 * - 1 estrella o más
 *
 * Características:
 * - Botones con estado activo visual
 * - Interfaz intuitiva con símbolos de estrellas
 * - Filtrado inclusivo (muestra productos con rating >= valor seleccionado)
 *
 * @param {RatingFilterProps} props - Props del componente
 * @returns {JSX.Element} Filtro de valoración
 *
 * @example
 * ```tsx
 * const [minRating, setMinRating] = useState<number>(0);
 *
 * <RatingFilter value={minRating} onChange={setMinRating} />
 *
 * // Filtrar productos
 * const filtered = products.filter(p => p.rating.rate >= minRating);
 * ```
 */
function RatingFilter({ value, onChange }: RatingFilterProps) {
  return (
    <div className="rating-filter">
      <label className="rating-filter__label">Valoración mínima</label>
      <div className="rating-filter__options">
        {ratingOptions.map((option) => (
          <button
            key={option.value}
            className={`rating-filter__option ${
              value === option.value ? 'rating-filter__option--active' : ''
            }`}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RatingFilter;

