import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from '@/atoms/FormInput';
import { useCreateQuizAIMutation } from '@/queries/flashcards';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { showFlashcardsList, showClassesList, showQuizForm, showQuizDetail } from '@/slices/SpaSlice';

type formData = {
  name: string;
};

const QuizForm = () => {
  const [createQuiz, createQuizResponse] = useCreateQuizAIMutation();
  const [formData, setFormData] = useState<formData>({});
  const dispatch = useDispatch();
  const classId = useSelector((state) => state.classes.class_id);
  const deckId = useSelector((state) => state.decks.deck_id);

  useEffect(() => {
    if (createQuizResponse.isLoading) {
      // Show spinning wheel or loading indicator
    } else if (createQuizResponse.isError) {
      // Handle error, e.g. display an error message
    } else if (createQuizResponse.isSuccess) {
      dispatch(showQuizDetail(true));
    }
  }, [createQuizResponse.isLoading, createQuizResponse.isError, createQuizResponse.isSuccess]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(showQuizDetail(true));
    dispatch(showQuizForm(false));
    const quiz = await createQuiz({ class_id: classId, deck_id: deckId, formData: formData });
  }

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <FormInput
          value={formData.name}
          placeholder="Quiz Name"
          onChange={handleFormChange}
          type="text"
          name="name"
          id="name"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Quiz Name
        </label>
      </div>
      <button
        type="submit"
        className="relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={createQuizResponse.isLoading}
      >
        {createQuizResponse.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        Create
      </button>
    </form>
  );
};

export default QuizForm;
