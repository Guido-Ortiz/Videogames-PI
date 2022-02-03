const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");
const { YOUR_API_KEY } = process.env;
const router = Router();

// router.get('/', async (req, res) => {
//     try{
//         const { name } = req.query
//         //let vg = []

//         // me pregunto si viene por queries ?
//         if(name){
//             // 1 ---> lo busco en la BD
//             let videogamesDb = await Videogame.findAll({
//                 where: {
//                     name: {
//                         [Op.iLike]: `%${name}%`
//                     },
//                 },
//                 // include: { model: Genre, as: 'genres' },
//                 // attributes: ['id', 'name'],
//                 // through: { attributes: [] }
//                 include: {
//                     model: Genre,
//                     as: "genres",
//                     attributes:["name", "id"],
//                     through: { attributes: [] },
//                 }
                  
//             })

//             // 2 --> lo busco en la api
//             let response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`)
//             const games = response.data.results.map(v => {
//                 return {
//                     name: v.name,
//                     genres: v.genres.map(g => {
//                         return {
//                             id: g.id,
//                             name: g.name
//                         }
//                     }),
//                     released: v.released,
//                     rating: v.rating,
//                     description: v.description,
//                     platforms: v.platforms.map(p => p.platform.name),
//                     image: v.background_image,
//                     createdDb: v.createdDb = false,
//                     id: v.id,
//                 };
//             })

//             // 3 --> concateno los resultados obtenidos
//             let videogamesFinal = videogamesDb.concat(games).splice(0,15)
//             res.send(videogamesFinal)
//         }
//         else{
//             // no vienen por queries
//             // 1 --> busco los de la bd
//             let databaseVideos = await Videogame.findAll({
//                 include: {
//                     model: Genre,
//                     as: "genres",
//                     attributes:["name", "id"],
//                     through: { attributes: [] },
//                 }
//               })
//             // 2 --> consulto a la api
//             let pages = 0;
//             let results = [...databaseVideos]; //sumo lo que tengo en la DB
//             let response = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`); // NO hay queries --> voy a buscar todos los juegos a la API

//             while (pages < 6) {
//                 pages++;
//                 //filtro solo la DATA que necesito enviar al FRONT
//                 // response.data es la respuesta provista por el servidor
//                 const gamesApi = response.data.results.map(v => {
//                     return {
//                         name: v.name,
//                         genres: v.genres.map(g => {
//                             return {
//                                 id: g.id,
//                                 name: g.name
//                             }
//                         }),
//                         released: v.released,
//                         rating: v.rating,
//                         description: v.description,
//                         platforms: v.platforms.map(p => p.platform.name),
//                         image: v.background_image,
//                         createdDb: v.createdDb = false,
//                         id: v.id,
//                     };
//                 });
//                 results = [...results, ...gamesApi]
//                 response = await axios.get(response.data.next) //vuelvo a llamar a la API con next
//             }
//             return res.json(results)
//             // 3 --> concateno los resultados
//         }
//     } catch(e){
//         console.log(e)
//     }

    

// //     //busco en la DB si tengo juegos creados y me traigo todos
// //     let videogamesDb = await Videogame.findAll({
// //         where: {
// //             name: {
// //                 [Op.iLike]: `%${name}%`
// //             },
// //         },
// //         include: { model: Genre, as: 'genres' },
// //         attributes: ['id', 'name'],
// //         through: { attributes: [] }
// //     });

// //     // si me pasan info por query --> /videogames?name="..."

// //     if (name) {
// //         try {
// //             //busco si existe el juego en la API
// //             let response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`);
// //             if (!response.data.count) return res.status(204).json(`Juego no encontrado "${name}"`);



// //             //filtro SOLO la data que necesito para enviarle al front
// //             const games = response.data.results.map(v => {
// //                 return {
// //                     name: v.name,
// //                     genres: v.genres.map(g => {
// //                         return {
// //                             id: g.id,
// //                             name: g.name
// //                         }
// //                     }),
// //                     released: v.released,
// //                     rating: v.rating,
// //                     description: v.description,
// //                     platforms: v.platforms.map(p => p.platform.name),
// //                     image: v.background_image,
// //                     createdDb: v.createdDb = false,
// //                     id: v.id,
// //                 };
// //             });

// //             //como antes me traje TODOS de la base de datos, si entro por queries, solo filtro los que coincidan con la busqueda
// //             const filteredGamesDb = videogamesDb.filter(g => g.name.toLowerCase().includes(name.toLowerCase()));
// //             //doy prioridad a la DB, y sumo todos, y corto el array en 15
// //             const results = [...filteredGamesDb, ...games.splice(0, 15)];
// //             //return res.json(results)
// //             return res.send(results)
// //         } catch (e) {
// //             return console.log(e)
// //         }
// //     } else { // NO hay queries

// //         try {
// //             let pages = 0;
// //             let results = [...videogamesDb]; //sumo lo que tengo en la DB
// //             let response = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`); // NO hay queries --> voy a buscar todos los juegos a la API

// //             while (pages < 6) {
// //                 pages++;
// //                 //filtro solo la DATA que necesito enviar al FRONT
// //                 // response.data es la respuesta provista por el servidor
// //                 const gamesApi = response.data.results.map(v => {
// //                     return {
// //                         name: v.name,
// //                         genres: v.genres.map(g => {
// //                             return {
// //                                 id: g.id,
// //                                 name: g.name
// //                             }
// //                         }),
// //                         released: v.released,
// //                         rating: v.rating,
// //                         description: v.description,
// //                         platforms: v.platforms.map(p => p.platform.name),
// //                         image: v.background_image,
// //                         createdDb: v.createdDb = false,
// //                         id: v.id,
// //                     };
// //                 });
// //                 results = [...results, ...gamesApi]
// //                 response = await axios.get(response.data.next) //vuelvo a llamar a la API con next
// //             }
// //             return res.json(results)
// //         } catch (err) {
// //             console.log(err)
// //             return res.sendStatus(500)
// //         }
// //     }



// })

let pageMap = (e) =>{
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
      let videogames = [];
      let { name } = req.query;
  
      if (name) {
        let dbVideogame = await Videogame.findAll({
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
        let resp = await axios.get(
          `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${name}`
        );
        for (let i = 0; i < 15; i++) {
          if (resp.data.results[i]) {
            videogames.push(resp.data.results[i]);
          }
        }
        let videogamesMap = videogames.map((e) =>{
          return pageMap(e)
        })
        let vgToSend = dbVideogame.concat(videogamesMap).slice(0, 15);
        res.send(vgToSend);
      } else {
        let resp = await axios.get(
          `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
        )
  
        let respLimited = resp.data.results;
  
        respLimited.map((e) => {
          let p1 = pageMap(e);
          return videogames.push(p1);
        });
  
        const resp2 = await axios.get(resp.data.next);
        let respLimited2 = resp2.data.results;
  
        respLimited2.map((e) => {
          let p2 = pageMap(e)
          return videogames.push(p2);
        });
  
        const resp3 = await axios.get(resp2.data.next);
        let respLimited3 = resp3.data.results;
        respLimited3.map((e) => {
          let p3 = pageMap(e);
          return videogames.push(p3);
        });
  
        const resp4 = await axios.get(resp3.data.next);
        let respLimited4 = resp4.data.results;
        respLimited4.map((e) => {
          let p4 = pageMap(e)
          return videogames.push(p4);
        });
  
        const resp5 = await axios.get(resp4.data.next);
        let respLimited5 = resp5.data.results;
        respLimited5.map((e) => {
          let p5 = pageMap(e);
          return videogames.push(p5);
        });
  
        let dbVg = await Videogame.findAll({
          attributes:{
            exclude: ["updatedAt", "createdAt"]
          },
          include: {
          model: Genre,
          as: "genres",
          attributes:["name", "id"],
          through: { attributes: [] },
          }
        });
  
        const vgConcatenated = dbVg.concat(videogames);
        res.json(vgConcatenated);
      }
    } catch (error) {
      console.log(error);
    }
  });



module.exports = router;
