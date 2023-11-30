import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '@/queries/account';
import FormInput from '@/atoms/FormInput';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '@/slices/account/accountSlice';
import { useCookies } from 'react-cookie';
import LandingNavbar from '@/organisms/landing-navbar';
import Footer from '@/pages/footer';

type formData = {
	username: string;
	password: string;
};

function LoginForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [login, loginResponse] = useLoginUserMutation();
	const [formData, setFormData] = useState<formData>({});
	const accessToken = useSelector((state) => state.account.accessToken);
	if (cookies.user && !formData.username) {
		setFormData({ username: cookies.user, password: '' });
	}
	useEffect(() => {
		if (loginResponse.isSuccess) {
			dispatch(setAccessToken(loginResponse.data.access_token));
			dispatch(setUser(formData.username));
			setCookie('access_token', loginResponse.data.access_token, { path: '/' });
			setCookie('user', formData.username, { path: '/' });
			navigate("/dashboard")
		}
	}, [loginResponse, dispatch, navigate, accessToken, formData.username]);

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};


	async function handleSubmit(e) {
		e.preventDefault();
		await login(formData);
	}

	return (
		<>
		  <LandingNavbar />
		  <div className="min-h-screen bg-white flex flex-col items-center">
			<div className="bg-white p-8 rounded-md shadow-md w-full sm:w-96">
			  <form className="flex flex-col" onSubmit={handleSubmit}>
				<div className="mb-5">
				  <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
					Username
				  </label>
				  <FormInput
					value={formData.username}
					placeholder="Username"
					onChange={handleFormChange}
					type="text"
					name="username"
					id="username"
					className="input-style"
				  />
				</div>
				<div className="mb-5">
				  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
					Password
				  </label>
				  <FormInput
					value={formData.password}
					placeholder="Password"
					onChange={handleFormChange}
					required
					type="password"
					name="password"
					id="password"
					className="input-style"
				  />
				</div>
				<button
				  type="submit"
				  className="button-style w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring focus:border-blue-500"
				>
				  Login
				</button>
			  </form>
			</div>
		  </div>
		  <Footer />
		</>
	  );

}

export default LoginForm;
