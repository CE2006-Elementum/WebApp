import React, { useEffect, useMemo, useState } from 'react';
import GoogleMap from 'google-map-react';
import { fetchGMapsAPIKey } from '../Utils/Fetch';

/**
 * Google Map Component
 * @param {Geography} defaultCenter Location that is focused on load
 * @param {Integer} defaultZoom Default Zoom level on load
 * @param {Geography} center Location to be focused
 * @param {Interger} zoom Zoom level
 * @param {JSX.Element} children Any HTML/JSX based element to be enumerated
 * @returns An JSX.Element
 */
export default function GMap({defaultCenter, defaultZoom, center, zoom, children}) {
    const [apiKey, setAPIKey] = useState();

    /**
     * On load fetch API key
     */
    useEffect(() => {
        fetchGMapsAPIKey().then(response => {
            if(response.status === 200)
                return response.json();
        }).then(response => {
            setAPIKey(response);
        })
    }, [])

    /**
     * To prevent uneccessary reloading of the Google Map component
     */
    const map = useMemo(() => {
        return (
        <GoogleMap
            bootstrapURLKeys={{key: apiKey}}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            center={center}
            zoom={zoom}
            yesIWantToUseGoogleMapApiInternals
        >
            {children}
        </GoogleMap>
        )
    }, [center, zoom, apiKey, children, defaultCenter, defaultZoom]);

    return (
        <div style={{display: "flex", height: "100%"}}>{map}</div>
    )
}