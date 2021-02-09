import {render, cleanup, fireEvent} from '@testing-library/react';
import React from 'react';
import EditableTimebox from '../../components/EditableTimebox';

describe('<EditableTimebox />', () => {
    afterEach(cleanup);
    it('shows edit button', () => {
        const { debug, getByText } = render(<EditableTimebox />);
        
        debug();
        expect( () => {
            getByText("Edytuj")
        }).not.toThrow();
    });

    it('shows pause button', () => {
        const { debug, getByText } = render(<EditableTimebox />);
        expect( () => {
            getByText("Pauzuj")
        }).not.toThrow();
    });

    it('allows editing current timebox', () => {
        const { debug, getByText } = render(<EditableTimebox />);
        fireEvent.click(getByText("Zacznij"));
        fireEvent.click(getByText(/Pauzuj/));

        debug();
        fireEvent.click(getByText("Wznów"));
        expect( () => {
            getByText("Pauzuj")
        }).not.toThrow();
    });

})