import React from "react";
import { Link } from "react-router-dom";

export default function Landing(){
    return(
        <div>
            <h1>HOLA, esta es mi landing</h1>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
            
        </div>
    )
}