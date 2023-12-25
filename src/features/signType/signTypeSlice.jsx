import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSignTypesContent = createAsyncThunk(
  "/trafficSignType/content",
  async () => {
    try {
      const response = await axios.get(
        "/trafficSignType/getAllTrafficSignTypes"
      );
      console.log("response", response);
      const SignTypes = response.data;
      return SignTypes;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const signTypeSlice = createSlice({
  name: "signType",
  initialState: {
    isLoading: true,
    signTypes: [],
  },
  reducers: {
    addNewSignType: (state, action) => {
      let newLeadObj = action.payload;
      state.signTypes = [...state.signTypes, newLeadObj];
    },

    deleteSignType: (state, action) => {
      let index = action.payload;
      state.signTypes.splice(index, 1);
    },

    updateSignType: (state, action) => {
      let { index, newLeadObj } = action.payload;
      state.signTypes[index] = newLeadObj;
    },
  },

  extraReducers: {
    [getSignTypesContent.pending]: (state) => {
      state.signTypes = [];
      state.isLoading = true;
    },
    [getSignTypesContent.fulfilled]: (state, action) => {
      state.signTypes = action.payload;
      state.isLoading = false;
    },
    [getSignTypesContent.rejected]: (state) => {
      state.signTypes = [];
      state.isLoading = false;
    },
  },
});

export const { addNewSignType, deleteSignType, updateSignType } =
  signTypeSlice.actions;

export default signTypeSlice.reducer;
