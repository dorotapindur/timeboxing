import React from "react";
import classNames from "classnames";

function ProgressBar({ percent, over, trackRemaining = false, }) {
    if (percent > 100) {percent=100};
    if (percent < 0) {percent=0};
    let progressBarClassName = classNames(
        "ProgressBar",
        {
            "timeisup": over,
        }
        );
    if (trackRemaining)  
        return (<div className={progressBarClassName} style={{ paddingLeft: `${percent}%` }}></div>)
        else return (<div className={progressBarClassName} style={{ paddingRight: `${100 - percent}%` }}></div>);
};

export default ProgressBar;