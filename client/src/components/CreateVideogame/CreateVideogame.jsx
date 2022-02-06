import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { createVideogamegame, getGenres } from "../../actions/actions";

function CreateVideogame(){

    const dispatch = useDispatch()
    // const genres = useSelector((state) => state.genres)

    const history = useHistory()

    const genres = useSelector((state) => state.genres)

    const [form, setForm] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        genres: [],
        platforms: []
    })

     useEffect(() => {
         dispatch(getGenres())
    }, [dispatch])

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })   
        console.log(form) 
    }

    function handleGenres(e){
        setForm({
            ...form,
            genres: [...form.genres, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(form)
        dispatch(createVideogamegame(form))
        alert('Videogame created!')
        setForm({
            name: '',
            description: '',
            released: '',
            rating: '',
            genres: [],
            platforms: []
        })
        history.push('/home')
    }

    return(
        <>

            <Link to={'/home'}>
                <button>Back</button>
            </Link>

            <h2>Create your videogame</h2>
            <p>Complete this from and create your own videogame!</p>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={form.name} name='name' onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={form.description} name='description' onChange={handleChange}/>
                </div>
                <div>
                    <label>Released:</label>
                    <input type="date" value={form.released} name='released' onChange={handleChange}/>
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="number" value={form.rating} name='rating' onChange={handleChange}/>
                </div>
                <div>
                    <label>Platforms:</label>
                    <input type="text" value={form.platforms} name='platforms' onChange={handleChange}/>
                </div>
                <div>
                    <label>Genres:</label>
                    <select onChange={handleGenres}>
                        {
                            genres.map(g => {
                                return(
                                    <option value={g.name}>{g.name}</option>
                                )
                            })
                        }
                    </select>
                    <ul>
                        <li>{form.genres.map(g => g + ', ')}</li>
                    </ul>
                </div>
                <button type="submit">CREATE</button>
            </form> 
        </>
    )
}
export default CreateVideogame

