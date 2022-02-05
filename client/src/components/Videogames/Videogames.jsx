import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getGenres, getVideogames } from "../../actions/actions";
import Videogame from "../Videogame/Videogame";



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
            <div>
                
                {
                    videogames && videogames.map(vg => {
                        return(
                                <Videogame id={vg.id}
                                           name={vg.name} 
                                           image={vg.image} 
                                           rating={vg.rating} 
                                           key={vg.id}/>
                            
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