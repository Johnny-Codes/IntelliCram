import { useState } from 'react';
import { useGetDeckFlashcardsQuery } from '@/queries/flashcards';
import { useSelector, useDispatch } from 'react-redux';
import {
	showFlashcardsForm,
	showFlashcardsList,
	showQuizForm,
	showDecksList,
	showClassesList
} from '@/slices/SpaSlice';

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
	console.log('These are the flashcards', flashcards);

	const [ flipped, setFlipped ] = useState(false);

	const [ currentCardIndex, setCurrentCardIndex ] = useState(0);

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
			console.log('Current flashcard at index', flashcards[currentCardIndex]);
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

	if (!flashcards.length) {
		dispatch(showFlashcardsForm(true));
		dispatch(showFlashcardsForm(false));
		dispatch(showFlashcardsForm(false));

		return (
			<div>
				<button onClick={handleCreateFlashcard} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
					Add Flashcard
				</button>
			</div>
		);
	}

	// return (
	// 	<>
	// 		<div className="m-8 flex justify-center">
	// 			<div style={{ width: '30vw', height: '18vw' }}>
	// 				<ul className={`${flipped ? 'animate-flip' : ''}`}>
	// 					<li
	// 						key={flashcards[currentCardIndex].id}
	// 						className="relative group w-32 h-20 bg-white rounded-lg shadow-md p-2 transition-transform transform-gpu"
	// 						style={{ width: '30vw', height: '18vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
	// 					>
	// 						<div className={`absolute p-4 inset-0 flex items-center justify-center ${flipped ? 'rotate-y-180' : ''}`} style={{ width: '30vw', height: '18vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
	// 							<p>{flipped ? flashcards[currentCardIndex].answer : flashcards[currentCardIndex].question}</p>
	// 							<button
	// 								onClick={handleFlipCard}
	// 								className="absolute bottom-2 right-2 bg-blue-500 text-white px-1 py-1 rounded-md"
	// 							>
	// 								{flipped ? 'Show Question' : 'Show Answer'}
	// 							</button>
	// 						</div>
	// 					</li>
	// 				</ul>
	// 			</div>
	// 		</div>
	// 		<div className="m-4 flex justify-center">
	// 			<div>
	// 				<button onClick={showPreviousFlashcard} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Show Previous Flashcard</button>
	// 				<button onClick={showNextFlashcard} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Show Next Flashcard</button>
	// 			</div>
	// 			<div>
	// 				<button onClick={handleCreateFlashcard} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Add Flashcard</button>
	// 				<button onClick={handleCreateQuiz} className="bg-blue-500 text-white px-2 py-1 rounded-md">Create Quiz</button>
	// 			</div>
	// 		</div>
	// 	</>
	// );

	return (
		<>
		<div className="m-8 flex justify-center">
			<div style={{ width: '30vw', height: '18vw' }} className="group [perspective:1000px]">
				<div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
					<div key={flashcards[currentCardIndex].id} className="bg-slate-200 absolute inset-0 flex items-center justify-center text-center">
						{flashcards[currentCardIndex].question}
					</div>
					<div className="absolute inset-0 h-full w-full rounded-xl bg-blue-200 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
						<div className="flex min-h-full flex-col items-center justify-center">
							{flashcards[currentCardIndex].answer}
						</div>
					</div>
				</div>
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
		</>

	);
};

export default FlashcardsList;


