import React from "react";
import { Checkbox } from "@mui/material";
import "../styles/FormCheckbox.css";

function FormCheckbox({ checked, onChange, error }) {
  return (
    <div className="checkbox-section">
      <label className="checkbox-wrapper">
        <Checkbox
          checked={checked}
          onChange={onChange}
          className="form-checkbox"
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
