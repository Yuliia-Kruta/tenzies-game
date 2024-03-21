const Tile = (props) => {

    const tileStyle = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return ( 
        <div className="tile" style={tileStyle} onClick={props.isGameRunning ? props.holdDice : props.highlightRollButton}>
            <h2 className="tile-number">{props.value}</h2>
        </div>
     );
}

export default Tile;