import React from "react";
import EditableTimebox from "./EditableTimebox";
import ErrorBoundary from "./ErrorBoundary";
import "../styles/scss-components/App.scss";

function App() {
    return (
        <div className="App">
            <ErrorBoundary message = "Coś nie działa w całej aplikacji">
                <EditableTimebox />
            </ErrorBoundary>
        </div>
    )
}

export default App;