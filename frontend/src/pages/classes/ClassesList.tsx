import React from 'react';
import { useGetUsersClassesQuery } from '@/queries/classes';
import CreateClassButton from '@/molecules/CreateClassButton';
import { useDispatch } from 'react-redux';
import { setClass } from '@/slices/account/ClassesSlice';
import { showDecksList, showClassesList, showClassesForm } from '@/slices/SpaSlice';
import Class from '@/molecules/Class';

const ClassesList = () => {
  const { data: classes, isLoading } = useGetUsersClassesQuery();
  const dispatch = useDispatch();

  const changeClassStateId = (e, id) => {
    e.preventDefault();
    dispatch(setClass(id));
    dispatch(showDecksList(true));
    dispatch(showClassesList(false));
    dispatch(showClassesForm(false));
    console.log('class id: ', id);
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

      <div className="container mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="max-w-md rounded overflow-hidden shadow-lg bg-gray-20 mx-auto"
            >
              <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2">{classItem.name}</h2>
                <button
                  className="bg-secondary-500 hover:bg-secondary-400 text-white font-bold py-2 px-4 rounded"
                  onClick={(e) => changeClassStateId(e, classItem.id)}
                >
                  Select Class
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesList;
