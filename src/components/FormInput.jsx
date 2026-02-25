import React from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../styles/FormInput.css";

function FormInput({
  label,
  type,
  showPassword,
  togglePassword,
  name,
  id,
  ...props
}) {
  const isPasswordField =
    type === "password" || (type === "text" && togglePassword);

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id || name}>
        {label}
      </label>
      <TextField
        {...props}
        id={id || name}
        name={name}
        fullWidth
        type={isPasswordField ? (showPassword ? "text" : "password") : type}
        className="register-input"
        InputProps={
          togglePassword
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </div>
  );
}

export default FormInput;
