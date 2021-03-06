import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getVideogames } from "../../actions/actions";
import Videogame from "../Videogame/Videogame";
import Loader from '../Loader/Loader';
import s from './Videogames.module.css';


export default function Videogames({videogames}){

    const dispatch = useDispatch() // mapDispatchToprops

    const allVideogames = useSelector(state => state.allVideogames)

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
    if(videogames.length === 0 && allVideogames.length === 0){
        return(
            <Loader />
        )
    }
    if(videogames.length === 0){
        return(
            <p className={s.parrafo}>Sorry. No matches found!</p>
        )
    }
    
}