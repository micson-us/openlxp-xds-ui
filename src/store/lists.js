import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userOwnedLists, userSubscribedLists } from "../config/config";

const initialState = {
  lists: null,
  subs: null,
  status: "idle",
  error: null,
};

export const getUserLists = createAsyncThunk(
  "lists/getUserLists",
  async (token) => {
    const url = userOwnedLists;
    const response = await axios.get(url, {
      headers: { Authorization: "Token " + token },
    });
    return response.data;
  }
);

export const getSubscribedLists = createAsyncThunk(
  "lists/getSubscribedLists",
  async (token) => {
    const url = `${userSubscribedLists}`;
    let header = {
      Authorization: "Token " + token,
    };
    const response = await axios.get(url, {
      headers: header,
    });
    return response.data;
  }
);

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    removeLists: (state) => {
      state.lists = null;
      state.subscriptions = null;
    },
  },
  extraReducers: {
    [getUserLists.pending]: (state, action) => {
      state.status = "loading";
      state.lists = null;
      state.error = null;
    },
    [getUserLists.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.lists = action.payload;
      state.error = null;
    },
    [getUserLists.rejected]: (state, action) => {
      state.status = "failed";
      state.lists = null;
      state.error = action.error.message;
    },

    [getSubscribedLists.pending]: (state, action) => {
      state.status = "loading";
      state.subs = null;
      state.error = null;
    },
    [getSubscribedLists.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.subs = action.payload;
      state.error = null;
    },
    [getSubscribedLists.rejected]: (state, action) => {
      state.status = "failed";
      state.subs = null;
      state.error = action.error.message;
    },
  },
});
export const { removeLists } = listsSlice.actions;
export default listsSlice.reducer;
