import { useState } from 'react';
import { flashcardsApi, useGetDeckFlashcardsQuery } from '@/queries/flashcards';
import { useSelector, useDispatch } from 'react-redux';
import { setFlashcard } from '@/slices/FlashCardsSlice';
import UpdateFlashCardsForm from './UpdateFlashcardsForm';
import {
	showFlashcardsList,
	showQuizForm,
	showDecksList,
	showClassesList,
	showClassesForm,
	showDecksForm,
	showPdfForm,
	showQuizDetail,
	showQuizzesList,
	showTextQuizChat
} from '@/slices/SpaSlice';

const FlashcardsList = () => {
	const classId = useSelector((state) => state.classes.class_id);
	const deckId = useSelector((state) => state.decks.deck_id);
	const dispatch = useDispatch();
	const [showUpdateFlashcardsForm, setShowUpdateFlashcardsForm] = useState(false)
	const [ formData, setFormData ] = useState<formData>({});


	const handleUpdateFlashcardForm = (e, flashcard) => {
		setShowUpdateFlashcardsForm(true);
		setFormData({ ...formData, card_id: flashcard.id, question: flashcard.question, answer: flashcard.answer});
	}

	const handleCreateFlashcard = () => {
		dispatch(showFlashcardsList(false));
	};

	const handleCreateQuiz = () => {
		dispatch(showFlashcardsList(false));
		dispatch(showQuizForm(true));
	};

	const handleTextQuizChange = () => {
		dispatch(showClassesList(false));
		dispatch(showClassesForm(false));
		dispatch(showDecksList(false));
		dispatch(showDecksForm(false));
		dispatch(showFlashcardsList(false));
		dispatch(showPdfForm(false));
		dispatch(showQuizDetail(false));
		dispatch(showQuizzesList(false));
		dispatch(showTextQuizChat(true));
		dispatch(showQuizForm(false));
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
		return (<h1>No Deck Selected</h1>);
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
			<div className="m-4 flex justify-center flex-col items-center">
				{flashcards.map((flashcard) => (
					<div key={flashcard.id} className="flex border p-4 m-4 w-80 divide-x" onClick={(e) => handleUpdateFlashcardForm(e, flashcard)}>
						<div className="w-1/2 pr-4" >
							{flashcard.question}
						</div>
						<div className="w-1/2 pl-4">
							{flashcard.answer}
						</div>
					</div>
				))}
			</div>
			{showUpdateFlashcardsForm && <UpdateFlashCardsForm props={formData} />}
		</>
	);
};

export default FlashcardsList;
