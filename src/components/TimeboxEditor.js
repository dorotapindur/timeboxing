import React from "react";

function TimeboxEditor(props) {
    const { 
        title, 
        totalTimeInMinutes,
        onTitleChange,
        onTotalTimeInMinutesChange,
        onConfirm,
        isEditable,
        isRunning,
        onStart
    } = props;
    let inactive = true;
    if (isRunning === true) {
        if (isEditable === true) {inactive = false}
        else {inactive = true}
    }
    else {inactive = false}
    return (
        <div className={`TimeboxEditor ${!inactive ? "" : "inactive"}`}>
            <label>Co robisz? <input
                disabled={inactive}
                value={title}
                onChange={onTitleChange}
                type="text" />
            </label><br />
            <label>Ile minut? <input 
                disabled={inactive}
                value={totalTimeInMinutes}
                onChange={onTotalTimeInMinutesChange}
                type="number" />
            </label><br />
            <button
                onClick={onStart}
                disabled={isRunning}>Zacznij
            </button>
            <button 
                onClick={onConfirm}
                disabled={!isEditable}>Zatwierdź zmiany
            </button>
            <p className={`orangered ${!isRunning ? "inactive" : ""}` }>running</p>
        </div>
    )
};

export default TimeboxEditor;