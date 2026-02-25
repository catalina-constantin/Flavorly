import React from "react";
import recipesHeaderImage from "../assets/images/recipes-header.png";
import "../styles/RecipeHeader.css";

function RecipeHeader() {
  return (
    <header className="recipes-header">
      <img
        src={recipesHeaderImage}
        alt="Recipes Banner"
        className="recipes-banner"
      />
      <div className="header-content">
        <h1>From my stove to your table</h1>
        <p>
          Pull up a chair! These are the recipes I finally wrote down so I’d
          stop forgetting my own secrets.
        </p>
      </div>
    </header>
  );
}

export default RecipeHeader;
