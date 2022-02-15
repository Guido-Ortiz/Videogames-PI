import React from "react";
import { Link } from "react-router-dom";
import s from './Videogame.module.css';

export default function Videogame(props){

    const {id, name, image, genres} = props

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
                <div className={s.name}>{name}</div>
                <Link to = {`/home/${id}`} style={{ textDecoration: 'none' }}>
                    <button className={s.btn}>SEE MORE</button>
                </Link>
            </div>
        </div>
    )
}