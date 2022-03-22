import React from 'react';

/**
 * Marker for Google Maps
 * @param {string} color Color of the marker
 * @param {JSX.Element} children Any HTML/JSX based element to be enumerated
 * @param {function} onClick Callback when marker is clicked 
 * @returns An JSX.Element
 */
export const Marker = ({color, children, onClick}) => {
    return (
        <div style={{width: 20, height: 20, backgroundColor: color, borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center"}} onClick={onClick}>
            {children}
        </div>
    )
}