// import React from 'react';

// interface FlashcardProps {
//   question: string;
//   answer: string;
// }

// const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
//   return (
//     <div className="flex bg-white rounded-lg overflow-hidden shadow-md my-4">
//       {/* Front Side */}
//       <div className="w-1/2 p-4 bg-blue-500 text-white">
//         <h2 className="text-2xl font-semibold">{question}</h2>
//       </div>

//       {/* Back Side */}
//       <div className="w-1/2 p-4 bg-gray-200">
//         <h2 className="text-2xl font-semibold">{answer}</h2>
//       </div>
//     </div>
//   );
// };

// export default Flashcard;

import React, { useState } from 'react';

interface FlashcardProps {
	question: string;
	answer: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
	const [ isFlipped, setIsFlipped ] = useState(false);

	const flipCard = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<>
		<div className="group h-96 w-80 [perspective:1000px]">
			<div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
				{/* Front Side */}
				<div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden">
					{/* <div className="h-full w-full rounded-xl bg-blue-500 text-white p-4"> */}
						<h2 className="flex min-h-full flex-col items-center justify-center">{question}</h2>
					{/* </div> */}
				</div>

				{/* Back Side */}
				<div
					className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]"
				>
					<h2 className="text-2xl font-semibold">{answer}</h2>
				</div>
			</div>
		</div>
		</>
	);
};

export default Flashcard;
