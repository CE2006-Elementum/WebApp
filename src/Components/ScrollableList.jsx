import React from 'react';

/**
 * A scrollable list component
 * @component
 * @author Zhi Heng
 * @param {object} props Component props
 * @param {JSX.Element} propschildren Any HTML/JSX based element to be enumerated
 * @param {object} props.data An array of simple data that can be iterated over and displayed
 * @return {JSX.Element} An JSX Element
 */
function ScrollableList({children, data}){
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
export default ScrollableList;