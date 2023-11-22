import React from 'react'
import { useGetUsersClassesQuery } from '@/queries/classes'
import { Link } from 'react-router-dom'

type Props = {}

const ClassesList = ({ }: Props) => {
  const { data: classes, isLoading } = useGetUsersClassesQuery()
  console.log(classes)

  if (isLoading) {
    return (
      <div>
        <p>Your Content is still loading</p>
      </div>
    )
  }

  return (
    <>
      <div>
        <h1>Classes</h1>
      </div>
      <div className="flex">
        {classes.map((classItem) => (
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4" key={classItem.id}>
            <Link to={`/classes/${classItem.id}`} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{classItem.name}</Link>
          </div>
        ))}
      </div>
      <Link to="/classes/new">
        Create New Class
      </Link>
    </>
  )
}

export default ClassesList
