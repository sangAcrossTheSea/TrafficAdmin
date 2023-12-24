import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFineTypesContent = createAsyncThunk(
  "/trafficFineType/content",
  async () => {
    try {
      const response = await axios.get(
        "/trafficFineType/getAllTrafficFineTypes"
      );
      console.log("response", response);
      const fineTypes = response.data;
      return fineTypes;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const fineTypeSlice = createSlice({
  name: "fineTypes",
  initialState: {
    isLoading: true,
    fineTypes: [],
  },
  reducers: {
    addNewFineType: (state, action) => {
      let newLeadObj = action.payload;
      state.fineTypes = [...state.fineTypes, newLeadObj];
    },

    deleteFineType: (state, action) => {
      let { index } = action.payload;
      state.fineTypes.splice(index, 1);
    },

    updateFineType: (state, action) => {
      let { index, newLeadObj } = action.payload;
      state.fineTypes[index] = newLeadObj;
    },
  },

  extraReducers: {
    [getFineTypesContent.pending]: (state) => {
      state.fineTypes = [];
      state.isLoading = true;
    },
    [getFineTypesContent.fulfilled]: (state, action) => {
      state.fineTypes = action.payload;
      state.isLoading = false;
    },
    [getFineTypesContent.rejected]: (state) => {
      state.fineTypes = [];
      state.isLoading = false;
    },
  },
});

export const { addNewFineType, deleteFineType, updateFineType } =
  fineTypeSlice.actions;

export default fineTypeSlice.reducer;
