import React from "react";
import { Clock, Utensils } from "lucide-react";
import styles from "../../../styles/recipes/details/RecipeMeta.module.css";

const RecipeMeta = ({ cookingTime, ingredientsCount }) => {
  return (
    <div className={styles["recipe-meta"]}>
      <div className={styles["meta-item"]}>
        <Clock size={20} />
        <span>{cookingTime} mins</span>
      </div>
      <div className={styles["meta-item"]}>
        <Utensils size={20} />
        <span>{ingredientsCount} ingredients</span>
      </div>
    </div>
  );
};

export default RecipeMeta;
