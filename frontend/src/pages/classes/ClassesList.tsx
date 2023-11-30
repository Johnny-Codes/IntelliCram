// import React, { useState } from 'react';
// import { useGetUsersClassesQuery } from '@/queries/classes';
// import CreateClassButton from '@/molecules/CreateClassButton';
// import { useDispatch } from 'react-redux';
// import { setClass } from '@/slices/account/ClassesSlice';
// import { showDecksList, showClassesList, showClassesForm } from '@/slices/SpaSlice';
// import Class from '@/molecules/Class';
// import DeckList from '@/pages/decks/DeckList';

// const ClassesList = () => {
//   const { data: classes, isLoading } = useGetUsersClassesQuery();
//   const dispatch = useDispatch();
//   const [selectedClass, setSelectedClass] = useState(null);

//   const changeClassStateId = (e, id) => {
//     e.preventDefault();
//     dispatch(setClass(id));
//     setSelectedClass(id);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-20">
//         <p>Your Content is still loading</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray- min-h-screen">
//       <div className="bg-primary-500 text-white py-4">
//         <div className="flex container mx-auto">
//           <h1 className="text-3xl font-bold">Classes</h1>
//           <span className='mx-2'>
//             <CreateClassButton />
//           </span>
//         </div>
//       </div>

//       <div className="container mx-auto my-8 grid grid-cols-1 gap-6">
//         {classes.map((classItem) => (
//           <div key={classItem.id}>
//             <div
//               id={classItem.id}
//               className="bg-white border border-gray-300 rounded-md overflow-hidden shadow-lg transition-transform transform hover:scale-105"
//               onClick={(e) => changeClassStateId(e, classItem.id)}
//             >
//               <div className="p-4">
//                 <h2 className="text-black text-lg font-semibold text-center">
//                   {classItem.name}
//                 </h2>
//               </div>
//             </div>

//             {selectedClass === classItem.id && <DeckList />}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClassesList;

import React, { useState } from 'react';
import { useGetUsersClassesQuery } from '@/queries/classes';
import CreateClassButton from '@/molecules/CreateClassButton';
import { useDispatch } from 'react-redux';
import { setClass } from '@/slices/account/ClassesSlice';
import { showDecksList, showClassesList, showClassesForm } from '@/slices/SpaSlice';
import Class from '@/molecules/Class';
import DeckList from '@/pages/decks/DeckList';

const ClassesList = () => {
  const { data: classes, isLoading } = useGetUsersClassesQuery();
  const dispatch = useDispatch();
  const [selectedClass, setSelectedClass] = useState(null);

  const changeClassStateId = (e, id) => {
    e.preventDefault();
    dispatch(setClass(id));
    setSelectedClass(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-20">
        <p>Your Content is still loading</p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-primary-500 text-white p-4 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Classes</h1>
        <CreateClassButton />
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className={`mt-4 cursor-pointer ${
              selectedClass === classItem.id ? 'bg-gray-200' : ''
            }`}
            onClick={(e) => changeClassStateId(e, classItem.id)}
          >
            <h2 className="text-lg font-semibold">{classItem.name}</h2>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray min-h-screen">
        <div className="bg-primary-500 text-white py-4">
          <div className="flex container mx-auto">
            <h1 className="text-3xl font-bold">Decks</h1>
          </div>
        </div>

        <div className="container mx-auto my-8 grid grid-cols-1 gap-6">
          {classes.map((classItem) => (
            <div key={classItem.id}>
              {selectedClass === classItem.id && <DeckList />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesList;
