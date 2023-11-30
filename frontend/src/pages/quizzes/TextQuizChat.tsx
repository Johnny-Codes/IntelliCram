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
	const { data: flashcards, isSuccess } = useGetDeckFlashcardsQuery({ class_id: classId, deck_id: deckId });
	const inputRef = useRef(null);

	const handleUserInput = (event) => {
		setUserInput(event.target.value);
	};

	const handleSendMessage = async () => {
		if (userInput.trim() === '') return;

		try {
			let formData = {
				question: flashcards[cardIndex].question,
				correct_answer: flashcards[cardIndex].answer,
				user_answer: userInput
			};
			const response = await createTextQuiz(formData);

			const jsonResponse = JSON.parse(response['data']);
			const improvementMessage = jsonResponse['improvement'];

			const newChatMessages = [
				...chatMessages,
				{ content: userInput, role: 'user' },
				{ content: improvementMessage, role: 'system' }
			];
			setChatMessages(newChatMessages);
			setUserInput('');
		} catch (error) {
			const errorMessage = 'An unexpected error occured, please try again';
			const newChatMessages = [ ...chatMessages, { content: errorMessage, role: 'system' } ];
			setChatMessages(newChatMessages);
		}
	};

	const handleShowNextQuestion = () => {
		if (flashcards && flashcards.length > 0) {
			let nextIndex = (cardIndex + 1) % flashcards.length; // Use modulo to wrap around
			setCardIndex(nextIndex);

			const nextQuestion = flashcards[nextIndex].question;
			const newChatMessages = [ ...chatMessages, { content: nextQuestion, role: 'system' } ];
			setChatMessages(newChatMessages);
		}
	};

	// Ensure the input stays in view when new messages are added
	useEffect(
		() => {
			inputRef.current.scrollIntoView({ behavior: 'smooth' });
		},
		[ chatMessages ]
	);

	// Show the first flashcard as a chat message when the page is rendered
	useEffect(() => {}, [ flashcards ]);

	return (
		<div className="flex flex-col h-screen p-4">
			<div className="flex-1 overflow-y-auto">
				{chatMessages.map((message, index) => (
					<TextQuizItem
						key={index}
						text={message.content}
						role={message.role}
						// Add a conditional class to align user messages to the right
						className={message.role === 'user' ? 'text-right' : ''}
					/>
				))}
				{/* Dummy div for scrolling to bottom */}
				<div ref={inputRef} />
			</div>
			<div className="flex mt-4 fixed bottom-0 left-0 right-0 p-4 bg-white">
				<input
					type="text"
					className="flex-1 p-2 mr-2 border border-gray-300 rounded"
					placeholder="Type your message..."
					value={userInput}
					onChange={handleUserInput}
				/>
				<button className="bg-blue-500 text-white p-2 rounded mr-2" onClick={handleSendMessage}>
					Send
				</button>
				<button className="bg-green-500 text-white p-2 rounded" onClick={handleShowNextQuestion}>
					Show Next Question
				</button>
			</div>
		</div>
	);
};

export default TextQuizChat;
