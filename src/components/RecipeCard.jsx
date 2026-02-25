import React from "react";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { prefetchRecipeDetails } from "../store/itemsSlice";
import "../styles/RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const placeholderImage = "/default.png";

  const handleClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
    navigate(`/recipes/${recipe.id}`);
  };

  const handleMouseEnter = () => {
    dispatch(prefetchRecipeDetails(recipe.id));
  };

  return (
    <div
      className="recipe-card"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <div className="recipe-image-wrapper">
        <img
          src={recipe.image_url || placeholderImage}
          alt={recipe.title}
          className="recipe-image"
          loading="lazy"
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
        <h2>{recipe.title}</h2>
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
