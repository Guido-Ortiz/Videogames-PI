import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getVideogames } from "../../actions/actions";
import Navbar from "../Navbar/Navbar";
import Videogame from "../Videogame/Videogame";



export default function Videogames({videogames}){

    
    

    const dispatch = useDispatch() // mapDispatchToprops
    //const videogames = useSelector(state => state.videogames) // mapStateToProps

    // // const [loading, setLoading] = useState(false)
    // const [currentPage, setCurrentPage] = useState(1)
    // const [videogamesPerPage, setVideogamesPerPage] = useState(15) // videogames per page

    useEffect(() => {
        //setLoading(true)
        dispatch(getVideogames())
        //setLoading(false)
    }, [dispatch])

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    // // Get current videogames
    // const indexOfLastVideogame = currentPage * videogamesPerPage
    // const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
    // const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

    // return(
    //     <div>
            
    //         {
    //             videogames && videogames.map(vg => {
    //                 return(
    //                     <Videogame name={vg.name} image={vg.image} rating={vg.rating} key={vg.id}/>
    //                 )
    //             })
    //         }            
            
    //     </div>
    // )

    if(videogames.length > 0){
        return(
            <div>
                
                {
                    videogames && videogames.map(vg => {
                        return(
                            <Videogame name={vg.name} image={vg.image} rating={vg.rating} key={vg.id}/>
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