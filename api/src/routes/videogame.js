const { Router, response } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { YOUR_API_KEY } = process.env;
const router = Router();


router.get(`/:idVideogame`, async (req, res) => {

    const { idVideogame } = req.params

    // me pregunto si esta en la bd
    if (idVideogame.includes("-")){
        let videogameDb = await videogamesDb(idVideogame);
        return res.json(videogameDb)
    }
    // lo busco en la api
    else {
        const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`)
        res.json({
            id: response.data.id,
            name: response.data.name,
            image: response.data.background_image,
            description: response.data.description_raw,
            released: response.data.released,
            rating: response.data.rating,
            platforms: response.data.platforms.map(p => p.platform.name),
            genres: response.data.genres.map(g => {
                return {
                    id: g.id,
                    name: g.name
                }
            })
        })
    }
})

router.post('/', async (req, res) => {
    let { name, description, released, rating, platforms, genres, createdDb} = req.body

    let videogameCreated = await Videogame.create({
      name, 
      description,
      released,
      rating,
      platforms,
      createdDb
    })

    let genresDb = await Genre.findAll({
      where: {
          name: genres
        }
      }
    )
    videogameCreated.addGenres(genresDb);
    res.send("Videogame created OK");
  })

async function videogamesDb(id) {
    try {
        return await Videogame.findByPk(id, {
            include: {
                model: Genre,
                as: 'genres',
                attributes: ['id', 'name'],
                through: { attributes: [] },
            },
        });
    } catch (e) {
        console.log(e)
    }
}

module.exports = router;