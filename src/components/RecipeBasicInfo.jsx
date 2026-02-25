import React from "react";

const RecipeBasicInfo = ({ formData, onChange }) => (
  <>
    <div className="form-group">
      <label htmlFor="title">Recipe Title *</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={onChange}
        required
      />
    </div>

    <div className="form-row">
      <div className="form-group">
        <label htmlFor="cooking_time_minutes">Cooking Time (minutes) *</label>
        <input
          type="number"
          id="cooking_time_minutes"
          name="cooking_time_minutes"
          value={formData.cooking_time_minutes}
          onChange={onChange}
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
          onChange={onChange}
        />
      </div>
    </div>
  </>
);

export default RecipeBasicInfo;
