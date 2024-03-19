import { useEffect, useState } from "react";
import Tile from "./components/Tile";
import Confetti from 'react-confetti'


function App() {

const [diceNumbers, setDiceNumbers] = useState(newDices())
const [game, setGame] = useState(false)

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
    if (game){
      setGame(false)
      setDiceNumbers(newDices())
    }else{
      setDiceNumbers(prevDiceNumbers => prevDiceNumbers.map(tile => {
        return tile.isHeld ? tile : generateNewDice()
    }))}
  }

  function holdDice(tileId){
    setDiceNumbers(prevDiceNumbers => prevDiceNumbers.map((tile, index) => {
      return index === tileId ? {...tile, isHeld: !tile.isHeld} : tile
    }))
  }

  const tileElements = diceNumbers.map((diceNum, index) => {
    return <Tile key={index} value={diceNum.value} isHeld={diceNum.isHeld} holdDice={() => holdDice(index)}/>
  })

  useEffect(() => {
    const areAllHeld = diceNumbers.every(tile => tile.isHeld)
    const firstDice = diceNumbers[0].value
    const areAllSame = diceNumbers.every(tile => tile.value === firstDice)
    if(areAllHeld && areAllSame){
      setGame(true)
    }
  }, [diceNumbers])

  return(
    <main>
      {game && <Confetti />}
       <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="tile-container">
        {tileElements}
      </div>
      <button className="roll-button" onClick={rollDice}>{game ? "New game" : "Roll"}</button>
    </main>
  );
}

export default App;
