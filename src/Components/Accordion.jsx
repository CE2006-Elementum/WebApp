import React, { useState } from 'react';

/**
 * Custom Accordion
 * @returns An JSX.Element
 */
export default function Accordion({data, styles, children}) {
    const [isActive, setIsActive] = useState(false);
    
    return (
        <div className="accordion" style={styles}>
            <div aria-label="accordion" className="accordion-inner" onClick={() => setIsActive(state => !state)} style={{display: "flex", flexDirection: "row", alignItems: "center",}}>
                <img src={isActive ? require("../assets/338480868e61d1e05e911c696f3502dd.png") : require("../assets/338480868e61d1e05e911c696f3502dd.png")} alt={isActive ? "Accordion Expand" : "Accordion Collapse"} style={{transform: isActive ? "rotate(180deg)" : null, height: "15px", width: "15px"}}/>
                <h4 className="accordion-title" style={{padding: 5, fontWeight: 500}}>{data.title}</h4>
            </div>
            {isActive && children}
        </div>
    );
}