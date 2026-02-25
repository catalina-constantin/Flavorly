import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Plus, X } from "lucide-react";
import GoBackButton from "../components/GoBackButton";
import "../styles/NewRecipe.css";

function NewRecipe() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    cooking_time_minutes: "",
    image_url: "",
    instructions: "",
  });

  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newIngredientName, setNewIngredientName] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showNewIngredient, setShowNewIngredient] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchIngredients();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("name");

    if (!error && data) setCategories(data);
  };

  const fetchIngredients = async () => {
    const { data, error } = await supabase
      .from("ingredients")
      .select("id, name")
      .order("name");

    if (!error && data) setIngredients(data);
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
    if (!newCategoryName.trim()) return;

    const { data, error } = await supabase
      .from("categories")
      .insert([{ name: newCategoryName.trim() }])
      .select()
      .single();

    if (!error && data) {
      setCategories((prev) => [...prev, data]);
      setSelectedCategories((prev) => [...prev, data.id]);
      setNewCategoryName("");
      setShowNewCategory(false);
    } else {
      alert("Failed to create category");
    }
  };

  const addNewIngredient = async () => {
    if (!newIngredientName.trim()) return;

    const { data, error } = await supabase
      .from("ingredients")
      .insert([{ name: newIngredientName.trim() }])
      .select()
      .single();

    if (!error && data) {
      setIngredients((prev) => [...prev, data]);
      setNewIngredientName("");
      setShowNewIngredient(false);
    } else {
      alert("Failed to create ingredient");
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
            instructions: formData.instructions,
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

  return (
    <section className="new-recipe-page">
      <div className="new-recipe-container">
        <GoBackButton />

        <h1>Add a new recipe</h1>

        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-group">
            <label htmlFor="title">Recipe Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cooking_time_minutes">
                Cooking Time (minutes) *
              </label>
              <input
                type="number"
                id="cooking_time_minutes"
                name="cooking_time_minutes"
                value={formData.cooking_time_minutes}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image_url">Image URL</label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
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

          <div className="form-group">
            <label>Categories * (select at least one)</label>
            <div className="category-grid">
              {categories.map((cat) => (
                <label key={cat.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
            {!showNewCategory ? (
              <button
                type="button"
                onClick={() => setShowNewCategory(true)}
                className="add-new-button"
              >
                <Plus size={16} />
                Add new category
              </button>
            ) : (
              <div className="inline-add">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New category name"
                />
                <button type="button" onClick={addNewCategory}>
                  Save
                </button>
                <button type="button" onClick={() => setShowNewCategory(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Ingredients *</label>
            {recipeIngredients.map((item, index) => (
              <div key={index} className="ingredient-row">
                <select
                  value={item.ingredient_id}
                  onChange={(e) =>
                    updateRecipeIngredient(
                      index,
                      "ingredient_id",
                      e.target.value,
                    )
                  }
                >
                  <option value="">Select ingredient...</option>
                  {ingredients.map((ing) => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    updateRecipeIngredient(index, "quantity", e.target.value)
                  }
                  step="0.1"
                  min="0"
                />
                <input
                  type="text"
                  placeholder="Unit (e.g., cup, tbsp)"
                  value={item.unit}
                  onChange={(e) =>
                    updateRecipeIngredient(index, "unit", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeRecipeIngredient(index)}
                  className="remove-button"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRecipeIngredient}
              className="add-new-button"
            >
              <Plus size={16} />
              Add ingredient
            </button>

            {!showNewIngredient ? (
              <button
                type="button"
                onClick={() => setShowNewIngredient(true)}
                className="add-new-button"
              >
                <Plus size={16} />
                Create new ingredient
              </button>
            ) : (
              <div className="inline-add">
                <input
                  type="text"
                  value={newIngredientName}
                  onChange={(e) => setNewIngredientName(e.target.value)}
                  placeholder="New ingredient name"
                />
                <button type="button" onClick={addNewIngredient}>
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewIngredient(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
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
