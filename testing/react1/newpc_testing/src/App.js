import {useState} from 'react'

const App = () => {
  const [clicks, setClick] = useState({'left': 0, 'right': 0});
  const [allClicks, setAllClicks] = useState([]);
  
  const handleLeftClick = () => {
    const newClickObj = {...clicks, 'left': clicks.left + 1};
    setClick(newClickObj);
    setAllClicks(allClicks.concat(`L`));
    };
  
    const handleRightClick = () => {
    const newClickObj = {...clicks, 'right': clicks.right + 1};
    setClick(newClickObj);
    setAllClicks(allClicks.concat('R'));
    };
  


  return (
  <>
    <div>
      <span>{clicks.left}</span>
      <button onClick={handleLeftClick}>+</button>
      <button onClick={handleRightClick}>+</button>
      <span>{clicks.right}</span>
    </div>
    <div>
      <span>Total left: {clicks.left}</span>
    </div>
    <div>
      <span>Total right: {clicks.right}</span>
    </div>
    <div>
      <span>Total : {clicks.right + clicks.left}</span>
    </div>
    <div>
      <h3>Count string {allClicks.join(' ')}</h3>
    </div>
  </>
  );
};



export default App