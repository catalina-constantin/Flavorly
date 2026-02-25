import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipes, getRecipeById } from "../services/recipeService";

export const fetchRecipes = createAsyncThunk(
  "items/fetchRecipes",
  async (options = {}, { getState }) => {
    const { items } = getState();
    const { forceRefresh = false } = options;

    if (items.recipes.length > 0 && !forceRefresh) {
      return { recipes: items.recipes, fromCache: true };
    }

    const recipes = await getRecipes();
    return { recipes, fromCache: false };
  },
);

export const refreshRecipesInBackground = createAsyncThunk(
  "items/refreshRecipesInBackground",
  async () => {
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
    lastFetched: null,
  },
  reducers: {
    clearRecipeDetailsCache(state) {
      state.recipeDetailsCache = {};
    },
    resetRecipesStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.recipes = action.payload.recipes || action.payload;
          if (!action.payload.fromCache) {
            state.lastFetched = Date.now();
          }
        }
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(refreshRecipesInBackground.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.lastFetched = Date.now();
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

export const { clearRecipeDetailsCache, resetRecipesStatus } =
  itemsSlice.actions;
export default itemsSlice.reducer;
