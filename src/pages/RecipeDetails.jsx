import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeDetails } from "../store/itemsSlice";
import GoBackButton from "../components/GoBackButton";
import { Clock, Utensils } from "lucide-react";
import "../styles/RecipeDetails.css";

function RecipeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const recipe = useSelector((state) => state.items.recipeDetailsCache[id]);
  const status = useSelector((state) => state.items.currentRecipeStatus);

  useEffect(() => {
    dispatch(fetchRecipeDetails(id));
  }, [id, dispatch]);

  if (status === "loading" && !recipe) {
    return <div className="status-message">Loading recipe details...</div>;
  }

  if (status === "failed" && !recipe) {
    return <div className="status-message">Error loading recipe!</div>;
  }

  if (!recipe) {
    return <div className="status-message">Recipe not found!</div>;
  }

  return (
    <div className="recipe-details-container">
      <GoBackButton />

      <header className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-meta">
          <span>
            <Clock size={20} /> {recipe.cooking_time_minutes} mins
          </span>
          <span>
            <Utensils size={20} /> {recipe.recipe_ingredients?.length}{" "}
            ingredients
          </span>
        </div>
      </header>

      <div className="recipe-content">
        <img
          src={recipe.image_url || "/default.png"}
          alt={recipe.title}
          className="detail-image"
        />

        <section className="ingredients-section">
          <h2>Ingredients</h2>
          <ul>
            {recipe.recipe_ingredients?.map((item, index) => (
              <li key={index}>
                <strong>
                  {item.quantity} {item.unit}
                </strong>{" "}
                {item.ingredients?.name}
              </li>
            ))}
          </ul>
        </section>

        <section className="instructions-section">
          <h2>Instructions</h2>
          <p className="instructions-text">{recipe.instructions}</p>
        </section>
      </div>
    </div>
  );
}

export default RecipeDetails;
