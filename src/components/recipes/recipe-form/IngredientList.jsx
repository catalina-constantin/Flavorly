import React from "react";
import { UtensilsCrossed } from "lucide-react";
import styles from "../../../styles/recipes/IngredientList.module.css";

const IngredientList = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  return (
    <section className={styles["ingredients-card"]}>
      <h2>
        <UtensilsCrossed size={24} className={styles["icon-orange"]} />
        Ingredients
      </h2>
      <ul className={styles["ingredients-list"]}>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <span className={styles["ingredient-qty"]}>
              {ingredient.quantity} {ingredient.unit}
            </span>
            <span>{ingredient.ingredients?.name || ingredient.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
