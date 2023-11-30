import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUpdateFlashcardMutation } from '@/queries/flashcards';
import FormInput from '@/atoms/FormInput';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
	showFlashcardsList,
	showClassesList,
} from '@/slices/SpaSlice';

type formData = {
	question: string;
	answer: string;
	wrong_count: int;
};

const UpdateFlashCardsForm = (props) => {
	console.log("props", props)
	const deckId = useSelector((state) => state.decks.deck_id)
	const [updateFlashcard, updateFlashcardResponse] = useUpdateFlashcardMutation();
	const [formData, setFormData] = useState<formData>({
		question: props.props.question,
		answer: props.props.answer,
	});
	const dispatch = useDispatch();
	const classId = useSelector((state) => state.classes.class_id);
	console.log("props with formdata", formData)
	useEffect(
		() => {
			if (updateFlashcardResponse.isSuccess) {
				dispatch(showClassesList(false));
			}
		},
		[updateFlashcardResponse.isSuccess]
	);

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		console.log("formdata", formData)
	};

	async function handleSubmit(e) {
		e.preventDefault();
		console.log("calss id", classId, formData, formData.card_id)
		await updateFlashcard({ class_id: classId, formData: formData, card_id: formData.card_id });
		dispatch(showFlashcardsList(true));
	}

	return (
		<form className="max-w-md mx-auto" onSubmit={handleSubmit}>
			<div className="mb-5">
				<FormInput
					value={formData.question}
					placeholder={formData.question}
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
					placeholder={formData.answer}
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
				Update
			</button>
		</form>
	);
};

export default UpdateFlashCardsForm;
