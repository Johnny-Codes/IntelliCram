import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/queries/account";
import FormInput from "@/atoms/FormInput";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logIn] = useLoginUserMutation();

  function handleSubmit(e) {
    e.preventDefault();
    logIn({ email, password });
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-6">Log In</h1>
        <form onSubmit={handleSubmit} id="create-location-form">
          <div className="mb-4">
            <FormInput
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              className="form-input"
            />
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
          </div>
          <div className="mb-6">
            <FormInput
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              className="form-input"
            />
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            GET INTELLICRAMMED
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
