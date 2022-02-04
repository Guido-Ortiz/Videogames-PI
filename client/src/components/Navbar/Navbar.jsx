import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre, filterCreated, orderByAlphabet, orderByRating } from "../../actions/actions";
import SearchVideogame from '../SearchVideogame/SearchVideogame';


export default function Navbar(){

    const dispatch = useDispatch()
    const genres = useSelector((state) => state.genres)
    const [orden, setOrden] = useState('')
    
    //console.log(genres)

    function handleFilterGenre(e){
        console.log(e.target.value)
        dispatch(filterByGenre(e.target.value))
    }

    function handleRating(e){
        dispatch(orderByRating(e.target.value))
    }

    function handleFilterName(e){
        e.preventDefault()
        dispatch(orderByAlphabet(e.target.value))
        setOrden(`Ordenado ${e.target.name}`)
    }

    function handleOrigin(e){
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
    }

    return(
        <div>
            <h1>TITULO DE MI PI</h1>
            <button>CREATE VIDEOGAME</button>
            <SearchVideogame />
            <div>
                <label>Alphabetical:</label>
                <select onChange={e => handleFilterName(e)}>
                    <option value='none'>None</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>

                <label>Rating:</label>
                <select onChange={e => handleRating(e)}>
                    <option value='none'>None</option>
                    <option value='rating_asc'>+ Rating</option>
                    <option value='rating_desc'>- Rating</option>
                </select>

                <label>Origin:</label>
                <select onChange={e => handleOrigin(e)}>
                    <option value='all'>All</option>
                    <option value='api'>API</option>
                    <option value='db'>Database</option>
                </select>

                <label>Genre:</label>
                <select onChange={(e) => handleFilterGenre(e)}>
                    <option value='all'>All</option>
                    {
                        genres.map(g => (
                            <option key={g.id} required value={g.name}>{g.name}</option>)
                        )
                    }                    
                </select>
            </div>            
        </div>
    )
}