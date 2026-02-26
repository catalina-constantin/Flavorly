import React from "react";
import RecipeCard from "../recipes/RecipeCard";
import styles from "../../styles/pages/Home.module.css";

const FloatingCarousel = ({ recipes, loading }) => {
  if (loading)
    return (
      <div className={styles["floating-cards-container"]}>
        Loading recipes...
      </div>
    );

  return (
    <div className={styles["floating-cards-container"]}>
      {recipes.slice(0, 3).map((recipe, index) => (
        <div
          key={recipe.id}
          className={`${styles["floating-card"]} ${styles[`card-${index + 1}`]}`}
        >
          <RecipeCard recipe={recipe} isPreview={true} />
        </div>
      ))}
    </div>
  );
};

export default FloatingCarousel;
