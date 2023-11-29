import { useState } from "react";
import SubmitButton from "@/molecules/SubmitButton";
import FormInput from "@/atoms/FormInput";


type formData = {
    username: string;
    password: string;
}

export default function LoginForm() {
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
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <FormInput
                    required
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleFormChange}
                    value={formData.username || ""}
                    placeholder="First Name"
                />
                <FormInput
                    required
                    type="text"
                    name="password"
                    id="password"
                    onChange={handleFormChange}
                    value={formData.password || ""}
                    placeholder="Password"
                />
                <SubmitButton />
            </form>
        </div>
    )

}
