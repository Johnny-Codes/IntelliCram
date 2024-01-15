import { createSlice } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";

const initialUser = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/, "$1");
const initialAccessToken = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1");

// Create an account slice that saves the response in state
export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    user: initialUser || null,
    accessToken: initialAccessToken || null,
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
