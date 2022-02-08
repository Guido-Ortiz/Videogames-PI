import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Navbar from "../Navbar/Navbar";
import Videogames from "../Videogames/Videogames";
import Pagination from "../Pagination/Pagination";
import s from './Home.module.css';

export default function Home(){

    const videogames = useSelector(state => state.videogames) // mapStateToProps

    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage] = useState(15) // videogames per page
    //const [videogamesPerPage, setVideogamesPerPage] = useState(15) // videogames per page

    // Get current videogames
    const indexOfLastVideogame = currentPage * videogamesPerPage
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
    const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return(
        <div className={s.fondo}>
            <h1 className={s.titulo}>API RAWG</h1>
            <Navbar />
            <h1>HOLA, este es mi HOME!</h1>

            <Videogames videogames={currentVideogames}/>
            
            <Pagination videogamesPerPage={videogamesPerPage}
                        totalVideogames={videogames.length}
                        paginate={paginate} />
        </div>
    )
}