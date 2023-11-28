import { useEffect, useState } from 'react';
import { useGetDeckFlashcardsQuery } from '@/queries/flashcards';
import { useSelector, useDispatch } from 'react-redux';
import { showFlashcardsForm, showFlashcardsList, showQuizForm } from '@/slices/SpaSlice';
import Flashcard from '@/molecules/Flashcard';


const FlashcardsList = () => {
	const classId = useSelector((state) => state.classes.class_id);
	const deckId = useSelector((state) => state.decks.deck_id);
	const dispatch = useDispatch()
	
	
	const handleCreateFlashcard = () =>{
		dispatch(showFlashcardsForm(true))
		dispatch(showFlashcardsList(false))
	}
	
	const handleCreateQuiz = () =>{
		dispatch(showFlashcardsList(false))
		dispatch(showFlashcardsForm(false))
		dispatch(showQuizForm(true))
	}
	const { data: flashcards, isLoading } = useGetDeckFlashcardsQuery({ class_id: classId, deck_id: deckId });

	const [flipped, setFlipped] = useState(false);

	const [currentCardIndex, setCurrentCardIndex] = useState(0);

	const handleFlipCard = () => {
		setFlipped(!flipped);
	}

	const showPreviousFlashcard = () => {
		if (currentCardIndex === 0) {
			setCurrentCardIndex(flashcards.length - 1);
		} else {
			setCurrentCardIndex(currentCardIndex - 1);
		}
	}

	const showNextFlashcard = () => {
		if (currentCardIndex === flashcards.length - 1) {
			setCurrentCardIndex(0);
		} else {
			setCurrentCardIndex(currentCardIndex + 1);
		}
	}

	
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
			<li key={flashcards[currentCardIndex].id} className="relative">
				<div className={`w-64 h-40 bg-white rounded-lg shadow-md p-4 ${flipped ? 'transform rotate-y-180' : ''}`}>
					<div className={`absolute inset-0 flex items-center justify-center ${flipped ? 'hidden' : ''}`}>
						<p>{flashcards[currentCardIndex].question}</p>
						<button onClick={handleFlipCard} className="absolute bottom-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-md">Show Answer</button>
					</div>
					<div className={`absolute inset-0 flex items-center justify-center ${flipped ? '' : 'hidden'}`}>
						<p>{flashcards[currentCardIndex].answer}</p>
						<button onClick={handleFlipCard} className="absolute bottom-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-md">Show Question</button>
					</div>
				</div>
			</li>
		</ul>
		<button onClick={showPreviousFlashcard}>
			Show Previous Flashcard
		</button>
		<button onClick={showNextFlashcard}>
			Show Next Flashcard
		</button>
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