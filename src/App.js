import Tile from "./components/Tile";


function App() {
  return(
    <main>
      <div className="tile-container">
        <Tile value={1} />
        <Tile value={3} />
        <Tile value={2}/>
        <Tile value={5}/>
        <Tile value={3}/>
        <Tile value={4}/>
        <Tile value={6}/>
        <Tile value={2}/>
        <Tile value={3}/>
        <Tile value={6}/>
      </div>
    </main>
  );
}

export default App;
