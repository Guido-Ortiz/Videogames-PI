import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createVideogamegame, getGenres, getVideogames } from "../../actions/actions";
import Title from "../Title/Title";
import s from './CreateVideogame.module.css';

const validate = (values) => {
    const errors = {}
    const regex = /^[0-5]$|^[0-5]\.[0-9]{1,2}$/;
    // const regex = /^[0-5]{1,3}$|^[0-5]{1,3}\.[0-9]{1,3}$/;
    if(!values.name){
        errors.name = 'Name is required'
    }
    if(!values.description){
        errors.description = 'Description is required'
    }
    if(!values.name){
        errors.name = 'Name is required'
    }
    if(!values.released){
        errors.released = 'Released date is required'
    }
    if(!values.rating){
        errors.rating = 'Rating is required'
    }
    else if(!regex.test(values.rating)){
        errors.rating = 'Rating must be a number between 0 - 5!'
    }
    if(!values.platforms){
        errors.platforms = 'Platform is required'
    } 
    if(!values.genres){
        errors.genres = 'Genres is required'
    } 
    
    return errors
}


function CreateVideogame(){

    const dispatch = useDispatch()

    const history = useHistory()

    const genres = useSelector(state => state.genres)
    const videogames = useSelector(state => state.videogames)
    let platforms = []
    if(videogames){
        platforms = videogames.map(g => g.platforms.find(p => p))
        platforms = Array.from(new Set(platforms.map(p => p))) // Array.from() crea una nueva instancia de Array a partir de un objeto iterable
        // Un valor en un Set sólo puede estar una vez; éste es único en la colección Set
    }

    const [form, setForm] = useState({
        name: '',
        description: '',
        image: '',
        released: '',
        rating: '',
        genres: [],
        platforms: []
    })

    const [errors, setErrors] = useState({})
    //const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
         dispatch(getGenres())
         dispatch(getVideogames())
    }, [dispatch])


    function handleChange(e){
        //const {name, value} = e.target
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))   
    }

    function handleGenres(e){
        setForm({
            ...form,
            genres: [...form.genres, e.target.value]
        })
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))   
    }

    function handlePlatforms(e){
        setForm({
            ...form,
            platforms: [...form.platforms, e.target.value]
        }) 
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))   
    }

    function handleSubmit(e){
        e.preventDefault()

        dispatch(createVideogamegame(form))
        alert('Videogame created!')
        setForm({
            name: '',
            description: '',
            image: '',
            released: '',
            rating: '',
            genres: [],
            platforms: []
        })
        history.push('/home')
    }

    function handleDeleteGenre(name){
        setForm({
            ...form,
            genres: form.genres.filter(g => g !== name)
        })
    }

    function handleDeletePlatforms(name){
        setForm({
            ...form,
            platforms: form.platforms.filter(p => p !== name)
        })
    }

    
    return(
        <div className={s.fondo}>

            <Title />

            <div className={s.flex}>
                <div className={s.heading}>Create your videogame</div>
                <p className={s.parrafo}>Complete this from and create your own videogame!</p>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className={s.options}>
                        <label>Name:</label>
                        <input type="text" value={form.name} name='name' onChange={e  => handleChange(e)} />
                        {
                            errors.name && (<p className={s.errors}>{errors.name}</p>)
                        }
                    </div>
                    <div className={s.options}>
                        <label>Image URL:</label>
                        <input type="text" value={form.image} name='image' onChange={e  => handleChange(e)} />
                        {/* {
                            errors.name && (<p className={s.errors}>{errors.name}</p>)
                        } */}
                    </div> 
                    <div className={s.options}>
                        <label>Description:</label>
                        <textarea type="text" value={form.description} name='description' onChange={e  => handleChange(e)}/>
                        {
                            errors.description && (<p className={s.errors}>{errors.description}</p>)
                        }
                    </div>
                    <div className={s.options}>
                        <label>Released:</label>
                        <input type="date" value={form.released} name='released' onChange={e  => handleChange(e)}/>
                        {
                            errors.released && (<p className={s.errors}>{errors.released}</p>)
                        }
                    </div>
                    <div className={s.options}>
                        <label>Rating:</label>
                        <input type="number" value={form.rating} name='rating' onChange={e  => handleChange(e)}/>
                        {
                            errors.rating && (<p className={s.errors}>{errors.rating}</p>)
                        }
                    </div>
                    <div className={s.options}>
                        <label>Platforms:</label>
                        <select onChange={e => handlePlatforms(e)}>
                        {
                                platforms.map((p, i) => {
                                    return(
                                        <option key={i} value={p}>{p}</option>
                                    )
                                })
                            }
                        </select>
                        {
                            errors.platforms && (<p className={s.errors}>{errors.platforms}</p>)
                        }
                                {
                                    form.platforms.map(p => (
                                        <li className={s.lista}>
                                            {p}
                                            <button onClick={() => handleDeletePlatforms(p)}>x</button>
                                        </li>
                                    ))
                                }
                    </div>
                    <div className={s.options}>
                        <label>Genres:</label>
                        <select onChange={e => handleGenres(e)}>
                            
                            {
                                genres.map(g => {
                                    return(
                                        <option value={g.name}>{g.name}</option>
                                    )
                                })
                            }
                        </select>
                        {
                            errors.genres && (<p className={s.errors}>{errors.genres}</p>)
                        }
                        {
                            form.genres.map(g => (
                                <li className={s.lista}>
                                    {g}
                                    <button onClick={() => handleDeleteGenre(g)}>x</button>
                                </li>
                            ))
                        }
                    </div>
                    <div className={s.flexBtn}>
                        {
                            Object.keys(errors).length === 0 && (<button className={s.button} type="submit">CREATE</button>)
                        }
                        {/* <button type="submit">CREATE</button> */}
                        <Link to={'/home'} style={{ textDecoration: 'none' }}>
                            <button className={s.button}>BACK</button>
                        </Link>
                    </div>
                    
                </form>
            </div>
             
        </div>
    )
}
export default CreateVideogame