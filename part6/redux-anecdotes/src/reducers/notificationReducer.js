import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    clearNotification: (state, action) => {
      return "";
    },
    newNotification: (state, action) => {
      return action.payload;
    },
  },
});

export const { clearNotification, newNotification } = notificationSlice.actions;

export const setNotification = (content, delay = 5) => {
  return async (dispatch) => {
    dispatch(newNotification(content));

    setTimeout(() => dispatch(clearNotification()), delay * 1000);
  };
};

export default notificationSlice.reducer;
