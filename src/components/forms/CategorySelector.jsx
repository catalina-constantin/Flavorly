import React from "react";
import { Plus, X } from "lucide-react";
import styles from "../../styles/forms/CategorySelector.module.css";

function CategorySelector({
  categories,
  selectedCategories,
  onToggle,
  showNew,
  setShowNew,
  newName,
  setNewName,
  onAdd,
  loading,
}) {
  return (
    <div className={styles["form-group"]}>
      <label>Categories * (select at least one)</label>
      <div className={styles["category-grid"]}>
        {loading ? (
          <span style={{ color: "#888", fontStyle: "italic" }}>
            Loading categories...
          </span>
        ) : categories.length === 0 ? (
          <span style={{ color: "#888", fontStyle: "italic" }}>
            No categories found.
          </span>
        ) : (
          categories.map((cat) => (
            <label key={cat.id} className={styles["checkbox-label"]}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => onToggle(cat.id)}
              />
              <span>{cat.name}</span>
            </label>
          ))
        )}
      </div>
      {!showNew ? (
        <button
          type="button"
          onClick={() => setShowNew(true)}
          className={styles["add-new-button"]}
        >
          <Plus size={16} /> Add new category
        </button>
      ) : (
        <div className={`${styles["inline-add"]} ${styles["category-add"]}`}>
          <input
            type="text"
            id="new-category-name"
            name="newCategoryName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter category name"
            aria-label="New category name"
            autoFocus
          />
          <button type="button" onClick={onAdd} className={styles["save-btn"]}>
            <Plus size={16} /> Add
          </button>
          <button
            type="button"
            onClick={() => setShowNew(false)}
            className={styles["cancel-btn"]}
          >
            <X size={16} /> Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default CategorySelector;
