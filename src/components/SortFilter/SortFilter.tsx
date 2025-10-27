/**
 * @fileoverview Componente de filtro de ordenamiento de productos
 * @description Proporciona un selector dropdown para ordenar productos por diferentes criterios
 */

import './SortFilter.css';

/**
 * Opciones disponibles para ordenar productos
 * @typedef {'default' | 'price-asc' | 'price-desc' | 'rating' | 'name'} SortOption
 */
export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

/**
 * Props del componente SortFilter
 * @interface SortFilterProps
 * @property {SortOption} value - Opción de ordenamiento actualmente seleccionada
 * @property {(value: SortOption) => void} onChange - Callback cuando cambia la selección
 */
interface SortFilterProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

/**
 * Configuración de opciones de ordenamiento con sus etiquetas
 * @constant
 */
const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Predeterminado' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'rating', label: 'Mejor Valorados' },
  { value: 'name', label: 'Nombre A-Z' },
];

/**
 * Componente de filtro de ordenamiento
 *
 * @component
 * @description
 * Renderiza un selector dropdown que permite al usuario ordenar productos por:
 * - Orden predeterminado (sin ordenamiento)
 * - Precio ascendente (menor a mayor)
 * - Precio descendente (mayor a menor)
 * - Calificación (mejor valorados primero)
 * - Nombre alfabético (A-Z)
 *
 * @param {SortFilterProps} props - Props del componente
 * @returns {JSX.Element} Selector de ordenamiento
 *
 * @example
 * ```tsx
 * const [sortBy, setSortBy] = useState<SortOption>('default');
 *
 * <SortFilter value={sortBy} onChange={setSortBy} />
 * ```
 */
function SortFilter({ value, onChange }: SortFilterProps) {
  return (
    <div className="sort-filter">
      <label htmlFor="sort-select" className="sort-filter__label">
        Ordenar por:
      </label>
      <select
        id="sort-select"
        className="sort-filter__select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortFilter;

