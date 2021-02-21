import React from "react";
import classNames from "classnames";
import "../styles/scss-components/Clock.scss";
import PropTypes from "prop-types";

function Clock({ hours, minutes, seconds, over}) {
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
            "timeisup": over,
        }
        );
    return (
        <div>
            <p className={clockClassName}>Pozostało {hoursFormatted}:{minutesFormatted}:{secondsFormatted}</p>
        </div>
        )
};

const NumbeOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
Clock.propTypes = {
    hours: NumbeOrStringType.isRequired,
    minutes: NumbeOrStringType.isRequired,
    seconds: NumbeOrStringType.isRequired,
};
export default Clock;