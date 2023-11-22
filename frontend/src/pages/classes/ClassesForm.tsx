import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateClassMutation } from '@/queries/classes';
import FormInput from '@/atoms/FormInput';

type formData = {
    username: string;
    password: string;
};

const ClassesForm = () => {
    const navigate = useNavigate();
    const [createClass, createClassResponse] = useCreateClassMutation();
    const [formData, setFormData] = useState<formData>({});

    useEffect(() => {
        if (createClassResponse.isSuccess) {
            navigate("/classes")
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
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
                <FormInput
                    value={formData.name}
                    placeholder="Name"
                    onChange={handleFormChange}
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Class Name
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
}

export default ClassesForm;
