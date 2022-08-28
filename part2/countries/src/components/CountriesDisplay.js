

const CountriesDisplay = (props) => {
  const countries = props.countries;
  let response = countries.map((countryObject, index) => {
    return <li key={index}>{countryObject.name.common}</li>;
  })
  if (response.length > 10) {
    return (
      <span>Too many matches, please be more specific.</span>
    );
  }
  if (response.length === 0) {
    return <span>No matches found</span>
  }
  return (
    <>
      {response}
    </>
  )
}

export default CountriesDisplay;
