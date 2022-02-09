import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createVideogamegame, getGenres, getVideogames } from "../../actions/actions";
import Title from "../Title/Title";
import s from './CreateVideogame.module.css';

const validate = (values) => {
    const errors = {}
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
    if(values.platforms.length === 0){
        console.log(values.platforms)
        errors.platforms = 'Platform is required'
    } 
    if(values.genres.length === 0){
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
        console.log(form)
        
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
            [e.target.genres]: e.target.value
        }))   
    }

    function handlePlatforms(e){
        setForm({
            ...form,
            platforms: [...form.platforms, e.target.value]
        })
        setErrors(validate({
            ...form,
            [e.target.platforms]: e.target.value
        }))   
    }

    function handleSubmit(e){
        e.preventDefault()

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
                                        <li>
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
                                <li>
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
                        <Link to={'/home'}>
                            <button className={s.button}>BACK</button>
                        </Link>
                    </div>
                    
                </form>
            </div>
             
        </div>
    )
}
export default CreateVideogame









// import React, { useState, useEffect } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import { getGenres, getPlatforms, createVideogamegame } from '../../actions/actions'
// import { useDispatch, useSelector } from 'react-redux';



// function validate(input) {
//     let errors = {}
//     if (!input.name) {
//         errors.name = "Name is required"
//     }
//     if (!input.description) {
//         errors.description = "Description is required"
//     }
//     if (!input.rating || input.rating > 5 || input.rating < 0) {
//         errors.rating = "Rating valid 0 - 5"
//     } 
//     if (!input.released) {
//         errors.released = "Date is required"
//     } 
//     if (input.platforms.length < 1) {
//         errors.platforms = "Enter platforms"
//     } else {
//         errors.platforms = ""
//     }
//     if (input.genres < 1) {
//         errors.genres = "Enter genres"
//     } else {
//         errors.platforms = ""
//     }
//     return errors
// }


// export default function CreateVideogame() {
//     const dispatch = useDispatch()
//     const history = useHistory()

//     const genres = useSelector((state) => state.genres)
//     //const platforms = useSelector((state) => state.platforms)


//     const [errors, setErrors] = useState({})
//     const [input, setInput] = useState({
//         name: "",
//         description: "",
//         released: "",
//         rating: "",
//         background_image: "",
//         genres: [],
//         platforms: []
//     })



//     //----------Inputs---------
//     function handleInputChange(e) {
//         setErrors(validate({
//             ...input,
//             [e.target.name]: e.target.value
//         }))
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value
//         })
//     }
//     //-----Select genres----
//     function handleGenreSelect(e) {
//         setInput({
//             ...input,
//             genres: [...input.genres, e.target.value]
//         })
//         setErrors(validate({
//             ...input,
//             [e.target.genres]: e.target.value
//         }))
//     }
//     //-----Select platfroms----
//     function handlePlatformsSelect(e) {
//         setInput({
//             ...input,
//             platforms: [...input.platforms, e.target.value]
//         })
//         setErrors(validate({
//             ...input,
//             [e.target.platforms]: e.target.value
//         }))
//     }

//     //---------Send form--------
//     function handleSubmit(e) {
//         if (input.name === "") {
//             e.preventDefault()
//             alert("Completar correctamente el formulario")
//         } else {
//             e.preventDefault();
//             dispatch(createVideogamegame(input))
//             alert("Videogame created succesfully!!")
//             setInput({
//                 name: "",
//                 description: "",
//                 platforms: "",
//                 released: "",
//                 rating: "",
//                 background_image: "",
//                 genres: [],
//                 platforms: [] 
//             })
//             history.push('/home')
//         }
//     }

//     //---------Delete genres---------
//     function handleGenreDelete(el) {
//         setInput({
//             ...input,
//             genres: input.genres.filter(genre => genre !== el)
//         })
//     }

//     //---------Delete platforms--------
//     function handlePlatformDelete(el) {
//         setInput({
//             ...input,
//             platforms: input.platforms.filter(platform => platform !== el)
//         })
//     }

//     useEffect(() => {
//         dispatch(getGenres());
//         //dispatch(getPlatforms())

//     }, [dispatch]);




//     return (
//         <div >
//             <h1 >CREATE GAME</h1>
//             <form  onSubmit={(e) => handleSubmit(e)}>
//                 <div>
//                     <label >Name</label>
//                     <input                      
//                         type="text"
//                         value={input.name}
//                         name="name"
//                         onChange={(e) => handleInputChange(e)}
//                     />
//                     {
//                         errors.name && (
//                             <p > {errors.name} </p>
//                         )
//                     }
//                 </div>

//                 <div>
//                     <label >Rating</label>
//                     <input
//                         type="number"bname="rating"bvalue={input.rating}bonChange={e => handleInputChange(e)}
//                     />
//                     {
//                         errors.rating && (<div > {errors.rating} </div>)
//                     }
//                 </div>

//                 <div>
//                     <label >Release Date</label>
//                     <input
                        
//                         type="text"
//                         value={input.released}
//                         name="released"
//                         onChange={(e) => handleInputChange(e)}
//                     />
//                     {
//                         errors.released && (
//                             <div > {errors.released} </div>
//                         )
//                     }
//                 </div>

//                 <div >
//                     <label  >Image:</label>
//                     <input
                       
//                         type="url"
//                         name="background_image"
//                         value={input.background_image}
//                         onChange={(e) => handleInputChange(e)}
//                     />
//                 </div>

//                 <div>
//                     <label >Description</label>
//                     <textarea
//                         type="text"
//                         value={input.inputDescription}
//                         name="description"
//                         onChange={(e) => handleInputChange(e)}
//                         rows="5" cols="45"
//                     />
//                     {
//                         errors.description && (
//                             <p > {errors.description} </p>
//                         )
//                     }
//                 </div>

//                 {/* <div >
//                     <label  >Platforms</label>
//                     <select  onChange={(e) => handlePlatformsSelect(e)}>
//                         {
//                             platforms.map((e) => (
//                                 <option value={e.name}> {e.name} </option>
//                             ))
//                         }
//                     </select>
//                     {input.platforms.map(e => (
//                         <div>
//                             <li >{e}<button
                                
//                                 type="button"
//                                 onClick={() => handlePlatformDelete(e)}
//                             >X</button>
//                             </li>
//                         </div>
//                     ))}
//                     {
//                         errors.platforms && (
//                             <p > {errors.platforms} </p>
//                         )
//                     }
//                 </div > */}

//                 <div >
//                     <label >Genres</label>
//                     <select onChange={(e) => handleGenreSelect(e)}>
//                         {
//                             genres.map((e) => (
//                                 <option value={e.name}> {e.name} </option>
//                             ))
//                         }
//                     </select>
//                     <ul>
//                         {input.genres.map(e => (
//                             <div>
//                                 <li >{e}<button
                                    
//                                     type="button"
//                                     onClick={() => handleGenreDelete(e)}
//                                 >X</button>
//                                 </li>
//                             </div>
//                         ))}
//                     </ul>
//                     {
//                         errors.genres && (
//                             <p  > {errors.genres} </p>
//                         )
//                     }
//                 </div>
//                 {
//                     errors && (errors.name || errors.rating || errors.description || errors.genres || errors.platforms) ?
//                         <p  >Complete Form</p>
//                         : <button type="submit">ADD VIDEOGAME</button>
//                 }
//             </form>
//             <Link to="/home">
//                 <button >Home</button>
//             </Link>
//         </div>
//     )
// }
