import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", type: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotification: () => {
      return { message: "", type: "" };
    },
    newNotification: (state, action) => {
      return action.payload;
    },
  },
});

export const { clearNotification, newNotification } = notificationSlice.actions;

export const setNotification = (notification, delay = 5) => {
  return async (dispatch) => {
    dispatch(newNotification(notification));

    setTimeout(() => dispatch(clearNotification()), delay * 1000);
  };
};

export default notificationSlice.reducer;
