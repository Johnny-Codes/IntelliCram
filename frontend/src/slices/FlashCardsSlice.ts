import { createSlice } from "@reduxjs/toolkit";

// Create an account slice that saves the response in state
export const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState: {
    flashcard_id: null,
  },
  reducers: {
    setFlashcard: (state, action) => {
      state.flashcard_id = action.payload;
    },
    getFlashcard: (state) => {
      return state;
    },
  },
});

export const { setFlashcard, getFlashcard } = flashcardsSlice.actions;

export default flashcardsSlice.reducer;
