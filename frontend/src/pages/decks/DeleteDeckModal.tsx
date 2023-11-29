import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDeleteOneDeckMutation } from '@/queries/decks';

const DeleteDeckModal = ({ isOpen, onClose }) => {
    const [deleteDeck, isSuccess] = useDeleteOneDeckMutation()
	const classId = useSelector((state) => state.classes.class_id);
	const deckId = useSelector((state) => state.decks.deck_id);


  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg z-10">
            <h2 className="text-xl font-semibold mb-4">Delete Deck</h2>
            <p className="mb-4">Are you sure you want to delete this deck and all its flashcards?</p>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  deleteDeck({class_id:classId, deck_id: deckId});
                  onClose();
                }}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteDeckModal;
