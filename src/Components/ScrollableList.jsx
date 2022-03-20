import React from 'react';

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