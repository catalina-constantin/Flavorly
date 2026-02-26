import React, { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import styles from "../../../styles/pages/NewRecipe.module.css";

const COMMON_UNITS = [
  "cup",
  "tblsp",
  "teaspoon",
  "ounce",
  "gram",
  "milliliter",
  "liter",
  "pound",
  "pinch",
  "piece",
  "dash",
];

const SearchableIngredientSelect = ({
  value,
  onChange,
  availableIngredients,
  index,
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const filteredIngredients = availableIngredients.filter((ing) =>
    ing.name.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedIngredient = availableIngredients.find(
    (ing) => ing.id === value,
  );

  const handleSelect = (id) => {
    onChange(id);
    setSearch("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles["searchable-select"]} ref={selectRef}>
      <input
        type="text"
        id={`ingredient-id-${index}`}
        name="ingredient_id"
        value={isOpen || !selectedIngredient ? search : selectedIngredient.name}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Search ingredient..."
        aria-label="Ingredient"
        autoComplete="off"
      />
      {isOpen && (
        <div className={styles["select-dropdown"]}>
          {filteredIngredients.length > 0 ? (
            filteredIngredients.map((ing) => (
              <div
                key={ing.id}
                className={`${styles["select-option"]} ${value === ing.id ? styles["selected"] : ""}`}
                onClick={() => handleSelect(ing.id)}
              >
                {ing.name}
              </div>
            ))
          ) : (
            <div className={`${styles["select-option"]} ${styles["disabled"]}`}>
              No matching ingredients
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const IngredientForm = ({
  recipeIngredients,
  availableIngredients,
  onUpdate,
  onRemove,
  onAddRow,
  showCreate,
  setShowCreate,
  newName,
  setNewName,
  onCreateNew,
  onKeyDown,
}) => (
  <div className={styles["form-group"]}>
    <label>Ingredients * (select at least one)</label>
    {recipeIngredients.map((item, index) => (
      <div key={index} className={styles["ingredient-row"]}>
        <SearchableIngredientSelect
          value={item.ingredient_id}
          onChange={(id) => onUpdate(index, "ingredient_id", id)}
          availableIngredients={availableIngredients}
          index={index}
        />
        <input
          type="number"
          id={`ingredient-quantity-${index}`}
          name="ingredient_quantity"
          placeholder="Qty"
          value={item.quantity}
          onChange={(e) => onUpdate(index, "quantity", e.target.value)}
          step="0.1"
          min="0"
          aria-label="Quantity"
          required
        />
        <select
          id={`ingredient-unit-${index}`}
          name="ingredient_unit"
          value={item.unit}
          onChange={(e) => onUpdate(index, "unit", e.target.value)}
          aria-label="Unit"
          required
        >
          <option value="">Select unit...</option>
          {COMMON_UNITS.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className={styles["remove-button"]}
          aria-label="Remove ingredient"
        >
          <X size={18} />
        </button>
      </div>
    ))}
    <div className={styles["ingredient-actions"]}>
      <button
        type="button"
        onClick={onAddRow}
        className={styles["add-new-button"]}
      >
        <Plus size={16} /> Add ingredient
      </button>
      {!showCreate ? (
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className={styles["add-new-button"]}
        >
          <Plus size={16} /> Create new ingredient
        </button>
      ) : (
        <div className={styles["inline-add"]}>
          <input
            type="text"
            id="new-ingredient-name"
            name="newIngredientName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="New ingredient name (press Enter to save)"
            aria-label="New ingredient name"
            autoFocus
          />
          <button
            type="button"
            onClick={onCreateNew}
            className={styles["save-btn"]}
          >
            <Plus size={16} /> Add
          </button>
          <button
            type="button"
            onClick={() => setShowCreate(false)}
            className={styles["cancel-btn"]}
          >
            <X size={16} /> Cancel
          </button>
        </div>
      )}
    </div>
  </div>
);

export default IngredientForm;
