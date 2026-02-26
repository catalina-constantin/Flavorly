import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { resetRecipesStatus } from "../store/itemsSlice";
import GoBackButton from "../components/common/buttons/GoBackButton";
import RecipeBasicInfo from "../components/recipes/recipe-form/RecipeBasicInfo";
import CategorySelector from "../components/forms/CategorySelector";
import IngredientForm from "../components/recipes/recipe-form/IngredientForm";
import styles from "../styles/pages/NewRecipe.module.css";

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

function NewRecipe() {
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

  const [categories, setCategories] = useState([]);
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

  // Save to localStorage when form data changes
  useEffect(() => {
    const dataToStore = {
      formData,
      selectedCategories,
      recipeIngredients,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
  }, [formData, selectedCategories, recipeIngredients]);

  useEffect(() => {
    fetchCategories();
    fetchIngredients();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("name");

    if (!error && data) {
      setCategories(data);
      return data;
    }

    if (error) {
      console.error("Error fetching categories:", error);
    }

    return null;
  };

  const fetchIngredients = async () => {
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

    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
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

  return (
    <section className={styles["new-recipe-page"]}>
      <div className={styles["new-recipe-container"]}>
        <GoBackButton />
        <h1>Add a new recipe</h1>

        <form onSubmit={handleSubmit} className={styles["recipe-form"]}>
          <RecipeBasicInfo formData={formData} onChange={handleChange} />

          <div className={styles["form-group"]}>
            <label htmlFor="instructions">Instructions *</label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>

          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategories}
            onToggle={toggleCategory}
            showNew={showNewCategory}
            setShowNew={setShowNewCategory}
            newName={newCategoryName}
            setNewName={setNewCategoryName}
            onAdd={addNewCategory}
            onKeyDown={handleCategoryKeyDown}
          />

          <IngredientForm
            recipeIngredients={recipeIngredients}
            availableIngredients={ingredients}
            onUpdate={updateRecipeIngredient}
            onRemove={removeRecipeIngredient}
            onAddRow={addRecipeIngredient}
            showCreate={showNewIngredient}
            setShowCreate={setShowNewIngredient}
            newName={newIngredientName}
            setNewName={setNewIngredientName}
            onCreateNew={addNewIngredient}
            onKeyDown={handleIngredientKeyDown}
          />

          <div className={styles["form-actions"]}>
            {hasDraft && (
              <button
                type="button"
                className={styles["clear-draft-button"]}
                onClick={handleClearDraft}
              >
                Clear Draft
              </button>
            )}
            <button
              type="submit"
              className={styles["submit-button"]}
              disabled={!isFormValid || loading}
            >
              {loading ? "Creating..." : "Create Recipe"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewRecipe;
