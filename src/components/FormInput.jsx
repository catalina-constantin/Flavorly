import React from "react";
import { Eye, EyeOff } from "lucide-react";
import "../styles/FormInput.css";

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
    <div className="form-group">
      <label className="form-label" htmlFor={inputId}>
        {label}
      </label>
      <div className="input-container">
        <input
          {...props}
          id={inputId}
          name={name}
          type={isPasswordField && showPassword ? "text" : type}
          className={`custom-input ${error ? "input-error" : ""}`}
        />
        {isPasswordField && togglePassword && (
          <button
            type="button"
            className="visibility-toggle"
            onClick={togglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {helperText && (
        <p className={`helper-text ${error ? "text-error" : ""}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export default FormInput;
