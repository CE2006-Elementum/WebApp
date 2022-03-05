import React from 'react';

import { mainNav } from '../Utils/Routes';

export default function Footer(){
    return (
      <div className="footer-container" style={{display: "flex", flexDirection: "column", backgroundColor: "var(--font-color-inactive)", height: "100%", padding: 15, alignItems: "center"}}>
        <nav style={{display: "flex", flexDirection: "row", justifyContent: "space-around", width: "100%"}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center",}}>
            <img className="footer-logo" src={require('../assets/06bacb2d15838ff39a30359cac950d36.png')} alt="footer logo" style={{height: "50px", width: "50px"}}/>
            <h4 style={{fontWeight: 500}}>Elementum Housing</h4>
          </div>
          {
            React.Children.map(mainNav, (link, index) => {
              return (
                <div style={{display: "flex", justifyContent: "center", flexDirection: "column",}}>
                  { React.cloneElement(link, {key: "footer_" + index})}
                </div>
              )
            })
          }
        </nav>
        <div>
          <span className="copyright" style={{fontSize: "10px", color: "var(--font-color-active)"}}>Copyright 2022. Elementum Group</span>  
        </div>
      </div>
    );
}