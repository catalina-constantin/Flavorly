import React from "react";
import { UtensilsCrossed } from "lucide-react";
import "../styles/IngredientList.css";

const IngredientList = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  return (
    <section className="ingredients-card">
      <h2>
        <UtensilsCrossed size={24} className="icon-orange" />
        Ingredients
      </h2>
      <ul className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <span className="ingredient-qty">
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
