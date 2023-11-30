import React from 'react';

const TextQuizItem = ({ text, role }) => {
	// Determine the class based on the role
	const alignClass = role === 'user' ? 'text-right bg-green-500' : 'text-left bg-blue-500';

	return (
		<div className={`mb-4 flex justify-${role === 'user' ? 'end' : 'start'}`}>
			{/* Chat Bubble */}
			<div className={`text-white p-2 rounded-lg inline-block overflow-hidden max-w-[50%] ${alignClass}`}>
				{text}
			</div>
		</div>
	);
};

export default TextQuizItem;
