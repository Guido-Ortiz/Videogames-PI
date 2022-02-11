import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Navbar from "../Navbar/Navbar";
import Videogames from "../Videogames/Videogames";
import Pagination from "../Pagination/Pagination";
import s from './Home.module.css';
import Title from "../Title/Title";

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

    window.scrollTo(0, 0)

    return(
        <div className={s.fondo}>
            <Title />
            
            <Navbar />

            <Videogames videogames={currentVideogames}/>
            
            <Pagination videogamesPerPage={videogamesPerPage}
                        totalVideogames={videogames.length}
                        paginate={paginate} />
        </div>
    )
}