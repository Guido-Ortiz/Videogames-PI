import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import { getVideogamesByName} from '../../actions/actions';
import s from './SearchVideogame.module.css';


export default function SearchVideogame(){

    const dispatch = useDispatch() // mapDispatchToProps
    const [videogame, setVideogame] = useState('')

    const handleInput = (e) => {
        e.preventDefault()
        setVideogame(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getVideogamesByName(videogame))
        setVideogame(' ')
    }

    return(
        <div>
            <input type='text'
                   placeholder='Search videogame...'
                   className={s.input}
                   onChange={e => handleInput(e)}/>
            <button type='submit' className={s.btn} onClick={e => handleSubmit(e)}>SEARCH</button>
        </div>
    )
}