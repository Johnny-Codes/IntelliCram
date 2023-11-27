import { createSlice } from "@reduxjs/toolkit";

// Create an account slice that saves the response in state
export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    deck_id: null,
  },
  reducers: {
    setDeck: (state, action) => {
      state.deck_id = action.payload;
    },
    getDeck: (state) => {
      return state;
    },
  },
});

export const { setDeck, getDeck } = decksSlice.actions;

export default decksSlice.reducer;
