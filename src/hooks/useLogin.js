import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../supabaseClient";
import { setUser } from "../store/authSlice";

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
        toast.error("Please verify your email before logging in.");
        navigate("/verify-email");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      dispatch(setUser({ user: data.user, role: profile?.role }));
      toast.success("Welcome back to Flavorly!", {
        style: { border: "1px solid #4C763B", padding: "16px" },
        iconTheme: { primary: "#4C763B", secondary: "#FFFAEE" },
      });

      navigate("/");
    } catch (err) {
      toast.error(err.message || "Invalid email or password.", {
        style: { border: "1px solid #C75D2C", padding: "16px" },
        iconTheme: { primary: "#C75D2C", secondary: "#FFFAEE" },
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};
