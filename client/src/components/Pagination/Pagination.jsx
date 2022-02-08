import React from "react";
import s from './Pagination.module.css';

export default function Pagination({videogamesPerPage, totalVideogames, paginate}){
    const pageNumber = []
    for(let i = 1; i <= Math.ceil(totalVideogames/videogamesPerPage); i++){
        pageNumber.push(i)
    }
    return(
        <nav>
            <ul className={s.pagination}>
                {
                    pageNumber.map(n => (
                        <li key={n}>
                            <button className={s.btn} onClick={() => paginate(n)}>{n}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}