import React, { useState } from "react";
import { Link } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../utils/toastHelpers";
import { sendPasswordReset } from "../../services/authService";
import FormInput from "../../components/forms/FormInput";
import GoBackButton from "../../components/common/buttons/GoBackButton";
import styles from "../../styles/pages/auth/AuthShared.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return showErrorToast("Please enter your email address.");

    setLoading(true);
    try {
      await sendPasswordReset(email);
      showSuccessToast("Password reset link sent! Check your inbox.");
    } catch (err) {
      showErrorToast(err.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["back-button-wrapper"]}>
        <GoBackButton />
      </div>
      <div className={styles["auth-paper"]}>
        <h1 className={styles["auth-title"]}>Reset Password</h1>
        <p
          className={`${styles["auth-footer-text"]} ${styles["auth-text-left"]}`}
          style={{ marginBottom: "24px" }}
        >
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit} className={styles["auth-form"]}>
          <FormInput
            label="Email address"
            labelClassName="visually-hidden"
            type="email"
            name="email"
            id="forgot-password-email"
            placeholder="name@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={styles["auth-button"]}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className={styles["auth-footer-text"]}>
            Remember your password?{" "}
            <Link to="/login" className={styles["auth-link"]}>
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
