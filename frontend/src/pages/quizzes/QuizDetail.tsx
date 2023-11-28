import React, { useState, useEffect } from 'react';
import { useGetAllQuizQuestionsQuery } from '@/queries/quizzes';
import { useSelector } from 'react-redux';
import QuizSubmitButton from '@/molecules/QuizSubmitButton';

const QuizDetail = () => {
    const quizId = useSelector((state) => state.quizzes.quiz_id);
    console.log('quizId prop', quizId);

    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

    const { data: quiz, isLoading } = useGetAllQuizQuestionsQuery(quizId);
    console.log("quiz response", quiz)

    const handleAnswerChange = (questionId, answerId) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [questionId]: answerId,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowCorrectAnswers(true);
    };

    useEffect(() => {
        // Reset the state when the quiz changes
        setSelectedAnswers({});
        setShowCorrectAnswers(false);
    }, [quizId]);

    if (isLoading) {
        return <p>Your Quiz is Loading</p>;
    }

    if (!quiz) {
        return <p>No quiz found</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="max-w-md mx-auto p-4 bg-blue-100 rounded-md shadow-md">
                <h1 className="text-3xl font-bold mb-4">Quiz</h1>
                {quiz.map((question) => (
                    <div key={question.id} className="mb-4">
                        <p className="text-lg font-semibold mb-2">{question.question}</p>
                        <div className="ml-4">
                            {question.answers.map((answer) => (
                                <div key={answer.id}>
                                    <input
                                        type="radio"
                                        name={`question_${question.id}`}
                                        value={answer.id}
                                        id={`answer_${answer.id}`}
                                        className="mr-2"
                                        checked={selectedAnswers[question.id] === answer.id}
                                        onChange={() => handleAnswerChange(question.id, answer.id)}
                                        disabled={showCorrectAnswers}
                                    />
                                    <label
                                        htmlFor={`answer_${answer.id}`}
                                        className={`text-base ${
                                            showCorrectAnswers && answer.answer === question.correct_answer
                                                ? 'text-green-500 font-bold'
                                                : showCorrectAnswers && selectedAnswers[question.id] === answer.id
                                                    ? 'text-red-500 font-bold'
                                                    : ''
                                            }`}
                                    >
                                        {answer.answer}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <QuizSubmitButton />
            </div>
        </form>
    );
};

export default QuizDetail;
