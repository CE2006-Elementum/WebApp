import React from 'react';

/**
 * A scrollable list component
 * @param {JSX.Element} children Any HTML/JSX based element to be enumerated
 * @param {Array} data An array of simple data that can be iterated over and displayed
 */
export default function ScrollableList({children, data}){
    return (
        <div className="scrollable-list" style={{display: "flex", overflowY: "scroll", flexDirection: "column", maxHeight: 700}}>
            {children ? children : data.map((item, index) => {
                return (
                    <div key={index + item}>
                        <span>item</span>
                    </div>
                )
            })}
        </div>
    )
}