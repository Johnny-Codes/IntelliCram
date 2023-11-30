import React from 'react';

const TextQuizItem = ({ text }) => {
  return (
    <div className="flex items-start mb-4">
      {/* Chat Bubble */}
      <div className="bg-blue-500 text-white p-2 rounded-lg">
        {text}
      </div>
    </div>
  );
};

export default TextQuizItem;
