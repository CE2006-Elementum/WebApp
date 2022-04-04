import React, { useState } from 'react';
import { Button } from './InputField';

import { labels } from '../Utils/Enums.jsx';

/**
 * Returns a button that enables a filter function
 * @component
 * @author Zhi Heng
 * @param {Object} props Component props
 * @param {string} props.displayName The encoded verison of the actual name to display
 * @param {function} props.onClickHandler The function to handle the onclick event
 * @returns {JSX.Element} A JSX.Element
 */
function Filter({displayName, onClickHandler}) {
    const [active, setActive] = useState(false);

    /**
     * Toggles the color
     */
    const toggle = () => {
        setActive(state => !state);
    };

    /**
     * Searches labels enum for the actual display name
     * @returns Label name for the enc
     */
    const actualName = () => {
        return labels.find(item => item.enc === displayName).label
    }

    return (
        <div className="filter" style={{display: "flex", flexDirection: "row", flexWrap: "wrap", padding: 5}}>
            <Button
                innerHTML={actualName()}
                buttonStyles={
                    active ? {
                        height: 25,
                        padding: 15,
                        fontSize: 20,
                        backgroundColor: "rgb(142, 142, 142)",
                        border: "none",
                        borderRadius: 10,
                        color: "var(--font-color-light)",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center"
                    } : {
                        height: 25,
                        padding: 15,
                        fontSize: 20,
                        backgroundColor: "#73B4F0",
                        border: "none",
                        borderRadius: 10,
                        color: "var(--font-color-light)",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center"
                    }
                }
                onClickHandler={(e) => {
                    e.preventDefault();
                    onClickHandler(displayName);
                    toggle();
                }}
            />
        </div>
    )
}

export default Filter;