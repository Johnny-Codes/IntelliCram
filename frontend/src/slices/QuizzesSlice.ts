import { createSlice } from "@reduxjs/toolkit";

// Create an account slice that saves the response in state
export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: {
    quiz_id: null,
    question_id: null,
  },
  reducers: {
    setQuiz: (state, action) => {
      state.quiz_id = action.payload;
    },
    getQuiz: (state) => {
      return state;
    },
    setQuestion: (state, action) => {
      state.question_id = action.payload;
    },
    getQuestion: (state) => {
      return state;
    },
  },
});

export const { setQuiz, getQuiz, setQuestion, getQuestion } = quizzesSlice.actions;

export default quizzesSlice.reducer;
