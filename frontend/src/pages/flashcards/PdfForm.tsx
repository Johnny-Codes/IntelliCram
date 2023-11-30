import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from '@/atoms/FormInput';
import { useCreatePdfMutation } from '@/queries/pdfs';
import UserFileList from '@/molecules/UserFileList';

type formData = {
  name: string;
  file: File;
};

const PdfForm = () => {
  const [createPdf, createPdfResponse] = useCreatePdfMutation();
  const [formData, setFormData] = useState<formData>({});
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>(null);

  useEffect(
    () => {
      if (createPdfResponse.isSuccess) {
        // dispatch(showClassesList(false));
      }
    },
    [createPdfResponse.isSuccess]
  );

  const handleFormChange = (e) => {
    setFile(e.target.files[0]);
    console.log('file', file);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const body = new FormData();
    body.append('file', file);
    await createPdf(body);
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-8">
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <FormInput
            onChange={handleFormChange}
            type="file"
            name="file"
            id="file"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
            File
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
      </form>

      <div>
        <UserFileList />
      </div>
    </div>
  );

};

export default PdfForm;
