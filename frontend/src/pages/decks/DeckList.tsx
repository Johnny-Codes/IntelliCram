import React from 'react'
import { useGetUsersClassesQuery } from '@/queries/classes'
import { Link } from 'react-router-dom'

type Props = {}

const DeckList = ({ }: Props) => {
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
    <ul>
      {classes.map((classItem) => (
        <li key={classItem.id}>
          <Link to={`/classes/${classItem.id}`}>{classItem.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default DeckList
