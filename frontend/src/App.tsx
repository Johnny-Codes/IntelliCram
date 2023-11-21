import Landing from './templates/landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SelectedPage } from './atoms/types';
import LoginForm from './pages/login';
import SignupForm from './pages/signup';

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
				{/* <Route path="decks" element={<Decks />} />
				<Route path="flashcards">
					<Route path="" element={<FlashcardsList />} />
					<Route path=":id" element={<FlashcardDetail />} />
				</Route> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
