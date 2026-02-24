import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updatePassword } from "../services/authService";

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (newPassword) => {
    setLoading(true);
    try {
      await updatePassword(newPassword);

      toast.success("Password updated successfully! You can now log in.", {
        style: { border: "1px solid #4C763B", padding: "16px" },
        iconTheme: { primary: "#4C763B", secondary: "#FFFAEE" },
      });

      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Failed to update password.", {
        style: { border: "1px solid #C75D2C", padding: "16px" },
        iconTheme: { primary: "#C75D2C", secondary: "#FFFAEE" },
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleResetPassword, loading };
};
