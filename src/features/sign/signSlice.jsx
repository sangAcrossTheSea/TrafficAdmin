import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSignsContent = createAsyncThunk(
  "/trafficSign/content",
  async () => {
    try {
      const response = await axios.get("/trafficSign/getAllTrafficSigns");
      console.log("response", response);
      const signs = response.data;
      return signs;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const signSlice = createSlice({
  name: "sign",
  initialState: {
    isLoading: true,
    signs: [],
  },
  reducers: {
    addNewSign: (state, action) => {
      let newLeadObj = action.payload;
      state.signs = [...state.signs, newLeadObj];
    },

    deleteSign: (state, action) => {
      let index = action.payload;
      state.signs.splice(index, 1);
    },

    updateSign: (state, action) => {
      let { index, newLeadObj } = action.payload;
      state.signs[index] = newLeadObj;
    },
  },

  extraReducers: {
    [getSignsContent.pending]: (state) => {
      state.signs = [];
      state.isLoading = true;
    },
    [getSignsContent.fulfilled]: (state, action) => {
      state.signs = action.payload;
      state.isLoading = false;
    },
    [getSignsContent.rejected]: (state) => {
      state.signs = [];
      state.isLoading = false;
    },
  },
});

export const { addNewSign, deleteSign, updateSign } = signSlice.actions;

export default signSlice.reducer;
