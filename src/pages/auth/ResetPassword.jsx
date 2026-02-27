import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useResetPassword } from "../../hooks/useResetPassword";
import FormInput from "../../components/forms/FormInput";
import { validatePasswordFields } from "../../utils/registerValidation";
import styles from "../../styles/pages/auth/AuthShared.module.css";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [sessionChecked, setSessionChecked] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  const { handleResetPassword, loading } = useResetPassword();

  const { password, confirmPassword } = formData;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session);
      setSessionChecked(true);
    });
  }, []);

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

  if (!sessionChecked) return null; // or a loader
  if (!hasSession) {
    return <div>Invalid or expired reset link. Please request a new one.</div>;
  }

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["auth-paper"]}>
        <h1 className={styles["auth-title"]}>New Password</h1>
        <p
          className={`${styles["auth-footer-text"]} ${styles["auth-text-left"]}`}
          style={{ marginBottom: "24px" }}
        >
          Please enter your new password below to regain access to your account.
        </p>

        <form onSubmit={onSubmit} className={styles["auth-form"]}>
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

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={styles["auth-button"]}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
