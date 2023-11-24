import { useState } from 'react';
import Navbar from '@/pages/navbar';
import ClassesList from '@/pages/classes/ClassesList';
import DeckList from '@/pages/decks/DeckList';
import DeckForm from '@/pages/decks/DeckForm';
import { useSelector } from 'react-redux';
import ClassesForm from '@/pages/classes/ClassesForm';


function UserTemplate() {
    const showClassList = useSelector((state) => state.spaslice.showClassesList)
    const showClassesForm = useSelector((state) => state.spaslice.showClassesForm)
    const showDeckList = useSelector((state) => state.spaslice.showDecksList)
    const showDeckForm = useSelector((state) => state.spaslice.showDecksForm)
    return (
        <>
            <Navbar />
            {showClassesForm && <ClassesForm />}
            {showClassList && <ClassesList />}
            {/* <ClassesList /> */}
            {showDeckForm && <DeckForm />}
            {showDeckList && <DeckList />}
        </>
    )
}

export default UserTemplate
