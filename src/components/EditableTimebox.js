import React from "react";
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
        console.log("handle start")
        this.setState({ isRunning: true });
        this.startTimer();
    }
    handleStop = () => {
        console.log("handle stop")       
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


export default EditableTimebox;