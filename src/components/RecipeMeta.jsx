import React from "react";
import { Clock, Utensils } from "lucide-react";
import "../styles/RecipeMeta.css";

const RecipeMeta = ({ cookingTime, ingredientsCount }) => {
  return (
    <div className="recipe-meta">
      <div className="meta-item">
        <Clock size={20} />
        <span>{cookingTime} mins</span>
      </div>
      <div className="meta-item">
        <Utensils size={20} />
        <span>{ingredientsCount} ingredients</span>
      </div>
    </div>
  );
};

export default RecipeMeta;
