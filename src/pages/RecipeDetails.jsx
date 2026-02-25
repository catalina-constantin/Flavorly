import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeDetails } from "../store/itemsSlice";
import RecipeDetailsHeader from "../components/RecipeDetailsHeader";
import IngredientList from "../components/IngredientList";
import InstructionSteps from "../components/InstructionSteps";
import "../styles/RecipeDetails.css";

function RecipeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.items.recipeDetailsCache[id]);
  const status = useSelector((state) => state.items.currentRecipeStatus);

  useEffect(() => {
    dispatch(fetchRecipeDetails(id));
  }, [id, dispatch]);

  if (status === "loading" && !recipe)
    return <div className="status-message">Preparing...</div>;
  if (status === "failed" && !recipe)
    return <div className="status-message error">Error loading!</div>;
  if (!recipe) return <div className="status-message">Recipe not found!</div>;

  return (
    <div className="recipe-details-page">
      <main className="recipe-details-container">
        <RecipeDetailsHeader recipe={recipe} />
        <div className="recipe-grid">
          <IngredientList ingredients={recipe.recipe_ingredients} />
          <InstructionSteps instructions={recipe.instructions} />
        </div>
      </main>
    </div>
  );
}

export default RecipeDetails;
