import React, { useState } from "react";
import { Clock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { prefetchRecipeDetails, deleteRecipe } from "../store/itemsSlice";
import ConfirmModal from "./ConfirmModal";
import "../styles/RecipeCard.css";

const RecipeCard = ({ recipe, deleteMode }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const placeholderImage = "/default.png";

  const handleClick = () => {
    if (deleteMode) return;
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
    navigate(`/recipes/${recipe.id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteRecipe(recipe.id)).unwrap();
    } catch (error) {
      const message = error?.message || "Failed to delete recipe.";
      window.alert(message);
    }
  };

  const handleMouseEnter = () => {
    dispatch(prefetchRecipeDetails(recipe.id));
  };

  return (
    <>
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        recipeName={recipe.title}
      />
      <div
        className={`recipe-card ${deleteMode ? "delete-mode" : ""}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      >
        {deleteMode && (
          <button
            className="delete-button"
            onClick={handleDelete}
            aria-label="Delete recipe"
          >
            <X size={20} />
          </button>
        )}
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
    </>
  );
};

export default RecipeCard;
