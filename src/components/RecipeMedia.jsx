import React from "react";
import "../styles/RecipeMedia.css";

const RecipeMedia = ({ imageUrl, title }) => {
  return (
    <div className="recipe-details-header-media">
      <img
        src={imageUrl || "/default.png"}
        alt={title}
        className="recipe-details-header-image"
      />
    </div>
  );
};

export default RecipeMedia;
