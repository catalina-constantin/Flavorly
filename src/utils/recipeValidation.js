export const validateRecipe = (recipe) => {
  if (!recipe.id || !recipe.title) {
    console.warn("Invalid recipe: missing required fields", recipe);
    return false;
  }

  if (
    typeof recipe.cooking_time_minutes !== "number" ||
    recipe.cooking_time_minutes < 0
  ) {
    console.warn("Invalid cooking_time_minutes", recipe);
    return false;
  }

  return true;
};

export const validateCategory = (category) => {
  return (
    category && typeof category.name === "string" && category.name.trim() !== ""
  );
};
