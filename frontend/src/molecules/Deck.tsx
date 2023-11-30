import React, { useState } from 'react';
import DeleteDeckModal from '@/pages/decks/DeleteDeckModal';
import { useDispatch } from 'react-redux';
import { setDeck } from '@/slices/DeckSlice';

const Deck = ({ deckName, onClick, deckId }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = (e) => {
    e.stopPropagation(); 
    dispatch(setDeck(deckId));
    setDeleteModalOpen(true);
  };

  return (
    <>
      <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 relative" onClick={onClick}>
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

        <button
          onClick={handleDeleteClick}
          className="absolute top-0 right-0 p-2 text-white cursor-pointer hover:text-red-500 group"
        >
          <span className="text-lg group-hover:underline">✕</span>
        </button>
      </div>

      <DeleteDeckModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => {
          setDeleteModalOpen(false);
        }}
      />
    </>
  );
};

export default Deck;
