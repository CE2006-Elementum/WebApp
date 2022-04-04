import React from 'react';

/**
 * Marker for Google Maps
 * @component
 * @author Zhi Heng
 * @param {object} props Component props
 * @param {string} props.color Color of the marker
 * @param {JSX.Element} props.children Any HTML/JSX based element to be enumerated
 * @param {function} props.onClick Callback when marker is clicked 
 * @returns {JSX.Element} An JSX.Element
 */
const Marker = ({color, children, onClick}) => {
    return (
        <div style={{width: 20, height: 20, backgroundColor: color, borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center"}} onClick={onClick}>
            {children}
        </div>
    )
}

export { Marker };