import React from 'react'
import { useGetUsersClassesQuery } from '@/queries/classes'
import { Link } from 'react-router-dom'
import CreateClassButton from '@/molecules/CreateClassButton'
import { useDispatch } from 'react-redux'
import { setClass } from '@/slices/account/ClassesSlice'

type Props = {}

const ClassesList = ({ }: Props) => {
  const { data: classes, isLoading } = useGetUsersClassesQuery()
  console.log(classes)

  const changeClassStateId = (e) => {
    e.preventDefault()
    console.log(e.value)
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
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4" key={classItem.id}>
            <button value={classItem.id: int} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" onClick={changeClassStateId}>{classItem.name}</button>
          </div>
        ))}
    </div >
      <CreateClassButton />
    </>
  )
}

export default ClassesList
