import React from "react";
import { Link } from "react-router-dom";
import s from './Title.module.css';

export default function Title(){

    return(
        <Link to='/home' style={{ textDecoration: 'none' }}>
            <h1 className={s.titulo}>API RAWG</h1>
        </Link>
        
    )
}