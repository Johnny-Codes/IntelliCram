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
//     console.log('class id: ', id);
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

//       <div className="container mx-auto my-8">
//         <div className="w-4/5 mx-auto flex flex-col">
//           {classes.map((classItem) => (
//             <div
//               key={classItem.id}
//               className="m-4 w-80 bg-white border border-black rounded overflow-hidden"
//               onClick={(e) => changeClassStateId(e, classItem.id)}
//             >
//               <div className="bg-white p-4 h-32 flex items-center justify-center">
//                 <h2 className="text-black text-lg font-semibold text-center">
//                   {classItem.name}
//                 </h2>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedClass && <DeckList />}
//     </div>
//   );
// };

// export default ClassesList;

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
//           <>
//           <div
//             key={classItem.id}
//             id={classItem.id}
//             className="bg-white border border-gray-300 rounded-md overflow-hidden shadow-lg transition-transform transform hover:scale-105"
//             onClick={(e) => changeClassStateId(e, classItem.id)}
//           >
//             <div className="p-4">
//               <h2 className="text-black text-lg font-semibold text-center">
//                 {classItem.name}
//               </h2>
//             </div>
//           </div>
//           <DeckList />
//           </>
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
    <div className="bg-gray- min-h-screen">
      <div className="bg-primary-500 text-white py-4">
        <div className="flex container mx-auto">
          <h1 className="text-3xl font-bold">Classes</h1>
          <span className='mx-2'>
            <CreateClassButton />
          </span>
        </div>
      </div>

      <div className="container mx-auto my-8 grid grid-cols-1 gap-6">
        {classes.map((classItem) => (
          <div key={classItem.id}>
            <div
              id={classItem.id}
              className="bg-white border border-gray-300 rounded-md overflow-hidden shadow-lg transition-transform transform hover:scale-105"
              onClick={(e) => changeClassStateId(e, classItem.id)}
            >
              <div className="p-4">
                <h2 className="text-black text-lg font-semibold text-center">
                  {classItem.name}
                </h2>
              </div>
            </div>
            
            {selectedClass === classItem.id && <DeckList />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesList;
