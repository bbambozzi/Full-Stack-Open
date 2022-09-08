import { useState, useEffect } from 'react'

const App = ({ notes }) => {

  const [getCount, setCount] = useState(0)
  const [getSurprise, setSurprise] = useState(null)

  const handleClickCounter = () => {
    setCount(getCount + 1)
  }

  const handleSurpriseButton = () => {
    setTimeout(() => {
      setSurprise(
        <h1>Surprise!!!</h1>
      )
    }, 1000)
  }


  return (
    <>
      <>
        <ul>
          {notes.map((note) => <Note note={note} />)}
        </ul>
      </>
      <>
        <button onClick={handleClickCounter}>+1!</button>
        <p>{getCount}</p>
      </>
      <>
        <button onClick={handleSurpriseButton}>click me for a surprise!</button>
        {getSurprise}
      </>
    </>
  )
}



const Note = ({ note }) => {
  return <li className='note' key={note.id}>{note.content}</li>
}
export default App;
