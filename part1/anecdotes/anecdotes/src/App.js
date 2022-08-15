
import { useState } from 'react'


let randInt = (start, endInclude) => {
    let ans = Math.floor(Math.random() * (endInclude - start + 1));
    return ans;
  };


const App = () => {

  const [getSelected, setSelected] = useState([
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ])



  const [getPoints, setPoints] = useState({});
  const [getSeen, setSeen] = useState(0);
  const [mostPopularAdviceIndex, setMostPopularAdviceIndex] = useState(0);

  let handleVote = () => {
    let copy = {...getPoints};
    if (copy[getSeen]){
      copy[getSeen] += 1;
      setPoints(copy);
      if (copy[getSeen] > copy[mostPopularAdviceIndex]){
          setMostPopularAdviceIndex(getSeen);
          console.log(mostPopularAdviceIndex)
        };
      return;
    };
    copy[getSeen] = 1;
    if (copy[getSeen] > copy[mostPopularAdviceIndex]){
      setMostPopularAdviceIndex(getSeen);
      console.log(mostPopularAdviceIndex)
      };
    setPoints(copy);
    return;
  };


  let selectNew = () => {
    let length = getSelected.length;
    let randomChoice = randInt(0, length - 1);
    setSeen(randomChoice);
  };

  let DisplayVotes = () => {
    if (getPoints[getSeen]){
      return (
        <p>Votes for this application is = {getPoints[getSeen]}</p>
      );
    };
    return (
      <p>Votes for this application is = 0</p>
    )
  };

  return (
  <>
    <div>
      <p>{getSelected[getSeen]}</p>
    </div>
    <div>
      <button onClick={selectNew}>Next</button>
    </div>
    <div>
      <button onClick={handleVote}>Vote up!</button>
    </div>
    <div>
      <DisplayVotes/>
    </div>
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>{getSelected[mostPopularAdviceIndex]}</p>
    </div>
  </>
  )
};


export default App
