import React from "react";
import GoBackButton from "../../common/buttons/GoBackButton";
import RecipeMedia from "./RecipeMedia";
import RecipeCategories from "./RecipeCategories";
import RecipeMeta from "./RecipeMeta";
import styles from "../../../styles/recipes/details/RecipeDetailsHeader.module.css";

const RecipeDetailsHeader = ({ recipe }) => {
  return (
    <header className={styles["recipe-details-header"]}>
      <RecipeMedia imageUrl={recipe.image_url} title={recipe.title} />

      <div className={styles["recipe-details-header-content"]}>
        <GoBackButton />

        <div className={styles["recipe-header-info-wrapper"]}>
          <h1>{recipe.title}</h1>
          <RecipeMeta
            cookingTime={recipe.cooking_time_minutes}
            ingredientsCount={recipe.recipe_ingredients?.length}
          />
          <RecipeCategories categories={recipe.categories} />
        </div>
      </div>
    </header>
  );
};

export default RecipeDetailsHeader;
