import React from "react";

function ProgressBar({ percent, over, trackRemaining = false, }) {
    if (percent > 100) {percent=100};
    if (percent < 0) {percent=0};   
    if (trackRemaining)  
        return (<div className={over ? "ProgressBar ProgressBar--over" : "ProgressBar"} style={{ paddingLeft: `${percent}%` }}></div>)
        else return (<div className={over ? "ProgressBar ProgressBar--over" : "ProgressBar"} style={{ paddingRight: `${100 - percent}%` }}></div>);
};

export default ProgressBar;