import { useGetAllUserQuizzesQuery } from '@/queries/quizzes';
import { useDispatch } from 'react-redux';
import { showQuizDetail, showQuizzesList } from '@/slices/SpaSlice';
import { setQuiz } from '@/slices/QuizzesSlice';



const QuizTopDown = () => {
    const { data: quizzes, isLoading } = useGetAllUserQuizzesQuery();
    const dispatch = useDispatch()

    const handleQuizState = (e, id) => {
        e.preventDefault();
        dispatch(setQuiz(id))
    }


    if (isLoading) {
        return <p>Your Quizzes is Loading</p>;
    }

    if (!quizzes) {
        return <p>No quizzes found</p>;
    }

    if (quizzes)
        return (
            <div className="max-w-md mx-auto p-4 bg-blue-100 rounded-md shadow-md">
                <h1 className="text-3xl font-bold mb-4">Quizzes</h1>
                {
                    quizzes && quizzes.map((quiz) => (
                        <div key={quiz.id} className="mb-4">
                            <p onClick={(e) => handleQuizState(e, quiz.id)}>{quiz.name}</p>
                        </div>

                    ))
                }
            </div>

        )
}

export default QuizTopDown
