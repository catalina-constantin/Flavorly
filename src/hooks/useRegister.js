import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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

      toast.success("Registration successful! Verify your email.", {
        style: { border: "1px solid #4C763B", padding: "16px" },
        iconTheme: { primary: "#4C763B", secondary: "#FFFAEE" },
      });

      resetForm();
      navigate("/verify-email");
    } catch (err) {
      const isExistingUser =
        err.message.includes("already registered") || err.status === 422;

      toast.error(
        isExistingUser
          ? "This email is already registered. Please log in."
          : err.message || "An error occurred.",
        {
          style: { border: "1px solid #C75D2C", padding: "16px" },
          iconTheme: { primary: "#C75D2C", secondary: "#FFFAEE" },
        },
      );

      if (isExistingUser) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading };
};
