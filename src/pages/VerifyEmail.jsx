import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthTempData } from "../store/authSlice";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import "../styles/VerifyEmail.css";

const VerifyEmail = () => {
  const { loading, user, handleResend } = useVerifyEmail();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    dispatch(clearAuthTempData());
    navigate("/register");
  };

  return (
    <div className="verify-email-container">
      <div className="verify-email-paper">
        <h1 className="verify-email-title">Verify your email</h1>

        <p className="verify-email-description">
          We've sent a verification link to <br />
          <strong>{user?.email || "your email address"}</strong>
        </p>

        <p className="verify-email-instructions">
          Click the link in your email to verify your account and get started.
        </p>

        <div className="verify-email-actions">
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleResend}
            disabled={loading || !user?.email}
            className="resend-button"
          >
            {loading ? "Sending..." : "Resend Verification Email"}
          </Button>
        </div>

        <div className="verify-email-footer-group">
          <p className="verify-email-footer">
            Already verified?{" "}
            <button
              className="refresh-link"
              onClick={() => window.location.reload()}
              disabled={loading}
            >
              Refresh
            </button>
          </p>
          <p className="verify-email-footer">
            Wrong email?{" "}
            <button
              className="refresh-link"
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
