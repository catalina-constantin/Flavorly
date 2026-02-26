import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../services/authService";
import { showSuccessToast, showErrorToast } from "../utils/toastHelpers";

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (newPassword) => {
    setLoading(true);
    try {
      await updatePassword(newPassword);

      showSuccessToast("Password updated successfully! You can now log in.");

      navigate("/login");
    } catch (err) {
      showErrorToast(err.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return { handleResetPassword, loading };
};
