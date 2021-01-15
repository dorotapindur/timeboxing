import React from "react";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import "../styles/scss-components/App.scss";

function App() {
    return (
        <div className="App">
            <React.StrictMode>
                <TimeboxList />
                <EditableTimebox />
            </React.StrictMode>
        </div>
    )
}

export default App;