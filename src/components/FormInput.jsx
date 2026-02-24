import React from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../styles/FormInput.css";

function FormInput({ label, type, showPassword, togglePassword, ...props }) {
  const isPasswordField =
    type === "password" || (type === "text" && togglePassword);

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <TextField
        {...props}
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
