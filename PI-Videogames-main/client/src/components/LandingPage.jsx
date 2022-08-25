import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"


export default function LandingPage() {
    return (
        <div className="MyImage">
            <img className="theImage" src="https://giffiles.alphacoders.com/214/214388.gif" alt="img not found" />
            <Link to="/home">
                <button  className="myButton">PRESS START</button>
            </Link>
        </div>
    )
}