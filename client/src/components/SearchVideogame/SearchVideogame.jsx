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

    const handleOnKeyPress = (e) => {
        if(e.key === 'Enter'){
            handleSubmit(e)
        }
    }

    return(
        <div>
            <input type='text'
                   placeholder='Search videogame...'
                   className={s.input}
                   onChange={e => handleInput(e)}
                   onKeyPress={ e=>handleOnKeyPress(e)}/>
            <button type='submit' className={s.btn} onClick={e => handleSubmit(e)} >SEARCH</button>
        </div>
    )
}