import axios from "axios";
import { 
    GET_VIDEOGAMES,
    GET_GENRES,
    FILTER_BY_GENRE,
    ORDER_BY_RATING,
    ORDER_BY_ALPHABET,
    FILTER_CREATED,
    GET_VIDEOGAMES_BY_NAME,
    GET_VIDEOGAME_DETAIL,} from "./constants";

export function getVideogames(){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/videogames')
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: json.data
            })
        } catch(e){
            console.log(e)
        }
        
    }
}

export function getGenres(){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/genres')
            return dispatch({
                type: GET_GENRES,
                payload: json.data
            })
        } catch(e){
            console.log(e)
        }
        
    }
}

export function getVideogamesByName(name){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: GET_VIDEOGAMES_BY_NAME,
                payload: json.data // lo que devuelve la ruta cuando le asigno algo por name
            })
        } catch(e){
            console.log(e)
        }
    }
}

export function getVideogameDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/videogame/" + id)
            return dispatch({
                type: GET_VIDEOGAME_DETAIL,
                payload: json.data
            })
        } catch(e){
            console.log(e)
        }
    }
}

export function filterByGenre(payload){
    return{
        type: FILTER_BY_GENRE,
        payload
    }
}

export function orderByRating(payload){
    return{
        type: ORDER_BY_RATING,
        payload
    }
}

export function orderByAlphabet(payload){
    return{
        type: ORDER_BY_ALPHABET,
        payload
    }
}

export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
}

