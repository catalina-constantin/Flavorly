import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role: null,
    isAuthenticated: false,
    emailVerified: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role || state.role;

      const isVerified = !!action.payload.user?.email_confirmed_at;
      state.emailVerified = isVerified;

      state.isAuthenticated = !!action.payload.user && isVerified;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.emailVerified = false;
    },
    clearAuthTempData: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.emailVerified = false;
    },
  },
});

export const { setUser, logout, clearAuthTempData } = authSlice.actions;
export default authSlice.reducer;
