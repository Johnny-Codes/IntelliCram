import React, { useEffect } from 'react'
import { useGetClassDecksQuery } from '@/queries/decks'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

type Props = {}

const DeckList = ({ }: Props) => {
  const classId = useSelector((state) => state.classes.class_id)
  const { data: decks, isLoading } = useGetClassDecksQuery(classId)

  if (isLoading) {
    return (
      <div>
        <p>Your Content is still loading</p>
      </div>
    )
  }

  return (
    <ul>
      {decks.map((deckItem) => (
        <li key={deckItem.id}>
          <Link to={`/classes/${deckItem.id}`}>{deckItem.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default DeckList
