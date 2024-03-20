import { useEffect } from "react";

const Stopwatch = (props) => {

    const time = props.gameTime
    const isRunning = props.isGameRunning
    const setTime = props.setTime

    useEffect(() => {
        let intervalId;
        if (isRunning) {
        intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

  //CSS!
      return ( 
            <p className="stopwatch-time">
              {props.formatTime(time)}
            </p>
        );
}
 
export default Stopwatch;