const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");
const { YOUR_API_KEY } = process.env;
const router = Router();


let render = (e) =>{
    return {
      name: e.name,
      genres: e.genres.map((e) => {
          return {
              id: e.id,
              name: e.name
          }
      }),
      released: e.released,
      rating: e.rating,
      description: e.description,
      platforms: e.platforms.map((e) => e.platform.name),
      image: e.background_image,
      createdInDb: e.createdInDb = false,
      id: e.id,
  }
}


router.get("/", async (req, res) => {
    try {
      let videogames = []

      let { name } = req.query
  
      if (name){

        let videogamesDb = await Videogame.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`
            }, 
          },
          include: {
            model: Genre,
            as: "genres",
            attributes:["name", "id"],
            through: { attributes: [] },
            }
        })
        let response = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${name}`);
        for (let i = 0; i < 15; i++) {
          if (response.data.results[i]) {
            videogames.push(response.data.results[i]);
          }
        }
        let videogamesArray = videogames.map((e) =>{
          return render(e)
        })
        let videogamesTotal = videogamesDb.concat(videogamesArray).slice(0, 15)
        res.send(videogamesTotal)
      } 
      else{
        
        let resp = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)
  
    
        resp.data.results.map(e => {
          let p1 = render(e)
          return videogames.push(p1)
        });

        const resp2 = await axios.get(resp.data.next);
        resp2.data.results.map((e) => {
          let p2 = render(e)
          return videogames.push(p2)
        });
  
        const resp3 = await axios.get(resp2.data.next);
        resp3.data.results.map(e => {
          let p3 = render(e)
          return videogames.push(p3)
        });
  
        const resp4 = await axios.get(resp3.data.next);
        resp4.data.results.map(e => {
          let p4 = render(e)
          return videogames.push(p4)
        });
  
        const resp5 = await axios.get(resp4.data.next);
        resp5.data.results.map(e => {
          let p5 = render(e)
          return videogames.push(p5)
        })

        const resp6 = await axios.get(resp5.data.next);
        resp6.data.results.map(e => {
          let p6 = render(e)
          return videogames.push(p6)
        })
  
        let videogamesDb = await Videogame.findAll({
          include: {
          model: Genre,
          as: "genres",
          attributes:["name", "id"],
          through: { attributes: [] },
          }
        });
  
        const videogamesTotal = videogamesDb.concat(videogames);
        res.json(videogamesTotal);
      }
    } catch(e){
      console.log(e);
    }
  });



module.exports = router;
