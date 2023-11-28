import React from 'react';

const Deck = ({ deckName, onClick }) => {
	return (
		<div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center" onClick={onClick}>
			{deckName.length > 30 ? <h2 className="text-3xl font-semibold text-white mb-4">{deckName.slice(0, 30)}...</h2> : <h2 className="text-3xl font-semibold text-white mb-4">{deckName}</h2>}
		</div>
	);
};

export default Deck;
