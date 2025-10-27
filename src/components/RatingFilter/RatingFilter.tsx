import './RatingFilter.css';

interface RatingFilterProps {
  value: number;
  onChange: (rating: number) => void;
}

const ratingOptions = [
  { value: 0, label: 'Todas las valoraciones' },
  { value: 4, label: '4★ o más' },
  { value: 3, label: '3★ o más' },
  { value: 2, label: '2★ o más' },
  { value: 1, label: '1★ o más' },
];

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

