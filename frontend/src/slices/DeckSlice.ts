import { createSlice } from "@reduxjs/toolkit";

// Create an account slice that saves the response in state
export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    deck_id: null,
    deck_name: '',
  },
  reducers: {
    setDeck: (state, action) => {
      const { id, name } = action.payload;
      state.deck_id = id;
      state.deck_name = name;
    },
    getDeck: (state) => {
      return state;
    },
  },
});

export const { setDeck, getDeck } = decksSlice.actions;

export default decksSlice.reducer;
