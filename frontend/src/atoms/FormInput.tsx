// FormInput.js

import React from 'react';

const FormInput = ({ value, placeholder, onChange, type, name, id, className }) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      name={name}
      id={id}
      className={`w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 ${className}`}
    />
  );
};

export default FormInput;
