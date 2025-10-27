import './SortFilter.css';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

interface SortFilterProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Predeterminado' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'rating', label: 'Mejor Valorados' },
  { value: 'name', label: 'Nombre A-Z' },
];

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

