import { useState } from "react";
import SubmitButton from "@/molecules/SubmitButton";
import FormInput from "@/atoms/FormInput";
import LandingNavbar from '@/organisms/landing-navbar';
import Footer from '@/pages/footer';

type formData = {
    username: string;
    password: string;
}

const LoginForm = () => {
    const [formData, setFormData] = useState<formData>({})

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // HandleFormSubmit({
        //   formData: formData,
        //   url: "http://localhost:8090/api/customers/",
        // });
        // setFormData({});
    };

    return (
        <>
          <div className="flex justify-center items-center h-full">
            <div className="bg-white p-8 rounded-md shadow-md w-full sm:w-96 mt-8">
              <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
                <FormInput
                  required
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleFormChange}
                  value={formData.username || ""}
                  placeholder="Username"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring focus:border-blue-500 focus:outline-none"
                />
                <FormInput
                  required
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleFormChange}
                  value={formData.password || ""}
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring focus:border-blue-500 focus:outline-none"
                />
                <SubmitButton
                  className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring focus:border-blue-500"
                  text="Login"
                />
              </form>
            </div>
          </div>
        </>
      );
}

export default LoginForm;
