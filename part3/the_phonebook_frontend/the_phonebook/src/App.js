import phonebookService from './services/phonebookService.js';
import { useState, useEffect } from 'react'


const App = () => {
  // useState hooks for the states of the App.
  let [getPhonebook, setPhoneBook] = useState([])
  let [getInputValue, setInputValue] = useState('')
  let [getPhoneValue, setPhoneValue] = useState('')
  let [getNameFilter, setNameFilter] = useState('')
  let [getPhonebookToShow, setPhonebookToShow] = useState([])
  let [getErrorMessage, setErrorMessage] = useState(null)
  let [getSuccessMessage, setSuccessMessage] = useState(null)


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

  const displayNewNoteSuccess = (message) => {
    setSuccessMessage(`${message}`);
    setTimeout(() => {
      setSuccessMessage(null)
    } , 5000)
  }
 const displayNewNoteError= (message) => {
    setErrorMessage(`${message}`);
    setTimeout(() => {
      setErrorMessage(null)
    } , 5000)
  }

  
  // Receives a new phonebook entry object, and checks that the name and number are not duplicate in the database.
  // Then, it adds it into the PhoneBook.
  // Also handles duplicates in case it finds any, and asks for user confirmation.
  let handleNewPhonebookEntry = (event) => {
    event.preventDefault();
    let entryId;
    let checkIfSeen = getPhonebook.find(note => note.name === getInputValue);
    if (checkIfSeen) { entryId = checkIfSeen.id }
    let checkIfSeenNumber = getPhonebook.find(note => note.number === (getPhoneValue))
    if (checkIfSeenNumber) { entryId = checkIfSeenNumber.id }
    if (checkIfSeen || checkIfSeenNumber) {
      let toDisplay;
      if (checkIfSeenNumber) { toDisplay = getPhoneValue };
      if (checkIfSeen) { toDisplay = getInputValue };
      let userChoice = window.confirm(`${toDisplay} is already added to the Phonebook. Do you wish to overwrite?`)
      if (userChoice) {
        phonebookService.update(entryId, { id: entryId, name: getInputValue, number: getPhoneValue }).
        then(() => {
          phonebookService.getAll()
          .then((allNotesResponse) => {
            setPhoneBook((allNotesResponse))
          }).then(() => {
            displayNewNoteSuccess(`${getInputValue} was added successfully!`);
          })
        }).catch((e) => {{
          displayNewNoteError(`This note has already been deleted. Error : ${e}`)
        }})
      }
      setInputValue('')
      setPhoneValue('')
      return;
    }

    let newEntry = {name: getInputValue, number: getPhoneValue };
    phonebookService.add(newEntry).then(() => {
      phonebookService.getAll().then((getAllNotes) => {
        setPhoneBook(getAllNotes)
      }).then(() => {
        displayNewNoteSuccess(`${getInputValue} was added succesfully!`)
      })
    })
  }

  // Handles input change in the phone entry.
  let handlePhoneNumberChange = (event) => {
    event.preventDefault();
    let newValue = event.target.value;
    setPhoneValue(newValue)
  }


  // This handles the change of input in the name filter.
  let handleFilterNameInputChange = (event) => {
    event.preventDefault();
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
      phonebookService.remove(id).then(() => {
      phonebookService.getAll().then(allNotesResponse => {
        setPhoneBook(allNotesResponse)
      })
      })
    }
  }


  // Handles renderin of the PhoneBook. Expects to receive the notes that are required to be shown.
  let PhoneBook = (props) => {
    let toShow = props.toShow;
    return (
      toShow.map(note => {
        return <li key={parseInt(note.id)} className="note">{note.name} : {note.number} <button onClick={() => { askUserToConfirmDeletion(note.id, note.name) }}>Delete</button></li>
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
          <>
          <ErrorMessage message={getErrorMessage}/>
          <SuccessMessage message={getSuccessMessage}/>
          </>
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

const ErrorMessage = ({message}) => {
  if (message === null) {return null}
  return <p className="error">Error! : {message}</p>
}

const SuccessMessage = ({message}) => {
  if (message === null) {return null}
  return <p className="success">Success! : {message}</p>
}


export default App;
