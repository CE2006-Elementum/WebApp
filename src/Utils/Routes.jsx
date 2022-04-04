import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import Index from "../Routes/Index";
import LocationFinder from "../Routes/LocationFinder";
import Valuation from "../Routes/Valuation";
import FAQ from "../Routes/Faq";
import ContactUs from "../Routes/ContactUs";

/**
 * Used to setup the router
 */
export const links = [
  {
    to: "/",
    element: <Index/>,
    path: "Home"
  },
  {
    to: "/locationfinder",
    element: <LocationFinder/>,
    path: "Location Finder"
  },
  {
    to: "/valuation",
    element: <Valuation/>,
    path: "Valuation"
  },
  {
    to: "/faq",
    element: <FAQ/>,
    path: "FAQ"
  },
  {
    to: "/contactus",
    element: <ContactUs/>,
    path: "Contact Us"
  },
]

/**
 * Used for top nav and footer nav
 */
export const mainNav = [
    <Link key={"home"} to="/" name="Home" style={{textDecoration: "none", fontSize: "18px", color: "var(--font-color-active)", margin: "15px 20px", fontWeight: 500}}>Home</Link>,
    <HashLink key={"location"} smooth to="/#locationFinder" name="Location Finder" style={{textDecoration: "none", fontSize: "18px", color: "var(--font-color-active)", margin: "15px 20px", fontWeight: 500}}>Location Finder</HashLink>,
    <HashLink key={"valuation"} smooth to="/#valuation" name="Valuation" style={{textDecoration: "none", fontSize: "18px", color: "var(--font-color-active)", margin: "15px 20px", fontWeight: 500}}>Valuation</HashLink>,
    <Link key={"faq"} to="/faq" name="FAQ" style={{textDecoration: "none", fontSize: "18px", color: "var(--font-color-active)", margin: "15px 20px", fontWeight: 500}}>FAQ</Link>,
    <Link key={"contact"} to="/contactus" name="Contact Us" style={{textDecoration: "none", fontSize: "18px", color: "var(--font-color-active)", margin: "15px 20px", fontWeight: 500}}>Contact Us</Link>
]