import { supabase } from "../supabaseClient";
import { validateRecipe, validateCategory } from "../utils/recipeValidation";

export const getRecipes = async () => {
  const { data, error } = await supabase.from("recipes").select(`
      id,
      title,
      instructions,
      cooking_time_minutes,
      image_url,
      created_at,
      recipe_categories(
        categories(
          id,
          name
        )
      )
    `);

  if (error) throw error;

  if (!data || !Array.isArray(data)) {
    throw new Error("Invalid data received from database");
  }

  return data.filter(validateRecipe).map((recipe) => ({
    ...recipe,
    categories: (recipe.recipe_categories || [])
      .map((rc) => rc?.categories)
      .filter(validateCategory),
  }));
};
