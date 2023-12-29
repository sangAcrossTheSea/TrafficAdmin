import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
  },
  reducers: {
    openLoader: (state) => {
      state.isLoading = true;
    },

    closeLoader: (state) => {
      state.isLoading = false;
    },
  },
});

export const { openLoader, closeLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
