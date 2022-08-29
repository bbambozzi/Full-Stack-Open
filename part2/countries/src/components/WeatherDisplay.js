import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherDisplay = (props) => {

  const [getApiKey] = useState(process.env.REACT_APP_API_KEY)
  const getCoordinates = (props.coordinates);
  const [getWeatherData, setWeatherData] = useState(null);
  const [getImage, setImage] = useState(<p>No matching image found</p>);
  const [getDescription, setDescription] = useState(<p>Hmm, today is a mystery</p>)
  const [getAxiosURL, setAxiosURL] = useState(`https://api.openweathermap.org/data/2.5/weather?lat=${getCoordinates[0]}&lon=${getCoordinates[1]}&appid=${getApiKey}`);

  // OpenWeather API KEY
  // IMPORTANT! DO NOT OVERWRITE! Set as env variable instead!
  // In bash: REACT_APP_API_KEY="VALUEHERE"  NPM START


  useEffect(() => {
    setWeatherData(null)
    setAxiosURL(`https://api.openweathermap.org/data/2.5/weather?lat=${getCoordinates[0]}&lon=${getCoordinates[1]}&appid=${getApiKey}`)
  }, [getCoordinates])

  useEffect(() => {
    axios.get(getAxiosURL).then(response => {
      setWeatherData(response.data);
    })
  }, [getAxiosURL])

  useEffect(() => {
    if (getWeatherData) {
      const iconURL = getWeatherData.weather[0].icon
      const desc = getWeatherData.weather[0].description;
      setImage(<img src={`https://openweathermap.org/img/wn/${iconURL}@2x.png`} />)
      setDescription(<p>Today is looking like a {desc} type of day, with {kevinToCelcius(getWeatherData.main.temp)}° Celcius.</p>)
    } else {
    }
  }, [getWeatherData]);

  const kevinToCelcius = (kelvins) => {
    return (kelvins - 273.5).toFixed(2);
  }

  const ShowLatitudes = () => {
    return (
      <h4>Latitude is {getCoordinates[0]} and longitude is {getCoordinates[1]}</h4>
    )
  }
  return (
    <>
      <>
        <>
          {< ShowLatitudes />}
        </>
        <>
        </>
        <>
          {getImage}
        </>
        <>
          {getDescription}
        </>
      </>
    </>
  );
}
export default WeatherDisplay;
