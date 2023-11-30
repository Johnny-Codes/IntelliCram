import React from 'react';
import { useDispatch } from 'react-redux';
import { showClassesForm, showClassesList } from '@/slices/SpaSlice';

export default function CreateClassButton() {
	const dispatch = useDispatch();

	const handleSubmit = () => {
		dispatch(showClassesForm(true));
		dispatch(showClassesList(false));
	};

	return (
		<div className="group relative">
			<button
				onClick={handleSubmit}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 flex items-center justify-center w-12 h-12 absolute bottom-4 right-4"
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="white"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="w-6 h-6"
				>
					<line x1="12" y1="6" x2="12" y2="18" stroke="white" />
					<line x1="6" y1="12" x2="18" y2="12" stroke="white" />
					<title>Create Class</title>
				</svg>
			</button>
			<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bg-gray-800 text-white text-sm py-1 px-2 rounded-md bottom-16 right-4">
				Add Class
			</div>
		</div>
	);
}
