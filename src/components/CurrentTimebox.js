import React from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import classNames from "classnames";
import "../styles/scss-components/CurrentTimebox.scss";
import { getHoursMinutesAndSecondsLeftFromDurationInSeconds } from "../lib/time";

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
    const [hoursLeft, minutesLeft, secondsLeft] = getHoursMinutesAndSecondsLeftFromDurationInSeconds(timeLeftInSeconds);
    const progressInPercent = (elapsedTimeInSeconds/totalTime) * 100;
    let inactive = true;
    if (isRunning) { 
        isEditable ? inactive = true : inactive = false
    } else { inactive = true }
    let almostOver = false;
    if (progressInPercent > 80 && !inactive) {almostOver = true};
    let currentTimeboxClassName = classNames(
        "CurrentTimebox",
        {
            "inactive": inactive,
        }
    )
    return (
        <div className={currentTimeboxClassName}>
            <h2>{title}</h2>
            <Clock 
                hours={hoursLeft}
                minutes={minutesLeft}
                seconds={secondsLeft}
                over={almostOver}/>
            <ProgressBar 
                percent={progressInPercent} 
                over={almostOver} />
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