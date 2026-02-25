import React from "react";
import { Plus, X } from "lucide-react";

const CategorySelector = ({
  categories,
  selectedCategories,
  onToggle,
  showNew,
  setShowNew,
  newName,
  setNewName,
  onAdd,
}) => (
  <div className="form-group">
    <label>Categories * (select at least one)</label>
    <div className="category-grid">
      {categories.map((cat) => (
        <label key={cat.id} className="checkbox-label">
          <input
            type="checkbox"
            checked={selectedCategories.includes(cat.id)}
            onChange={() => onToggle(cat.id)}
          />
          <span>{cat.name}</span>
        </label>
      ))}
    </div>
    {!showNew ? (
      <button
        type="button"
        onClick={() => setShowNew(true)}
        className="add-new-button"
      >
        <Plus size={16} /> Add new category
      </button>
    ) : (
      <div className="inline-add category-add">
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
        <button type="button" onClick={onAdd} className="save-btn">
          <Plus size={16} /> Add
        </button>
        <button
          type="button"
          onClick={() => setShowNew(false)}
          className="cancel-btn"
        >
          <X size={16} /> Cancel
        </button>
      </div>
    )}
  </div>
);

export default CategorySelector;
