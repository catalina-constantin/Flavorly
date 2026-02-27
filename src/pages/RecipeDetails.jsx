import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeDetails } from "../store/itemsSlice";
import RecipeDetailsHeader from "../components/recipes/recipe-details/RecipeDetailsHeader";
import IngredientList from "../components/recipes/recipe-form/IngredientList";
import InstructionSteps from "../components/recipes/recipe-details/InstructionSteps";
import Loading from "../components/common/Loading";
import styles from "../styles/pages/RecipeDetails.module.css";

function RecipeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.items.recipeDetailsCache[id]);

  useEffect(() => {
    dispatch(fetchRecipeDetails(id));
  }, [id, dispatch]);

  if (!recipe) return <Loading message="Preparing..." />;

  return (
    <div className={styles["recipe-details-page"]}>
      <main className={styles["recipe-details-container"]}>
        <RecipeDetailsHeader recipe={recipe} />
        <div className={styles["recipe-grid"]}>
          <IngredientList ingredients={recipe.recipe_ingredients} />
          <InstructionSteps instructions={recipe.instructions} />
        </div>
      </main>
    </div>
  );
}

export default RecipeDetails;
