import phonebookService from './services/phonebookService.js';
import { useState, useEffect } from 'react'


const App = () => {
  // useState hooks for the states of the App.
  let [getPhonebook, setPhoneBook] = useState([])
  let [getInputValue, setInputValue] = useState('')
  let [getPhoneValue, setPhoneValue] = useState('')
  let [getNameFilter, setNameFilter] = useState('')
  let [getPhonebookToShow, setPhonebookToShow] = useState([1])



  // Loads all notes on startup.
  useEffect(() => {
    phonebookService.getAll().then(allNotesResponse => {
      setPhoneBook(allNotesResponse)
    })
  }, []);


  // Filters the notes to show based on the user filter.
  useEffect(() => {
    if (!getNameFilter) {
      setPhonebookToShow(getPhonebook)
    } else {
      setPhonebookToShow(getPhonebook.filter((entry) => entry.name.toLowerCase().startsWith(getNameFilter.toLowerCase())))
    }
  }, [getPhonebook, getNameFilter])



  // Simply handles the input change in the name input field.
  let handleNameInputChange = (event) => {
    event.preventDefault();
    let userInput = event.target.value;
    setInputValue(userInput);
  }



  // Receives a new phonebook entry object, and checks that the name and number are not duplicate in the database.
  // Then, it adds it into the PhoneBook.
  let handleNewPhonebookEntry = (event) => {
    let entryId;
    let checkIfSeen = getPhonebook.find(note => note.name === getInputValue);
    if (checkIfSeen) { entryId = checkIfSeen.id }
    let checkIfSeenNumber = getPhonebook.find(note => note.number === (getPhoneValue))
    if (checkIfSeenNumber) { entryId = checkIfSeenNumber.id }
    console.log(checkIfSeen)
    if (checkIfSeen || checkIfSeenNumber) {
      let toDisplay;
      if (checkIfSeenNumber) { toDisplay = getPhoneValue };
      if (checkIfSeen) { toDisplay = getInputValue };
      let userChoice = window.confirm(`${toDisplay} is already added to the Phonebook. Do you wish to overwrite?`)
      if (userChoice) {
        phonebookService.update(entryId, { id: entryId, name: getInputValue, number: getPhoneValue })
        setInputValue('')
        setPhoneValue('')
        return;
      }
      setInputValue('')
      setPhoneValue('')
      return;
    }

    let newEntry = { id: getPhonebook.length + 1, name: getInputValue, number: getPhoneValue }
    phonebookService.add(newEntry)
    setInputValue('')
    setPhoneValue('')
  }

  // Handles input change in the phone entry.
  let handlePhoneNumberChange = (event) => {
    event.preventDefault();
    let newValue = event.target.value;
    setPhoneValue(newValue)
  }


  // This handles the change of input in the name filter.
  let handleFilterNameInputChange = (event) => {
    event.preventDefault()
    let userFilter = event.target.value.toLowerCase();
    if (userFilter) {
      setNameFilter(userFilter)
      return
    }
    setNameFilter('')

  }

  // Asks for user confirmation in the case of entry deletion.
  const askUserToConfirmDeletion = (id, name) => {
    let userChoice = window.confirm(`Are you sure you want to delete ${name}?`);
    if (userChoice) {
      phonebookService.remove(id)
      phonebookService.getAll().then(allNotesResponse => {
        setPhoneBook(allNotesResponse)
      })
    }
  }


  // Handles renderin of the PhoneBook. Expects to receive the notes that are required to be shown.
  let PhoneBook = (props) => {
    let toShow = props.toShow;
    return (
      toShow.map(note => {
        return <li key={parseInt(note.id)}>{note.name} : {note.number} <button onClick={() => { askUserToConfirmDeletion(note.id, note.name) }}>Delete</button></li>
      })
    )
  }

  let ShowFilter = (props) => {
    let filter = props.filter;
    let textToShow = `No filter applied.`
    if (getNameFilter) {
      textToShow = `Filter : ${filter}`
    }
    return <p>{textToShow}</p>;

  }

  return (
    <>
      <>
        <>
          <h1>Phonebook</h1>
        </>
        <>
          <h2>Filter</h2>
          <span>Name : </span>
          <input onChange={handleFilterNameInputChange} value={getNameFilter} />
          <ShowFilter filter={getNameFilter} />
        </>
        <>
          <h2>New entry</h2>
        </>
        <>
          <form onSubmit={handleNewPhonebookEntry}>
            <>
              <span>Name : </span>
              <input onChange={handleNameInputChange} value={getInputValue} />
            </>
            <div>
              <span>Number : </span>
              <input onChange={handlePhoneNumberChange} value={getPhoneValue} />
            </div>
            <button type='submit'>Save!</button>
          </form>
        </>
        <>
          <h2>Entries</h2>
          <ul>
            <PhoneBook toShow={getPhonebookToShow} />
          </ul>
        </>
      </>
    </>
  );
}

export default App
