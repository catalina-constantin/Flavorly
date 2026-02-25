import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { sendPasswordReset } from "../services/authService";
import FormInput from "../components/FormInput";
import "../styles/AuthShared.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email address.");

    setLoading(true);
    try {
      await sendPasswordReset(email);
      toast.success("Password reset link sent! Check your inbox.", {
        style: { border: "1px solid #4C763B", padding: "16px" },
        iconTheme: { primary: "#4C763B", secondary: "#FFFAEE" },
      });
    } catch (err) {
      toast.error(err.message || "Failed to send reset link.", {
        style: { border: "1px solid #C75D2C", padding: "16px" },
        iconTheme: { primary: "#C75D2C", secondary: "#FFFAEE" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-paper">
        <h1 className="auth-title">Reset Password</h1>
        <p
          className="auth-footer-text auth-text-left"
          style={{ marginBottom: "24px" }}
        >
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <FormInput
            label="Email address"
            type="email"
            name="email"
            id="forgot-password-email"
            placeholder="name@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

          <p className="auth-footer-text">
            Remember your password?{" "}
            <Link to="/login" className="auth-link">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
