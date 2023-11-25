import React from 'react';

interface FlashcardProps {
  question: string;
  answer: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
  return (
    <div className="flex bg-white rounded-lg overflow-hidden shadow-md my-4">
      {/* Front Side */}
      <div className="w-1/2 p-4 bg-blue-500 text-white">
        <h2 className="text-2xl font-semibold">{question}</h2>
      </div>

      {/* Back Side */}
      <div className="w-1/2 p-4 bg-gray-200">
        <h2 className="text-2xl font-semibold">{answer}</h2>
      </div>
    </div>
  );
};

export default Flashcard;
