import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterCategory: localStorage.getItem("filterCategory") || "all",
  sortBy: "recent",
  currentPage: 1,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
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

export const { setFilter, setSort, setPage } = uiSlice.actions;
export default uiSlice.reducer;
