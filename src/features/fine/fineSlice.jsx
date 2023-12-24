import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFinesContent = createAsyncThunk(
  "/trafficFine/content",
  async () => {
    try {
      const response = await axios.get("/trafficFine/getAllTrafficFines");
      console.log("response", response);
      const fines = response.data;
      return fines;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const fineSlice = createSlice({
  name: "fines",
  initialState: {
    isLoading: true,
    fines: [],
  },
  reducers: {
    addNewFine: (state, action) => {
      let newLeadObj = action.payload;
      state.fines = [...state.fines, newLeadObj];
    },

    deleteFine: (state, action) => {
      let { index } = action.payload;
      state.fines.splice(index, 1);
    },

    updateFine: (state, action) => {
      let { index, newLeadObj } = action.payload;
      state.fines[index] = newLeadObj;
    },
  },

  extraReducers: {
    [getFinesContent.pending]: (state) => {
      state.fines = [];
      state.isLoading = true;
    },
    [getFinesContent.fulfilled]: (state, action) => {
      state.fines = action.payload;
      state.isLoading = false;
    },
    [getFinesContent.rejected]: (state) => {
      state.fines = [];
      state.isLoading = false;
    },
  },
});

export const { addNewFine, deleteFine, updateFine } = fineSlice.actions;

export default fineSlice.reducer;
