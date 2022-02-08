import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { getGenres, getVideogames } from "../../actions/actions";
import Videogame from "../Videogame/Videogame";
import s from './Videogames.module.css';


export default function Videogames({videogames}){

    const dispatch = useDispatch() // mapDispatchToprops

    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    if(videogames.length > 0){
        return(
            <div className={s.wrapper}>
                {
                    videogames && videogames.map(vg => {
                        return(
                            <div>
                                <Videogame id={vg.id}
                                           name={vg.name} 
                                           image={vg.image} 
                                           rating={vg.rating}
                                           genres={vg.genres} 
                                           key={vg.id}/>
                            </div>                              
                        )
                    })
                }            
                
            </div>
        )
    }
    else{
        return(
            <p>Cargando la data...</p>
        )
    }

    
}