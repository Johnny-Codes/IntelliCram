import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateDeckMutation } from '@/queries/decks';
import FormInput from '@/atoms/FormInput';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { showDecksList, showClassesList, showClassesForm, showDecksForm } from '@/slices/SpaSlice';

type formData = {
  name: string;
};

const DeckForm = () => {
  const [createDeck, createDeckResponse] = useCreateDeckMutation();
  const [formData, setFormData] = useState<formData>({});
  const dispatch = useDispatch();
  const classId = useSelector((state) => state.classes.class_id);

  useEffect(() => {
    if (createDeckResponse.isSuccess) {
      dispatch(showClassesList(false));
    }
  }, [createDeckResponse.isSuccess]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    formData['class_id'] = classId;
    await createDeck(formData);
    dispatch(showClassesForm(false));
    dispatch(showClassesList(false));
    dispatch(showDecksList(true));
    dispatch(showDecksForm(false));
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Deck Name
          </label>
          <FormInput
            value={formData.name}
            placeholder="Name"
            onChange={handleFormChange}
            type="text"
            name="name"
            id="name"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default DeckForm;
