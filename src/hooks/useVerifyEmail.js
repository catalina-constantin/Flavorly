import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast, showErrorToast } from "../utils/toastHelpers";
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

          showSuccessToast("Email verified successfully!");
          navigate("/");
        }
      } catch (err) {
        showErrorToast(err.message || "Verification failed.");
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
      showSuccessToast("Verification email sent!");
    } catch (err) {
      showErrorToast(err.message || "Failed to resend email.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, user, pendingEmail, handleResend };
};
