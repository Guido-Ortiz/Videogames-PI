import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogameDetail } from "../../actions/actions";

export default function Videogame(props){

    const {id, name, rating, image} = props
    //const dispatch = useDispatch()
    //const videogameDetail = useSelector(state => state.videogameDetail)

    return(
        <div>
            <h3>{name}</h3>
            {/* <h3>{genres}</h3> */}
            <h4>{rating}</h4>
            <img src={image} alt="img not found" height="150px" width="300px"/>
            <Link to = {`/home/${id}`}>
                See more
            </Link>
        </div>
    )
}