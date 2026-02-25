import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, refreshRecipesInBackground } from "../store/itemsSlice";

export const useRecipes = () => {
  const dispatch = useDispatch();
  const { recipes, status, error, lastFetched } = useSelector(
    (state) => state.items,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRecipes());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded" && recipes.length > 0) {
      const FIVE_MINUTES = 5 * 60 * 1000;
      const shouldRefresh =
        !lastFetched || Date.now() - lastFetched > FIVE_MINUTES;

      if (shouldRefresh) {
        const timer = setTimeout(() => {
          dispatch(refreshRecipesInBackground());
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [status, recipes.length, lastFetched, dispatch]);

  return {
    recipes,
    loading: status === "loading",
    error,
  };
};
