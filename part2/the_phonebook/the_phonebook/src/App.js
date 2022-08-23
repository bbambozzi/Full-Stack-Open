import { useState } from 'react'


const App = () => {

  let [getPhonebook, setNoteBook] = useState([{ id: 1, name: 'sneed', number: 67584930 }])
  let [getInputValue, setInputValue] = useState('')
  let [getPhoneValue, setPhoneValue] = useState('')
  let [getIfFilter, setIfFilter] = useState(false)
  let [getNameFilter, setNameFilter] = useState('')

  const phonebookToShow = !getIfFilter ? getPhonebook :
    (getPhonebook.filter(note => (note.name === getNameFilter)))

  let handleNameInputChange = (event) => {
    let userInput = event.target.value;
    setInputValue(userInput);
    console.log(userInput)
  }

  let handleNewPhonebookEntry = (event) => {
    event.preventDefault();
    let checkIfSeen = getPhonebook.find(note => note.name === getInputValue);
    let checkIfSeenNumber = getPhonebook.find(note => note.number === parseInt(getPhoneValue))


    if (checkIfSeen || checkIfSeenNumber) {
      let toDisplay;
      if (checkIfSeenNumber) { toDisplay = getPhoneValue };
      if (checkIfSeen) { toDisplay = getInputValue };
      window.alert(`${toDisplay} is already added to the Phonebook`)
      setInputValue('')
      return
    }

    let newEntry = { id: getPhonebook.length + 1, name: getInputValue, number: parseInt(getPhoneValue) }
    setNoteBook(getPhonebook.concat(newEntry));
    setInputValue('')
    setPhoneValue('')
  }

  let handlePhoneNumberChange = (event) => {
    let newValue = event.target.value;
    setPhoneValue(newValue)
  }


  let handleFilterNameInputChange = (event) => {
    let userFilter = event.target.value;
    if (userFilter) {
      setIfFilter(true)
      setNameFilter(userFilter)
      return
    }
    setIfFilter(false)
    setNameFilter('')
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
          <InputHandlerGeneric onChangeDo={handleFilterNameInputChange} value={getNameFilter} />
          <ShowFilter ifFiltered={getIfFilter} filter={getNameFilter} />
        </>
        <>
          <h2>New entry</h2>
        </>
        <>
          <form onSubmit={handleNewPhonebookEntry}>
            <>
              <span>Name : </span>
              <InputHandlerGeneric onChangeDo={handleNameInputChange} value={getInputValue} />
            </>
            <div>
              <span>Number : </span>
              <InputHandlerGeneric onChangeDo={handlePhoneNumberChange} value={getPhoneValue} />
            </div>
            <button type='submit'>Save!</button>
          </form>
        </>
        <>
          <h2>Entries</h2>
          <ul>
            <PhoneBook toShow={phonebookToShow} />
          </ul>
        </>
      </>
    </>
  )
}

let InputHandlerGeneric = (props) => {
  let onChangeDo = props.onChangeDo;
  let value = props.value;
  return <input onChange={onChangeDo} value={value} />
}

let PhoneBook = (props) => {
  let toShow = props.toShow;
  return (
    toShow.map(note => {
      return <li key={note.id}>{note.name} : {note.number}</li>
    })
  )
}

let ShowFilter = (props) => {
  let ifFiltered = props.ifFiltered;
  let filter = props.filter;
  let textToShow = `No filter applied.`
  if (ifFiltered) {
    textToShow = `Filter : ${filter}`
  }
  return <p>{textToShow}</p>;
}




export default App
