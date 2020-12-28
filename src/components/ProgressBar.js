import React from "react";

function ProgressBar({className = "", percent = 0, trackRemaining = false, over = false}) {
    if (percent > 100) {percent=100};
    if (percent < 0) {percent=0};   
    if (trackRemaining)  
        return (<div className={over ? "ProgressBar timeisup " + className : "ProgressBar " + className} style={{ paddingLeft: `${percent}%` }}></div>)
        else return (<div className={over ? "ProgressBar timeisup " + className : "ProgressBar " + className} style={{ paddingRight: `${100 - percent}%` }}></div>);
};

export default ProgressBar;