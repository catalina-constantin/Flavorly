import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthTempData } from "../../store/authSlice";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";
import styles from "../../styles/pages/VerifyEmail.module.css";

const VerifyEmail = () => {
  const { loading, user, pendingEmail, handleResend } = useVerifyEmail();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    dispatch(clearAuthTempData());
    navigate("/register");
  };

  return (
    <div className={styles["verify-email-container"]}>
      <div className={styles["verify-email-paper"]}>
        <h1 className={styles["verify-email-title"]}>Verify your email</h1>

        <p className={styles["verify-email-description"]}>
          We've sent a verification link to <br />
          <strong>{user?.email || pendingEmail || "your email address"}</strong>
        </p>

        <p className={styles["verify-email-instructions"]}>
          Click the link in your email to verify your account and get started.
        </p>

        <div className={styles["verify-email-actions"]}>
          <button
            onClick={handleResend}
            disabled={loading || !(user?.email || pendingEmail)}
            className={styles["resend-button"]}
          >
            {loading ? "Sending..." : "Resend Verification Email"}
          </button>
        </div>

        <div className={styles["verify-email-footer-group"]}>
          <p className={styles["verify-email-footer"]}>
            Already verified?{" "}
            <button
              className={styles["refresh-link"]}
              onClick={() => window.location.reload()}
              disabled={loading}
            >
              Refresh
            </button>
          </p>
          <p className={styles["verify-email-footer"]}>
            Wrong email?{" "}
            <button
              className={styles["refresh-link"]}
              onClick={handleCancel}
              disabled={loading}
            >
              Change email
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
