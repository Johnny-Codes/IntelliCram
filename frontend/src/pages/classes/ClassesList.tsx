import React, { useState } from 'react';
import { useGetUsersClassesQuery } from '@/queries/classes';
import CreateClassButton from '@/molecules/CreateClassButton';
import { useDispatch } from 'react-redux';
import { setClass } from '@/slices/account/ClassesSlice';
import { showDecksList, showClassesList, showClassesForm, showDecksForm, showQuizForm } from '@/slices/SpaSlice';
import Class from '@/molecules/Class';
import DeckList from '@/pages/decks/DeckList';

const ClassesList = () => {
	const { data: classes, isLoading } = useGetUsersClassesQuery();
	const dispatch = useDispatch();
	const [selectedClass, setSelectedClass] = useState(null);

	const changeClassStateId = (e, id) => {
		e.preventDefault();
		dispatch(setClass(id));
		dispatch(showDecksForm(false));
		dispatch(showQuizForm(false))
		setSelectedClass(id);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-20">
				<p>Your Content is still loading</p>
			</div>
		);
	}

	return (
		<div className="flex bg-gray">
			{/* Sidebar */}
			<div className="w-1/4 bg-secondary-400 text-white p-4 overflow-y-auto">
				<h1 className="text-3xl font-bold mb-4">Classes</h1>



				{classes.map((classItem) => (
					<div
						key={classItem.id}
						className={`mt-4 cursor-pointer hover:bg-gray-100 hover:rounded hover:text-black ${selectedClass === classItem.id ? 'bg-gray-200 rounded text-black px-4' : ''}`}
						onClick={(e) => changeClassStateId(e, classItem.id)}
					>
						<h2 className="text-lg font-semibold" style={{ display: 'flex', justifyContent: 'space-between' }}>
							{classItem.name} {selectedClass === classItem.id && <span className="text-xl" style={{ display: 'flex', alignItems: 'center' }}>&#8594;</span>}
						</h2>
						
					</div>
				))}

			</div>
			<CreateClassButton />
			{/* Main Content */}
			<div className="flex-1 bg-gray min-h-screen">
				<div className="bg-primary-500 text-white py-4">
					<div className="flex container mx-auto justify-center">
						<h1 className="text-3xl font-bold text-center">Decks</h1>
					</div>
				</div>

				<div className="container mx-auto my-8 grid grid-cols-1 gap-6">
					{classes.map((classItem) => (
						<div key={classItem.id}>{selectedClass === classItem.id && <DeckList />}</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ClassesList;
