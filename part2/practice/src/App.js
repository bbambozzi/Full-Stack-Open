import axios from 'axios';
import { useState, useEffect } from 'react'
import Note from './components/Note'

let App = (props) => {


  let notes = props.notes;

  let [getAllNotes, setAllNotes] = useState([]);
  let [getNewNote, setNewNote] = useState('');
  let [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:3001/notes`).then(
      (response) => {
        setAllNotes(response.data)
        console.log('got response')
      }
    );
  }, [])


  const notesToShow =
    showAll ? getAllNotes : getAllNotes.filter(note => (note.important));


  let handleNewNoteChange = (event) => {
    let newNote = event.target.value;
    setNewNote(newNote);

  }
  let handleSaveNewNote = (event) => {
    event.preventDefault();
    let userInput = getNewNote
    let newNoteObject = {
      id: getAllNotes.length + 1,
      content: userInput,
      important: Math.random() > 0.5,
      date: new Date(),
    };
    setAllNotes(getAllNotes.concat(newNoteObject));
    setNewNote("");
  }



  return (
    <>
      <>
        <h1>Note-Taking App</h1>
        <ul>
          {notesToShow.map((note) => <li key={note.id}><Note content={note.content} /></li>)}
        </ul>
        <>
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Important' : 'Everything'}
          </button>
        </>
      </>
      <>
        <h2>Add a new Note!</h2>
        <form onSubmit={handleSaveNewNote}>
          <input onChange={handleNewNoteChange} value={getNewNote} />
          <button type="submit">Save!</button>
        </form>
      </>
    </>
  )
}
export default App;
