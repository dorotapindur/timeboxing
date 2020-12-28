import React from "react";
import Timebox from "./Timebox";
import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";

import { v4 as uuidv4 } from 'uuid';
uuidv4();

class EditableTimebox extends React.Component {
    state = {
        title: "Uczę się wyciągać stan w górę!",
        totalTimeInMinutes: 0,
        isEditable: false,
        isRunning: false,
        isPaused: false,
        pausesCount: 0,
        elapsedTimeInSeconds: 0,
    }
   
    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }
    handleTotalTimeInMinutesChange = (event) => {
        this.setState({totalTimeInMinutes: event.target.value})
    }
    handleConfirm = () => {
        this.setState({ isEditable: false });
        this.startTimer();
    }
    handleEdit = () => {
        this.setState({ isEditable: true });
        this.pauseTimer();
    }
    handleStart = ()  => {
        this.setState({ isRunning: true });
        this.startTimer();
    }
    handleStop = () => {        
        this.stopTimer();
    }
    togglePause = () => {
        this.setState(
            function(prevState) {
                const isPaused = !prevState.isPaused;
                if (isPaused) {
                    this.pauseTimer()
                } else {
                    this.startTimer()
                }
                return {
                    isPaused,
                    pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount
                }
            }
        )
    }
    
    startTimer() {
        this.intervalId = window.setInterval (
            () => {
                this.setState(
                    (prevState) => ({elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.01})
                )
                if (this.state.elapsedTimeInSeconds >= this.state.totalTimeInMinutes * 60) {
                    this.stopTimer();
                    this.setState({
                        isRunning: false,
                    });
                }
            },
            10
        );
    }
    pauseTimer() {
        window.clearInterval(this.intervalId);
    }
    stopTimer() {
        window.clearInterval(this.intervalId);
        this.setState({
            isRunning: false,
            isPaused: false,
            isEditable: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0, 
        });
    }

    render() {
        const { title, totalTimeInMinutes, isEditable, isRunning, isPaused, pausesCount, elapsedTimeInSeconds } = this.state;
        const totalTime = totalTimeInMinutes * 60;
        return (
            <>
                <TimeboxEditor
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    totalTime={totalTime}
                    onTitleChange={this.handleTitleChange}
                    onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                    isEditable={isEditable}
                    isRunning={isRunning}
                    isPaused={isPaused}
                    onStart={this.handleStart}
                    onConfirm={this.handleConfirm}
                    onPause={this.togglePause} />
                <CurrentTimebox 
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    totalTime={totalTimeInMinutes * 60}
                    isEditable={isEditable}
                    isRunning={isRunning}
                    isPaused={isPaused}
                    pausesCount={pausesCount}
                    elapsedTimeInSeconds={elapsedTimeInSeconds}
                    onStart={this.handleStart}
                    onStop={this.handleStop}
                    onEdit={this.handleEdit}
                    onPause={this.togglePause} />
            </>
        )
    }
}

class TimeboxCreator extends React.Component {
    constructor(props) {
        super(props);
        this.titleInput = React.createRef();
        this.totalTimeInMinutesInput = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSave({
            id: (this.props.timeboxEdited) ? this.props.timeboxEdited.id : uuidv4(),
            title: this.titleInput.current.value,
            totalTimeInMinutes: this.totalTimeInMinutesInput.current.value,
        });
        this.titleInput.current.value = "";
        this.totalTimeInMinutesInput.current.value = "";
    }

    render() {
        const {isEditable, timeboxEdited} = this.props;
        if (timeboxEdited) {
            if (this.titleInput.current) {
                this.titleInput.current.value = timeboxEdited.title;
            }
            if (this.totalTimeInMinutesInput.current) {
                this.totalTimeInMinutesInput.current.value = timeboxEdited.totalTimeInMinutes;
            }
        }
        return (
            <form onSubmit={this.handleSubmit} className={"TimeboxCreator"}>
                <label>Co robisz?
                    <input
                        ref={this.titleInput}
                        type="text" />
                </label><br />
                <label>Ile minut?
                    <input 
                        ref={this.totalTimeInMinutesInput}
                        type="number" />
                </label><br />
                <button disabled={isEditable}
                >Dodaj timebox
                </button>
                <button disabled={!isEditable}
                >Zapisz zmiany
                </button>
            </form>
        )
    }
};

class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { id: "a", title: "Uczę się list", totalTimeInMinutes: 25},
            { id: "b", title: "Uczę się formularzy", totalTimeInMinutes: 15},
            { id: "c", title: "Uczę się komponentów niekontrolowanych", totalTimeInMinutes: 5},
        ],
        isEditable: false,
        timeboxEdited: null/*none in that moment*/
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
        this.setState({ isEditable: true, timeboxEdited: selectedTimebox});
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
                {this.state.timeboxes.map((timebox, index) => (
                    <Timebox
                        key={timebox.id}
                        title={timebox.title}
                        totalTimeInMinutes={timebox.totalTimeInMinutes}
                        onDelete={() => this.removeTimebox(index)}
                        onEdit={() => this.handleEdit(timebox)} />
                ))}               
            </>
        )
    }

}


export { EditableTimebox, TimeboxList };