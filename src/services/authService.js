import { supabase } from "../supabaseClient";

export const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) throw error;
  return data;
};

export const verifyEmailToken = async (token) => {
  const { error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: "email",
  });
  if (error) throw error;

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

export const resendVerificationEmail = async (email) => {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
  });
  if (error) throw error;
};

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
};

export const sendPasswordReset = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
};

export const updatePassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
  return data;
};
