import React, { useState } from 'react';

/**
 * Custom Accordion
 * @component
 * @author Zhi Heng
 * @param {Object} props Component props
 * @param {string} props.data Header for the accordion
 * @param {object} props.styles Styling of the accordion
 * @param {JSX.Element} props.children Elements to be display when accordion is open
 * @returns {JSX.Element} An JSX.Element
 */

function Accordion({data, styles, children}) {
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

export default Accordion;