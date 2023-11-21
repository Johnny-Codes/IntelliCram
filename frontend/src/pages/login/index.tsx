import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '@/queries/account';
import FormInput from '@/atoms/FormInput';

type formData = {
	username: string;
	password: string;
};

function LoginForm() {
	const navigate = useNavigate();
	const [ formData, setFormData ] = useState<formData>({});

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const [ login, loginResponse ] = useLoginUserMutation();

	function handleSubmit(e) {
		e.preventDefault();
		const response = login(formData);
		console.log();
		if (loginResponse.isSuccess) {
			console.log('we did it');
			navigate('/');
		} else {
			console.log('response', response);
		}
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
				Login
			</button>
		</form>
	);
}

export default LoginForm;
