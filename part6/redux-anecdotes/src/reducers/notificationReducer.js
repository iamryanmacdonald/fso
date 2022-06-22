import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    clearNotification: (state, action) => {
      return "";
    },
    setNotification: (state, action) => {
      return action.payload;
    },
  },
});

export const { clearNotification, setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
