import React from 'react';

const Deck = ({ deckName, onClick }) => {
	return (
		<div className="bg-gray-800 p-8 rounded-lg shadow-lg" onClick={onClick}>
			<h2 className="text-3xl font-semibold text-white mb-4">{deckName}</h2>
			<div className="grid grid-cols-4 gap-4">
				{/* Card 1 */}
				<div className="bg-gray-700 p-4 rounded-md text-white">Card 1</div>

				{/* Card 2 */}
				<div className="bg-gray-700 p-4 rounded-md text-white">Card 2</div>

				{/* Card 3 */}
				<div className="bg-gray-700 p-4 rounded-md text-white">Card 3</div>

				{/* Card 4 */}
				<div className="bg-gray-700 p-4 rounded-md text-white">Card 4</div>

				{/* Add more cards as needed */}
			</div>
		</div>
	);
};

export default Deck;
