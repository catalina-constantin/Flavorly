import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../store/authSlice";
import {
  verifyEmailToken,
  resendVerificationEmail,
  getUserProfile,
} from "../services/authService";

export const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, pendingEmail } = useSelector(
    (state) => state.auth,
  );

  const handleVerify = useCallback(
    async (token) => {
      setLoading(true);
      try {
        const session = await verifyEmailToken(token);
        if (session) {
          const profile = await getUserProfile(session.user.id);
          dispatch(setUser({ user: session.user, role: profile?.role }));

          toast.success("Email verified successfully!", {
            style: { border: "1px solid #4C763B", padding: "16px" },
            iconTheme: { primary: "#4C763B", secondary: "#FFFAEE" },
          });
          navigate("/");
        }
      } catch (err) {
        toast.error(err.message || "Verification failed.");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, navigate],
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
    }

    const queryToken =
      searchParams.get("token_hash") || searchParams.get("token");
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const finalToken = queryToken || hashParams.get("access_token");

    if (finalToken) handleVerify(finalToken);
  }, [isAuthenticated, navigate, searchParams, handleVerify]);

  const handleResend = async () => {
    const email = user?.email || pendingEmail;
    if (!email) return;
    setLoading(true);
    try {
      await resendVerificationEmail(email);
      toast.success("Verification email sent!");
    } catch (err) {
      toast.error(err.message || "Failed to resend email.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, user, pendingEmail, handleResend };
};
