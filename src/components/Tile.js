const Tile = (props) => {
    return ( 
        <div className="tile">
            <h2 className="tile-number">{props.value}</h2>
        </div>
     );
}

export default Tile;