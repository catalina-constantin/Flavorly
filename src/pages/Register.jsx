import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signUp } from "../services/authService";
import { validateRegisterForm } from "../utils/registerValidation";
import { useRegisterForm } from "../hooks/useRegisterForm";

import { useDispatch } from "react-redux";
import { setPendingEmail, setUser } from "../store/authSlice";

import FormInput from "../components/FormInput";
import FormCheckbox from "../components/FormCheckbox";
import "../styles/Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { formData, handleChange, errors, setErrors, resetForm } =
    useRegisterForm({
      fullName: "",
      email: "",
      password: "",
      repeatPassword: "",
      acceptDataProcessing: false,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } =
      validateRegisterForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const data = await signUp(
        formData.email,
        formData.password,
        formData.fullName,
      );

      if (
        data.user &&
        data.user.identities &&
        data.user.identities.length === 0
      ) {
        throw new Error("Email already registered.");
      }

      if (data.user) {
        dispatch(setUser({ user: data.user, role: "visitor" }));
        dispatch(setPendingEmail(formData.email));
      }

      toast.success(
        "Registration successful! Please check your email to verify your account.",
        {
          style: { border: "1px solid #4C763B", padding: "16px" },
          iconTheme: { primary: "#4C763B", secondary: "#FFFAEE" },
        },
      );

      resetForm();
      navigate("/verify-email");
    } catch (err) {
      if (err.message.includes("already registered") || err.status === 422) {
        toast.error("This email is already registered. Please log in.", {
          style: { border: "1px solid #C75D2C", padding: "16px" },
          iconTheme: { primary: "#C75D2C", secondary: "#FFFAEE" },
        });
        navigate("/login");
      } else {
        toast.error(err.message || "An error occurred.", {
          style: { border: "1px solid #C75D2C", padding: "16px" },
          iconTheme: { primary: "#C75D2C", secondary: "#FFFAEE" },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-paper">
        <h1 className="register-title">Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
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
            className="register-button"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          <p className="footer-text">
            Already have an account?{" "}
            <Link to="/login" className="footer-link">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
