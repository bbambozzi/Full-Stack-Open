import { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay.js';


const SingleDisplay = (props) => {
  const [countryObject, setCountryObject] = useState(props.countryObject)
  const languagesArray = Object.values(countryObject.languages);
  const [getFlag, setFlag] = useState(<img src={countryObject.flags.png} />)
  const [getIntro, setIntro] = useState(<h1>The current country is {countryObject.name.common.concat(' ' + countryObject.flag)}</h1>)
  const [getWeather, setWeather] = useState(<WeatherDisplay coordinates={countryObject.capitalInfo.latlng} />)

  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}



  // reformulats the country object on prop change
  useEffect(() => {
    setCountryObject(props.countryObject);
  }, [props])

  // reloads relevant info on country change
  useEffect(() => {

    // creates the flag
    setFlag(<img src={countryObject.flags.png} />)

    // creates the general country info and presentation. Also appends a nice flag! 

    setIntro(<h1>The current country is {countryObject.name.common.concat(' ' + countryObject.flag)}</h1>)

    // When the country object changes, re-calculates weather information.

    setWeather(<WeatherDisplay coordinates={countryObject.capitalInfo.latlng} />)


  }, [countryObject])



  return (
    <>
      <>
        <>
          {getIntro}
        </>
        <>
          {getFlag}
        </>
        <>
          <h2>Additional information</h2>
        </>
        <span>The capital of {countryObject.name.common.concat()} is {countryObject.capital[0]}</span>
      </>
      <>
        <>
          <h3>Languages:</h3>
          <ul>
            {languagesArray.map((lang, index) => {
              return <li key={index}>{lang}</li>
            })
            }
          </ul>
        </>
        <>
          <h2>Weather info</h2>
        </>
        <>
          {getWeather}
        </>
      </>
    </>

  );
}



export default SingleDisplay;
