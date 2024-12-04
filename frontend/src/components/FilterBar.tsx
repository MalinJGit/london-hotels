import React from 'react';

interface Filters {
    priceRange: [number, number];
    rating: number;
    location: string;
  }

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onFilterChange({ ...filters, priceRange: [0, value] });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    onFilterChange({ ...filters, rating: value });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFilterChange({ ...filters, location: value });
  };

  return (
    <div>
      <label>
        Pris (max):
        <input
          type="number"
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
        />
      </label>
      <label>
        Betyg:
        <select value={filters.rating} onChange={handleRatingChange}>
          <option value={0}>Alla</option>
          <option value={3}>Minst 3 stjärnor</option>
          <option value={4}>Minst 4 stjärnor</option>
        </select>
      </label>
      <label>
        Plats:
        <input
          type="text"
          value={filters.location}
          onChange={handleLocationChange}
        />
      </label>
    </div>
  );
};

export default FilterBar;
