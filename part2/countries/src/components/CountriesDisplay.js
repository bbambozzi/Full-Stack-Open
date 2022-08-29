import { useState, useEffect } from 'react';
import SingleDisplay from "./SingleDisplay.js";



const CountriesDisplay = (props) => {
  const countries = props.countries;

  const [getAllCountries, setAllCountries] = useState('')
  const [getSingleCountry, setSingleCountry] = useState('')
  const [getShowSingle, setShowSingle] = useState(false)

  const handleOneCountryDisplay = (countryObj) => {
    setSingleCountry(<SingleDisplay countryObject={countryObj} />)
  }

  useEffect(() => {
    if (countries) {
      handleOneCountryDisplay(countries[0]);
    }
  }, [countries])


  useEffect(() => {
    if (countries) {
      setShowSingle(false);
      let response = countries.map((countryObject, index) => {
        return <li key={index}>{countryObject.name.common}<button onClick={() => { handleOneCountryDisplay(countryObject); setShowSingle(true) }}>More</button></li>
      })
      setAllCountries(response);
    }
  }, [countries]);


  if (getAllCountries.length > 10) {
    return (
      <span>Too many matches, please be more specific.</span>
    );
  }
  if (getAllCountries.length === 0) {
    return <span>No matches found</span>
  }
  if (getAllCountries.length === 1 || getShowSingle) {
    return (getSingleCountry)
  }
  return (
    <>
      {getAllCountries}
    </>
  )
}

export default CountriesDisplay;
