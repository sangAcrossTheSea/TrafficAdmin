import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuestionsContent = createAsyncThunk(
  "/questions/content",
  async () => {
    try {
      const response = await axios.get("/question/getAllQuestions", {});
      console.log("response", response.data);
      return response;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    isLoading: true,
    questions: [],
  },
  reducers: {
    addNewQuestion: (state, action) => {
      let { newLeadObj } = action.payload;
      state.questions = [...state.questions, newLeadObj];
    },

    deleteQuestion: (state, action) => {
      let { index } = action.payload;
      state.questions.splice(index, 1);
    },
  },

  extraReducers: {
    [getQuestionsContent.pending]: (state) => {
      state.questions = [];
      state.isLoading = true;
    },
    [getQuestionsContent.fulfilled]: (state, action) => {
      state.questions = action.payload.data;
      state.isLoading = false;
    },
    [getQuestionsContent.rejected]: (state) => {
      state.questions = [];
      state.isLoading = false;
    },
  },
});

export const { addNewQuestion, deleteQuestion } = questionSlice.actions;

export default questionSlice.reducer;
