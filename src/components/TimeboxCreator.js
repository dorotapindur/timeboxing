import React from "react";
import { v4 as uuidv4 } from 'uuid';
uuidv4();

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

export default TimeboxCreator;