import { useEffect } from 'react';
import { useGetDeckFlashcardsQuery } from '@/queries/flashcards';
import { useSelector, useDispatch } from 'react-redux';
import { showFlashcardsForm, showFlashcardsList } from '@/slices/SpaSlice';
import Flashcard from '@/molecules/Flashcard';
import { useCreateQuizAIMutation } from '@/queries/flashcards';

const FlashcardsList = () => {
	const classId = useSelector((state) => state.classes.class_id);
	const deckId = useSelector((state) => state.decks.deck_id);
	const dispatch = useDispatch()
	
	
	const handleCreateFlashcard = () =>{
		dispatch(showFlashcardsForm(true))
		dispatch(showFlashcardsList(false))
	}
	
	const handleCreateQuiz = () =>{
		const {data: quiz, isLoading} = useCreateQuizAIMutation({classId, deckId, formData})
		dispatch(showFlashcardsList(false))
		dispatch(showFlashcardsForm(false))
	}
	const { data: flashcards, isLoading } = useGetDeckFlashcardsQuery({ class_id: classId, deck_id: deckId });

	
	useEffect(() => {
		if (classId && deckId) {
			// Call the query here
		}
	}, [classId, deckId]);
	

	if (!classId  || !deckId) {
		return <h1>No Deck Selected</h1>;
	}


	if (isLoading) {
		return (
			<div>
				<p>Your Content is still loading</p>
			</div>
		);
	};

    console.log(" these are the flashcards", flashcards);
    console.log(" these is the deckid", deckId);
    console.log(" these is the classid", classId);

	return (
		<>
		<ul>
			{flashcards &&
				flashcards.map((flashcard) => (
					<li key={flashcard.id}>
						<Flashcard question={flashcard.question} answer={flashcard.answer} />
					</li>
				))}
		</ul>
		<button onClick={handleCreateFlashcard}>
			Add Flashcard
		</button>
		<button onClick={handleCreateQuiz}>
			Create Quiz
		</button>
		</>
	);
};

export default FlashcardsList;
