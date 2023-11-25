import { useGetAllQuizQuestionsQuery } from '@/queries/quizzes';
import { useSelector, useDispatch } from 'react-redux';

const QuizDetail = () => {
	const quizId = useSelector((state) => state.quizzes.quiz_id);
	
	const { data: quiz, isLoading } = useGetAllQuizQuestionsQuery(quizId);
    console.log(quiz)


	if (isLoading) {
		return (
			<div>
				<p>Your Quiz is Loading</p>
			</div>
		);
	};

	return (
		<>
        <p>Your quiz should be in the console</p>
		</>
	);
};

export default QuizDetail;
