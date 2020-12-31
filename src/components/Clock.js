import React from "react";
import classNames from "classnames";

function Clock({ hours = 0, minutes = 0, seconds = 0, over}) {
    if (hours < 0) {hours = 0}
    if (hours > 23) {hours = 23}
    if (minutes < 0) {minutes = 0}
    if (minutes > 59) {minutes = 59}
    if (seconds < 0) {seconds = 0}
    if (seconds > 59) {seconds = 59}
    let hoursFormatted = hours.toString().padStart(2, '0');
    let minutesFormatted = minutes.toString().padStart(2, '0');
    let secondsFormatted = seconds.toString().padStart(2, '0');
    let clockClassName = classNames(
        "Clock",
        {
            "Clock--over": over,
        }
        );
    return (
        <div>
            <p className={clockClassName}>Pozostało <span className="Clock__hours">{hoursFormatted}</span><span className="Clock__colon">:</span><span className="Clock__minutes">{minutesFormatted}</span><span className="Clock__colon">:</span><span className="Clock__seconds">{secondsFormatted}</span></p>
        </div>
        )
    };

export default Clock;