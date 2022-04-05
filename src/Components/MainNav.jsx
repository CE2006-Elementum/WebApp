import React from 'react';

/**
 * Top of page navigation
 * @component
 * @author Zhi Heng
 * @param {object} props Component props
 * @param {object} props.data Data to be iterated over for display
 * @returns {JSX.Element} An JSX.Element
 */
function MainNav({data}) {
    return (
        <nav style={{display: "flex", justifyContent: "center", position: "absolute", width: "100%", zIndex: 100}}>
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

export default MainNav;