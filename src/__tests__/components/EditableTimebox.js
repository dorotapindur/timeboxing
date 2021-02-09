import {render, cleanup, fireEvent} from '@testing-library/react';
import React from 'react';
import EditableTimebox from '../../components/EditableTimebox';

describe('<EditableTimebox />', () => {
    afterEach(cleanup);
    it('shows edit button', () => {
        const { debug, getByText } = render(<EditableTimebox />);
            expect( () => {
            getByText("Edytuj")
        }).not.toThrow();
    });

    it('shows pause button', () => {
        const { getByText } = render(<EditableTimebox />);
        expect( () => {
            getByText("Pauzuj")
        }).not.toThrow();
    });

    it('allows editing current timebox', () => {
        const { debug, getByText } = render(<EditableTimebox />);
        fireEvent.click(getByText("Zacznij"));
        fireEvent.click(getByText(/Pauzuj/));
        fireEvent.click(getByText("Wznów"));
        expect( () => {
            getByText("Pauzuj")
        }).not.toThrow();
    });

    it('changes title on edit and confirm', () => {
        const { debug, getByText, getByLabelText } = render(<EditableTimebox />);
        let titleInput = getByLabelText("Co robisz?");
        console.log(titleInput.value)
        fireEvent.click(getByText("Zacznij"));
        fireEvent.click(getByText("Edytuj"));
        fireEvent.change( titleInput, { target: { value: 'Zmieniony tytuł' } });
        fireEvent.click(getByText(/Zatwierdź/));
        console.log(titleInput.value)
        debug();
        expect(titleInput.value).toEqual('Zmieniony tytuł');
    });
})