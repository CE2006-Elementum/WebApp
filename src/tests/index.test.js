import React from 'react';
import { render, fireEvent, screen, cleanup, waitFor, prettyDOM } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';

import App from '../App.js';
import { server } from './mockserver.jsx';
import { act } from 'react-dom/test-utils';
import LocationFinder from '../Routes/LocationFinder.jsx';
import { searchRes } from './testdata.jsx';

let history;

beforeAll(() => server.listen());
beforeEach(() => {
    history = createMemoryHistory();
    history.push = jest.fn();
})
afterEach(() => {
    server.restoreHandlers();
    cleanup();
});
afterAll(() => server.close());
jest.setTimeout(15000);

describe("Landing page test suite", () => {
    it("Search - Should fail validation and receive no server response", async() => {
        render(<App history={history}/>);
        fireEvent.click(screen.getAllByText("Home")[0]); //Ensure we're on landing page
        const button = screen.getAllByLabelText(/searchButton/i)[0];
        const error = screen.getAllByLabelText(/searchError/i)[0];
    
        //START SIMULATING USER EVENT
        fireEvent.click(button);
        //END SIMULATING USER EVENT

        //START ASSERTION CHECKS
        expect(history.location.pathname).toEqual('/');
        expect(error).toHaveTextContent("Please check if you've filled in all fields.");
        //END ASSERTION CHECKS
    });

    it("Search - Should receive a response from the server but no results", async() => {
        render(<App history={history}/>);
        fireEvent.click(screen.getAllByText("Home")[0]); //Ensure we're on landing page
        const accordions = screen.getAllByLabelText(/accordion/i);
        const button = screen.getAllByLabelText(/searchButton/i)[0];
    
        //START SIMULATING USER EVENT
        fireEvent.change(screen.getAllByLabelText(/address1/i)[0], {
            target: {value: "119A Rivervale Drive"}
        });
        accordions.forEach(item => {
            fireEvent.click(item)
        });    
        fireEvent.click(screen.getAllByLabelText(/Parks/i)[0]);
        fireEvent.click(screen.getAllByLabelText(/Bus Stops/i)[0]);
        fireEvent.click(screen.getAllByLabelText(/Clinics/i)[0]);    
        fireEvent.click(screen.getAllByLabelText(/Primary/i)[0]);
        fireEvent.click(screen.getAllByLabelText(/5-Room/i)[0]);
        fireEvent.change(screen.getAllByLabelText(/Floors/i)[0], {
            target: {value: 20}
        });
        fireEvent.change(screen.getAllByLabelText(/FAsqm/i)[0], {
            target: {value: 150}
        });
        fireEvent.change(screen.getAllByLabelText(/Price/i)[0], {
            target: {value: 0.1}
        });
        fireEvent.change(screen.getAllByLabelText(/Range/i)[0], {
            target: {value: 0.5}
        });
        //END SIMULATION OF USER EVENT
    
        //START ASSERTION CHECKS
        expect(screen.getAllByLabelText(/address1/i)[0]).toHaveDisplayValue("119A Rivervale Drive");
        expect(screen.getAllByLabelText(/Parks/i)[0].checked).toBeTruthy();
        expect(screen.getAllByLabelText(/Bus Stops/i)[0].checked).toBeTruthy();
        expect(screen.getAllByLabelText(/Clinics/i)[0].checked).toBeTruthy();
        expect(screen.getAllByLabelText(/Primary/i)[0].checked).toBeTruthy();
        expect(screen.getAllByLabelText(/5-Room/i)[0].checked).toBeTruthy();
        expect(screen.getAllByLabelText(/Floors/i)[0]).toHaveDisplayValue(20);
        expect(screen.getAllByLabelText(/FAsqm/i)[0]).toHaveDisplayValue(150);
        expect(screen.getAllByLabelText(/Price/i)[0]).toHaveDisplayValue(0.1);
        expect(screen.getAllByLabelText(/Range/i)[0]).toHaveDisplayValue(0.5);

        fireEvent.click(button); //SIMULATE FORM SUBMISSION
        await act(async() => {
            expect(await screen.findByText("Sorry our search algorithm returned no results! Try refining your search criteria!")).toBeInTheDocument();
            //END ASSERTION CHECKS
        });
    });

    it("Search - Should receive a response from the server with results", async() => {
        render(<App history={history}/>);
        fireEvent.click(screen.getAllByText("Home")[0]); //Ensure we're on landing page
        const accordions = screen.getAllByLabelText(/accordion/i);
        const button = screen.getAllByLabelText(/searchButton/i)[0];
    
        //START SIMULATING USER EVENT
        fireEvent.change(screen.getAllByLabelText(/address1/i)[0], {
            target: {value: "Yishun Station"}
        });
        accordions.forEach(item => {
            fireEvent.click(item)
        });    
        fireEvent.click(screen.getAllByLabelText(/Parks/i)[0]);
        fireEvent.click(screen.getAllByLabelText(/Preschool & Childcare/i)[0]); 
        fireEvent.click(screen.getAllByLabelText(/Primary/i)[0]);        
        fireEvent.click(screen.getAllByLabelText(/1-Room/i)[0]);
        fireEvent.click(screen.getAllByLabelText(/2-Room/i)[0]);
        fireEvent.click(screen.getAllByLabelText(/3-Room/i)[0]);
        fireEvent.click(screen.getAllByLabelText(/4-Room/i)[0]);
        fireEvent.click(screen.getAllByLabelText(/5-Room/i)[0]);
        fireEvent.change(screen.getAllByLabelText(/Floors/i)[0], {
            target: {value: 25}
        });
        fireEvent.change(screen.getAllByLabelText(/FAsqm/i)[0], {
            target: {value: 150}
        });
        fireEvent.change(screen.getAllByLabelText(/Price/i)[0], {
            target: {value: 2.0}
        });
        fireEvent.change(screen.getAllByLabelText(/Range/i)[0], {
            target: {value: 0.5}
        });
        //END SIMULATION OF USER EVENT
    
        //START ASSERTION CHECKS
        expect(screen.getAllByLabelText(/address1/i)[0]).toHaveDisplayValue("Yishun Station");
        expect(screen.getAllByLabelText(/Parks/i)[0].checked).toBeTruthy();
        expect(screen.getAllByLabelText(/Preschool & Childcare/i)[0].checked).toBeTruthy();
        expect(screen.getAllByLabelText(/Primary/i)[0].checked).toBeTruthy();
        expect(screen.getAllByLabelText(/1-Room/i)[0].checked).toBeTruthy();
        expect(screen.getAllByLabelText(/2-Room/i)[0].checked).toBeTruthy();
        expect(screen.getAllByLabelText(/3-Room/i)[0].checked).toBeTruthy();
        expect(screen.getAllByLabelText(/4-Room/i)[0].checked).toBeTruthy();
        expect(screen.getAllByLabelText(/5-Room/i)[0].checked).toBeTruthy();
        expect(screen.getAllByLabelText(/Floors/i)[0]).toHaveDisplayValue(25);
        expect(screen.getAllByLabelText(/FAsqm/i)[0]).toHaveDisplayValue(150);
        expect(screen.getAllByLabelText(/Price/i)[0]).toHaveDisplayValue(2.0);
        expect(screen.getAllByLabelText(/Range/i)[0]).toHaveDisplayValue(0.5);

        fireEvent.click(button); //SIMULATE FORM SUBMISSION
        setTimeout(async() => {
            await waitFor(() => {
                expect(screen.getByLabelText(/search-result-container/i)).toBeInTheDocument();
            });
            expect(screen.getByText("Here are the locations that we have found!")).toBeInTheDocument();
        }, 1000);
        //END ASSERTION CHECKS
    });

    it("Valuation - Should fail validaiton and receive no server response", async() => {
        render(<App history={history}/>);
        fireEvent.click(screen.getAllByText("Home")[0]); //Ensure we're on landing page
        const button = screen.getAllByText("Calculate my property’s value")[0];
        const error = screen.getAllByLabelText(/valueError/i)[0];

        //START SIMULATING USER EVENT
        fireEvent.click(button);
        //END SIMULATING USER EVENT

        //START ASSERTION CHECKS
        expect(history.location.pathname).toEqual('/');
        expect(error).toHaveTextContent("Please check if you've filled in all fields.");
        //END ASSERTION CHECKS
    });

    it("Valuation - Should receive a response from the server", async() => {
        render(<App history={history}/>);

        fireEvent.click(screen.getAllByText("Home")[0]); //Ensure we're on landing page
        fireEvent.click(screen.getAllByLabelText(/Selected: slide item 2/i)[0]); //Ensure the valuation form is in view

        const button = screen.getAllByLabelText(/valuationButton/i)[0];

        //START SIMULATING USER EVENT
        fireEvent.change(screen.getAllByLabelText(/address2/i)[0], {
            target: {value: "119A Rivervale Drive"}
        });
        fireEvent.change(screen.getAllByLabelText(/floorArea/i)[0], {
            target: {value: 130}
        });
        fireEvent.change(screen.getAllByLabelText(/flatType/i)[0], {
            target: {value: "5"}
        });
        //END SIMULATION USER EVENT

        //START ASSERTION CHECKS
        expect(screen.getAllByLabelText(/address2/i)[0]).toHaveDisplayValue("119A Rivervale Drive");
        expect(screen.getAllByLabelText(/floorArea/i)[0]).toHaveDisplayValue(130);
        expect(screen.getAllByLabelText(/flatType/i)[0]).toHaveDisplayValue("5-Room");

        fireEvent.click(button); //SIMULATE FORM SUBMISSION
        setTimeout(async() => {
            await act(async() => {
                expect(await screen.findByLabelText(/valuationText/)).toBeInTheDocument();
            });
            expect(screen.getByText(/Sold at: S$/i)).toBeInTheDocument();
        }, 1000);
        //END ASSERTION CHECKS
    });
});