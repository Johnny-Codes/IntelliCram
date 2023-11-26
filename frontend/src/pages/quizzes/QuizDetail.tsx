import { useGetAllQuizQuestionsQuery } from '@/queries/quizzes';
import { useSelector } from 'react-redux';

const QuizDetail = () => {
    const quizId = useSelector((state) => state.quizzes.quiz_id)
    console.log("quizId prop", quizId)

    const { data: quiz, isLoading } = useGetAllQuizQuestionsQuery(quizId);
    //     console.log("quiz inside quiz detail", quiz);

    //     const [selectedAnswer, setSelectedAnswer] = useState(null);
    //
    //     const handleAnswerClick = (answer) => {
    //         setSelectedAnswer(answer);
    //     };

    if (isLoading) {
        return <p>Your Quiz is Loading</p>;
    }

    if (!quiz) {
        return <p>No quiz found</p>;
    }

    if (quiz) {
        quiz.map((question) => {
            console.log('quiz', quiz)
            console.log('question', question.question)
            console.log('answers', question.answers)
            question.answers.map((answer) => {
                console.log('answers by line?', answer.answer)
            })
        })
        return (
            <div className="max-w-md mx-auto p-4 bg-blue-100 rounded-md shadow-md">
                <h1 className="text-3xl font-bold mb-4">Quiz</h1>
                {quiz &&
                    quiz.map((question) => (
                        <div key={question.id} className="mb-4">
                            <p className="text-lg font-semibold mb-2">{question.question}</p>
                            <div className="ml-4">
                                {question.answers.map((answer) => (
                                    <label key={answer.id} className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            name={`question_${question.id}`}
                                            value={answer.id}
                                            className="mr-2"
                                        />
                                        <span className="text-base">{answer.answer}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        );
    }
};

export default QuizDetail;
