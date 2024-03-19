import { useEffect } from "react";

const Stopwatch = (props) => {

    console.log("Stopwatch is rendered")

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

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
//CSS!
    return ( 
          <p className="stopwatch-time">
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </p>
      );
}
 
export default Stopwatch;