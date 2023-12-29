import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLicensesContent = createAsyncThunk(
  "/license/content",
  async () => {
    try {
      const response = await axios.get("/license/getAllLicenses");
      console.log("response", response);
      const licenses = response.data;
      return licenses;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const licenseSlice = createSlice({
  name: "license",
  initialState: {
    isLoading: true,
    licenses: [],
  },
  reducers: {
    addNewLicense: (state, action) => {
      let newLeadObj = action.payload;
      state.licenses = [...state.licenses, newLeadObj];
    },

    deleteLicense: (state, action) => {
      let index = action.payload;
      state.licenses.splice(index, 1);
    },

    updateLicense: (state, action) => {
      let { index, newLeadObj } = action.payload;
      state.licenses[index] = newLeadObj;
    },
  },

  extraReducers: {
    [getLicensesContent.pending]: (state) => {
      state.licenses = [];
      state.isLoading = true;
    },
    [getLicensesContent.fulfilled]: (state, action) => {
      state.licenses = action.payload;
      state.isLoading = false;
    },
    [getLicensesContent.rejected]: (state) => {
      state.licenses = [];
      state.isLoading = false;
    },
  },
});

export const { addNewLicense, deleteLicense, updateLicense } =
  licenseSlice.actions;

export default licenseSlice.reducer;
