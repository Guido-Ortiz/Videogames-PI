import React from "react";
import LoaderGif from './assets/loader1.gif';
import s from './Loader.module.css';

export default function Loader(){
    return(
        <div>
            <img src={LoaderGif} className={s.img} alt="img not found"/>
        </div>      
    )
}
