import React, { useState } from "react";
import { useResetPassword } from "../hooks/useResetPassword";
import FormInput from "../components/FormInput";
import { validatePasswordFields } from "../utils/registerValidation";
import "../styles/AuthShared.css";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { handleResetPassword, loading } = useResetPassword();

  const { password, confirmPassword } = formData;

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validatePasswordFields(
      { password, confirmPassword },
      "confirmPassword",
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    handleResetPassword(password);
  };

  const isFormValid = password && confirmPassword;

  return (
    <div className="auth-container">
      <div className="auth-paper">
        <h1 className="auth-title">New Password</h1>
        <p
          className="auth-footer-text auth-text-left"
          style={{ marginBottom: "24px" }}
        >
          Please enter your new password below to regain access to your account.
        </p>

        <form onSubmit={onSubmit} className="auth-form">
          <FormInput
            label="New Password"
            type="password"
            name="password"
            id="reset-password"
            placeholder="••••••••"
            value={password}
            onChange={handleChange("password")}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            autoComplete="new-password"
            error={Boolean(errors.password)}
            helperText={errors.password}
          />

          <FormInput
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            id="reset-confirmPassword"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={handleChange("confirmPassword")}
            showPassword={showPassword}
            autoComplete="new-password"
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            disabled={loading || !isFormValid}
            className="auth-button"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
