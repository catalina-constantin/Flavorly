import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";

export const fetchRecipes = createAsyncThunk("items/fetchRecipes", async () => {
  const { data, error } = await supabase.from("recipes").select(`
      *,
      categories(name),
      recipe_ingredients(quantity, unit, ingredients(name))
    `);

  if (error) throw error;
  return data;
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
