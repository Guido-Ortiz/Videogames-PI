import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getVideogameDetail, resetVideogamedetail } from "../../actions/actions";
import Loader from "../Loader/Loader";
import s from './VideogameDetail.module.css';

function VideogameDetail(){

    const dispatch = useDispatch()
    const videogameDetail = useSelector(state => state.videogameDetail)

    const {id} = useParams()

    useEffect(() => {
        dispatch(getVideogameDetail(id))
        return () => dispatch(resetVideogamedetail())
    }, [dispatch])

    
    return(
        <div className={s.fondo}>
            {
                videogameDetail ? (
                    <div className={s.flex}>
                        <h2 className={s.name}>{videogameDetail.name}</h2>
                        <h3>{videogameDetail.description}</h3>
                        <h3>Platforms:</h3>
                        {/* <h3>{videogameDetail.genres}</h3> */}
                        {videogameDetail.genres.map(g => 
                            <h3>{g.name}</h3>)}
                        <img src={videogameDetail.image}/>
                        <Link to='/home' style={{ textDecoration: 'none' }}>HOME</Link>
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

