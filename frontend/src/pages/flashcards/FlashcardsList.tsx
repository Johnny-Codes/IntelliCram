import { useState, useEffect } from 'react';
import { useGetDeckFlashcardsQuery } from '@/queries/flashcards';
import { useSelector, useDispatch } from 'react-redux';
import { showFlashcardsList, showQuizForm, showDecksList, showClassesList, showClassesForm, showDecksForm, showPdfForm, showQuizDetail, showQuizzesList, showTextQuizChat, showFlashcardsForm } from '@/slices/SpaSlice';
import UpdateFlashCardsForm from './UpdateFlashcardsForm';

const FlashcardsList = () => {
	const classId = useSelector((state) => state.classes.class_id);
	const deckId = useSelector((state) => state.decks.deck_id);
	const deckName = useSelector((state) => state.decks.deck_name);
	const dispatch = useDispatch();
	const [showUpdateFlashcardsForm, setShowUpdateFlashcardsForm] = useState(false);
	const [formData, setFormData] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	console.log("deck name", deckName)


	const handleUpdateFlashcardForm = (flashcard) => {
		setShowUpdateFlashcardsForm(false);

		setTimeout(() => {
			setFormData({
				card_id: flashcard.id,
				question: flashcard.question,
				answer: flashcard.answer,
			});
			setIsModalOpen(true);
		}, 50);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};


	const handleCreateFlashcard = () => {
		dispatch(showFlashcardsList(false));
		dispatch(showFlashcardsForm(true));
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

	const [currentCardIndex, setCurrentCardIndex] = useState(0);

	const showPreviousFlashcard = () => {
		setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1));
	};

	const showNextFlashcard = () => {
		setCurrentCardIndex((prevIndex) => (prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1));
	};

	if (!classId || !deckId) {
		return (
			<div>
				<h1>No Deck Selected</h1>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div>
				<p>Your Content is still loading</p>
			</div>
		);
	}

	return (
		<div className="m-4">
			<h1 className="text-3xl font-bold mb-4 text-center text-blue-500">{deckName}</h1>
			{flashcards.length === 0 ? (
				<div className="flex flex-col items-center space-y-4">
					<div className="w-64 h-36 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
						<p className="text-lg font-bold text-gray-600">No Flashcards</p>
					</div>
					<button
						onClick={handleCreateFlashcard}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring focus:border-blue-300"
					>
						Add Flashcard
					</button>
				</div>
			) : (
				<>
					<div className="flex justify-center mb-8">
						<div style={{ width: '30vw', height: '18vw' }} className="group [perspective:1000px]">
							<div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
								<div key={flashcards[currentCardIndex].id} className="bg-slate-200 p-4 absolute inset-0 flex items-center justify-center text-center">
									{flashcards[currentCardIndex].question}
								</div>
								<div className="absolute text-black inset-0 h-full w-full rounded-xl bg-blue-200 p-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
									<div className="flex min-h-full flex-col items-center justify-center">
										{flashcards[currentCardIndex].answer}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-center mb-4">
						<div>
							<button onClick={showPreviousFlashcard} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
								Show Previous Flashcard
							</button>
							<button onClick={showNextFlashcard} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
								Show Next Flashcard
							</button>
						</div>
						<div>
							<button onClick={handleCreateFlashcard} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
								Add Flashcard
							</button>
							<button onClick={handleCreateQuiz} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
								Create Quiz
							</button>
							<button onClick={handleTextQuizChange} className="bg-blue-500 text-white px-2 py-1 rounded-md">
								Create Text Quiz
							</button>
						</div>
					</div>
					<div className="m-4">
						<table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
							<thead>
								<tr>
									<th className="py-2 px-4 bg-blue-500 text-white">Question</th>
									<th className="py-2 px-4 bg-blue-500 text-white">Answer</th>
									<th className="py-2 px-4 bg-blue-500 text-white">Action</th>
								</tr>
							</thead>
							<tbody>
								{flashcards.map((flashcard) => (
									<tr key={flashcard.id} className="border-t border-gray-300">
										<td className="py-2 px-4">{flashcard.question}</td>
										<td className="py-2 px-4">{flashcard.answer}</td>
										<td className="py-2 px-4">
											<button
												onClick={() => handleUpdateFlashcardForm(flashcard)}
												className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-400"
											>
												Update
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{isModalOpen && (
						<div className="fixed inset-0 overflow-y-auto">
							<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
								{/* Background overlay */}
								<div className="fixed inset-0 transition-opacity" aria-hidden="true">
									<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
								</div>

								{/* Modal panel */}
								<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
									&#8203;
								</span>
								<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
									{/* Close button (x) */}
									<button
										onClick={handleCloseModal}
										className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											className="h-6 w-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>

									{/* Content and form */}
									<UpdateFlashCardsForm
										formData={formData}
										setIsModalOpen={setIsModalOpen}
										onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
									/>

								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default FlashcardsList;
