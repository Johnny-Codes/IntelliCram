import { useState } from 'react';
import Navbar from '@/pages/navbar';
import ClassesList from '@/pages/classes/ClassesList';
import DeckList from '@/pages/decks/DeckList';
import DeckForm from '@/pages/decks/DeckForm';
import { useSelector } from 'react-redux';
import ClassesForm from '@/pages/classes/ClassesForm';
import FlashcardsList from '@/pages/flashcards/FlashcardsList';
import FlashcardsForm from '@/pages/flashcards/FlashcardsForm';
import QuizForm from '@/pages/quizzes/QuizForm';
import QuizDetail from '@/pages/quizzes/QuizDetail';
import QuizzesList from '@/pages/quizzes/QuizzesList';
import PdfForm from '@/pages/flashcards/PdfForm';
import TextQuizChat from '@/pages/quizzes/TextQuizChat';
import Footer from '@/pages/footer';

function UserTemplate() {
    const showClassList = useSelector((state) => state.spaslice.showClassesList)
    const showClassesForm = useSelector((state) => state.spaslice.showClassesForm)
    const showDeckList = useSelector((state) => state.spaslice.showDecksList)
    const showDeckForm = useSelector((state) => state.spaslice.showDecksForm)
    const showFlashcardsList = useSelector((state) => state.spaslice.showFlashcardsList)
    const showFlashcardsForm = useSelector((state) => state.spaslice.showFlashcardsForm)
    const showQuizForm = useSelector((state) => state.spaslice.showQuizForm)
    const showQuizDetail = useSelector((state) => state.spaslice.showQuizDetail)
    const showQuizzesList = useSelector((state) => state.spaslice.showQuizzesList)
    const showPdfForm = useSelector((state) => state.spaslice.showPdfForm)
    const showTextQuizChat = useSelector((state) => state.spaslice.showTextQuizChat)


    return (
        <>
            <Navbar />
            {showClassList && <ClassesList />}
            {showClassesForm && <ClassesForm />}
            {showDeckList && <DeckList />}
            {showDeckForm && <DeckForm />}
            {showFlashcardsList && <FlashcardsList /> }
            {showFlashcardsForm && <FlashcardsForm /> }
            {showQuizForm && <QuizForm /> }
            {showQuizDetail && <QuizDetail /> }
            {showQuizzesList && <QuizzesList /> }
            {showPdfForm && <PdfForm /> }
            {showTextQuizChat && <TextQuizChat /> }
            <Footer />
            
        </>
    )
}

export default UserTemplate
