import { useSelector } from "react-redux";
import { useGetAllUsersFilesQuery } from "@/queries/pdfs";
import { useState, useEffect } from "react";
import { useGetUsersClassesQuery } from "@/queries/classes";
import { useGetClassDecksQuery } from "@/queries/decks";
import SubmitButton from "@/molecules/SubmitButton";
import { useCreateFlashcardsFromFileMutation } from '@/queries/flashcards';


const UserFileList = () => {
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedDeck, setSelectedDeck] = useState(null);
    const [selectedUserFile, setSelectedUserFile] = useState(null);

    const { data: userClasses, isLoading: classesLoading } = useGetUsersClassesQuery();
    const { data: classDecks, isLoading: decksLoading } = useGetClassDecksQuery(selectedClass);
    const { data: userFiles, isLoading: filesLoading } = useGetAllUsersFilesQuery();

    const [createQuizFromFile, createQuizFromFileResponse] = useCreateFlashcardsFromFileMutation();

    useEffect(() => {
        if (createQuizFromFileResponse.isSuccess) {
            console.log('createQuizFromFileResponse', createQuizFromFileResponse);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            deck_id: selectedDeck,
            file_id: selectedUserFile
        };
        createQuizFromFile(formData);
        
    }

    return (
        <div className="mx-auto max-w-2xl bg-gray-100 p-4">
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <select onChange={(e) => setSelectedClass(e.target.value)}>
                    <option value={null}>Select a class</option>
                    {userClasses && userClasses.map((userClass) => (
                        <option key={userClass.id} value={userClass.id}>{userClass.name}</option>
                    ))}
                </select>
                <select onChange={(e) => setSelectedDeck(e.target.value)}>
                    <option value={null}>Select a deck</option>
                    {classDecks && classDecks.map((classDeck) => (
                        <option key={classDeck.id} value={classDeck.id}>{classDeck.name}</option>
                    ))}
                </select>
            {userFiles && userFiles.map((userFile) => (
                <div key={userFile.id} className="flex items-center">
                    <input type="radio" name="userFile" value={userFile.id} className="mr-2" onChange={() => setSelectedUserFile(userFile.id)} />
                    <span>{userFile.name}</span>
                </div>
                
            ))}
            <SubmitButton text="Submit" />
            </form>
        </div>
    )
}

export default UserFileList;