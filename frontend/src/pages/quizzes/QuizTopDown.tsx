import React from 'react';
import { useGetAllUserQuizzesQuery } from '@/queries/quizzes';
import { useDispatch } from 'react-redux';
import { showQuizDetail, showQuizzesList } from '@/slices/SpaSlice';
import { setQuiz } from '@/slices/QuizzesSlice';

const QuizTopDown = () => {
	const { data: quizzes, isLoading } = useGetAllUserQuizzesQuery();
	const dispatch = useDispatch();

	const handleQuizState = (e, id) => {
		e.preventDefault();
		dispatch(setQuiz(id));
	};

	if (isLoading) {
		return <p>Your Quizzes is Loading</p>;
	}

	// if (!quizzes || quizzes.length === 0) {
	//     return <p>No quizzes found</p>;
	// }

	return (
		<>
			<tr className="max-w-md mx-auto p-4 bg-blue-100">
				<td colSpan="2">
					<h1 className="text-3xl text-center font-bold mb-4 p-2 border-b-2 border-white">Quizzes</h1>
				</td>
			</tr>
			{quizzes.map((quiz) => (
				<tr key={quiz.id} className="max-w-md mx-auto bg-blue-100 hover:cursor-pointer">
					<td className="px-4 py-1">
						<p onClick={(e) => handleQuizState(e, quiz.id)}>{quiz.name.charAt(0).toUpperCase() + quiz.name.slice(1)}</p>
					</td>
				</tr>
			))}
		</>
	);
};

export default QuizTopDown;
