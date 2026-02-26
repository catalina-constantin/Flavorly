import React from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "../../styles/forms/FormInput.module.css";

function FormInput({
  label,
  type,
  showPassword,
  togglePassword,
  name,
  id,
  error,
  helperText,
  ...props
}) {
  const isPasswordField = type === "password";
  const inputId = id || name;

  return (
    <div className={styles["form-group"]}>
      <label className={styles["form-label"]} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles["input-container"]}>
        <input
          {...props}
          id={inputId}
          name={name}
          type={isPasswordField && showPassword ? "text" : type}
          className={`${styles["custom-input"]} ${error ? styles["input-error"] : ""}`}
        />
        {isPasswordField && togglePassword && (
          <button
            type="button"
            className={styles["visibility-toggle"]}
            onClick={togglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {helperText && (
        <p
          className={`${styles["helper-text"]} ${error ? styles["text-error"] : ""}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export default FormInput;
