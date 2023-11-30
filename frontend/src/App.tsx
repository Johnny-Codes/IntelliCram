import Landing from '@/templatee/Landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from '@/pages/login';
import SignupForm from '@/pages/signup';
import UserTemplate from '@/templatee/UserTemplate';
import UserFileList from '@/molecules/UserFileList';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="signup">
					<Route path="new" element={<SignupForm />} />
				</Route>
				<Route path="login">
					<Route path="new" element={<LoginForm />} />
				</Route>
				<Route path="dashboard" element={<UserTemplate />} />

				<Route path="testing" element={<UserFileList />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
