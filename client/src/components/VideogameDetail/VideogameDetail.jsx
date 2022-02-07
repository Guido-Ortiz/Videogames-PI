import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getVideogameDetail, resetVideogamedetail } from "../../actions/actions";
import Loader from "../Loader/Loader";

function VideogameDetail(){

    const dispatch = useDispatch()
    const videogameDetail = useSelector(state => state.videogameDetail)

    const {id} = useParams()

    useEffect(() => {
        dispatch(getVideogameDetail(id))
        return () => dispatch(resetVideogamedetail())
    }, [dispatch])

    
    return(
        <div>
            {
                videogameDetail ? (
                    <div>
                        <h2>{videogameDetail.name}</h2>
                        <h3>{videogameDetail.description}</h3>
                        <img src={videogameDetail.image}/>
                        <Link to='/home'>HOME</Link>
                    </div>
                ) : (
                    <div>
                        {/* <h1>Cargandooooo....</h1> */}
                        <Loader />
                    </div>
                )
            }
        </div>      
    )
}
export default VideogameDetail

