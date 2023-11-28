import { useState } from 'react';
import { useGetDeckFlashcardsQuery } from '@/queries/flashcards';
import { useSelector, useDispatch } from 'react-redux';
import { showFlashcardsForm, showFlashcardsList, showQuizForm } from '@/slices/SpaSlice';

const FlashcardsList = () => {
	const classId = useSelector((state) => state.classes.class_id);
	const deckId = useSelector((state) => state.decks.deck_id);
	const dispatch = useDispatch();

	const handleCreateFlashcard = () => {
		dispatch(showFlashcardsForm(true));
		dispatch(showFlashcardsList(false));
	};

	const handleCreateQuiz = () => {
		dispatch(showFlashcardsList(false));
		dispatch(showFlashcardsForm(false));
		dispatch(showQuizForm(true));
	};
	const { data: flashcards, isLoading } = useGetDeckFlashcardsQuery({ class_id: classId, deck_id: deckId });

	const [flipped, setFlipped] = useState(false);

	const [currentCardIndex, setCurrentCardIndex] = useState(0);

	const handleFlipCard = () => {
		setFlipped(!flipped);
	};

	const showPreviousFlashcard = () => {
		if (currentCardIndex === 0) {
			setCurrentCardIndex(flashcards.length - 1);
		} else {
			setCurrentCardIndex(currentCardIndex - 1);
		}
	};

	const showNextFlashcard = () => {
		if (currentCardIndex === flashcards.length - 1) {
			setCurrentCardIndex(0);
		} else {
			setCurrentCardIndex(currentCardIndex + 1);
		}
	};

	if (!classId || !deckId) {
		return <h1>No Deck Selected</h1>;
	}

	if (isLoading) {
		return (
			<div>
				<p>Your Content is still loading</p>
			</div>
		);
	}

	return (
		<>
			<div className="m-8 flex justify-center">
				<div style={{ width: '30vw', height: '18vw' }}>
					<ul className={`${flipped ? 'animate-flip' : ''}`}>
						<li
							key={flashcards[currentCardIndex].id}
							className="relative group w-32 h-20 bg-white rounded-lg shadow-md p-2 transition-transform transform-gpu"
							style={{ width: '30vw', height: '18vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
						>
							<div className={`absolute p-4 inset-0 flex items-center justify-center ${flipped ? 'rotate-y-180' : ''}`} style={{ width: '30vw', height: '18vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<p>{flipped ? flashcards[currentCardIndex].answer : flashcards[currentCardIndex].question}</p>
								<button
									onClick={handleFlipCard}
									className="absolute bottom-2 right-2 bg-blue-500 text-white px-1 py-1 rounded-md"
								>
									{flipped ? 'Show Question' : 'Show Answer'}
								</button>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div className="m-4 flex justify-center">
				<div>
					<button onClick={showPreviousFlashcard} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Show Previous Flashcard</button>
					<button onClick={showNextFlashcard} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Show Next Flashcard</button>
				</div>
				<div>
					<button onClick={handleCreateFlashcard} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Add Flashcard</button>
					<button onClick={handleCreateQuiz} className="bg-blue-500 text-white px-2 py-1 rounded-md">Create Quiz</button>
				</div>
			</div>
			{/* <div>
			<svg
  width="200"
  height="300"
  viewBox="0 0 200 300"
  xmlns="http://www.w3.org/2000/svg"
  fill="#ffffff"
>

  <rect x="0" y="0" width="200" height="300" rx="15" ry="15" fill="#ffffff" />
  

  <line x1="20" y1="20" x2="180" y2="20" stroke="#FF0000" stroke-width="2" />
  

  <line x1="20" y1="25" x2="180" y2="25" stroke="#0000FF" stroke-width="1" />
  <line x1="20" y1="155" x2="180" y2="155" stroke="#0000FF" stroke-width="1" />
  <line x1="20" y1="205" x2="180" y2="205" stroke="#0000FF" stroke-width="1" />
  
</svg>
</div> */}
		</>
	);
};

export default FlashcardsList;

