import React from "react";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const placeholderImage = "/default.png";

  const handleClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      <div className="recipe-image-wrapper">
        <img
          src={recipe.image_url || placeholderImage}
          alt={recipe.title}
          className="recipe-image"
        />
      </div>
      <div className="recipe-content">
        <div className="recipe-categories">
          {recipe.categories && recipe.categories.length > 0 ? (
            recipe.categories.slice(0, 2).map((cat, idx) => (
              <span key={cat.id || idx} className="recipe-category">
                {cat.name}
              </span>
            ))
          ) : (
            <span className="recipe-category">Uncategorized</span>
          )}
        </div>
        <h3>{recipe.title}</h3>
        <div className="recipe-info">
          <span className="recipe-time">
            <Clock size={18} /> {recipe.cooking_time_minutes} mins
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
