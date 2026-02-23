import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "light",
  filterCategory: localStorage.getItem("filterCategory") || "all",
  sortBy: "name",
  currentPage: 1,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
    setFilter: (state, action) => {
      state.filterCategory = action.payload;
      localStorage.setItem("filterCategory", action.payload);
    },
    setSort: (state, action) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { toggleTheme, setFilter, setSort, setPage } = uiSlice.actions;
export default uiSlice.reducer;
