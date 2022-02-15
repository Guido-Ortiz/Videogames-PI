import React from "react";
import { Link } from "react-router-dom";
import s from './Landing.module.css';

export default function Landing(){
    return(
        <div className={`${s.fondo} ${s.container}`}>
            <div className={s.flex}>
                <h1 className={s.titulo}>RAWG Videogames</h1>
                <Link to = '/home' style={{ textDecoration: 'none' }}>
                    <button className={s.btn}>Get Started</button>
                </Link>
            </div>
        </div>
    )
}