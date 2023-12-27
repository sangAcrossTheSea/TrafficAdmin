import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getExaminationsContent = createAsyncThunk(
  "/exam/content",
  async () => {
    try {
      const response = await axios.get("/examination/getAllExaminations", {});
      const exams = response.data;
      return exams;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const examSlice = createSlice({
  name: "exam",
  initialState: {
    isLoading: true,
    exams: [],
  },
  reducers: {
    addNewExam: (state, action) => {
      let newLeadObj = action.payload;
      state.exams = [...state.exams, newLeadObj];
    },

    deleteExam: (state, action) => {
      let index = action.payload;
      state.exams.splice(index, 1);
    },

    updateExam: (state, action) => {
      let { index, newLeadObj } = action.payload;
      state.exams[index] = newLeadObj;
    },
  },

  extraReducers: {
    [getExaminationsContent.pending]: (state) => {
      state.exams = [];
      state.isLoading = true;
    },
    [getExaminationsContent.fulfilled]: (state, action) => {
      state.exams = action.payload;
      state.isLoading = false;
    },
    [getExaminationsContent.rejected]: (state) => {
      state.exams = [];
      state.isLoading = false;
    },
  },
});

export const { addNewExam, deleteExam, updateExam } = examSlice.actions;

export default examSlice.reducer;
