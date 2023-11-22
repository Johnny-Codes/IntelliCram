import { createSlice } from "@reduxjs/toolkit";

// Create an account slice that saves the response in state
export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    user: null,
    accessToken: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    getAccessToken: (state) => {
      return state;
    },
  },
});

export const { setUser, setAccessToken, getAccessToken } = accountSlice.actions;

export default accountSlice.reducer;