import React from 'react';
import { render, fireEvent, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils'

import App from '../App.js';
import { server } from './mockserver.jsx';

let history;

beforeAll(() => server.listen());
beforeEach(() => {
    history = createMemoryHistory();
    history.push = jest.fn();
});
afterEach(() => {
    server.restoreHandlers();
    cleanup();
});
afterAll(() => server.close());

jest.setTimeout(15000);

describe("Contact Us test suite", () => {
    
    it("Contact Us - Should receive a response from the server with results", async() => {
        render(<App history={history}/>);
        fireEvent.click(screen.getAllByText("Contact Us")[0]); //Ensure that we're on contact us page

        //START GET ALL HTML ELEMENTS
        const button = screen.getAllByText("SEND")[0];
        const firstName = screen.getAllByLabelText(/first_name/i)[0];
        const lastName = screen.getAllByLabelText(/last_name/i)[0];
        const mobile = screen.getAllByLabelText(/mobile/i)[0];
        const email = screen.getAllByLabelText(/email/i)[0];
        const role = screen.getAllByLabelText(/Buyer/i)[0];
        const msg = screen.getAllByLabelText(/message/i)[0];
        //END GET ALL HTML ELEMENTS

        //START SIMULATING USER EVENT
        fireEvent.change(firstName, {
            target: {value: "Zhi Heng"}
        });
        fireEvent.change(lastName, {
            target: {value: "Loh"}
        });
        fireEvent.change(mobile, {
            target: {value: "12345678"}
        });
        fireEvent.change(email, {
            target: {value: "zloh013@e.ntu.edu.sg"}
        });
        fireEvent.click(role);
        fireEvent.change(msg, {
            target: {value: "Test Message"}
        });
        //END SIMULATING USER EVENT

        //START ASSERTION CHECKS
        expect(firstName).toHaveDisplayValue("Zhi Heng");
        expect(lastName).toHaveDisplayValue("Loh");
        expect(mobile).toHaveDisplayValue("12345678");
        expect(email).toHaveDisplayValue("zloh013@e.ntu.edu.sg");
        expect(role).toBeChecked();
        expect(msg).toHaveDisplayValue("Test Message");
        fireEvent.click(button);

        setTimeout(async() => {
            await waitFor(async() => {
                expect(screen.getByLabelText(/contactError/i)).toHaveTextContent("Success");
            })
        }, 1000);
        //END ASSERTION CHECKS
    });
    
    it('Contact Us - Should not able to post to server as validation failed', async() => {
        render(<App history={history}/>);
        fireEvent.click(screen.getAllByText("Contact Us")[0]);
        const button = screen.getAllByText("SEND")[0];
        const lastName = screen.getAllByLabelText(/last_name/i)[0];
        const mobile = screen.getAllByLabelText(/mobile/i)[0];
        const email = screen.getAllByLabelText(/email/i)[0];
        const role = screen.getAllByLabelText(/Buyer/i)[0];
        const msg = screen.getAllByLabelText(/message/i)[0];

        //START SIMULATING USER EVENT
        fireEvent.change(lastName, {
            target: {value: "Loh"}
        });
        fireEvent.change(mobile, {
            target: {value: "12345678"}
        });
        fireEvent.change(email, {
            target: {value: "zloh013@e.ntu.edu.sg"}
        });
        fireEvent.click(role);
        fireEvent.change(msg, {
            target: {value: "Test Message"}
        });
        expect(lastName).toHaveDisplayValue("Loh");
        expect(mobile).toHaveDisplayValue("12345678");
        expect(email).toHaveDisplayValue("zloh013@e.ntu.edu.sg");
        expect(role).toBeChecked();
        expect(msg).toHaveDisplayValue("Test Message");
        fireEvent.click(button);
        //END SIMULATING USER EVENT
        
        setTimeout(async() => {
            await act(async() => {
                expect(await screen.findByLabelText(/contactError/i)).toHaveTextContent("Please ensure that all fields are filled!");
            });
        }, 1000);
    });
})