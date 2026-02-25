import React from "react";
import "../styles/FormCheckbox.css";

function FormCheckbox({ checked, onChange, error }) {
  return (
    <div className="checkbox-section">
      <label className="checkbox-wrapper" htmlFor="acceptDataProcessing">
        <input
          type="checkbox"
          id="acceptDataProcessing"
          name="acceptDataProcessing"
          checked={checked}
          onChange={onChange}
          className="custom-checkbox"
        />
        <span className="checkbox-text">
          I agree to the processing of my personal data.
        </span>
      </label>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default FormCheckbox;
