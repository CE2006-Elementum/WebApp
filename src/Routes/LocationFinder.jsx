import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Filter from '../Components/Filter';

import Map from '../Components/Map';
import { Marker } from '../Components/Marker';
import ScrollableList from '../Components/ScrollableList';

/**
 * Search result page for Location Finder Form
 * @returns A populated view
 */
export default function LocationFinder() {
    const { state } = useLocation();
    const [pos, setPos] = useState();
    const [zoom, setZoom] = useState(15);
    const blocks = useRef(state.blocks);
    const facilityMarkers = useRef(state.facilityMarkers);
    const factypes = useRef(state.factypes);
    const [filterOutFac, setFilterOutFac] = useState([]);

    const toggle = (toFilter) => {
        let fac = [...filterOutFac]
        if(filterOutFac.length === 0 || filterOutFac.find(item => item === toFilter) === undefined)
            fac.push(toFilter);
        else
            fac.pop(fac.findIndex(item => item === toFilter));
        setFilterOutFac(fac);
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
        setZoom(20);
    }

    return (
        <div aria-label="search-result-container" className="result-container" style={{display: "flex", flexDirection: "column", backgroundImage: "linear-gradient(to bottom, #F8F1E4, #FFFFFF)"}}>
            <div className="results" style={{display: "flex", flexDirection: "row", justifyContent: "center", width: "100%", marginTop: 100}}>
                <div className="results-list" style={{display: "flex", flexDirection: "column", flex: 1.5, padding: 20}}>
                    <div style={{display: "flex", padding: 20}}>
                        <span style={{fontSize: "48px"}}>{ blocks.current.length > 0 ? "Here are the locations that we have found!" : "Sorry our search algorithm returned no results! Try refining your search criteria!"}</span>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <address style={{padding: 15, fontWeight: 500}}>
                            Legend
                            <div style={{display: "flex", flexDirection: "row", padding: 5}}>
                                <div style={{width: 20, height: 20, backgroundColor: "#af5cd9", borderRadius: 10}}/>
                                <span style={{marginLeft: 5}}> - Blocks within search radius</span>
                            </div>
                            <div style={{display: "flex", flexDirection: "row", padding: 5}}>
                                <div style={{width: 20, height: 20, backgroundColor: "#FF5cd9", borderRadius: 10}}/>
                                <span style={{marginLeft: 5}}> - Facilities within search radius</span>
                            </div>
                        </address>
                    </div>
                    <div style={{display: "flex", flexDireciton: "row"}}>
                        <span style={{fontWeight: 500, padding: 15}}>Filter: 
                        { 
                            factypes.current.map(item => {
                                return <Filter key={item} displayName={item} onClickHandler={(e) => toggle(e)}/>
                            })
                        }
                        </span>
                    </div>
                        {
                            blocks.current.length > 0 ? <ScrollableList>
                                {
                                    blocks.current.map((item, index) => {
                                        return (
                                            <div key={item.block_info.basic.name} style={{border: "1px solid black", borderRadius: 5, backgroundImage: "linear-gradient(to right, #FBDDAD, #FFFFFF)",}} onClick={(e) => listItemClickHandler(item.block_info.basic.position.lat, item.block_info.basic.position.lon, e)}>
                                                <div style={{marginLeft: 10, padding: 5, display: "flex", flexDirection:"column"}}>
                                                    <span style={{fontSize: 28, fontWeight: 600, marginBottom: 10}}>{item.block_info.basic.name}</span>
                                                    <span style={{fontSize: 24, fontWeight: 600}}>Facilities</span>
                                                    <ul>
                                                        {
                                                            item.facility_info.length > 0 ? item.facility_info.map((facility, index) => {
                                                                return <li key={facility.info.name + item.block_info.basic.name}>{facility.info.name}</li>
                                                            }) : null
                                                        }
                                                    </ul>
                                                    <span>Proximate distance from starting location: {Math.round(item.block_info.distance * 100) / 100} km</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </ScrollableList> : null
                        }
                </div>
                <div className="google-map-container" id="gmap" style={{flex: 2, width: "100%", position: "relative", padding: 15, minHeight: "800px"}}>
                        <Map defaultCenter={{lat: 1.3521, lng: 103.8198}} defaultZoom={15} center={pos} zoom={zoom} mapStyle={{height: "100%", width: "100%"}}>
                            {
                                blocks.current.length > 0 ? blocks.current.map((item, index) => {
                                    return (
                                        <Marker key={index * item.block_info.basic.position.lat + item.block_info.basic.position.lon} color={"#af5cd9"} lat={item.block_info.basic.position.lat} lng={item.block_info.basic.position.lon}/>
                                    )
                                }) : null
                            }
                            {
                                facilityMarkers.current.length > 0 ? facilityMarkers.current.filter(item => !filterOutFac.includes(item.type)).map(item => {
                                    return <Marker key={item.lat + item.lng} color={"#FF5cd9"} lat={item.lat} lng={item.lng}/>
                                }) : null
                            }
                        </Map>
                </div>
            </div>
        </div>
    )
}