let curYear = new Date().getFullYear();
let calendarDateString = new Date().toDateString();
let myTime = {'year': curYear, 'calendarDate': calendarDateString};
console.log(myTime.year)
function App() {
  return (
      <>
      <h1>Work in Progress!</h1>
          <ShowTime timeObj={myTime}/>
      </>
  );
}



const ShowTime = (props) => {
    let yearNow = props.timeObj.year;
    return (
        <>
    <p>The current year is equal to {yearNow}!</p>
            <p>The calendar date is {props.timeObj.calendarDate}</p>
        </>
    )

}

export default App;
