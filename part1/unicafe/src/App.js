import {useState} from  'react'


function App() {
  const [getStats, setStats] = useState({'good': 0, 'bad': 0, 'neutral': 0, 'total': 0});
  const [getSeenStatsFlag, setSeenStatsFlag] = useState(true)
  const handleGoodReview = () => {
    const newStats = {...getStats, 'good': getStats.good + 1, 'total': getStats.total + 1};
    setSeenStatsFlag(false)
    setStats(newStats);
  };

 const handleBadReview = () => {
    const newStats = {...getStats, 'bad': getStats.bad + 1, 'total': getStats.total + 1};

    setSeenStatsFlag(false)
    setStats(newStats);
  };
  
 const handleNeutralReview = () => {
    const newStats = {...getStats, neutral: getStats.neutral + 1, 'total': getStats.total + 1};
    setSeenStatsFlag(false)
    setStats(newStats);
  };
  
  return (
    <>
    <StatButton function={setStats} text={'good'} clickHandler={handleGoodReview}/>
    <StatButton function={setStats} text={'neutral'} clickHandler={handleNeutralReview}/>
    <StatButton function={setStats} text={'bad'} clickHandler={handleBadReview}/>
    <Statistics statsObj={getStats} seenStats={getSeenStatsFlag}/>
    </>

  );
}


const Statistics = (props) => {
  let myStats = props.statsObj;
  let flag = props.seenStats;
  let positivityCalc = (myStats.good / myStats.total) * 100;
  let avg = ((myStats.good) - (myStats.bad)) / myStats.total;
  if (flag){
    return (
      <>
      <p>No stats yet! Please submit an opinion.</p>
      </>
    )
  }
  return (
  <>
  <h1>Statistics</h1>
  <table>
    <thead>
    <StatisticLine text={"Good"} value={myStats.good}/>
    <StatisticLine text={"Neutral"} value={myStats.neutral}/>
    <StatisticLine text={"Bad"} value={myStats.bad}/>
    <StatisticLine text={"Average"} value={avg}/>
    <StatisticLine text={"Positivity Rate"} value={positivityCalc + '%'}/>
    </thead>
  </table>
  </>
  );
  };

const StatisticLine = (props) => {
  let text = props.text;
  let value = props.value;
  return (
    <tr>
      <td>{text} = {value}</td>
    </tr>
  );
}

const StatButton = (props) => {
  let handlerFunction = props.clickHandler;
  let text = props.text;
  return <button onClick={() => {handlerFunction()}}>{text}</button>
}

export default App;