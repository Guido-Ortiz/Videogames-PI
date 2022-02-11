import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogameDetail } from "../../actions/actions";
import s from './Videogame.module.css';

export default function Videogame(props){

    const {id, name, rating, image, genres} = props

    return(
        <div className={s.gameCard}>
            <img src={image} alt="img not found" className={s.img}/>
            <div className={s.cardDetails}>
                <div className={s.flex}>
                    {
                        genres.map(g => 
                            <div className={s.genres}>{g.name}</div>)
                    }
                </div>
                
                {/* <div className={s.rating}>{rating}</div> */}
                <div className={s.name}>{name}</div>
                <Link to = {`/home/${id}`} style={{ textDecoration: 'none' }}>
                    <button className={s.btn}>SEE MORE</button>
                </Link>
            </div>
        </div>
    )
}