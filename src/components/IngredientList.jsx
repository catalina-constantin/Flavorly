import React from "react";
import { Utensils } from "lucide-react";
import "../styles/IngredientList.css";

const IngredientList = ({ ingredients }) => {
  return (
    <aside className="ingredients-card">
      <h2>
        <Utensils size={24} className="icon-orange" />
        Ingredients
      </h2>
      <ul className="ingredients-list">
        {ingredients?.map((item, index) => (
          <li key={index}>
            <span className="ingredient-qty">
              {item.quantity} {item.unit}
            </span>
            <span className="ingredient-name">{item.ingredients?.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default IngredientList;
