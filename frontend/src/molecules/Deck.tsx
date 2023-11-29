// import React from 'react';

// const Deck = ({ deckName, onClick }) => {
//   return (
//     <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105" onClick={onClick}>
//       <div className="bg-gray-800 p-4 h-32 flex items-center justify-center">
//         {deckName.length > 30 ? (
//           <p className="text-white text-lg font-semibold text-center">
//             {deckName.slice(0, 30)}...
//           </p>
//         ) : (
//           <p className="text-white text-lg font-semibold text-center">
//             {deckName}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Deck;

import React, { useState } from 'react';
import DeleteDeckModal from '@/pages/decks/DeleteDeckModal';
import { useDispatch } from 'react-redux';
import { setDeck } from '@/slices/DeckSlice';

const Deck = ({ deckName, onClick, deckId }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const dispatch = useDispatch()

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent the click from propagating to the parent (Deck) click event
    dispatch(setDeck(deckId));
    console.log("this is the deck Id to delete",deckId)
    setDeleteModalOpen(true);
  };

  return (
    <>
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

        {/* Close (x) button */}
        <button
          onClick={handleDeleteClick}
          className="absolute top-0 right-0 p-2 text-white cursor-pointer"
        >
          <span className="text-lg">×</span>
        </button>
      </div>

      {/* Render the delete deck modal */}
      <DeleteDeckModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => {
          // Implement your logic to delete the deck and its flashcards here
          console.log('Deleting deck...');
          setDeleteModalOpen(false);
        }}
      />
    </>
  );
};

export default Deck;
