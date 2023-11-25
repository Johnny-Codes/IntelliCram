import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateFlashcardMutation } from '@/queries/flashcards';
import FormInput from '@/atoms/FormInput';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
	showFlashcardsList,
	showClassesList,
	showClassesForm,
	showDecksForm,
	showFlashcardsForm
} from '@/slices/SpaSlice';

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
		<form className="max-w-md mx-auto" onSubmit={handleSubmit}>
			<div className="mb-5">
				<FormInput
					value={formData.question}
					placeholder="Question"
					onChange={handleFormChange}
					type="text"
					name="question"
					id="question"
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				/>
				<label htmlFor="question" className="block text-gray-700 text-sm font-bold mb-2">
					Question
				</label>
			</div>
			<div className="mb-5">
				<FormInput
					value={formData.answer}
					placeholder="Answer"
					onChange={handleFormChange}
					type="text"
					name="answer"
					id="answer"
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				/>
				<label htmlFor="answer" className="block text-gray-700 text-sm font-bold mb-2">
					Answer
				</label>
			</div>
			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Create
			</button>
		</form>
	);
};

export default FlashcardsForm;
