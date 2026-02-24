import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import toast from "react-hot-toast";
import FormInput from "../components/FormInput";
import "../styles/AuthShared.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin, loading } = useLogin();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields.");
    }
    handleLogin(email, password);
  };

  return (
    <div className="auth-container">
      <div className="auth-paper">
        <h1 className="auth-title">Login</h1>
        <form onSubmit={onSubmit} className="auth-form">
          <FormInput
            label="Email address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />

          <div className="auth-options">
            <span className="auth-footer-text" style={{ marginTop: 0 }}>
              Forgot your password?{" "}
              <Link
                to="/forgot-password"
                className="auth-link"
                style={{ fontSize: "0.875rem" }}
              >
                Reset it here
              </Link>
            </span>
          </div>

          <Button
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading ? "Signing In..." : "Log In"}
          </Button>

          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
