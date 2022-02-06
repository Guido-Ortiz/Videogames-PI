import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameDetail } from "../../actions/actions";

function VideogameDetail(props){

    const dispatch = useDispatch()
    const detailVideogame = useSelector(state => state.videogameDetail)
    let id = props.match.params.id
    console.log(id)
    useEffect(() => {
        dispatch(getVideogameDetail(id))
    }, [dispatch])

    return(
        <div>
            <p>este el detalle del videojuego </p>
        </div>
    )
}
export default VideogameDetail