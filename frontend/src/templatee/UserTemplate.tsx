import React, { useState } from 'react';
import Navbar from '@/pages/navbar';
import ClassesList from '@/pages/classes/ClassesList';



function UserTemplate() {
    const [selectedPage, setSelectedPage] = useState()
    return (
        <>
            <Navbar />
            <ClassesList />
        </>
    )
}

export default UserTemplate
