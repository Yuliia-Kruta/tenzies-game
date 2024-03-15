import { useState } from "react";
import Tile from "./components/Tile";


function App() {

const [diceNumbers, setDiceNumbers] = useState(newDices())

  function newDices(){
    const newDicesArr = []
    for(let i=0; i<10; i++){
      newDicesArr.push({value: Math.floor(Math.random()*6)+1, isHeld: false})
    }
    return newDicesArr
  }

  function setNewDices(){
    setDiceNumbers(newDices())
  }

  const tileElements = diceNumbers.map((diceNum, index) => {
    return <Tile key={index} value={diceNum.value} />
  })
  

  return(
    <main>
      <div className="tile-container">
        {tileElements}
      </div>
      <button className="roll-button" onClick={setNewDices}>Roll</button>
    </main>
  );
}

export default App;
