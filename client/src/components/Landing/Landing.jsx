import React from "react";
import { Link } from "react-router-dom";
import s from './Landing.module.css';
import img from './assets/landing.jpg';
import img1 from './assets/download.jpg';

export default function Landing(){
    return(
        <div className={`${s.fondo} ${s.container}`}>
            <div className={s.flex}>
                <h1 className={s.titulo}>RAWG Video Games</h1>
                
                <Link to = '/home'>
                    <button className={s.btn}>Get Started</button>
                </Link>
            </div>
            
            {/* <img src={img1} className={s.imagen} alt='img not found' /> */}
            
            
        </div>
    )
}