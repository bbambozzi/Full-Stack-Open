import { useState, useEffect } from 'react';


const SingleDisplay = (props) => {
  const countryObject = props.countryObject;
  const [getFlagURL] = useState(countryObject.flags.png)
  const [getFlagDisplay, setFlagDisplay] = useState(<span>No image found!</span>)
  const languagesArray = Object.values(countryObject.languages);


  useEffect(() => {
    setFlagDisplay(<img src={getFlagURL} />)
  }, [getFlagURL])

  return (
    <>
      <>
        <>
          <h1>The current country is {countryObject.name.common.concat(' ' + countryObject.flag)}</h1>
        </>
        <>
          {getFlagDisplay}
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

        </>
      </>
    </>

  );
}



export default SingleDisplay;
