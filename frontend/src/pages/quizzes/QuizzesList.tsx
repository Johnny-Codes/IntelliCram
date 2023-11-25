import React, { useState, useEffect } from 'react';
import { useGetAllUserQuizzesQuery } from "@/queries/quizzes"
import { useDispatch } from "react-redux"
import QuizDetail from './QuizDetail';

const QuizzesList = () => {
	const dispatch = useDispatch()

    const { data: quizzes, isLoading } = useGetAllUserQuizzesQuery();

    useEffect(() => {
        // You can add any additional logic here if needed
    }, [quizzes]);

    if (isLoading) {
        return (
            <div>
                <p>Your Quizzes are still loading</p>
            </div>
        );
    }

    return (
        <>
            {quizzes && quizzes.map((quiz) => (
                <div key={quiz.id}>
                    {/* Uncomment the line below to render QuizDetail */}
                    <QuizDetail quizId={quiz.id}/>
                </div>
            ))}
        </>
    )
}

export default QuizzesList;
