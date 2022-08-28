import { useState, useEffect } from 'react';
import axios from 'axios';
import CountriesDisplay from './components/CountriesDisplay.js';
import SingleDisplay from './components/SingleDisplay.js'

function App() {

  // Gets all notes that currently satisfy the filter conditions.
  const [getNotes, setNotes] = useState([])
  // Gets all notes available from the API
  const [getAllNotes, setAllNotes] = useState([])
  // Gets and sets the filter.
  const [getFilter, setFilter] = useState('')
  // Decides what to desplay.
  const [getCountriesDisplay, setCountriesDisplay] = useState('');


  // changes filter based on input change
  const handleOnInputChange = (event) => {
    setFilter(event.target.value);
  }


  // Triggers a useEffect in case the filter is changed, and reformulates the output to show.
  useEffect(() => {
    if (getFilter === '') { setNotes(getAllNotes); return; }
    const notesToShow = getAllNotes.filter((countryObject) => {
      const compareTo = getFilter.toLowerCase();
      return (countryObject.name.common.toLowerCase().startsWith(compareTo));
    })
    setNotes(notesToShow);
  }, [getFilter])

  // Grabs the note data from the API at the start of the App.
  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then(
      (response) => {
        setAllNotes(response.data);
        setNotes(getAllNotes);
        setFilter('')
      }
    );
  }, []);


  useEffect(() => {
    if (getNotes.length === 1) {
      setCountriesDisplay(<SingleDisplay countryObject={getNotes[0]} />)
    }
    else {
      setCountriesDisplay(
        <ul>
          <CountriesDisplay countries={getNotes} />
        </ul>
      );
    }
  }, [getNotes])


  return (
    <>
      <>
        <h1>Country Information App</h1>
      </>
      <>
        <h3>Find your favorite country here!</h3>
        <>
          <input onChange={handleOnInputChange}></input>
        </>
        {getCountriesDisplay}
      </>
    </>
  )
}




export default App;
