import {
    GET_GENRES,
    GET_VIDEOGAMES,
    FILTER_BY_GENRE,
    ORDER_BY_RATING,
    ORDER_BY_ALPHABET,
    FILTER_CREATED
} from "../actions/constants";

const initialstate = {
    videogames: [],
    genres: [],
    allVideogames: []
}

function rootReducer(state = initialstate, action) {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case FILTER_BY_GENRE:
            const all = state.allVideogames
            console.log(state.allVideogames)
            const filterGenre = action.payload === 'all' ? all : all.filter(v => v.genres.find(g => g.name === action.payload))
            // : allVideogames.find(g => g.name === action.payload)
            return {
                ...state,
                videogames: [...filterGenre],
            }



        case ORDER_BY_RATING:
            let orderRating = [...state.allVideogames]
            if (action.payload === 'none') {
                return {
                    ...state,
                    videogames: [...state.allVideogames]
                }
            }
            if (action.payload === 'rating_desc') {
                return {
                    ...state,
                    videogames: orderRating.sort(function (a, b) {
                        if (a.rating > b.rating) {
                            return 1
                        }
                        if (a.rating < b.rating) {
                            return -1
                        }
                        return 0
                    })
                }
            }
            if (action.payload === 'rating_asc') {
                return {
                    ...state,
                    videogames: orderRating.sort(function (a, b) {
                        if (a.rating > b.rating) {
                            return -1
                        }
                        if (a.rating < b.rating) {
                            return 1
                        }
                        return 0
                    })
                }
            }


        case ORDER_BY_ALPHABET:
            let orderName = [...state.allVideogames]
            if (action.payload === 'none') {
                return {
                    ...state,
                    videogames: [...state.allVideogames]
                }
            }
            if (action.payload === 'asc') {
                return {
                    ...state,
                    videogames: orderName.sort(function (a, b) {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1
                        }
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1
                        }
                        return 0
                    })
                }
            }
            if (action.payload === 'desc') {
                return {
                    ...state,
                    videogames: orderName.sort(function (a, b) {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1
                        }
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return 1
                        }
                        return 0
                    })
                }
            }

        case FILTER_CREATED:
            const vgs = state.allVideogames;
            console.log(action.payload)
            const filterByOrigin =
                action.payload === "db"
                    ? vgs.filter((e) => e.createdDb === true)
                    : vgs.filter((e) => e.createdInDb === false);
            return {
                ...state,
                videogames:
                    action.payload === "all" ? state.allVideogames : filterByOrigin,
            }
        default:
            return state
    }
}

export default rootReducer