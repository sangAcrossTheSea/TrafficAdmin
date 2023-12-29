import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsersContent = createAsyncThunk(
  "/userInfor/content",
  async () => {
    try {
      const response = await axios.get("/user/getAllUsers", {});
      console.log("response", response.data);
      return response;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: true,
    users: [],
  },
  reducers: {
    addNewUser: (state, action) => {
      let { newLeadObj } = action.payload;
      state.users = [...state.users, newLeadObj];
    },

    deleteUser: (state, action) => {
      let index = action.payload;
      state.users.splice(index, 1);
    },

    updateUserActive: (state, action) => {
      let { index, IsActive } = action.payload;
      state.users[index].IsActive = IsActive;
    },
  },

  extraReducers: {
    [getUsersContent.pending]: (state) => {
      state.users = [];
      state.isLoading = true;
    },
    [getUsersContent.fulfilled]: (state, action) => {
      state.users = action.payload.data;
      state.isLoading = false;
    },
    [getUsersContent.rejected]: (state) => {
      state.users = [];
      state.isLoading = false;
    },
  },
});

export const { addNewUser, deleteUser, updateUserActive } = userSlice.actions;

export default userSlice.reducer;
