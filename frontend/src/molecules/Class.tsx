import React from 'react';

const Class = ({ name, onClick }) => {
  return (
    <div
      className="bg-blue-300 text-white p-8 w-full sm:w-1/2 lg:w-1/4 hover:bg-blue-500 cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-2xl font-semibold mb-4">{name}</h2>
      {/* Additional content goes here if needed */}
    </div>
  );
};

export default Class;
