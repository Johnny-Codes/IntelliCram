import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateDeckMutation } from '@/queries/decks';
import FormInput from '@/atoms/FormInput';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { showDecksList, showClassesList, showClassesForm, showDecksForm } from '@/slices/SpaSlice';

type formData = {
	name: string;
};

const DeckForm = () => {
	const [ createDeck, createDeckResponse ] = useCreateDeckMutation();
	const [ formData, setFormData ] = useState<formData>({});
	const dispatch = useDispatch();
	const classId = useSelector((state) => state.classes.class_id);

	useEffect(
		() => {
			if (createDeckResponse.isSuccess) {
				dispatch(showClassesList(false));
			}
		},
		[ createDeckResponse.isSuccess ]
	);

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	async function handleSubmit(e) {
		e.preventDefault();
		formData['class_id'] = classId;
		await createDeck(formData);
		dispatch(showClassesForm(false));
		dispatch(showClassesList(false));
		dispatch(showDecksList(true));
		dispatch(showDecksForm(false));
	}

	return (
		<form className="max-w-md mx-auto" onSubmit={handleSubmit}>
			<div className="mb-5">
				<FormInput
					value={formData.name}
					placeholder="Name"
					onChange={handleFormChange}
					type="text"
					name="name"
					id="name"
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				/>
				<label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
					Deck Name
				</label>
			</div>
			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
			</button>
		</form>
	);
};

export default DeckForm;
