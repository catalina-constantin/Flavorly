import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipes, getRecipeById } from "../services/recipeService";

export const fetchRecipes = createAsyncThunk(
  "items/fetchRecipes",
  async (_, { getState }) => {
    const { items } = getState();
    if (items.recipes.length > 0) return items.recipes;

    return await getRecipes();
  },
);

export const fetchRecipeDetails = createAsyncThunk(
  "items/fetchRecipeDetails",
  async (recipeId, { getState }) => {
    const { items } = getState();

    if (items.recipeDetailsCache[recipeId]) {
      return {
        id: recipeId,
        data: items.recipeDetailsCache[recipeId],
        fromCache: true,
      };
    }

    const data = await getRecipeById(recipeId);
    return { id: recipeId, data, fromCache: false };
  },
);

export const prefetchRecipeDetails = createAsyncThunk(
  "items/prefetchRecipeDetails",
  async (recipeId, { getState }) => {
    const { items } = getState();

    if (
      items.recipeDetailsCache[recipeId] ||
      items.prefetchingIds.includes(recipeId)
    ) {
      return null;
    }

    const data = await getRecipeById(recipeId);
    return { id: recipeId, data };
  },
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    recipes: [],
    status: "idle",
    error: null,
    recipeDetailsCache: {},
    currentRecipeStatus: "idle",
    prefetchingIds: [],
  },
  reducers: {
    clearRecipeDetailsCache(state) {
      state.recipeDetailsCache = {};
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
      })
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.currentRecipeStatus = "loading";
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentRecipeStatus = "succeeded";
          state.recipeDetailsCache[action.payload.id] = action.payload.data;
        }
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.currentRecipeStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(prefetchRecipeDetails.pending, (state, action) => {
        const recipeId = action.meta.arg;
        if (!state.prefetchingIds.includes(recipeId)) {
          state.prefetchingIds.push(recipeId);
        }
      })
      .addCase(prefetchRecipeDetails.fulfilled, (state, action) => {
        if (action.payload) {
          state.recipeDetailsCache[action.payload.id] = action.payload.data;
          state.prefetchingIds = state.prefetchingIds.filter(
            (id) => id !== action.payload.id,
          );
        }
      })
      .addCase(prefetchRecipeDetails.rejected, (state, action) => {
        const recipeId = action.meta.arg;
        state.prefetchingIds = state.prefetchingIds.filter(
          (id) => id !== recipeId,
        );
      });
  },
});

export const { clearRecipeDetailsCache } = itemsSlice.actions;
export default itemsSlice.reducer;
