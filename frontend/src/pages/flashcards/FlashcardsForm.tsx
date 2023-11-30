import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateFlashcardMutation } from '@/queries/flashcards';
import FormInput from '@/atoms/FormInput';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { showFlashcardsList, showClassesList, showFlashcardsForm } from '@/slices/SpaSlice';

type formData = {
	question: string;
	answer: string;
};

const FlashcardsForm = () => {
	const [ createFlashcard, createFlashcardResponse ] = useCreateFlashcardMutation();
	const [ formData, setFormData ] = useState<formData>({});
	const dispatch = useDispatch();
	const classId = useSelector((state) => state.classes.class_id);
	const deckId = useSelector((state) => state.decks.deck_id);

	useEffect(
		() => {
			if (createFlashcardResponse.isSuccess) {
				dispatch(showClassesList(false));
			}
		},
		[ createFlashcardResponse.isSuccess ]
	);

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	async function handleSubmit(e) {
		e.preventDefault();
		await createFlashcard({ formData: formData, class_id: classId, deck_id: deckId });
		dispatch(showFlashcardsList(true));
		dispatch(showFlashcardsForm(false));
	}

	return (
		<div className="min-h-screen bg-white flex flex-col items-center">
			<div className="bg-white p-8 rounded-md shadow-md w-full sm:w-96 mt-8">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Flashcard</h2>
				<form className="space-y-5">
					<div>
						<label htmlFor="question" className="block text-sm font-bold text-gray-700 mb-1">
							Question
						</label>
						<FormInput
							value={formData.question}
							placeholder="Enter your question"
							onChange={handleFormChange}
							type="text"
							name="question"
							id="question"
							className="w-full"
						/>
					</div>
					<div>
						<label htmlFor="answer" className="block text-sm font-bold text-gray-700 mb-1">
							Answer
						</label>
						<FormInput
							value={formData.answer}
							placeholder="Enter your answer"
							onChange={handleFormChange}
							type="text"
							name="answer"
							id="answer"
							className="w-full"
						/>
					</div>
					<div className="flex justify-center">
						<button
							onClick={handleSubmit}
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FlashcardsForm;
