import React from "react";

export default function Videogame({name, image, rating}){
    return(
        <div>
            <h3>{name}</h3>
            {/* <h3>{genres}</h3> */}
            <h4>{rating}</h4>
            <img src={image} alt="img not found" height="150px" width="300px"/>
        </div>
    )
}