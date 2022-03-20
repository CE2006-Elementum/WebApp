import React, { useEffect, useMemo, useState } from 'react';
import GoogleMap from 'google-map-react';
import { fetchGMapsAPIKey } from '../Utils/Fetch';

export default function GMap({defaultCenter, center, zoom, children}, props) {
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
            center={center}
            zoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            
        >
            {children}
        </GoogleMap>
        )
    }, [center, zoom, apiKey, children, defaultCenter]);

    return (
        <div style={{display: "flex", height: "100%"}}>{map}</div>
    )
}