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
		showFlashcardsForm: false,
		showQuizForm: false,
		showQuizDetail: false,
		showQuizzesList: false,
		showPdfForm: false,
		showTextQuiz: true
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
		},
		showQuizForm: (state, action) => {
			state.showQuizForm = action.payload;
		},
		showQuizDetail: (state, action) => {
			state.showQuizDetail = action.payload;
		},
		showQuizzesList: (state, action) => {
			state.showQuizzesList = action.payload;
		},
		showPdfForm: (state, action) => {
			state.showPdfForm = action.payload;
		},
		showTextQuizChat: (state, action) => {
			state.showTextQuizChat = action.payload;
		}
	}
});

export const {
	showClassesList,
	showClassesForm,
	showDecksList,
	showDecksForm,
	showFlashcardsList,
	showFlashcardsForm,
	showQuizForm,
	showQuizDetail,
	showQuizzesList,
	showPdfForm,
	showTextQuizChat
} = spaSlice.actions;

export default spaSlice.reducer;
