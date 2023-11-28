import React from 'react';
import { useGetAllUserQuizzesQuery } from '@/queries/quizzes';

const QuizforDeck = (props) => {
  const { data: quizzes, isLoading } = useGetAllUserQuizzesQuery();

  if (isLoading) {
    return <p>Your Quizzes are Loading</p>;
  }

  if (!quizzes || quizzes.length === 0) {
    return <p>No quizzes found</p>;
  }

  // return (
    // <div className="max-w-md mx-auto p-4 bg-blue-100 rounded-md shadow-md">
    //   <h1 className="text-3xl font-bold mb-4">Quizzes</h1>
    //   {quizzes && quizzes.map((quiz) => (
    //     // Use conditional rendering to filter quizzes based on deck_id
    //     props.deck_id === quiz.deck_id && (
    //       <div key={quiz.id} className="mb-4">
    //         <p>{quiz.name}</p>
    //       </div>
    //     )
    //   ))}
    // </div>
  // );
};

export default QuizforDeck;
