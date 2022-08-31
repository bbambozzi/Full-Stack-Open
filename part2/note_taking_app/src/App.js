import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes.js'

let App = () => {


  let [getAllNotes, setAllNotes] = useState([]);
  let [getNewNote, setNewNote] = useState('');
  let [showAll, setShowAll] = useState(true)
  let [getNotesToShow, setNotesToShow] = useState([])

  console.log(`reloaded`)
  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setAllNotes(initialNotes);
        setNotesToShow(initialNotes)
      })
  }, [])




  let handleNewNoteChange = (event) => {
    event.preventDefault();
    let newNote = event.target.value;
    setNewNote(newNote);
  }


  const toggleImportance = (id) => {
    const oldNote = getAllNotes.find((note) => note.id === id)
    const newNote = { ...oldNote, important: !oldNote.important };
    noteService.update(newNote).then(() => {
      noteService.getAll().then((allNotesResponse) => {
        setAllNotes(allNotesResponse)
      }).catch(() => {
        window.alert('This note has been deleted already.')
        setAllNotes(getAllNotes.filter(note => note.id != id))
        return;
      })
    })
  }

  let handleSaveNewNote = (event) => {
    event.preventDefault();
    let userInput = getNewNote
    let newNoteObject = {
      content: userInput,
      important: Math.random() > 0.5,
      date: new Date(),
    };
    noteService.create(newNoteObject).then(() => {
      noteService.getAll().then((allNotesResponse) => {
        setAllNotes(allNotesResponse)
      })
    })
    setNewNote('')
  }

  useEffect(() => {
    if (showAll) {
      setNotesToShow(getAllNotes)
      return;
    }
    setNotesToShow(getAllNotes.filter((note) => { return note.important === true }))

  }, [showAll, getAllNotes])

  return (
    <>
      <>
        <h1>Note-Taking App</h1>
        <ul>
          {getNotesToShow.map((note) => <li key={note.id}><Note note={note} toggle={() => { toggleImportance(note.id) }} /></li>)}
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
