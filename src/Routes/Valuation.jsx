import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Marker } from '../Components/Marker';
import Map from '../Components/Map';
import ScrollableList from '../Components/ScrollableList';

export default function Valuation() {
    const { state } = useLocation();
    const [pos, setPos] = useState();
    const property = state.data;

    const listItemClickHandler = (newLat, newLng, e) => {
        e.preventDefault();
        setPos({lat: newLat, lng: newLng});
    }

    return (
        <div className="result-container" style={{display: "flex", flexDirection: "column", backgroundImage: "linear-gradient(to bottom, #F8F1E4, #FFFFFF)"}}>
            <div className="results" style={{display: "flex", flexDirection: "row", justifyContent: "center", width: "100%", marginTop: 100}}>
                <div className="results-list" style={{display: "flex", flexDirection: "column", flex: 1.5, padding: 20}}>
                    <div style={{display: "flex", padding: 20}}>
                        <span style={{fontSize: "48px"}}>{ property ? "Your property's estimated valuation is.... S$" + property.valuation + " million": "Sorry our search algorithm returned no results! Try refining your search criteria!"}</span>
                    </div>
                    <ScrollableList>
                        {
                            property.nearby_valuations.map((item, index) => {
                                return (
                                    <div key={item.block.name} style={{border: "1px solid black", borderRadius: 5, backgroundImage: "linear-gradient(to right, #FBDDAD, #FFFFFF)",}} onClick={(e) => listItemClickHandler(item.block.position.lat, item.block.position.lon, e)}>
                                        <div style={{marginLeft: 10, padding: 5, display: "flex", flexDirection:"column"}}>
                                            <span style={{fontSize: 28, fontWeight: 600, marginBottom: 10}}>{item.block.name}</span>                                            
                                            <span>Sold at: S${item.valuation} million</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </ScrollableList>
                </div>
                <div className="google-map-container" id="gmap" style={{flex: 2, width: "100%", position: "relative", padding: 15, minHeight: "800px"}}>
                        <Map defaultCenter={{lat: 1.3521, lng: 103.8198}} center={pos} zoom={15} mapStyle={{height: "100%", width: "100%"}}>
                            {
                                property.nearby_valuations.map(item => {
                                    return (
                                        <Marker color={"#af5cd9"} lat={item.block.position.lat} lng={item.block.position.lon}/>
                                    )
                                })
                            }
                        </Map>
                </div>
            </div>
        </div>
    )
}