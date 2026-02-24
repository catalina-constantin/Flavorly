import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { validateRegisterForm } from "../utils/registerValidation";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { useRegister } from "../hooks/useRegister";

import FormInput from "../components/FormInput";
import FormCheckbox from "../components/FormCheckbox";
import "../styles/AuthShared.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { formData, handleChange, errors, setErrors, resetForm } =
    useRegisterForm({
      fullName: "",
      email: "",
      password: "",
      repeatPassword: "",
      acceptDataProcessing: false,
    });

  const { handleRegister, loading } = useRegister(resetForm);

  const onSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } =
      validateRegisterForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    handleRegister(formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-paper">
        <h1 className="auth-title">Register</h1>
        <form onSubmit={onSubmit} className="auth-form">
          <FormInput
            label="Full name"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName}
          />

          <FormInput
            label="Email address"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange("email")}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange("password")}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />

          <FormInput
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            value={formData.repeatPassword}
            onChange={handleChange("repeatPassword")}
            showPassword={showPassword}
            error={Boolean(errors.repeatPassword)}
            helperText={errors.repeatPassword}
          />

          <FormCheckbox
            checked={formData.acceptDataProcessing}
            onChange={handleChange("acceptDataProcessing")}
            error={errors.acceptDataProcessing}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
