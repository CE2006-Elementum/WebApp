import React, { useEffect, useMemo, useState } from 'react';
import GoogleMap from 'google-map-react';
import { fetchGMapsAPIKey } from '../Utils/Fetch';

/**
 * Google Map Component
 * @component
 * @author Zhi Heng
 * @param {object} props Component props
 * @param {Geography} props.defaultCenter Location that is focused on load
 * @param {number} props.defaultZoom Default Zoom level on load
 * @param {Geography} props.center Location to be focused
 * @param {number} props.zoom Zoom level
 * @param {JSX.Element} props.children Any HTML/JSX based element to be enumerated
 * @returns {JSX.Element} An JSX.Element
 */
function GMap({defaultCenter, defaultZoom, center, zoom, children}) {
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

export default GMap;