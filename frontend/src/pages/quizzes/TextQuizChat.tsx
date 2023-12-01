import React, { useState, useRef, useEffect } from 'react';
import TextQuizItem from '@/molecules/TextQuizItem';
import { useCreateTextQuizForQuestionMutation } from '@/queries/flashcards';
import { useGetDeckFlashcardsQuery } from '@/queries/flashcards';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const TextQuizChat = () => {
	const [ userInput, setUserInput ] = useState('');
	const [ chatMessages, setChatMessages ] = useState([]);
	const [ createTextQuiz, createTextQuizResponse ] = useCreateTextQuizForQuestionMutation();
	const classId = useSelector((state) => state.classes.class_id);
	const deckId = useSelector((state) => state.decks.deck_id);
	const [ cardIndex, setCardIndex ] = useState(0);
	const { data: flashcards, isSuccess } = useGetDeckFlashcardsQuery({
		class_id: classId,
		deck_id: deckId
	});
	const inputRef = useRef(null);

	const handleEnterKeyPress = (event) => {
		if (event.key === "Enter"){
			handleSendMessage();
		}
	}

	const handleUserInput = (event) => {
		setUserInput(event.target.value);
	};

	const handleSendMessage = async () => {
		if (userInput.trim() === '') return;

		try {
		  const userMessage = { content: userInput, role: 'user' };
		  setChatMessages((prevMessages) => [...prevMessages, userMessage]);

		  const loadingMessage = { content: '...', role: 'system', animate: true };
		  setChatMessages((prevMessages) => [...prevMessages, loadingMessage]);


		  let formData = {
			question: flashcards[cardIndex].question,
			correct_answer: flashcards[cardIndex].answer,
			user_answer: userInput,
		  };
		  const response = await createTextQuiz(formData);

		  const jsonResponse = JSON.parse(response['data']);
		  const improvementMessage = jsonResponse['improvement'];

		  const systemMessage = { content: improvementMessage, role: 'system' };
		  setChatMessages((prevMessages) => [...prevMessages.slice(0, -1), systemMessage]);
		  setUserInput('');
		} catch (error) {
		  const errorMessage = 'An unexpected error occurred, please try again';
		  const errorSystemMessage = { content: errorMessage, role: 'system', animate: false };
		  setChatMessages((prevMessages) => [...prevMessages.slice(0, -1), errorSystemMessage]);
		}
	  };



	const handleShowNextQuestion = () => {
		if (flashcards && flashcards.length > 0) {
			let nextIndex = (cardIndex + 1) % flashcards.length;
			setCardIndex(nextIndex);

			const nextQuestion = flashcards[nextIndex].question;
			const newChatMessages = [ ...chatMessages, { content: nextQuestion, role: 'system' } ];
			setChatMessages(newChatMessages);
		}
	};

	useEffect(
		() => {
			// inputRef.current.scrollIntoView({ behavior: 'smooth' });
		},
		[ chatMessages ]
	);

	useEffect(() => {}, [ flashcards ]);

	return (
		<div className="border-4 h-screen p-4 overflow-y-auto">
			<h1 className="text-3xl text-center font-bold mb-4 border-b-2 border-primary-500">Text Quiz</h1>
			<div className="w-3/4 mx-auto">
				<div className="flex-1">
					{chatMessages.map((message, index) => (
						<TextQuizItem
							key={index}
							text={message.content}
							role={message.role}
							className={message.role === 'user' ? 'text-right' : ''}
						/>
					))}
					<div ref={inputRef} />
				</div>
				<div className="flex mt-4 p-4 bg-white">
					<input
						type="text"
						className="flex-1 p-2 mr-2 border border-gray-300 rounded"
						placeholder="Type your message..."
						value={userInput}
						onChange={handleUserInput}
						onKeyDown={handleEnterKeyPress}
					/>
					<button className="bg-blue-500 text-white p-2 rounded mr-2" onClick={handleSendMessage}>
						Send
					</button>
					<button className="bg-green-500 text-white p-2 rounded" onClick={handleShowNextQuestion}>
						Show Next Question
					</button>
				</div>
			</div>
		</div>
	);
};

export default TextQuizChat;
