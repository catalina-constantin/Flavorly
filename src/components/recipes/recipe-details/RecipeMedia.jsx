import React from "react";
import styles from "../../../styles/recipes/details/RecipeMedia.module.css";

const RecipeMedia = ({ imageUrl, title }) => {
  return (
    <div className={styles["recipe-details-header-media"]}>
      <img
        src={imageUrl || "/default.png"}
        alt={title}
        className={styles["recipe-details-header-image"]}
      />
    </div>
  );
};

export default RecipeMedia;
