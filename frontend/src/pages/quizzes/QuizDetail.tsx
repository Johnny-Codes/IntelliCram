import React, { useState } from 'react';
import { useGetAllQuizQuestionsQuery } from '@/queries/quizzes';

const QuizDetail = (props) => {
    const { quizId } = props;
    console.log("quiz id that is passed in", quizId);
    
    const { data: quiz, isLoading } = useGetAllQuizQuestionsQuery(quizId);
    console.log("quiz inside quiz detail", quiz);

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
    };

    if (isLoading) {
        return <p>Your Quiz is Loading</p>;
    }

    if (!quiz) {
        return <p>No quiz found</p>;
    }

    return (
        <div>
            <h1>Quizzes</h1>
            <p>Question: {quiz.question}</p>
            {quiz.answers && quiz.answers.map((answer, index) => (
                <p key={index}>Answer: {answer}</p>
            ))}
        </div>
    );
};

export default QuizDetail;
