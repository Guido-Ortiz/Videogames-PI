import React from "react";

export default function Pagination({videogamesPerPage, totalVideogames, paginate}){
    const pageNumber = []
    for(let i = 1; i <= Math.ceil(totalVideogames/videogamesPerPage); i++){
        pageNumber.push(i)
    }
    return(
        <nav>
            <ul>
                {
                    pageNumber.map(n => (
                        <li key={n}>
                            <button onClick={() => paginate(n)}>{n}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}