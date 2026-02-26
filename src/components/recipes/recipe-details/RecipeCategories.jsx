import React from "react";
import styles from "../../../styles/recipes/RecipeCategories.module.css";

const RecipeCategories = ({ categories }) => {
  const categoriesList = categories || [];

  return (
    <div className={styles["recipe-details-categories"]}>
      {categoriesList.map((cat) => (
        <span key={cat.id} className={styles["recipe-details-category-badge"]}>
          {cat.name}
        </span>
      ))}
    </div>
  );
};

export default RecipeCategories;
