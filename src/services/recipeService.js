import { supabase } from "../supabaseClient";
import { validateRecipe, validateCategory } from "../utils/recipeValidation";

export const getRecipes = async () => {
  const { data, error } = await supabase.from("recipes").select(`
      id,
      title,
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

export const getRecipeById = async (id) => {
  const { data, error } = await supabase
    .from("recipes")
    .select(
      `
      *,
      recipe_categories(categories(id, name)),
      recipe_ingredients(
        quantity, 
        unit, 
        ingredients(name)
      )
    `,
    )
    .eq("id", id)
    .single();
  console.log("Raw data from Supabase:", data);
  if (error) throw error;
  const processedData = {
    ...data,
    categories: (data.recipe_categories || [])
      .map((rc) => rc?.categories)
      .filter(validateCategory),
  };
  console.log("Processed data with categories:", processedData);
  return processedData;
};
