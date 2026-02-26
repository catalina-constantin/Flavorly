import React from "react";
import styles from "../../../styles/pages/NewRecipe.module.css";

const RecipeFormActions = ({
  hasDraft,
  onClearDraft,
  isFormValid,
  loading,
}) => {
  return (
    <div className={styles["form-actions"]}>
      {hasDraft && (
        <button
          type="button"
          className={styles["clear-draft-button"]}
          onClick={onClearDraft}
        >
          Clear Draft
        </button>
      )}
      <button
        type="submit"
        className={styles["submit-button"]}
        disabled={!isFormValid || loading}
      >
        {loading ? "Creating..." : "Create Recipe"}
      </button>
    </div>
  );
};

export default RecipeFormActions;
