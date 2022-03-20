import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Map from '../Components/Map';
import { Marker } from '../Components/Marker';
import ScrollableList from '../Components/ScrollableList';

export default function LocationFinder() {
    const [pos, setPos] = useState();
    const { state } = useLocation();
    let facilities = [];
    let blocks = [];
    let facilityMarkers = [];

    /**
     * Transforms the data received from the server
     */
    const subscriber = () => {
        const data = {...state.data}; //Shallow copy
        data.blocks.forEach(block => {
            facilities = [];
            block.facilities.forEach(facility => {
                if(facilities.length === 0 || facilities.find(item => item.id === facility) === undefined)
                    facilities.push({id: facility, info: data.facility_info[facility]});
            });
            blocks.push({block_info: block, facility_info: facilities});
        })
        blocks.forEach(item => {
            item.facility_info.forEach(facility => {
                 if(facilityMarkers.length === 0 || facilityMarkers.find(item => item.id === facility.id) === undefined)
                     facilityMarkers.push({id: facility.id, lat: facility.info.position.lat, lng: facility.info.position.lon});
            })
         })
    }
    
    /**
     * Handles on click of list item
     * @param {*} newLat Latitude of the block
     * @param {*} newLng Longitude of the block
     * @param {*} e Just to prevent random default behaviors
     */
    const listItemClickHandler = (newLat, newLng, e) => {
        e.preventDefault();
        setPos({lat: newLat, lng: newLng});
    }

    subscriber();
    return (
        <div className="result-container" style={{display: "flex", flexDirection: "column", backgroundImage: "linear-gradient(to bottom, #F8F1E4, #FFFFFF)"}}>
            <div className="results" style={{display: "flex", flexDirection: "row", justifyContent: "center", width: "100%", marginTop: 100}}>
                <div className="results-list" style={{display: "flex", flexDirection: "column", flex: 1.5, padding: 20}}>
                    <div style={{display: "flex", padding: 20}}>
                        <span style={{fontSize: "48px"}}>{ blocks.length > 0 ? "Here are the locations that we have found!" : "Sorry our search algorithm returned no results! Try refining your search criteria!"}</span>
                    </div>
                    <ScrollableList>
                        {
                            blocks.map((item, index) => {
                                return (
                                    <div key={item.block_info.basic.name} style={{border: "1px solid black", borderRadius: 5, backgroundImage: "linear-gradient(to right, #FBDDAD, #FFFFFF)",}} onClick={(e) => listItemClickHandler(item.block_info.basic.position.lat, item.block_info.basic.position.lon, e)}>
                                        <div style={{marginLeft: 10, padding: 5, display: "flex", flexDirection:"column"}}>
                                            <span style={{fontSize: 28, fontWeight: 600, marginBottom: 10}}>{item.block_info.basic.name}</span>
                                            <span style={{fontSize: 24, fontWeight: 600}}>Facilities</span>
                                            <ul>
                                                {
                                                    item.facility_info.map(facility => {
                                                        return <li key={facility.info.name + item.block_info.basic.name}>{facility.info.name}</li>
                                                    })
                                                }
                                            </ul>
                                            <span>Proximate distance from starting location: {item.block_info.distance} km</span>
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
                                blocks.map(item => {
                                    return (
                                        <Marker color={"#af5cd9"} lat={item.block_info.basic.position.lat} lng={item.block_info.basic.position.lon}/>
                                    )
                                })
                            }
                            {
                                facilityMarkers.map(item => {
                                    return (
                                        <Marker color={"#FF5cd9"} lat={item.lat} lng={item.lng}/>
                                    )
                                })
                            }
                        </Map>
                </div>
            </div>
        </div>
    )
}