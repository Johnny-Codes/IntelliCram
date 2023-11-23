import { useEffect } from 'react'
import { useGetClassDecksQuery } from '@/queries/decks'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const DeckList = () => {
  const classId = useSelector((state) => state.classes);
  console.log('class id in decklist', classId)

  useEffect(() => {
    console.log('use effect?')
  }, [classId])


  if (!classId) {
    return (
      <h1>No Class Selected</h1>
    )
  }

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
