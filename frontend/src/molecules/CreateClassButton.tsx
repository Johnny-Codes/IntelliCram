import React from "react";
import { useDispatch } from "react-redux";
import { showClassesForm, showClassesList } from "@/slices/SpaSlice";

export default function CreateClassButton() {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(showClassesForm(true));
    dispatch(showClassesList(false));
  };

  return (
    <button
      onClick={handleSubmit}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      style={{ borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="16"
        height="16"
      >
        <line x1="12" y1="6" x2="12" y2="18" stroke="white" />
        <line x1="6" y1="12" x2="18" y2="12" stroke="white" />
        <title>Create Class</title>
      </svg>
    </button>
  );
}
