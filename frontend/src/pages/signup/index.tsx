import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupUserMutation } from '@/queries/account';
import FormInput from '@/atoms/FormInput';

type formData = {
	username: string;
	first_name: string;
	last_name: string;
	role: string;
	email: string;
	password: string;
};

function SignupForm() {
	const navigate = useNavigate();
	const [ formData, setFormData ] = useState<formData>({ role: 'student' });
	const [ signup, signupResponse ] = useSignupUserMutation();

	useEffect(() => {
	if (signupResponse.isSuccess) {
		console.log('we did it', signupResponse.data);
		// navigate('/');
	}}, [signupResponse])

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	

	async function handleSubmit(e) {
		e.preventDefault();
		await signup(formData);
	}

	return (
		<form className="max-w-md mx-auto" onSubmit={handleSubmit}>
			<div className="mb-5">
				<FormInput
					value={formData.username}
					placeholder="Username"
					onChange={handleFormChange}
					type="text"
					name="username"
					id="username"
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				/>
				<label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
					Username
				</label>
			</div>
			<div className="mb-5">
				<FormInput
					value={formData.first_name}
					placeholder="First Name"
					onChange={handleFormChange}
					type="text"
					name="first_name"
					id="first_name"
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				/>
				<label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">
					First Name
				</label>
			</div>
			<div className="mb-5">
				<FormInput
					value={formData.last_name}
					placeholder="Last Name"
					onChange={handleFormChange}
					type="text"
					name="last_name"
					id="last_name"
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				/>
				<label htmlFor="last_name" className="block text-gray-700 text-sm font-bold mb-2">
					Last Name
				</label>
			</div>
			<div className="mb-5">
				<FormInput
					value={formData.email}
					placeholder="Email"
					onChange={handleFormChange}
					type="email"
					name="email"
					id="email"
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				/>
				<label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
					Email
				</label>
			</div>
			<div className="mb-5">
				<FormInput
					value={formData.password}
					placeholder="Password"
					onChange={handleFormChange}
					required
					type="password"
					name="password"
					id="password"
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				/>
				<label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
					Password
				</label>
			</div>
			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Sign Up
			</button>
		</form>
	);
}

export default SignupForm;
