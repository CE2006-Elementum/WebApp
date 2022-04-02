import React from 'react';

const PORT = 43325;
const SERVER = "http://127.0.0.1:" + PORT;

/**
 * Creates an HTTP request to the server with the form data
 * @param {*} data Form data
 * @returns Response from server
 */
export const fetchSearchRequest = async(data, url = "/search") => {
    const req = new Request(SERVER + url, {
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        },
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify(data)
    });
    return fetch(req);
}

/**
 * Creates an HTTP request to the server with the form data
 * @param {*} data Form data
 * @returns Response from server
 */
export const fetchValuationRequest = async(data, url = "/valuation") => {
    const req = new Request(SERVER + url, {
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data),
    });
    return fetch(req);
}

/**
 * Creates an HTTP request to the server to retrieve the API Key
 * @returns Google Map API Key
 */
export const fetchGMapsAPIKey = async(url = "/mapskey") => {
    const req = new Request(SERVER + url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "GET",
    });
    return fetch(req);
}

/**
 * Creates an HTTP request to the server to submit a contact us request
 * @param {*} data Form data
 * @returns Response from server
 */
export const postContactUs = async(data, url = "/feedbacks") => {
    const req = new Request(SERVER + url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
    });
    return fetch(req);
}