import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getVideogameDetail } from "../../actions/actions";

export default function Videogame({id, name, rating, image}){

    const dispatch = useDispatch()
    const videogameDetail = useSelector(state => state.videogameDetail)

    function handleClick(e){
        dispatch(getVideogameDetail(id))
    }

    return(
        <div>
            <h3>{name}</h3>
            {/* <h3>{genres}</h3> */}
            <h4>{rating}</h4>
            <img src={image} alt="img not found" height="150px" width="300px"/>
            <Link to={"/home/" + id}>
                <button onClick={e => handleClick(e)}>See more</button>
            </Link>
        </div>
    )
}