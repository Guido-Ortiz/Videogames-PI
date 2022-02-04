import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import { getVideogamesByName} from '../../actions/actions'


export default function SearchVideogame(){

    const dispatch = useDispatch() // mapDispatchToProps
    const [videogame, setVideogame] = useState('')

    const handleInput = (e) => {
        e.preventDefault()
        setVideogame(e.target.value)
    }

    const handleSubmit = (e) =>{
        dispatch(getVideogamesByName(videogame))
    }

    return(
        <div>
            <input type='text'
                   placeholder='Search videogame...'
                   onChange={e => handleInput(e)}/>
            <button type='submit' onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}