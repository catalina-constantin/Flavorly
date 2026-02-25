import React from "react";
import "../styles/RecipeCategories.css";

const RecipeCategories = ({ categories }) => {
  const categoriesList = categories || [];

  return (
    <div className="recipe-details-categories">
      {categoriesList.map((cat) => (
        <span key={cat.id} className="recipe-details-category-badge">
          {cat.name}
        </span>
      ))}
    </div>
  );
};

export default RecipeCategories;
