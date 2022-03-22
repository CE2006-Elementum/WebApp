import React from 'react';
import { Carousel as CarouselC } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

/**
 * Custom JS carousel
 * @returns An JSX.Element
 */
export default function Carousel({imageList, imgHeight, children, showArrows, renderIndicator, dynamicHeight}) {

    /**
     * Custom arrow element
     * @param {*} clickHandler Predefined
     * @param {*} hasNext Predefined
     * @param {*} label Predefined
     * @returns An JSX.Element
     */
    const customRenderNextArrow = (clickHandler, hasNext, label) => {
        return showArrows ? <div onClick={clickHandler} title={label} style={{position: 'absolute', zIndex: 2, top: 'calc(50% - 15px)', width: 30, height: 30, right: 15}}>
            <img src={require("../assets/db474e2803660d679789b4a6c20689bb.png")} alt="Next"/>
        </div> : null
    }

    /**
     * Custom arrow element
     * @param {*} clickHandler Predefined
     * @param {*} hasNext Predefined
     * @param {*} label Predefined
     * @returns An JSX.Element
     */
    const customRenderPrevArrow = (clickHandler, hasNext, label) => {
        return showArrows ? <div onClick={clickHandler} title={label} style={{position: 'absolute', zIndex: 2, top: 'calc(50%)', width: 30, height: 30, left: 15}}>
            <img src={require("../assets/9a92df5583b2c2b4c8674728e44c2a79.png")} alt="Previous"/>
        </div> : null
    }

    return (
        <div className="Carousel-container" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <CarouselC 
                showThumbs={false} 
                infiniteLoop
                showStatus={false} 
                renderArrowNext={(clickHandler, hasNext, label) => customRenderNextArrow(clickHandler, hasNext, label)} 
                renderArrowPrev={(clickHandler, hasNext, label) => customRenderPrevArrow(clickHandler, hasNext, label)}
                renderIndicator={renderIndicator}
                dynamicHeight={dynamicHeight && true}
            >
            {
                imageList ? imageList.map(item => { 
                    return (
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", height:imgHeight}} key={item.image}>
                            <img src={item.image} alt="Carousel"/>
                        </div>  
                    );

                }) : children
            }
            </CarouselC>
        </div>
    );
}