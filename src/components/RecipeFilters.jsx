import React from "react";
import "../styles/RecipeFilters.css";

const RecipeFilters = ({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
}) => {
  return (
    <div className="filter-group">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="time-asc">Cooking Time (Low to High)</option>
        <option value="time-desc">Cooking Time (High to Low)</option>
      </select>
    </div>
  );
};

export default RecipeFilters;
