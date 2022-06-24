import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: () => {
      return null;
    },
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { clearUser, setUser } = userSlice.actions;

export default userSlice.reducer;
