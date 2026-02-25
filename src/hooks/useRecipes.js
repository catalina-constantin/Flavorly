import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../store/itemsSlice";

export const useRecipes = () => {
  const dispatch = useDispatch();
  const { recipes, status, error } = useSelector((state) => state.items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRecipes());
    }
  }, [status, dispatch]);

  return {
    recipes,
    loading: status === "loading",
    error,
  };
};
