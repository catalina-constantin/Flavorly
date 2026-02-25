import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";
import { validateRecipe, validateCategory } from "../utils/recipeValidation";

export const fetchRecipes = createAsyncThunk("items/fetchRecipes", async () => {
  const { data, error } = await supabase.from("recipes").select(`
      *,
      recipe_categories(
        categories(
          id,
          name
        )
      ),
      recipe_ingredients(quantity, unit, ingredients(name))
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
});

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    recipes: [],
    status: "idle",
    error: null,
  },
  reducers: {
    removeRecipe: (state, action) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { removeRecipe } = itemsSlice.actions;
export default itemsSlice.reducer;
