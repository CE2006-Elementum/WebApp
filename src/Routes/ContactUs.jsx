import React, { useState } from 'react';

import { Button, RadioButton, TextArea, TextField } from "../Components/InputField";
import { contact } from '../Utils/Enums';
import { postContactUs } from '../Utils/Fetch';

/**
 * Contact Us Page
 * @returns A populated View
 */
export default function ContactUs({testFetchURL}){
    const [contactForm, setContactForm] = useState({...contact});
    const [error, setError] = useState({error: ""});
    const [res, setRes] = useState({result: ""});

    /**
     * Contact Us Form handler to prepare the request that is to be sent on click
     * @param {*} e Value for which to be updated
     * @param {string} key Key for which the value is to be updated
     */
    const updateContactForm = (e, key) => {
        const shallowCopy = {...contactForm}; //Shallow copying
        const keys = Object.keys(shallowCopy.contact); //Get all keys
        const index = keys.indexOf(key); //Get index of matching key
        shallowCopy.contact[keys[index]] = e;
        setContactForm(shallowCopy);
    }

    /**
     * Validates the form data and tries to submit the form to the server
     */
    const submitContactForm = () => {
        setError({error: ""});
        if(contactForm.contact.first_name === "" || contactForm.contact.first_name === null
            || contactForm.contact.last_name === "" || contactForm.contact.last_name === null
            || contactForm.contact.message === "" || contactForm.contact.message === null
            || contactForm.contact.email === "" || contactForm.contact.email === null
            || contactForm.contact.role === "" || contactForm.contact.role === null
            || contactForm.contact.phone === "" || contactForm.contact.phone === null) {
            setError({error: "Please ensure that all fields are filled!"});
            return;
        }
        postContactUs(contactForm.contact, testFetchURL).then(response => {
            if(response.status === 200)
                return response.json();
            else {
                setError({error: "Error! " + response.status});
                return null;
            }
        }).then(response => {
            if(response !== null)
                setRes({result: "Success!"});
        }).catch(error => {
            setError({error: error});
        });
        setContactForm({...contactForm});
    }
    
    return (
        <div className="contact-container" style={{display: "flex", flexDirection: "column", backgroundImage: "linear-gradient(to bottom, #F8F1E4, #FFFFFF)"}}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 50, padding: 20, flexWrap: "wrap"}}>
                <div style={{display: "flex", flexDirection: "column", margin: "auto", flexWrap: "wrap"}}>
                    <h3 className="title">Contact Us</h3>
                    <span aria-label="contactError">{error.error ? error.error : res.result ? res.result : ""}</span>
                    <form>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: 20}}>
                            <div style={{display: "flex", flexDirection: "column", marginRight: 20}}>                                
                                <TextField
                                    name={"first_name"}
                                    styles={{width: "300px"}}
                                    onChange={(e) => updateContactForm(e, "first_name")}
                                />
                                <label className="input-label-sub" htmlFor="first_name" style={{fontSize: "12px"}}>First Name</label>
                            </div>
                            <div style={{display: "flex", flexDirection: "column",}}>
                                <TextField
                                    name={"last_name"}
                                    styles={{width: "300px"}}
                                    onChange={(e) => updateContactForm(e, "last_name")}
                                />
                                <label className="input-label-sub" htmlFor="last_name" style={{fontSize: "12px"}}>Last Name</label>
                            </div>
                        </div>
                        <div style={{display: "flex", marginBottom: 30}}>
                            <div stlye={{display: "flex", flexDirection: "column"}}>
                                <label className="input-label" htmlFor="mobileNo">Mobile Number *</label>
                                <TextField
                                    name={"mobileNo"}
                                    styles={{width: "300px"}}
                                    onChange={(e) => updateContactForm(e, "phone")}
                                />
                            </div>
                        </div>
                        <div style={{display: "flex", marginBottom: 30}}>
                            <div stlye={{display: "flex", flexDirection: "column"}}>
                                <label className="input-label" htmlFor="email">Email *</label>
                                <TextField
                                    name={"email"}
                                    styles={{width: "300px"}}
                                    onChange={(e) => updateContactForm(e, "email")}
                                />
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", marginBottom: 20}}>
                            <label className="input-label" htmlFor="asRole">Enquiring as *</label>
                            <RadioButton
                                label={"Buyer"}
                                name={"asRole"}
                                value={"buyer"}
                                onChange={(e) => updateContactForm(e, "role")}
                            />
                            <RadioButton
                                label={"Seller"}
                                name={"asRole"}
                                value={"seller"}
                                onChange={(e) => updateContactForm(e, "role")}
                            />
                            <RadioButton
                                label={"Agent"}
                                name={"asRole"}
                                value={"agent"}
                                onChange={(e) => updateContactForm(e, "role")}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column", marginBottom: 30}}>
                            <label className="input-label" htmlFor="msg">Message *</label>
                            <TextArea
                                ariaLabel={"message"}
                                rows="10"
                                cols="85"
                                onChange={(e) => updateContactForm(e, "message")}
                            />
                        </div>
                        <div style={{display: "flex", marginBottom: 30}}>
                            <Button
                                aria-label="contactButton"
                                innerHTML={"SEND"}
                                buttonStyles={
                                    {
                                        height: 36,
                                        padding: 20,
                                        fontSize: 16,
                                        backgroundColor: "#D48472",
                                        border: "none",
                                        borderRadius: 10,
                                        color: "var(--font-color-light)",
                                        fontWeight: 500,
                                        display: "flex",
                                        alignItems: "center",
                                        zIndex: 1000
                                    }
                                }
                                onClickHandler={(e) => {
                                    //TODO: Send form request to server
                                    e.preventDefault();
                                    submitContactForm();
                                }}
                            />
                        </div>
                    </form>
                    <div style={{display: "flex", flexDirection: "column", marginBottom: 20}}>
                        <h4 className="info">Customer support</h4>
                        <address>cs@elementum.sg</address>
                        <h4 className="info">Corporate</h4>
                        <address>chua0994@e.ntu.edu.sg</address>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: "auto"}}>
                    <div>
                        <img className="logo" src={require("../assets/06bacb2d15838ff39a30359cac950d36.png")} alt="Logo" style={{width: "150px", height: "150px"}}/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <h3 className="info">Singapore Head Office</h3>
                        <address>Nanyang Technological University</address>
                        <address>50 Nanyang Avennue, 32 Block,</address>
                        <address>N4-B1C-14</address>
                        <address>Sinagpore 639798</address>
                        <address>Tuesday - 10:30AM to 12:20PM</address>
                    </div>
                </div>
            </div>
        </div>
    )
}