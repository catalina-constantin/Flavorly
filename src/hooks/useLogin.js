import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { setUser } from "../store/authSlice";
import { showSuccessToast, showErrorToast } from "../utils/toastHelpers";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user && !data.user.email_confirmed_at) {
        dispatch(setUser({ user: data.user, role: "visitor" }));
        showErrorToast("Please verify your email before logging in.");
        navigate("/verify-email");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      dispatch(setUser({ user: data.user, role: profile?.role }));
      showSuccessToast("Welcome back to Flavorly!");

      navigate("/");
    } catch (err) {
      showErrorToast(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};
