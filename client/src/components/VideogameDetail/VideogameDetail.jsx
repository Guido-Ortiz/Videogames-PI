import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getVideogameDetail, resetVideogamedetail } from "../../actions/actions";
import Loader from "../Loader/Loader";
import Title from "../Title/Title";
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

            <Title />

            {
                videogameDetail ? (
                    <div className={s.flex}>
                        <div className={s.datos}>
                            <h2 className={s.name}>{videogameDetail.name}</h2>
                            <h3 className={s.about}>About</h3>
                            <h3 className={s.descripcion}>{videogameDetail.description}</h3>
                            <div className={s.grilla}>
                                <div className={s.genres}>
                                    <h3 className={s.subtitulo}>Genres</h3>
                                    {videogameDetail.genres.map(g => 
                                    <h3 className={s.nombres}>{g.name}</h3>)}
                                </div>
                                <div className={s.genres}>
                                    <h3 className={s.subtitulo}>Platforms</h3>
                                    {videogameDetail.platforms.map(p => 
                                    <h3 className={s.nombres}>{p}</h3>)}   
                                </div>
                                <div className={s.genres}>
                                    <h3 className={s.subtitulo}>Released date</h3>
                                    <h3 className={s.nombres}>{videogameDetail.released}</h3>
                                </div>
                                <div className={s.genres}>
                                    <h3 className={s.subtitulo}>Rating</h3>
                                    <h3 className={`${s.nombres} ${s.rating}`}>{videogameDetail.rating}</h3>
                                </div>
                            </div>
                            

                            <Link to='/home' style={{ textDecoration: 'none' }}>
                                <button className={s.btn}>HOME</button>
                            </Link>


                        </div>
                        
                        <img src={videogameDetail.image} className={s.imagen} alt="img not found"/>
                        
                    </div>
                ) : (
                    <div>
                        <Loader />
                    </div>
                )
            }
        </div>      
    )
}
export default VideogameDetail

