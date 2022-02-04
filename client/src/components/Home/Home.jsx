import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getVideogames } from "../../actions/actions";
import Navbar from "../Navbar/Navbar";
import Videogames from "../Videogames/Videogames";
import Pagination from "../Pagination/Pagination";

export default function Home(){

    // const dispatch = useDispatch() // mapDispatchToprops
    const videogames = useSelector(state => state.videogames) // mapStateToProps

    // const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(15) // videogames per page

    // useEffect(() => {
    //     //setLoading(true)
    //     dispatch(getVideogames())
    //     //setLoading(false)
    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(getGenres())
    // }, [dispatch])

    // Get current videogames
    const indexOfLastVideogame = currentPage * videogamesPerPage
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
    const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return(
        <div>
            <Navbar />
            <h1>HOLA, este es mi HOME!</h1>
            {/* {
                videogames && videogames.map(vg => {
                    return(
                        <Videogame name={vg.name} image={vg.image} key={vg.id}/>
                    )
                })
            }             */}
            <Videogames videogames={currentVideogames}/>
            <Pagination videogamesPerPage={videogamesPerPage}
                        totalVideogames={videogames.length}
                        paginate={paginate} />
        </div>
    )
}