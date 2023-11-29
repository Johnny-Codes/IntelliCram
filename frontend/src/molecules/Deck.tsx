// import React from 'react';

// const Deck = ({ deckName, onClick }) => {
// 	return (
// 		<div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center h-32" onClick={onClick}>
// 			{deckName.length > 30 ? <p className="text-xl font-semibold text-white mb-4">{deckName.slice(0, 30)}...</p> : <p className="text-xl font-semibold text-white mb-4">{deckName}</p>}
// 		</div>
// 	);
// };

// export default Deck;

import React from 'react';

const Deck = ({ deckName, onClick }) => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105" onClick={onClick}>
      <div className="bg-gray-800 p-4 h-32 flex items-center justify-center">
        {deckName.length > 30 ? (
          <p className="text-white text-lg font-semibold text-center">
            {deckName.slice(0, 30)}...
          </p>
        ) : (
          <p className="text-white text-lg font-semibold text-center">
            {deckName}
          </p>
        )}
      </div>
    </div>
  );
};

export default Deck;
