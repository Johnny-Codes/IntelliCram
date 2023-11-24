import { useEffect } from 'react';
import { useGetDeckFlashcardsQuery } from '@/queries/flashcards';
import { useSelector, useDispatch } from 'react-redux';
import { showDecksForm, showDecksList } from '@/slices/SpaSlice';
import Flashcard from '@/molecules/Flashcard';

const FlashcardsList = () => {
	const classId = useSelector((state) => state.classes.class_id);
	const deckId = useSelector((state) => state.decks.deck_id);
	const dispatch = useDispatch()
	console.log('class id in decklist', classId);

	const handleCreateFlashcard = () =>{
		dispatch(showDecksForm(true))
		dispatch(showDecksList(false))
	}

	// useEffect(
	// 	() => {
	// 		console.log('use effect?');
	// 	},
	// 	[ classId ]
	// );

	if (!classId) {
		return <h1>No Deck Selected</h1>;
	}

	const { data: flashcards, isLoading } = useGetDeckFlashcardsQuery(classId, deckId);

	if (isLoading) {
		return (
			<div>
				<p>Your Content is still loading</p>
			</div>
		);
	};

    console.log(" these are the flashcarsd", flashcards);
    console.log(" these is the deckid", deckId);
    console.log(" these is the classid", classId);

	return (
		<>
		<ul>
			{flashcards &&
				flashcards.map((flashcard) => (
					<li key={flashcard.id}>
						<Flashcard front={flashcard.front} back={flashcard.back} />
					</li>
				))}
		</ul>
		<button onClick={handleCreateFlashcard}>
			Add Flashcard
		</button>
		</>
	);
};

export default FlashcardsList;
