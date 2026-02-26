import React, { useState } from "react";
import { Link } from "react-router-dom";

import { validateRegisterForm } from "../../utils/registerValidation";
import { useRegisterForm } from "../../hooks/useRegisterForm";
import { useRegister } from "../../hooks/useRegister";

import FormInput from "../../components/forms/FormInput";
import FormCheckbox from "../../components/forms/FormCheckbox";
import GoBackButton from "../../components/common/buttons/GoBackButton";
import styles from "../../styles/pages/auth/AuthShared.module.css";

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
    <div className={styles["auth-container"]}>
      <div className={styles["back-button-wrapper"]}>
        <GoBackButton />
      </div>
      <div className={styles["auth-paper"]}>
        <h1 className={styles["auth-title"]}>Register</h1>
        <form onSubmit={onSubmit} className={styles["auth-form"]}>
          <FormInput
            label="Full name"
            name="fullName"
            id="register-fullName"
            placeholder="John Doe"
            autoComplete="name"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName}
          />

          <FormInput
            label="Email address"
            type="email"
            name="email"
            id="register-email"
            placeholder="name@example.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange("email")}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            id="register-password"
            placeholder="••••••••"
            autoComplete="new-password"
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
            name="repeatPassword"
            id="register-repeatPassword"
            placeholder="••••••••"
            autoComplete="new-password"
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

          <button
            type="submit"
            disabled={loading}
            className={styles["auth-button"]}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className={styles["auth-footer-text"]}>
            Already have an account?{" "}
            <Link to="/login" className={styles["auth-link"]}>
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
