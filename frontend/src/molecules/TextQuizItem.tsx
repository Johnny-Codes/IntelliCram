import React from 'react';

const TextQuizItem = ({ text, role, animate }) => {
  const alignClass = role === 'user' ? 'text-right bg-green-500' : 'text-left bg-blue-500';
  const animationClass = animate ? 'animate-pulse' : '';

  return (
    <div className={`mb-4 flex justify-${role === 'user' ? 'end' : 'start'}`}>
      <div
        className={`text-white p-2 rounded-lg inline-block overflow-hidden max-w-[50%] ${alignClass} ${animationClass}`}
      >
        {text}
      </div>
    </div>
  );
};

export default TextQuizItem;
