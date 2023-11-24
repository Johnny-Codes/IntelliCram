import { useEffect } from 'react';
import { useGetClassDecksQuery } from '@/queries/decks';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showDecksForm, showDecksList } from '@/slices/SpaSlice';

const DeckList = () => {
	const classId = useSelector((state) => state.classes.class_id);
	const dispatch = useDispatch()
	console.log('class id in decklist', classId);

	const handleCreateDeck = () =>{
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
						<Link to={`/classes/${deckItem.id}`}>{deckItem.name}</Link>
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
