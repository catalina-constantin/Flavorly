import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import toast from "react-hot-toast";
import FormInput from "../../components/forms/FormInput";
import GoBackButton from "../../components/common/buttons/GoBackButton";
import styles from "../..//styles/pages/auth/AuthShared.module.css";

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
    <div className={styles["auth-container"]}>
      <GoBackButton />
      <div className={styles["auth-paper"]}>
        <h1 className={styles["auth-title"]}>Login</h1>
        <form onSubmit={onSubmit} className={styles["auth-form"]}>
          <FormInput
            label="Email address"
            type="email"
            name="email"
            id="login-email"
            placeholder="name@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            id="login-password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />

          <div className={styles["auth-options"]}>
            <span
              className={styles["auth-footer-text"]}
              style={{ marginTop: 0 }}
            >
              Forgot your password?{" "}
              <Link
                to="/forgot-password"
                className={styles["auth-link"]}
                style={{ fontSize: "0.875rem" }}
              >
                Reset it here
              </Link>
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles["auth-button"]}
          >
            {loading ? "Signing In..." : "Log In"}
          </button>

          <p className={styles["auth-footer-text"]}>
            Don't have an account?{" "}
            <Link to="/register" className={styles["auth-link"]}>
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
