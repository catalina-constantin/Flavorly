import React from "react";
import styles from "../../../styles/pages/NewRecipe.module.css";

const RecipeInstructionsField = ({ value, onChange }) => {
  return (
    <div className={styles["form-group"]}>
      <label htmlFor="instructions">Instructions *</label>
      <textarea
        id="instructions"
        name="instructions"
        value={value}
        onChange={onChange}
        rows="6"
        required
      />
    </div>
  );
};

export default RecipeInstructionsField;
