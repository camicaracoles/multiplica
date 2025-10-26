import { translateCategory } from '../../utils/formatters';
import './CategoryFilter.css';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(event.target.value);
  };

  return (
    <div className="category-filter">
      <label htmlFor="category-select" className="category-filter__label">
        <span className="category-filter__icon">🏷️</span>
        <span className="category-filter__text">Categoría:</span>
      </label>
      <select
        id="category-select"
        className="category-filter__select"
        value={selectedCategory}
        onChange={handleChange}
        aria-label="Filtrar por categoría"
      >
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {translateCategory(category)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;

