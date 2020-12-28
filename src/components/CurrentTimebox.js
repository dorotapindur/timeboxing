import React from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";

function CurrentTimebox (props) {
    const {
        title,
        isEditable,
        isRunning,
        isPaused,
        pausesCount,
        elapsedTimeInSeconds,
        onStop,
        onEdit,
        onPause,
        totalTime,
    } = props
                    
    const timeLeftInSeconds = totalTime - elapsedTimeInSeconds;
    const hoursLeft = Math.floor(timeLeftInSeconds/3600);
    const minutesLeft = Math.floor(timeLeftInSeconds/60);
    const secondsLeft = Math.floor(timeLeftInSeconds%60);
    const progressInPercent = (elapsedTimeInSeconds/totalTime) * 100;
    let inactive = true;
    if (isRunning) { 
        isEditable ? inactive = true : inactive = false
    } else { inactive = true }
    let almostOver = false;
    if (progressInPercent > 90) {almostOver = true};
    return (
        <div className={`CurrentTimebox ${inactive ? "inactive" : ""}`}>
            <h2>{title}</h2>
            <Clock 
                hours={hoursLeft}
                minutes={minutesLeft}
                seconds={secondsLeft}
                over={almostOver}
                className={isPaused ? "inactive" : ""}/>
            <ProgressBar 
                percent={progressInPercent} 
                over={almostOver}
                className={isPaused ? "inactive" : ""} />
            <button
                onClick={onEdit}
                disabled={inactive}>Edytuj</button>
            <button
                onClick={onStop}
                disabled={inactive}>Stop/Reset</button>
            <button
                onClick={onPause}
                disabled={inactive}>{isPaused ? "Wznów" : "Pauzuj"}</button>
            <p>Liczba przerw: {pausesCount}</p>
        </div>
    )
    
};

export default CurrentTimebox;