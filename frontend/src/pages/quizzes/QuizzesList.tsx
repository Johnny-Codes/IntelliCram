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

    return (
        <div className="flex">
            <div className="w-1/3 p-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                        {quizzes &&
                            quizzes.map((quiz) => (
                                <QuizTopDown />
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="flex-1 p-4">
                {quizId && <QuizDetail />}
            </div>
        </div>
    );
}

export default QuizzesList;
