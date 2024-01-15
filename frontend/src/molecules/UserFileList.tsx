import { useSelector, useDispatch } from "react-redux";
import { useGetAllUsersFilesQuery } from "@/queries/pdfs";
import { useState, useEffect } from "react";
import { useGetUsersClassesQuery } from "@/queries/classes";
import { useGetClassDecksQuery } from "@/queries/decks";
import SubmitButton from "@/molecules/SubmitButton";
import { useCreateFlashcardsFromFileMutation } from '@/queries/flashcards';
import { showFlashcardsList, showPdfForm } from '@/slices/SpaSlice';



const UserFileList = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [selectedUserFile, setSelectedUserFile] = useState(null);
  const dispatch = useDispatch();


  const { data: userClasses, isLoading: classesLoading } = useGetUsersClassesQuery();
  const { data: classDecks, isLoading: decksLoading } = useGetClassDecksQuery(selectedClass);
  const { data: userFiles, isLoading: filesLoading } = useGetAllUsersFilesQuery();

  const [createQuizFromFile, createQuizFromFileResponse] = useCreateFlashcardsFromFileMutation();

  // useEffect(() => {
  //   if (createQuizFromFileResponse.isSuccess) {
  //     console.log('yay');
  //   }
  // })

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      deck_id: selectedDeck,
      file_id: selectedUserFile
    };
    createQuizFromFile(formData);
    setSelectedDeck(formData.deck_id);
    dispatch(showFlashcardsList(true));
    dispatch(showPdfForm(false));
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-gray-50 p-8 rounded-md shadow-md w-full">
        <h1 className="text-3xl text-center font-bold mb-4 border-b-2 border-primary-500">Select File to Generate Flashcards</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <select
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value={null}>Select a class</option>
            {userClasses &&
              userClasses.map((userClass) => (
                <option key={userClass.id} value={userClass.id}>
                  {userClass.name}
                </option>
              ))}
          </select>
          <select
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setSelectedDeck(e.target.value)}
          >
            <option value={null}>Select a deck</option>
            {classDecks &&
              classDecks.map((classDeck) => (
                <option key={classDeck.id} value={classDeck.id}>
                  {classDeck.name}
                </option>
              ))}
          </select>

          {userFiles &&
            userFiles.map((userFile) => (
              <label className="flex items-center cursor-pointer hover:bg-blue-100">
                <div
                  key={userFile.id}
                  className="flex items-center cursor-pointer hover:bg-blue-100 p-2 rounded-md transition duration-300"
                >
                  <input
                    type="radio"
                    name="userFile"
                    value={userFile.id}
                    className="mr-2 cursor-pointer focus:outline-none focus:ring focus:border-blue-500"
                    onChange={() => setSelectedUserFile(userFile.id)}
                  />
                  <span className="text-blue-700">{userFile.name}</span>
                </div>
              </label>
            ))}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </form>

      </div>
    </div>
  );

}

export default UserFileList;
