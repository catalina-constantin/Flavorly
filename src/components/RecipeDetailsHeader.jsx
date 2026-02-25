import React from "react";
import { Clock, Utensils } from "lucide-react";
import GoBackButton from "./GoBackButton";
import "../styles/RecipeDetailsHeader.css";

const RecipeDetailsHeader = ({ recipe }) => {
  console.log("Datele primite în Header:", recipe);
  console.log("Categoriile disponibile:", recipe?.categories);
  const categoriesList = recipe.categories || [];

  return (
    <header className="recipe-details-header">
      <div className="recipe-details-header-media">
        <img
          src={recipe.image_url || "/default.png"}
          alt={recipe.title}
          className="recipe-details-header-image"
        />
      </div>
      <div className="recipe-details-header-content">
        <GoBackButton />
        <h1>{recipe.title}</h1>

        <div className="recipe-categories">
          {categoriesList.map((cat) => (
            <span key={cat.id} className="recipe-category-badge">
              {cat.name}
            </span>
          ))}
        </div>
        <div className="recipe-meta">
          <div className="meta-item">
            <Clock size={20} />
            <span>{recipe.cooking_time_minutes} mins</span>
          </div>
          <div className="meta-item">
            <Utensils size={20} />
            <span>{recipe.recipe_ingredients?.length} ingredients</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RecipeDetailsHeader;
