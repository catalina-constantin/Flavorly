import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { resetRecipesStatus, fetchRecipes } from "../store/itemsSlice";

const STORAGE_KEY = "newRecipeFormData";

const getStoredFormData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const clearStoredFormData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const useNewRecipeForm = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedData = getStoredFormData();

  const [formData, setFormData] = useState(
    storedData?.formData || {
      title: "",
      cooking_time_minutes: "",
      image_url: "",
      instructions: "",
    },
  );

  const [categories, setCategories] = useState(() => {
    try {
      const cached = localStorage.getItem("categories_cache");
      const cachedTime = localStorage.getItem("categories_cache_time");
      if (cached && cachedTime) {
        const now = Date.now();
        if (now - parseInt(cachedTime, 10) < 5 * 60 * 1000) {
          return JSON.parse(cached);
        }
      }
      return [];
    } catch {
      return [];
    }
  });
  const [ingredients, setIngredients] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    storedData?.selectedCategories || [],
  );
  const [recipeIngredients, setRecipeIngredients] = useState(
    storedData?.recipeIngredients || [],
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newIngredientName, setNewIngredientName] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showNewIngredient, setShowNewIngredient] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataToStore = {
      formData,
      selectedCategories,
      recipeIngredients,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
  }, [formData, selectedCategories, recipeIngredients]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const cached = localStorage.getItem("categories_cache");
      const cachedTime = localStorage.getItem("categories_cache_time");
      const now = Date.now();
      let categoriesLoaded = false;
      if (
        cached &&
        cachedTime &&
        now - parseInt(cachedTime, 10) < 5 * 60 * 1000
      ) {
        setCategories(JSON.parse(cached));
        categoriesLoaded = true;
      } else {
        const fetched = await fetchCategories();
        if (fetched && fetched.length > 0) {
          categoriesLoaded = true;
        }
      }
      await fetchIngredients();
      setLoading(!categoriesLoaded);
    };
    fetchAll();
  }, []);

  const fetchIngredients = async () => {
    try {
      const { data, error } = await supabase
        .from("ingredients")
        .select("id, name")
        .order("name");
      if (!error && data) {
        setIngredients(data);
        return data;
      }
      if (error) {
        console.error("Error fetching ingredients:", error);
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
    return null;
  };

  const fetchCategories = async () => {
    let useCache = false;
    try {
      const cached = localStorage.getItem("categories_cache");
      const cachedTime = localStorage.getItem("categories_cache_time");
      if (cached && cachedTime) {
        const now = Date.now();
        if (now - parseInt(cachedTime, 10) < 5 * 60 * 1000) {
          setCategories(JSON.parse(cached));
          useCache = true;
        }
      }
    } catch {
      // If there's an error reading cache, just fetch fresh data
    }

    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("name");

    if (!error && data) {
      setCategories(data);
      try {
        localStorage.setItem("categories_cache", JSON.stringify(data));
        localStorage.setItem("categories_cache_time", Date.now().toString());
      } catch {
        // If there's an error writing to cache, ignore it
      }
      return data;
    }

    if (!useCache && error) {
      console.error("Error fetching categories:", error);
    }

    return null;
  };

  const addNewCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    const trimmedName = newCategoryName.trim();

    try {
      const { error } = await supabase
        .from("categories")
        .insert([{ name: trimmedName }]);

      if (error) {
        console.error("Error creating category:", error);
        alert(`Failed to create category: ${error.message || "Unknown error"}`);
        return;
      }

      const updatedCategories = await fetchCategories();
      if (updatedCategories) {
        const match = updatedCategories.find(
          (category) =>
            category.name.toLowerCase() === trimmedName.toLowerCase(),
        );
        if (match) {
          setSelectedCategories((prev) =>
            prev.includes(match.id) ? prev : [...prev, match.id],
          );
        }
      }

      setNewCategoryName("");
      setShowNewCategory(false);
    } catch (error) {
      console.error("Error creating category:", error);
      alert(`Failed to create category: ${error.message || "Unknown error"}`);
    }
  };

  const handleCategoryKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewCategory();
    } else if (e.key === "Escape") {
      setShowNewCategory(false);
      setNewCategoryName("");
    }
  };

  const addNewIngredient = async () => {
    if (!newIngredientName.trim()) {
      alert("Please enter an ingredient name");
      return;
    }

    const trimmedName = newIngredientName.trim();

    try {
      const { error } = await supabase
        .from("ingredients")
        .insert([{ name: trimmedName }]);

      if (error) {
        console.error("Error creating ingredient:", error);
        alert(
          `Failed to create ingredient: ${error.message || "Unknown error"}`,
        );
        return;
      }

      await fetchIngredients();
      setNewIngredientName("");
      setShowNewIngredient(false);
    } catch (error) {
      console.error("Error creating ingredient:", error);
      alert(`Failed to create ingredient: ${error.message || "Unknown error"}`);
    }
  };

  const handleIngredientKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewIngredient();
    } else if (e.key === "Escape") {
      setShowNewIngredient(false);
      setNewIngredientName("");
    }
  };

  const addRecipeIngredient = () => {
    setRecipeIngredients((prev) => [
      ...prev,
      { ingredient_id: "", quantity: "", unit: "" },
    ]);
  };

  const updateRecipeIngredient = (index, field, value) => {
    setRecipeIngredients((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const removeRecipeIngredient = (index) => {
    setRecipeIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const formatInstructions = (instructions) => {
    return instructions
      .split("\n")
      .map((step) => step.trim())
      .filter((step) => step.length > 0)
      .map((step, index) => `${index + 1}. ${step}`)
      .join("\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: recipe, error: recipeError } = await supabase
        .from("recipes")
        .insert([
          {
            title: formData.title,
            cooking_time_minutes: parseInt(formData.cooking_time_minutes),
            image_url: formData.image_url,
            instructions: formatInstructions(formData.instructions),
            author_id: user.id,
          },
        ])
        .select()
        .single();

      if (recipeError) throw recipeError;

      if (selectedCategories.length > 0) {
        const categoryInserts = selectedCategories.map((catId) => ({
          recipe_id: recipe.id,
          category_id: catId,
        }));

        const { error: catError } = await supabase
          .from("recipe_categories")
          .insert(categoryInserts);

        if (catError) throw catError;
      }

      const validIngredients = recipeIngredients.filter(
        (ing) => ing.ingredient_id && ing.quantity && ing.unit,
      );

      if (validIngredients.length > 0) {
        const ingredientInserts = validIngredients.map((ing) => ({
          recipe_id: recipe.id,
          ingredient_id: ing.ingredient_id,
          quantity: parseFloat(ing.quantity),
          unit: ing.unit,
        }));

        const { error: ingError } = await supabase
          .from("recipe_ingredients")
          .insert(ingredientInserts);

        if (ingError) throw ingError;
      }

      dispatch(resetRecipesStatus());
      await dispatch(fetchRecipes({ forceRefresh: true }));
      clearStoredFormData();
      alert("Recipe created successfully!");
      navigate(`/recipes/${recipe.id}`);
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Failed to create recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.title.trim() &&
    formData.cooking_time_minutes &&
    formData.instructions.trim() &&
    selectedCategories.length > 0 &&
    recipeIngredients.some(
      (ing) => ing.ingredient_id && ing.quantity && ing.unit,
    );

  const hasDraft =
    formData.title ||
    formData.cooking_time_minutes ||
    formData.image_url ||
    formData.instructions ||
    selectedCategories.length > 0 ||
    recipeIngredients.length > 0;

  const handleClearDraft = () => {
    if (window.confirm("Are you sure you want to clear this draft?")) {
      setFormData({
        title: "",
        cooking_time_minutes: "",
        image_url: "",
        instructions: "",
      });
      setSelectedCategories([]);
      setRecipeIngredients([]);
      clearStoredFormData();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (catId) => {
    setSelectedCategories((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId],
    );
  };

  return {
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
  };
};
