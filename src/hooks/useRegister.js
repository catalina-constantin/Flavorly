import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../utils/toastHelpers";
import { signUp } from "../services/authService";
import { setUser, setPendingEmail } from "../store/authSlice";

export const useRegister = (resetForm) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
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

      showSuccessToast("Registration successful! Verify your email.");

      resetForm();
      navigate("/verify-email");
    } catch (err) {
      const isExistingUser =
        err.message.includes("already registered") || err.status === 422;

      showErrorToast(
        isExistingUser
          ? "This email is already registered. Please log in."
          : err.message || "An error occurred.",
      );

      if (isExistingUser) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading };
};
