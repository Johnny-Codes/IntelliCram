import Landing from '@/templatee/Landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SelectedPage } from '@/atoms/types';
import LoginForm from '@/pages/login';
import SignupForm from '@/pages/signup';
import Navbar from '@/pages/navbar';
import ClassesList from './pages/classes/ClassesList';
import ClassesForm from './pages/classes/ClassesForm';
import UserTemplate from '@/templatee/UserTemplate';


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
				<Route path="testing" element={<UserTemplate />} />
				{/* <Route path="decks" element={<Decks />} /> */}
				{/* <Route path="classes">
					<Route path="" element={<UserTemplate />} />
					<Route path="new" element={<ClassesForm />} /> */}
				{/* <Route path=":id" element={<FlashcardDetail />} /> */}
				{/* </Route> */}
			</Routes>
		</BrowserRouter >
	);
}

export default App;
