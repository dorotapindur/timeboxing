import React from "react";
import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";
import Error from "./ErrorBoundary";

class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { id: "a", title: "Uczę się list", totalTimeInMinutes: 25},
            { id: "b", title: "Uczę się formularzy", totalTimeInMinutes: 15},
            { id: "c", title: "Uczę się komponentów niekontrolowanych", totalTimeInMinutes: 5},
        ],
        isEditable: false,
        timeboxEdited: null,/*none in that moment*/
        hasError: false,
    }
    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return { timeboxes };
        })
    }
    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timeboxes, index) => index !== indexToRemove);
            return { timeboxes };
        })
    }
    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) => index === indexToUpdate ? updatedTimebox : timebox)
            return { timeboxes };
        })
    }

    handleEdit = (selectedTimebox) => {
        try {
            this.setState({ isEditable: true, timeboxEdited: selectedTimebox});
        } catch (error) {
            console.log("Jest błąd przy edycji timeboxa", error);
        }
        
    }
    handleSave = (modifiedTimebox) => {
        const timeboxIndex = this.state.timeboxes.findIndex(timebox => timebox.id === modifiedTimebox.id);
        this.setState({ isEditable: false, timeboxEdited: null });
        if (timeboxIndex !== -1) {
            this.updateTimebox(timeboxIndex, modifiedTimebox);
            return;
        }
        this.addTimebox(modifiedTimebox);
    }

    render() {
        const { isEditable, timeboxEdited } = this.state;
        return (
            <>
                <TimeboxCreator
                    onSave={this.handleSave}
                    isEditable={isEditable}
                    timeboxEdited={timeboxEdited} />
                <Error message="Coś się wykrzaczyło w liście">
                {   
                    this.state.timeboxes.map((timebox, index) => (
                    <Timebox
                        key={timebox.id}
                        title={timebox.title}
                        totalTimeInMinutes={timebox.totalTimeInMinutes}
                        onDelete={() => this.removeTimebox(index)}
                        onEdit={() => this.handleEdit(timebox)} />
                    ))
                }
                </Error>               
            </>
        )
    }

}

export default TimeboxList;