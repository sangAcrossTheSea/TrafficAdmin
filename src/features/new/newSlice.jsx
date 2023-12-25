import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNewsContent = createAsyncThunk("/news/content", async () => {
  try {
    const response = await axios.get("/news/getAllNews", {});
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.log("error", error);
  }
});

export const newSlice = createSlice({
  name: "new",
  initialState: {
    isLoading: true,
    news: [],
  },
  reducers: {
    addNewNew: (state, action) => {
      let { newLeadObj } = action.payload;
      state.news = [...state.news, newLeadObj];
    },

    deleteNew: (state, action) => {
      let index = action.payload;
      state.news.splice(index, 1);
    },

    updateNew: (state, action) => {
      let { index, newLeadObj } = action.payload;
      state.news[index] = newLeadObj;
    },
  },

  extraReducers: {
    [getNewsContent.pending]: (state) => {
      state.news = [];
      state.isLoading = true;
    },
    [getNewsContent.fulfilled]: (state, action) => {
      state.news = action.payload.data;
      state.isLoading = false;
    },
    [getNewsContent.rejected]: (state) => {
      state.news = [];
      state.isLoading = false;
    },
  },
});

export const { addNewNew, deleteNew, updateNew } = newSlice.actions;

export default newSlice.reducer;
