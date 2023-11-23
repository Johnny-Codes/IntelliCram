import { useState } from 'react';
import Navbar from '@/pages/navbar';
import ClassesList from '@/pages/classes/ClassesList';
import DeckList from '@/pages/decks/DeckList';



function UserTemplate() {
    const [selectedPage, setSelectedPage] = useState()
    return (
        <>
            <Navbar />
            <ClassesList />
            <DeckList />
        </>
    )
}

export default UserTemplate
