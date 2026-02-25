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
      <label htmlFor="category-filter" className="visually-hidden">
        Filter by category
      </label>
      <select
        id="category-filter"
        name="category-filter"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <label htmlFor="sort-by" className="visually-hidden">
        Sort recipes
      </label>
      <select
        id="sort-by"
        name="sort-by"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="time-asc">Cooking Time (Low to High)</option>
        <option value="time-desc">Cooking Time (High to Low)</option>
      </select>
    </div>
  );
};

export default RecipeFilters;
