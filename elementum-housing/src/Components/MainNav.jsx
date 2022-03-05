import React from 'react';

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