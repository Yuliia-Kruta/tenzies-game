import { useEffect, useState } from "react";
import Tile from "./components/Tile";
import Confetti from 'react-confetti'
import Stopwatch from "./components/Stopwatch";


function App() {

const [diceNumbers, setDiceNumbers] = useState(newDices())
const [gameRunning, setGameRunning] = useState(false)
const [gameWon, setGameWon] = useState(false)
const [gameTime, setGameTime] = useState(0)
const [bestGameTime, setBestGameTime] = useState(() => JSON.parse(localStorage.getItem("bestGameTime")) || 0)
const [count, setCount] = useState(0)
const [bestCount, setBestCount] = useState(() => JSON.parse(localStorage.getItem("bestCount")) || 0)
const [rollButtonHighlighted, setRollButtonHighlighted] = useState(false)

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
    if (gameWon){
      startNewGame()
    }else{
      setCount(prevCount => prevCount+1)
      setDiceNumbers(prevDiceNumbers => prevDiceNumbers.map(tile => {
        return tile.isHeld ? tile : generateNewDice()
    }))}
  }

  function holdDice(tileId){
    setDiceNumbers(prevDiceNumbers => prevDiceNumbers.map((tile, index) => {
      return index === tileId ? {...tile, isHeld: !tile.isHeld} : tile
    }))
  }

  function startNewGame(){
    setGameTime(0)
    setCount(0)
    setGameWon(false)
    setGameRunning(true)
    setDiceNumbers(newDices())
  }


  function formatTime(time) {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  function highlightRollButton(){
    setRollButtonHighlighted(true);
    setTimeout(() => {
        setRollButtonHighlighted(false);
    }, 1000); 
}
  
  const tileElements = diceNumbers.map((diceNum, index) => {
    return <Tile key={index} value={diceNum.value} isHeld={diceNum.isHeld} holdDice={() => holdDice(index)} isGameRunning={gameRunning} highlightRollButton={highlightRollButton}/>
  })

  useEffect(() => {
    const areAllHeld = diceNumbers.every(tile => tile.isHeld)
    const firstDice = diceNumbers[0].value
    const areAllSame = diceNumbers.every(tile => tile.value === firstDice)
    if(areAllHeld && areAllSame){
      setGameWon(true)
      setBestGameTime(prevBestGameTime => {
        return gameTime < prevBestGameTime || prevBestGameTime===0 ? gameTime : prevBestGameTime
      })
      setBestCount(prevBestCount => {
        return count < prevBestCount || prevBestCount===0 ? count : prevBestCount
      })
      setGameRunning(false)
    }
  }, [diceNumbers])

  useEffect(() => {
    localStorage.setItem("bestGameTime", JSON.stringify(bestGameTime))
  }, [bestGameTime])

  useEffect(() => {
    localStorage.setItem("bestCount", JSON.stringify(bestCount))
  }, [bestCount])

  return(
    <main>
      {gameWon && <Confetti />}
      <div className="header-container">
        <div className="rect-container">Best count: {bestCount}</div>
        <h1 className="title">Yuliia's Tenzies</h1>
        <div className="rect-container">Best time: {formatTime(bestGameTime)}</div>
      </div>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="game-section-container">
        <div className="circle-container">
          <h3>Count</h3>
          <h3>{count}</h3>
        </div>
        <div className="tile-container">
          {tileElements}
        </div>
        <div className="circle-container">
          <h3>Time</h3>
          <Stopwatch gameTime={gameTime} isGameRunning={gameRunning} setTime={setGameTime} formatTime={formatTime}/>
        </div>
      </div>
      <button className={rollButtonHighlighted ? "roll-button highlighted" : "roll-button"} onClick={gameRunning ? rollDice : startNewGame}>{gameRunning ? "Roll" : "New game"}</button>
    </main>
  );
}

export default App;
