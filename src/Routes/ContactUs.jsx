import React, { useState } from 'react';

import { Button, RadioButton, TextArea, TextField } from "../Components/InputField";
import { contact } from '../Utils/Enums';
import { postContactUs } from '../Utils/Fetch';

export default function ContactUs(){
    const [contactForm, setContactForm] = useState({...contact});
    const [error, setError] = useState({error: ""});
    const [res, setRes] = useState({result: ""})

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
        if(contactForm.contact.firstName === "" || contactForm.contact.firstName === null
            || contactForm.contact.lastName === "" || contactForm.contact.last === null
            || contactForm.contact.message === "" || contactForm.contact.message === null
            || contactForm.contact.mobile === "" || contactForm.contact.mobile === null) {
            setError({error: "Please ensure that all fields are filled!"});
            return;
        }
        postContactUs(contactForm.contact).then(response => {
            if(response.status === 200)
                return response.json();
            else setError({error: "Error! " + response.status});
        }).then(response => {
            if(response)
                setRes({result: response});
        })
    }
    
    return (
        <div className="contact-container" style={{display: "flex", flexDirection: "column", backgroundImage: "linear-gradient(to bottom, #F8F1E4, #FFFFFF)"}}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 50, padding: 20, flexWrap: "wrap"}}>
                <div style={{display: "flex", flexDirection: "column", margin: "auto", flexWrap: "wrap"}}>
                    <h3 className="title">Contact Us</h3>
                    <span>{error.error}</span>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: 20}}>
                        <div style={{display: "flex", flexDirection: "column", marginRight: 20}}>
                            <label className="input-label" htmlFor="firstName">Name *</label>
                            <TextField
                                name="firstName"
                                styles={{width: "300px"}}
                                onChange={(e) => updateContactForm(e, "firstName")}
                            />
                            <label className="input-label-sub" htmlFor="firstName" style={{fontSize: "12px"}}>First Name</label>
                        </div>
                        <div style={{display: "flex", flexDirection: "column",}}>
                            <label className="input-label" htmlFor="lastName" style={{fontSize: "16px"}}>&#160;</label>
                            <TextField
                                name="lastName"
                                styles={{width: "300px"}}
                                onChange={(e) => updateContactForm(e, "lastName")}
                            />
                            <label className="input-label-sub" htmlFor="lastName" style={{fontSize: "12px"}}>Last Name</label>
                        </div>
                    </div>
                    <div style={{display: "flex", marginBottom: 30}}>
                        <div stlye={{display: "flex", flexDirection: "column"}}>
                            <label className="input-label" htmlFor="mobileNo">Mobile Number *</label>
                            <TextField
                                name="mobileNo"
                                styles={{width: "300px"}}
                                onChange={(e) => updateContactForm(e, "mobile")}
                            />
                        </div>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", marginBottom: 20}}>
                        <label className="input-label" htmlFor="as">Enquiring as *</label>
                        <RadioButton
                            label="Buyer"
                            name="as"
                            value="buyer"
                            onChange={(e) => updateContactForm(e, "enquiringAs")}
                        />
                        <RadioButton
                            label="Seller"
                            name="as"
                            value="seller"
                            onChange={(e) => updateContactForm(e, "enquiringAs")}
                        />
                        <RadioButton
                            label="Agent"
                            name="as"
                            value="agent"
                            onChange={(e) => updateContactForm(e, "enquiringAs")}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "column", marginBottom: 30}}>
                        <label className="input-label" htmlFor="msg">Message *</label>
                        <TextArea
                            rows="10"
                            cols="85"
                            onChange={(e) => updateContactForm(e, "message")}
                        />
                    </div>
                    <div style={{display: "flex", marginBottom: 30}}>
                        <Button
                            innerHTML="SEND"
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
                                    alignItems: "center"
                                }
                            }
                            onClick={(e) => {
                                //TODO: Send form request to server
                                e.preventDefault();
                                submitContactForm();
                            }}
                        />
                        <span>{res.result}</span>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", marginBottom: 20}}>
                        <h4 className="info">Customer support</h4>
                        <address>cs@elementum.sg</address>
                        <h4 className="info">Corporate</h4>
                        <address>chua0994@e.ntu.edu.sg</address>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: "auto"}}>
                    <div>
                        <img className="logo" src={require("../assets/06bacb2d15838ff39a30359cac950d36.png")} alt="Logo" style={{width: "100px", height: "100px"}}/>
                    </div>
                    <h3 className="brand">Elementum Housing</h3>
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