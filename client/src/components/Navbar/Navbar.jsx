import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterByGenre, filterCreated, orderByAlphabet, orderByRating } from "../../actions/actions";
import SearchVideogame from '../SearchVideogame/SearchVideogame';
import s from './Navbar.module.css';

export default function Navbar(){

    const dispatch = useDispatch()
    const genres = useSelector(state => state.genres)
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
            <div className={s.flex}>
                <Link to='/create' style={{ textDecoration: 'none' }}>
                    <button className={s.btn}>CREATE VIDEOGAME</button>
                </Link>
            
                <SearchVideogame />
            </div>
            
            <div className={s.filtros}>
                <label className={s.label}>Alphabetical:</label>
                <select className={s.select} onChange={e => handleFilterName(e)}>
                    <option value='none'>None</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>

                <label className={s.label}>Rating:</label>
                <select className={s.select} onChange={e => handleRating(e)}>
                    <option value='none'>None</option>
                    <option value='rating_asc'>+ Rating</option>
                    <option value='rating_desc'>- Rating</option>
                </select>

                <label className={s.label}>Origin:</label>
                <select className={s.select} onChange={e => handleOrigin(e)}>
                    <option value='all'>All</option>
                    <option value='api'>API</option>
                    <option value='db'>Database</option>
                </select>

                <label className={s.label}>Genre:</label>
                <select className={s.select} onChange={(e) => handleFilterGenre(e)}>
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