const { Router } = require("express");
const axios = require("axios");
const { Genre } = require("../db");
const { YOUR_API_KEY } = process.env;
const router = Router();

async function getGenres(){
    const genres = await Genre.findAll()
    if(!genres.length){
        // no encontro nada, a buscar a la api
        try{
            const response = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
            const genresApi = response.data.results.map(g => {
                return {
                  id: g.id,
                  name: g.name,
                };
            });
            genresApi.map(async (g) => await Genre.findOrCreate({
                where: {
                  id: g.id,
                  name: g.name,
                },
              })
            )
            return{
                genres: genresApi
            }
        } catch(e){
            console.log(e)
        }
    }
    else{
        return{
            genres: genres
        }
    }
}

router.get('/', async (req, res) => {
    const {genres} = await getGenres()
    res.json(genres)
})


module.exports = router;