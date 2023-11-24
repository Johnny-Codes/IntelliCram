import React from 'react'
import { useGetUsersClassesQuery } from '@/queries/classes'
import { Link } from 'react-router-dom'
import CreateClassButton from '@/molecules/CreateClassButton'
import { useDispatch } from 'react-redux'
import { setClass } from '@/slices/account/ClassesSlice'
import { showDecksList, showClassesList, showClassesForm } from '@/slices/SpaSlice'
import Class from '@/molecules/Class'

const ClassesList = () => {
  const { data: classes, isLoading } = useGetUsersClassesQuery()
  const dispatch = useDispatch()
  console.log(classes)

  const changeClassStateId = (e, id) => {
    e.preventDefault();
    dispatch(setClass(id))
    dispatch(showDecksList(true))
    dispatch(showClassesList(false))
    dispatch(showClassesForm(false))
    console.log('class id: ', id)
  }

  if (isLoading) {
    return (
      <div>
        <p>Your Content is still loading</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex outline">
        <h1>Classes</h1>
      </div>
      <div className="flex items-center justify-evenly flex-wrap outline">
      {classes.map((classItem) => (
        <Class
          key={classItem.id}
          name={classItem.name}
          onClick={(e) => changeClassStateId(e, classItem.id)}
        />
      ))}
      </div >
      <CreateClassButton />
    </>
  )
}

export default ClassesList
