import { useState } from "react";
import Tile from "./components/Tile";


function App() {

const [diceNumbers, setDiceNumbers] = useState(newDices())

  function generateNewDice(){
    return {value: Math.floor(Math.random()*6)+1, isHeld: false}
  }

  function newDices(){
    const newDicesArr = []
    for(let i=0; i<10; i++){
      newDicesArr.push(generateNewDice())
    }
    return newDicesArr
  }

  function rollDice(){
    setDiceNumbers(prevDiceNumbers => prevDiceNumbers.map(tile => {
      return tile.isHeld ? tile : generateNewDice()
    }))
  }

  function holdDice(tileId){
    setDiceNumbers(prevDiceNumbers => prevDiceNumbers.map((tile, index) => {
      return index === tileId ? {...tile, isHeld: !tile.isHeld} : tile
    }))
  }

  const tileElements = diceNumbers.map((diceNum, index) => {
    return <Tile key={index} value={diceNum.value} isHeld={diceNum.isHeld} holdDice={() => holdDice(index)}/>
  })
  

  return(
    <main>
      <div className="tile-container">
        {tileElements}
      </div>
      <button className="roll-button" onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
