import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateFlashcardMutation } from '@/queries/flashcards';
import FormInput from '@/atoms/FormInput';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useGetUploadFileQuery, useCreatePdfMutation } from '@/queries/pdfs';

type formData = {
    name: string;
    file: File;
};

const PdfForm = () => {
    const [createPdf, createPdfResponse] = useCreatePdfMutation();
    const [formData, setFormData] = useState<formData>({});
    const dispatch = useDispatch();

    useEffect(
        () => {
            if (createPdfResponse.isSuccess) {
                // dispatch(showClassesList(false));
            }
        },
        [createPdfResponse.isSuccess]
    );

    const handleFormChange = (e) => {
        const { name, value, files } = e.target;

        // If the input is a file input, set the 'file' property in formData
        const newValue = name === 'file' ? files[0] : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
		const body = new FormData();
		body.append('name', formData.name)
		body.append('file', formData.file)
        await createPdf(formData);
    }

    return (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
                <FormInput
                    value={formData.name}
                    placeholder="File Name"
                    onChange={handleFormChange}
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    File name
                </label>
            </div>
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
    );
};

export default PdfForm;
