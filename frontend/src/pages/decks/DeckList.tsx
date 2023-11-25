import { useEffect } from 'react';
import { useGetClassDecksQuery } from '@/queries/decks';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDeck } from '@/slices/DeckSlice';
import { showDecksForm, showDecksList, showFlashcardsList } from '@/slices/SpaSlice';
import Deck from '@/molecules/Deck';

const DeckList = () => {
	const classId = useSelector((state) => state.classes.class_id);
	const dispatch = useDispatch()
	console.log('class id in decklist', classId);

	const handleCreateDeck = () =>{
		dispatch(showDecksForm(true))
		dispatch(showDecksList(false))
	}

	const changeDeckStateId = (e, id) => {
		e.preventDefault();
		console.log('deck id: ', id)
		dispatch(setDeck(id))
		console.log('deck id: ', id)
		dispatch(showDecksList(false))
		dispatch(showFlashcardsList(true))
	  }

	// useEffect(
	// 	() => {
	// 		console.log('use effect?');
	// 	},
	// 	[ classId ]
	// );

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
		<ul>
			{decks &&
				decks.map((deckItem) => (
					<li key={deckItem.id}>
						<Deck deckName={deckItem.name} 
						    onClick={(e) => changeDeckStateId(e, deckItem.id)}
							/>
					</li>
				))}
		</ul>
		<button onClick={handleCreateDeck}>
			Add Deck
		</button>
		</>
	);
};

export default DeckList;
