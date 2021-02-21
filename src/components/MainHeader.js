import React from "react";
import "../styles/scss-components/MainHeader.scss";

function MainHeader({ isRunning }) {
    
    let headerClassName = 'MainHeader';
    if (isRunning === false) {
        headerClassName = 'MainHeader shake'
    }
    return (
        <>
            <h1 className={headerClassName}>minutnik</h1>
            <span></span>
        </>
    )
}

export default MainHeader;