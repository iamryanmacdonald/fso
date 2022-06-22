import { createSlice } from "@reduxjs/toolkit";

const initialState = "Welcome to the application";

const notificationSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
  },
});

export default notificationSlice.reducer;
