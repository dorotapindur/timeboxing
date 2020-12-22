import React from "react";

function Clock({className = "", hours = 0, minutes = 0, seconds = 0, over = false}) {
    if (hours < 0) {hours = 0}
    if (hours > 23) {hours = 23}
    if (minutes < 0) {minutes = 0}
    if (minutes > 59) {minutes = 59}
    if (seconds < 0) {seconds = 0}
    if (seconds > 59) {seconds = 59}
    let hoursFormatted = hours.toString().padStart(2, '0');
    let minutesFormatted = minutes.toString().padStart(2, '0');
    let secondsFormatted = seconds.toString().padStart(2, '0');
    return (
        <div>
            <p className={over ? "Clock timeisup " + className : "Clock " + className}>Pozostało {hoursFormatted}:{minutesFormatted}:{secondsFormatted}</p>
        </div>
        )
    };

export default Clock;