import React, { useState, useRef, useEffect } from "react";
import styles from "../../../styles/pages/NewRecipe.module.css";

function SearchableIngredientSelect({
  value,
  onChange,
  availableIngredients,
  index,
}) {
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
}

export default SearchableIngredientSelect;
