// import React from 'react';
// import { useGetClassDecksQuery } from '@/queries/decks';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { setDeck } from '@/slices/DeckSlice';
// import { showDecksForm, showDecksList, showFlashcardsList } from '@/slices/SpaSlice';
// import Deck from '@/molecules/Deck';
// import QuizforDeck from '../quizzes/QuizforDeck';

// const DeckList = () => {
// 	const classId = useSelector((state) => state.classes.class_id);
// 	const dispatch = useDispatch();

// 	const handleCreateDeck = () => {
// 		dispatch(showDecksForm(true));
// 		dispatch(showDecksList(false));
// 	};

// 	const changeDeckStateId = (e, id) => {
// 		e.preventDefault();
// 		dispatch(setDeck(id));
// 		dispatch(showDecksList(false));
// 		dispatch(showFlashcardsList(true));
// 	};

// 	if (!classId) {
// 		return <h1>No Class Selected</h1>;
// 	}

// 	const { data: decks, isLoading } = useGetClassDecksQuery(classId);

// 	if (isLoading) {
// 		return (
// 			<div>
// 				<p>Your Content is still loading</p>
// 			</div>
// 		);
// 	}

// 	return (
// 		<>
// 			<div className="flex flex-wrap justify-center">
// 				{decks &&
// 					decks.map((deckItem) => (
// 						<div key={deckItem.id} className="m-4 w-64">
// 							<Deck deckName={deckItem.name} onClick={(e) => changeDeckStateId(e, deckItem.id)} />
// 							<div className="mt-4">
// 								<QuizforDeck deck_id={deckItem.id} />
// 							</div>
// 						</div>
// 					))}
// 			</div>
// 			<div className='flex flex-wrap justify-center'>
// 				<button
// 					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
// 					onClick={handleCreateDeck}
// 				>
// 					Add Deck
// 				</button>
// 			</div>
// 		</>
// 	);
// };

// export default DeckList;

import {useState} from 'react';
import { useGetClassDecksQuery } from '@/queries/decks';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDeck } from '@/slices/DeckSlice';
import { setClass } from '@/slices/account/ClassesSlice';
import { showDecksForm, showDecksList, showFlashcardsList, showClassesList } from '@/slices/SpaSlice';
import Deck from '@/molecules/Deck';
import QuizforDeck from '../quizzes/QuizforDeck';
import DeckForm from './DeckForm';

const DeckList = () => {
  const classId = useSelector((state) => state.classes.class_id);
  const dispatch = useDispatch();
  const [deckFormShow, setDeckFormShow] = useState(false)

  const handleCreateDeck = () => {
    setDeckFormShow(true)
    dispatch(showDecksForm(true));
    dispatch(showDecksList(false));
  };

  const changeDeckStateId = (e, id) => {
    e.preventDefault();
    dispatch(setClass(classId));
    dispatch(setDeck(id));
    dispatch(showDecksList(false));
    dispatch(showClassesList(false));
    dispatch(showFlashcardsList(true));
  };

  if (!classId) {
    return <h1>No Class Selected</h1>;
  }

  const { data: decks, isLoading } = useGetClassDecksQuery(classId);

  if (isLoading) {
    return (
      <div>
        <p>Your Content is still loading</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {decks &&
          decks.map((deckItem) => (
            <div key={deckItem.id} className="m-4">
              <Deck deckName={deckItem.name} deckId={deckItem.id} onClick={(e) => changeDeckStateId(e, deckItem.id)} />
              <div className="mt-4">
                <QuizforDeck deck_id={deckItem.id} />
              </div>
            </div>
          ))}
      </div>
     
          {deckFormShow && <DeckForm setDeckFormShow={setDeckFormShow} />}
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreateDeck}
          >
            Add Deck
          </button>
        </div>
      
    </>
  );
};

export default DeckList;
