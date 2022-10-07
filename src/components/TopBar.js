import React from "react";
import logo from "../Images/logo.png"
export default function TopBar(){
    return(
        <div className="bar">
            <img src={logo} className="barImage" alt="logo"/>
            <div className="barText">
                UTD Audit Application
            </div>
        </div>
    )
}