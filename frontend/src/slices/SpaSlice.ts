import { createSlice } from '@reduxjs/toolkit';

// Create an account slice that saves the response in state
export const spaSlice = createSlice({
	name: 'spaslice',
	initialState: {
		showClassesList: false,
		showClassesForm: false,
		showDecksList: false,
		showDecksForm: false,
		showFlashcardsList: false,
		showFlashcardsForm: false
	},
	reducers: {
		showClassesList: (state, action) => {
			state.showClassesList = action.payload;
		},
		showClassesForm: (state, action) => {
			state.showClassesForm = action.payload;
		},
		showDecksList: (state, action) => {
			state.showDecksList = action.payload;
		},
		showDecksForm: (state, action) => {
			state.showDecksForm = action.payload;
		},
		showFlashcardsList: (state, action) => {
			state.showFlashcardsList = action.payload;
		},
		showFlashcardsForm: (state, action) => {
			state.showFlashcardsForm = action.payload;
		}
	}
});

export const {
	showClassesList,
	showClassesForm,
	showDecksList,
	showDecksForm,
	showFlashcardsList,
	showFlashcardsForm
} = spaSlice.actions;

export default spaSlice.reducer;
