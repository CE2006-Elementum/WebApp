import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';

import Accordion from '../Components/Accordion';
import Carousel from '../Components/Carousel';
import { DropDown, TextField, Button, RangeSlider, CheckBox } from '../Components/InputField';
import { flatType, carouselLanding, carouselInfo, accordionInfo, rangeMarks, search, valuation } from '../Utils/Enums';
import { fetchSearchRequest, fetchValuationRequest } from '../Utils/Fetch';

/**
 * Landing screen / Home screen
 * @component
 * @author Zhi Heng
 * @return A populated view
 */
export default function Index(){
    const navigate = useNavigate();
    const [searchForm, setSearchForm] = useState({...search});
    const [valuationForm, setValuationForm] = useState({...valuation});
    const [error, setError] = useState({search: "", valuation: ""});
    let facilities = [];
    let blocks = [];
    let facilityMarkers = [];
    let property = [];
    let factypes = [];

    /**
     * Custom Carousel Indicator for form selection
     * @component
     * @author Zhi Heng
     * @param {fuction} clickHandler Predefined, do not change
     * @param {boolean} isSelected Predefined, do not change
     * @param {number} index Predefined, do not change
     * @param {string} label Predefined, do not change
     * @returns An JSX Element
     */
    const customIndicator = (clickHandler, isSelected, index, label) => {
        const selected = isSelected ? "var(--font-color-active)" : "var(--font-color-inactive)";
        return (
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <div onClick={clickHandler} aria-label={`Selected: ${label} ${index + 1}`} title={`Selected: ${label} ${index + 1}`} style={{display: "flex", justifyContent: "center", color: selected, margin: 5}}>
                    <h2 className="form-selector">{ index === 0 ? "Search" : "Valuation"}</h2>
                </div>
                {index % 2 === 0 ? <div className="divider" style={{width: 2, height: "60px", backgroundColor: "var(--font-color-active)", justifySelf: "center"}}></div> :  null}
            </div>
        );
    }

    /**
     * Location Finder Form Handler to prepare the request that is to be sent on click
     * @author Zhi Heng
     * @param {object} e Value for which to be updated
     * @param {string} key Key for which the value is to be updated
     */
    const updateLocationFinderForm = (e, key) => {
        const keySplit = key.split('.'); //Splits all keys to be used
        const shallowCopy = {...searchForm}; //Shallow copying
        const keys = Object.keys(shallowCopy.search); //Get all keys
        const index = keys.indexOf(keySplit[0]); //Get index of matching key
        const secondaryKeys = Object.keys(shallowCopy.search[keys[index]]); //Get all secondary keys
        const secondaryIndex = secondaryKeys.indexOf(keySplit[1]); //Get index of matching secondary key
        if(keySplit.length === 2) {
            if(typeof(shallowCopy.search[keys[index]][secondaryKeys[secondaryIndex]]) === "object") { //Checks if the typeof the key-value pair is an object
                if(shallowCopy.search[keys[index]][secondaryKeys[secondaryIndex]].indexOf(e) === -1)
                    shallowCopy.search[keys[index]][secondaryKeys[secondaryIndex]].push(e);
                else shallowCopy.search[keys[index]][secondaryKeys[secondaryIndex]].pop(shallowCopy.search[keys[index]][secondaryKeys[secondaryIndex]].indexOf(e));
            }
            else shallowCopy.search[keys[index]][secondaryKeys[secondaryIndex]] = e;
        } else if(keySplit.length === 3) {
            const tertiaryKeys = Object.keys(shallowCopy.search[keys[index]][secondaryKeys[secondaryIndex]]); //Get all tertiary keys
            const tertiaryIndex = tertiaryKeys.indexOf(keySplit[2]); //Get index of matching tertiary key
            if(typeof(shallowCopy.search[keys[index]][secondaryKeys[secondaryIndex]][tertiaryKeys[tertiaryIndex]]) === "object") //Checks if the typeof the key-value pair is an object
                shallowCopy.search[keys[index]][secondaryKeys[secondaryIndex]][tertiaryKeys[tertiaryIndex]].push(e);
            else shallowCopy.search[keys[index]][secondaryKeys[secondaryIndex]][tertiaryKeys[tertiaryIndex]] = e;
        }
        setSearchForm(shallowCopy);
    }

    /**
     * Valuation Form Handler to prepare the request that is to be sent on click
     * @author Zhi Heng
     * @param {*} e Value for which to be updated
     * @param {string} key Key for which the value is to be updated
     */
    const updateValuationForm = (e, key) => {
        const shallowCopy = {...valuationForm}; //Shallow copying
        const keys = Object.keys(shallowCopy.valuation); //Get all keys
        const index = keys.indexOf(key); //Get index of matching key
        shallowCopy.valuation[keys[index]] = e;
        setValuationForm(shallowCopy);
    }

    /**
     * Performs a validation on searchForm to ensure that all fields are filled. Then, proceeds to fetch data from the server.
     * @author Zhi Heng
     * @returns Nothing, only to cause navigation on success, else it'll display an error message.
     */
    const submitSearch = async() => {
        setError({...error, search: ""});
        if(searchForm.search.roi.center === null || searchForm.search.roi.center === ""
            || searchForm.search.roi.radius === 0.0 || searchForm.search.facilities.musthave.length <= 0) {
            setError({...error, search: "Please check if you've filled in all fields."});
            return;
        }
        const holder = {...searchForm.search};
        setSearchForm({...searchForm});
        fetchSearchRequest(holder).then(response => {
            if(response.status === 200) {
                return response.json();
            }
            else {
                setError({...error, search: "Error! " + response.status + ". Error details: " + response.statusText + ". Please contact our support team!"});
                return null;
            }
        }).then(response => {
            if(response !== null) {
                subscriberSearch(response);
                navigate('/locationfinder', {state: {blocks, facilities, facilityMarkers, factypes}});
            }
        }).catch(error => {
            setError({...error, search: error});
        });
        setSearchForm({...searchForm});
    }

    /**
     * Performs a validation on searchForm to ensure that all fields are filled. Then, proceeds to fetch data from the server.
     * @author Zhi Heng
     * @returns Nothing, only to cause navigation on success, else it'll display an error message.
     */
    const submitValuation = async() => {
        setError({...error, valuation: ""});
        if(valuationForm.valuation.area <= 0 || valuationForm.valuation.location === null 
            || valuationForm.valuation.location === "") {
                setError({...error, valuation: "Please check if you've filled in all fields."});
                return;
        }
        const holder = {...valuationForm.valuation};
        setValuationForm({...valuationForm});
        fetchValuationRequest(valuationForm.valuation).then(response => {
            if(response.status === 200){
                return response.json();
            }
            else { 
               setError({...error, valuation: "Error! " + response.status + ". Error details: " + response.statusText + ". Please contact our support team!"});
               return null;
            }
        }).then(response => {
                if(response !== null) {
                    subscriberValuation(response);
                    navigate('/valuation', {state: {property}});
                }
        }).catch(error => {
            setError({...error, valuation: error});
        });
        setValuationForm({...valuationForm});
    };

    /**
     * Performs transformation of response from the server
     * @author Zhi Heng
     * @param {object} response Data received from server
     */
    const subscriberSearch = (response) => {
        blocks = [];
        if(response.blocks.length > 0) {
            const data = {...response}; //Shallow copy
            data.blocks.forEach(block => {
                facilities = [];
                block.facilities.forEach(facility => {
                    if(facilities.length === 0 || facilities.find(item => item.id === facility) === undefined)
                        facilities.push({id: facility, info: data.facility_info[facility]});
                });
                blocks.push({block_info: block, facility_info: facilities});
            });
            if(blocks[0].facility_info.length > 0) {
                facilityMarkers = [];
                blocks.forEach(item => {
                    item.facility_info.forEach(facility => {
                        if(facilityMarkers.length === 0 || facilityMarkers.find(item => item.id === facility.id) === undefined) {
                            facilityMarkers.push({id: facility.id, lat: facility.info.position.lat, lng: facility.info.position.lon, type: facility.info.factype});
                            if(factypes.length === 0 || factypes.find(item => item === facility.info.factype) === undefined)
                                factypes.push(facility.info.factype);
                        }
                    })
                });
            }
        }
    };

    /**
     * Performs transformation of response from the server
     * @author Zhi Heng
     * @param {object} response Data received from server
     */
    const subscriberValuation = (response) => {
        if(response.nearby_valuations.length > 0) {
            property = response;
        }
    };

    return (
        <div aria-label="container" className="container" style={{display: "flex", flexDirection: "column"}}>
            <Carousel showArrows={true}>
                {
                    carouselLanding.map(element => {
                        return (
                            <div className="carousel-image-inner" style={{display: "flex", flexDirection: "column", justifyContent: "center"}} key={element.image}>
                                <img className="landImg" src={element.image} alt="Carousel"/>
                                <div style={{width: "100%", position: "absolute", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <h1 className="landText-main" style={{color: "var(--font-color-light)", fontWeight: "normal", fontSize: 48}}>{element.childElement[0]}</h1>
                                    <h1 className="landText-sub" style={{color: "var(--font-color-light)", fontWeight: "normal", fontSize: 36}}>{element.childElement[1]}</h1>
                                </div>
                            </div>
                        )
                    })
                    
                }            
            </Carousel>
            <section className="infoSlide" style={{width: "100%", display: "flex"}}>
                <div style={{backgroundImage: `url(${require('../assets/fa8bb51091f0c91393bdb6be0ed64d242.png')})`, backgroundSize: "100% 100%", display: "flex", justifyContent: "center", flexDirection: "column"}}>
                    <div style={{width: "50%", justifyContent: "center", display: "flex", flexDirection: "column", marginLeft: 50}}>
                        <h1 className="infoSlide-text" style={{color: "var(--font-color-light)", fontWeight: 500}}>With the help of our algorithms, we are easily able to help you find locations for your forever home!</h1>
                        <Button 
                            innerHTML={<HashLink style={{textDecoration: "none", color: "var(--font-color-light)"}} smooth to="#locationFinder">Find Out More!</HashLink>}
                            buttonStyles={
                                {
                                    height: 56,
                                    padding: 20,
                                    fontSize: 20,
                                    backgroundColor: "#D48472",
                                    border: "none",
                                    borderRadius: 10,
                                    color: "var(--font-color-light)",
                                    fontWeight: 500,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }
                            }
                        />
                    </div>
                </div>
            </section>
            <section className="infoSlide" style={{width: "100%", display: "flex"}}>
                <div style={{backgroundImage: `url(${require('../assets/ac81c5bc300e898556d32483977be06b.png')})`, backgroundSize: "100% 100%", display: "flex", justifyContent: "center", flexDirection: "column"}}>
                    <div style={{width: "25%", justifyContent: "center", display: "flex", flexDirection: "column", marginLeft: 50}}>
                        <h1 className="infoSlide-text" style={{color: "var(--font-color-light)", fontWeight: 500}}>Through the use of historical data, we are easily able to do an estimated valuation of your home!</h1>
                        <Button 
                            innerHTML={<HashLink style={{textDecoration: "none", color: "var(--font-color-light)"}} smooth to="#valuation">Find Out More!</HashLink>}
                            buttonStyles={
                                {
                                    height: 56,
                                    padding: 20,
                                    fontSize: 20,
                                    backgroundColor: "#73B4F0",
                                    border: "none",
                                    borderRadius: 10,
                                    color: "var(--font-color-light)",
                                    fontWeight: 500,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }
                            }
                        />
                    </div>
                </div>
            </section>
            <section style={{width: "100%", display: "inline-flex"}}>
                <div style={{width: "50%"}}>
                    <Carousel showArrows={true}>
                        {
                            carouselInfo.map(item => {
                                return <img className="form-carousel-img" key={item.image} src={item.image} alt="Carousel"/>
                            })
                        }
                    </Carousel>
                </div>
                <div className="form-groups" style={{width: "50%", display:"flex", flexDirection: "column", justifyContent: "center", minHeight: "500px"}}>
                    <Carousel showArrows={false} renderIndicator={(clickHandler, isSelected, index, label) => customIndicator(clickHandler, isSelected, index, label)} dynamicHeight>
                        <div id="locationFinder" style={{padding: 20, width: "100%", display: "flex", flexDirection: "column",}}>
                            <h2 className="form-header" style={{color: "var(--font-color-active)"}}>Start searching for your dream home location with us!!</h2>
                            <form>
                                <span aria-label="searchError" style={{fontSize: 24, color: "red"}}>{error.search}</span>
                                <TextField
                                    name={"address1"}
                                    placeholder={"Address"}
                                    styles={{fontSize: 24, padding: 10, borderRadius: 10, marginBottom: 5, width: "100%"}}
                                    onChange={(e) => {updateLocationFinderForm(e, "roi.center")}}
                                    containerStyle={{margin: 15}}
                                />
                                <div style={{display:"flex", flexDirection: "column", alignItems: "self-start", paddingBottom: 30}}>
                                    {
                                        accordionInfo.map(element => {
                                            return <Accordion key={element.title} data={element} styles={{width: "100%", display: "flex", flexDirection: "column"}}>
                                                <div style={{display: "flex", flexDirection: "column"}}>
                                                    {
                                                        element.children.map(child => {
                                                            return <CheckBox key={child.enc} label={child.label} enc={child.enc} onChange={(e) => updateLocationFinderForm(e, "facilities.musthave")}/>
                                                        })
                                                    }
                                                </div>
                                            </Accordion>
                                        })
                                    }
                                    <Accordion data={{title: "Flat Properties"}} styles={{width: "100%", display: "flex", flexDirection: "column"}}>
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            {
                                                flatType.map(type => {
                                                    return <CheckBox key={type.label + type.enc} label={type.label} enc={type.enc} onChange={(e) => updateLocationFinderForm(e, "flat_properties.room_types")}/>
                                                })
                                            }
                                            <RangeSlider name="Floors" label="Floors" min={1} max={25} step={1} onChange={(e) => updateLocationFinderForm(e, "flat_properties.storey_range.max")}/>
                                            <RangeSlider name="Floor Area (sqm)" label="FAsqm" min={20} max={300} step={10} onChange={(e) => updateLocationFinderForm(e, "flat_properties.area_range.max")}/>
                                            <RangeSlider name="Price (million)" label="Price" min={0.1} max={2.0} step={0.1} onChange={(e) => updateLocationFinderForm(e, "flat_properties.price_range.max")}/>
                                        </div>
                                    </Accordion>
                                    <RangeSlider name="Range" label="Range" min={0} max={2} step={0.1} onChange={(e) => updateLocationFinderForm(parseFloat(e), "facilities.distance")} marks={rangeMarks} units={"km"}/>
                                </div>
                                <Button 
                                    aria-label="searchButton"
                                    innerHTML={"Find me some locations!"}
                                    buttonStyles={
                                        {
                                            height: 56,
                                            padding: 20,
                                            fontSize: 20,
                                            backgroundColor: "#73B4F0",
                                            border: "none",
                                            borderRadius: 10,
                                            color: "var(--font-color-light)",
                                            fontWeight: 500,
                                            display: "flex",
                                            alignItems: "center"
                                        }
                                    }
                                    containerStyles={
                                        {
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "center"
                                        }
                                    }
                                    onClickHandler={(e) => {
                                        //TODO: Send form request to server
                                        e.preventDefault();
                                        submitSearch();
                                    }
                                }
                                />
                            </form>
                        </div>
                        <div id="valuation" style={{padding: 20, width: "100%", display: "flex", flexDirection: "column",}}>
                            <h2 className="form-header" style={{color: "var(--font-color-active)"}}>Get an estimated valuation from us now!</h2>
                            <form>
                                <span aria-label="valueError" style={{fontSize: 24, color: "red"}}>{error.valuation}</span>
                                <TextField
                                    name={"address2"}
                                    placeholder={"Address"}
                                    styles={{fontSize: 24, padding: 10, borderRadius: 10, marginBottom: 5, width: "100%"}}
                                    onChange={(e) => updateValuationForm(e, "location")}
                                    containerStyle={{margin: 15}}
                                />
                                <TextField
                                    name={"floorArea"}
                                    placeholder={"Floor Area (sqm)"}
                                    styles={{fontSize: 24, padding: 10, borderRadius: 10, marginBottom: 5, width: "100%"}}
                                    onChange={(e) => updateValuationForm(parseInt(e), "area")}
                                    containerStyle={{margin: 15}}
                                />
                                <DropDown
                                    name={"flatType"}
                                    styles={{fontSize: 24, padding: 10, borderRadius: 10, marginBottom: 5, width: "100%"}}
                                    onChange={(e) => updateValuationForm(e, "room_type")}
                                >
                                    {
                                        flatType.map(type => {
                                            return <option value={type.enc} key={type.label}>{type.label}</option>
                                        })
                                    }
                                </DropDown>
                                <Button
                                    aria-label="valuationButton"
                                    innerHTML={"Calculate my property???s value"}
                                    buttonStyles={
                                        {
                                            height: 56,
                                            padding: 20,
                                            fontSize: 20,
                                            backgroundColor: "#73B4F0",
                                            border: "none",
                                            borderRadius: 10,
                                            color: "var(--font-color-light)",
                                            fontWeight: 500,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            margin: "auto"
                                        }
                                    }
                                    onClickHandler={(e) => {
                                            //TODO: Send form request to server
                                            e.preventDefault();
                                            submitValuation();
                                        }
                                    }
                                />
                            </form>
                        </div>
                    </Carousel>
                </div>
            </section>
        </div>
    );
}