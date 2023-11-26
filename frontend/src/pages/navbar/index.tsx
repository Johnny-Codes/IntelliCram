import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Logo from '@/assets/Logo.png';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import {
	showClassesList,
	showClassesForm,
	showDecksForm,
	showDecksList,
	showFlashcardsList,
	showFlashcardsForm,
	showQuizzesList,
	showQuizDetail,
} from '@/slices/SpaSlice';

const Navbar = () => {
	const flexBetween = 'flex items-center justify-between';
	const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
	const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
	const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'user']);
	const dispatch = useDispatch();

	const handleClassesChange = () => {
		dispatch(showClassesList(true));
		dispatch(showClassesForm(false));
		dispatch(showDecksList(false));
		dispatch(showDecksForm(false));
		dispatch(showFlashcardsList(false));
		dispatch(showFlashcardsForm(false));
		dispatch(showQuizDetail(false));
		dispatch(showQuizzesList(false));
	};

	const handleDecksChange = () => {
		dispatch(showClassesList(false));
		dispatch(showClassesForm(false));
		dispatch(showDecksList(true));
		dispatch(showDecksForm(false));
		dispatch(showFlashcardsList(false));
		dispatch(showFlashcardsForm(false));
		dispatch(showQuizzesList(false));
		dispatch(showQuizDetail(false));
	};

	const handleQuizzesChange = () => {
		dispatch(showClassesList(false));
		dispatch(showClassesForm(false));
		dispatch(showDecksList(false));
		dispatch(showDecksForm(false));
		dispatch(showFlashcardsList(false));
		dispatch(showQuizzesList(true));
		dispatch(showQuizDetail(false));
	};

	return (
		<nav>
			<div className={`bg-primary-100 drop-shadow  ${flexBetween} w-full py-6`}>
				<div className={`${flexBetween} mx-auto w-5/6`}>
					<div className={`${flexBetween} w-full gap-16`}>
						{/* LEFT SIDE */}
						<img className={`${flexBetween} mx-auto w-1/12`} alt="logo" src={Logo} />

						{/* RIGHT SIDE */}
						{isAboveMediumScreens ? (
							<div className={`${flexBetween} w-full`}>
								<div className={`${flexBetween} gap-8 text-sm`}>
									<p className="transition duration-500 hover:text-primary-300 active:text-primary-500 cursor-pointer">
										Home
									</p>
									<p
										onClick={handleClassesChange}
										className="transition duration-500 hover:text-primary-300 active:text-primary-500 cursor-pointer"
									>
										Classes
									</p>
									<p
										onClick={handleDecksChange}
										className="transition duration-500 hover:text-primary-300 active:text-primary-500 cursor-pointer">
										Decks
									</p>
									<p
										onClick={handleQuizzesChange}
										className="transition duration-500 hover:text-primary-300 active:text-primary-500 cursor-pointer">
										Quizzes
									</p>
								</div>
								{cookies.user ? (
									<div className={`${flexBetween} gap-8`}>
										<p>{cookies.user && <span>Welcome {cookies.user}</span>}</p>
										<button
											className="rounded-md bg-secondary-500 px-10 hover:bg-primary-500 hover:text-white py-2"
											onClick={() => {
												removeCookie('user');
												removeCookie('access_token');
											}}
										>
											Log Out
										</button>
									</div>
								) : (
									<div className={`${flexBetween} gap-8`}>
										<Link
											to="/login/new"
											className="rounded-md bg-secondary-500 px-10 hover:bg-primary-500 hover:text-white py-2"
										>
											Login
										</Link>

										<Link
											to="signup/new"
											className="rounded-md bg-secondary-500 px-10 hover:bg-primary-500 hover:text-white py-2"
										>
											Signup
										</Link>
									</div>
								)}
							</div>
						) : (
							<button
								className="rounded-full bg-secondary-500 p-2"
								onClick={() => setIsMenuToggled(!isMenuToggled)}
							>
								<Bars3Icon className="h-s w-6 text-white" />
							</button>
						)}
					</div>
				</div>
			</div>

			{/* MOBILE MENU MODAL */}
			{!isAboveMediumScreens &&
				isMenuToggled && (
					<div className="fixed right-0 bottom-0 h-full w-[300px] bg-primary-100 drop-shadow-xl">
						<div className="flex justify-end p-12">
							<button onClick={() => setIsMenuToggled(!isMenuToggled)}>
								<XMarkIcon className="h-6 w-6 text-gray-400" />
							</button>
						</div>
						{/* MENU ITEMS */}
						<div className="ml-[33%] flex flex-col gap-10 text-2xl">
							<Link to="Home" className="" />
							<Link to="Home" className="" />
							<Link to="Home" className="" />
							<Link to="Home" className="" />
						</div>
					</div>
				)}
		</nav>
	);
};

export default Navbar;
