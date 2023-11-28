import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateClassMutation } from '@/queries/classes';
import FormInput from '@/atoms/FormInput';
import { showClassesList, showClassesForm } from '@/slices/SpaSlice';

type formData = {
  name: string;
};

const ClassesForm = () => {
  const [createClass, createClassResponse] = useCreateClassMutation();
  const [formData, setFormData] = useState<formData>({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (createClassResponse.isSuccess) {
      dispatch(showClassesList(true));
      dispatch(showClassesForm(false));
    }
  }, [createClassResponse.isSuccess]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await createClass(formData);
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Class Name
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

export default ClassesForm;
