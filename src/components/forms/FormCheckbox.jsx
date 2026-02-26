import React from "react";
import styles from "../../styles/forms/FormCheckbox.module.css";

function FormCheckbox({ checked, onChange, error }) {
  return (
    <div className={styles["checkbox-section"]}>
      <label
        className={styles["checkbox-wrapper"]}
        htmlFor="acceptDataProcessing"
      >
        <input
          type="checkbox"
          id="acceptDataProcessing"
          name="acceptDataProcessing"
          checked={checked}
          onChange={onChange}
          className={styles["custom-checkbox"]}
        />
        <span className={styles["checkbox-text"]}>
          I agree to the processing of my personal data.
        </span>
      </label>
      {error && <span className={styles["error-message"]}>{error}</span>}
    </div>
  );
}

export default FormCheckbox;
