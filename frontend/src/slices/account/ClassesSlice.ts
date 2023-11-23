import { createSlice } from "@reduxjs/toolkit";

// Create an account slice that saves the response in state
export const classesSlice = createSlice({
  name: 'classes',
  initialState: {
    class_id: null,
  },
  reducers: {
    setClass: (state, action) => {
      state.class_id = action.payload;
    },
    getClass: (state) => {
      return state;
    },
  },
});

export const { setClass, getClass } = classesSlice.actions;

export default classesSlice.reducer;
