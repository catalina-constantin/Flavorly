import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, setSort } from "../../store/uiSlice";
import styles from "../../styles/recipes/RecipeFilters.module.css";

const RecipeFilters = ({ categories }) => {
  const selectedCategory = useSelector((state) => state.ui.filterCategory);
  const sortBy = useSelector((state) => state.ui.sortBy);
  const dispatch = useDispatch();

  return (
    <div className={styles["filter-group"]}>
      <label htmlFor="category-filter" className={styles["visually-hidden"]}>
        Filter by category
      </label>
      <select
        id="category-filter"
        name="category-filter"
        value={selectedCategory}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <label htmlFor="sort-by" className={styles["visually-hidden"]}>
        Sort recipes
      </label>
      <select
        id="sort-by"
        name="sort-by"
        value={sortBy}
        onChange={(e) => dispatch(setSort(e.target.value))}
      >
        <option value="newest">Newest First</option>
        <option value="time-asc">Cooking Time (Low to High)</option>
        <option value="time-desc">Cooking Time (High to Low)</option>
      </select>
    </div>
  );
};

export default RecipeFilters;
