import React from 'react';

/**
 * Top of page navigation
 * @param {Object} data Data to be iterated over for display
 * @returns An JSX.Element
 */
export default function MainNav({data}) {
    return (
        <nav style={{display: "flex", justifyContent: "center", position: "absolute", width: "100%", zIndex: 10}}>
            {
                data.map((item) => {
                    return (
                        item
                    )
                })
            }
        </nav>
    )
}