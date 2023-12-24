import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDecreesContent = createAsyncThunk(
  "/decrees/content",
  async () => {
    try {
      const response = await axios.get("/decree/getAllDecrees", {});
      const decrees = response.data;
      return decrees;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const getDecreesContentById = createAsyncThunk(
  "/decrees/contentById",
  async () => {
    try {
      const response = await axios.get("/decree/getAllDecrees", {});
      const decrees = response.data;
      return decrees;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const decreeSlice = createSlice({
  name: "decree",
  initialState: {
    isLoading: true,
    decrees: [],
  },
  reducers: {
    addNewDecree: (state, action) => {
      let newLeadObj = action.payload;
      state.decrees = [...state.decrees, newLeadObj];
    },

    deleteDecree: (state, action) => {
      let { index } = action.payload;
      state.decrees.splice(index, 1);
    },

    updateDecree: (state, action) => {
      let { index, newLeadObj } = action.payload;
      state.decrees[index] = newLeadObj;
    },
  },

  extraReducers: {
    [getDecreesContent.pending]: (state) => {
      state.decrees = [];
      state.isLoading = true;
    },
    [getDecreesContent.fulfilled]: (state, action) => {
      state.decrees = action.payload;
      state.isLoading = false;
    },
    [getDecreesContent.rejected]: (state) => {
      state.decrees = [];
      state.isLoading = false;
    },
  },
});

export const { addNewDecree, deleteDecree, updateDecree } = decreeSlice.actions;

export default decreeSlice.reducer;
