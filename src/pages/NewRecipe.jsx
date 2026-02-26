import React from "react";
import GoBackButton from "../components/common/buttons/GoBackButton";
import RecipeBasicInfo from "../components/recipes/recipe-form/RecipeBasicInfo";
import RecipeInstructionsField from "../components/recipes/recipe-form/RecipeInstructionsField";
import RecipeFormActions from "../components/recipes/recipe-form/RecipeFormActions";
import CategorySelector from "../components/forms/CategorySelector";
import IngredientForm from "../components/recipes/recipe-form/IngredientForm";
import { useNewRecipeForm } from "../hooks/useNewRecipeForm";
import styles from "../styles/pages/NewRecipe.module.css";

function NewRecipe() {
  const {
    formData,
    categories,
    ingredients,
    selectedCategories,
    recipeIngredients,
    newCategoryName,
    newIngredientName,
    showNewCategory,
    showNewIngredient,
    loading,
    handleChange,
    toggleCategory,
    setShowNewCategory,
    setNewCategoryName,
    addNewCategory,
    handleCategoryKeyDown,
    updateRecipeIngredient,
    removeRecipeIngredient,
    addRecipeIngredient,
    setShowNewIngredient,
    setNewIngredientName,
    addNewIngredient,
    handleIngredientKeyDown,
    handleSubmit,
    hasDraft,
    isFormValid,
    handleClearDraft,
  } = useNewRecipeForm();

  return (
    <section className={styles["new-recipe-page"]}>
      <div className={styles["new-recipe-container"]}>
        <GoBackButton />
        <h1>Add a new recipe</h1>

        <form onSubmit={handleSubmit} className={styles["recipe-form"]}>
          <RecipeBasicInfo formData={formData} onChange={handleChange} />

          <RecipeInstructionsField
            value={formData.instructions}
            onChange={handleChange}
          />

          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategories}
            onToggle={toggleCategory}
            showNew={showNewCategory}
            setShowNew={setShowNewCategory}
            newName={newCategoryName}
            setNewName={setNewCategoryName}
            onAdd={addNewCategory}
            onKeyDown={handleCategoryKeyDown}
          />

          <IngredientForm
            recipeIngredients={recipeIngredients}
            availableIngredients={ingredients}
            onUpdate={updateRecipeIngredient}
            onRemove={removeRecipeIngredient}
            onAddRow={addRecipeIngredient}
            showCreate={showNewIngredient}
            setShowCreate={setShowNewIngredient}
            newName={newIngredientName}
            setNewName={setNewIngredientName}
            onCreateNew={addNewIngredient}
            onKeyDown={handleIngredientKeyDown}
          />

          <RecipeFormActions
            hasDraft={hasDraft}
            onClearDraft={handleClearDraft}
            isFormValid={isFormValid}
            loading={loading}
          />
        </form>
      </div>
    </section>
  );
}

export default NewRecipe;
