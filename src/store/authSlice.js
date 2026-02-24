import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role: null,
    isAuthenticated: false,
    emailVerified: false,
    pendingEmail: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role || state.role;

      const isVerified = !!action.payload.user?.email_confirmed_at;
      state.emailVerified = isVerified;

      state.isAuthenticated = !!action.payload.user && isVerified;
      if (action.payload.user?.email) {
        state.pendingEmail = action.payload.user.email;
      }
      if (isVerified) {
        state.pendingEmail = null;
      }
    },
    setPendingEmail: (state, action) => {
      state.pendingEmail = action.payload?.email || null;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.emailVerified = false;
      state.pendingEmail = null;
    },
    clearAuthTempData: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.emailVerified = false;
      state.pendingEmail = null;
    },
  },
});

export const { setUser, setPendingEmail, logout, clearAuthTempData } =
  authSlice.actions;
export default authSlice.reducer;
