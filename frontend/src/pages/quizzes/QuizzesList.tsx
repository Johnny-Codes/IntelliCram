import React, { useState, useEffect } from 'react';
import { useGetAllUserQuizzesQuery } from "@/queries/quizzes"
import { useDispatch, useSelector } from "react-redux"
import QuizTopDown from './QuizTopDown';
import QuizDetail from './QuizDetail';

const QuizzesList = () => {
    const dispatch = useDispatch()
    const { data: quizzes, isLoading } = useGetAllUserQuizzesQuery();
    const quizId = useSelector((state) => state.quizzes.quiz_id)

    if (isLoading) {
        return (
            <div>
                <p>Your Quizzes are still loading</p>
            </div>
        );
    }

    if (quizzes) {

        return (
            <div className="grid grid-cols-3 gap-4">
                <div className="grid col-span-1">
                    {quizzes &&
                        quizzes.map((quiz) => (
                            <QuizTopDown
                                key={quiz.id}
                            />
                        ))}
                </div>
                <div className="grid col-span-2">
                    {quizId && <QuizDetail />}
                </div>
            </div>)
    }
}

export default QuizTopDown;
