import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Marker } from '../Components/Marker';
import Map from '../Components/Map';
import ScrollableList from '../Components/ScrollableList';
import { valuationTemp } from '../Utils/Enums';

export default function Valuation() {
    const { state } = useLocation();
    const property = useRef(valuationTemp);
    const [pos, setPos] = useState();
    const [zoom, setZoom] = useState(15);
    const [loading, setLoading] = useState(true);

    /**
     * Runs onload
     */
    useEffect(() => {
        subscriber();
        return () => {}
    }, [state]);

    
    const subscriber = () => {
        if(state.data.nearby_valuations.length > 0) {
            property.current = state.data;
            setPos(() => property.current ? {lat: property.current.position.lat, lng: property.current.position.lon} : null);
        }
        setLoading(false);
    };

    /**
     * Handles on click of list item
     * @param {*} newLat Latitude of the block
     * @param {*} newLng Longitude of the block
     * @param {*} e Just to prevent random default behaviors
     */
    const listItemClickHandler = (newLat, newLng, e) => {
        e.preventDefault();
        setPos({lat: newLat, lng: newLng});
        setZoom(20);
    }

    return (
        loading ? null :
        <div aria-label="valuation-result-container" className="result-container" style={{display: "flex", flexDirection: "column", backgroundImage: "linear-gradient(to bottom, #F8F1E4, #FFFFFF)"}}>
            <div className="results" style={{display: "flex", flexDirection: "row", justifyContent: "center", width: "100%", marginTop: 100}}>
                <div className="results-list" style={{display: "flex", flexDirection: "column", flex: 1.5, padding: 20}}>
                    <div style={{display: "flex", padding: 20}}>
                        <span aria-label="valuationText" style={{fontSize: "48px"}}>{ property.current ? "Your property's estimated valuation is.... S$" + Math.round(property.current.valuation * 100) / 100 + " million": "Sorry our search algorithm returned no results! Try refining your search criteria!"}</span>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <address style={{padding: 15, fontWeight: 500}}>
                            Legend
                            <div style={{display: "flex", flexDirection: "row", padding: 5}}>
                                <div style={{width: 20, height: 20, backgroundColor: "rgb(237 46 99)", borderRadius: 10}}/>
                                <span style={{marginLeft: 5}}> - Your property</span>
                            </div>
                            <div style={{display: "flex", flexDirection: "row", padding: 5}}>
                                <div style={{width: 20, height: 20, backgroundColor: "#af5cd9", borderRadius: 10}}/>
                                <span style={{marginLeft: 5}}> - Properties within search radius</span>
                            </div>
                        </address>
                    </div>                    
                    <ScrollableList>
                        {
                            property.current.nearby_valuations.map((item, index) => {
                                return (
                                    <div key={item.block.name} style={{border: "1px solid black", borderRadius: 5, backgroundImage: "linear-gradient(to right, #FBDDAD, #FFFFFF)",}} onClick={(e) => listItemClickHandler(item.block.position.lat, item.block.position.lon, e)}>
                                        <div style={{marginLeft: 10, padding: 5, display: "flex", flexDirection:"column"}}>
                                            <span style={{fontSize: 28, fontWeight: 600, marginBottom: 10}}>{item.block.name}</span>                                            
                                            <span>Sold at: S${Math.round(item.valuation * 100) / 100} million</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </ScrollableList>                    
                </div>
                <div className="google-map-container" id="gmap" style={{flex: 2, width: "100%", position: "relative", padding: 15, minHeight: "800px"}}>
                        <Map defaultCenter={{lat: 1.3521, lng: 103.8198}} defaultZoom={15} center={pos} zoom={zoom} mapStyle={{height: "100%", width: "100%"}}>
                            <Marker color={"rgb(237 46 99)"} lat={property.current.position.lat} lng={property.current.position.lon}/>
                            {
                                property.current.nearby_valuations.map((item, index) => {
                                    return (
                                        <Marker key={index * item.block.position.lat + item.block.position.lon} color={"#af5cd9"} lat={item.block.position.lat} lng={item.block.position.lon}/>
                                    )
                                })
                            }
                        </Map>
                </div>
            </div>
        </div>
    )
}