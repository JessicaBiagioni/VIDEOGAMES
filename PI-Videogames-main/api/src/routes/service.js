
const axios = require("axios");

const { Genre, Videogame } = require("../db");


const getApiInfo = async () => {
    const apiUrl = "https://api.rawg.io/api/games?key=75b3c28277a445df90ba2fa142bd65c0&page_size=40&page=";
    let apiData = [];

    await Promise.all([axios.get(apiUrl + 1), axios.get(apiUrl + 2), axios.get(apiUrl + 3)]).then((responses) => {
        apiData = responses[0].data.results.concat(responses[1].data.results).concat(responses[2].data.results);
    });

    return apiData.map((game) => ({
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.genres?.map((genre) => genre.name),
        rating: game.rating,
    }));
};

const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });
};

const getAllVideogames = async () => {
    let apiInfo = await getApiInfo();
    let dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

const listVideogames = async (req, res) => {
    try {
        const videogames = await getAllVideogames();
        const { name } = req.query;
        console.log(name)
        console.log(req.query)
        if (name) {
            let videogame = videogames.filter((game) => game.name.toLowerCase().includes(name.toLowerCase()));
            console.log(videogame)
            videogame = videogame.slice(0, 15);
            console.log(videogame)
            videogame[0]
                ? res.status(200).json(videogame)
                : res.status(404).send(`There are no games with "${name}" on its title`);
        } else {
            res.status(200).json(videogames);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getPlatforms = async () => {
    const apiPlat = await axios.get("https://api.rawg.io/api/platforms/lists/parents?key=75b3c28277a445df90ba2fa142bd65c0")
    const apiPlatMap = apiPlat.data.results.map(v => v.name)
    return apiPlatMap
}

const listPlatforms = async (req, res) => {
    try {
        const plat = await getPlatforms()
        res.status(200).json(plat)
    } catch (e) {
        res.status(400).send(error.message)
    }
}

const getGenres = async () => {
    const apiGenres = await axios.get("https://api.rawg.io/api/genres?key=75b3c28277a445df90ba2fa142bd65c0");
    const genres = apiGenres.data.results.map((genre) => {
        Genre.findOrCreate({
            where: { name: genre.name },
        });
        return genre.name;
    });
    return genres;
};

const listGenres = async (req, res) => {
    try {
        const dbGenres = await getGenres();
        res.status(200).json(dbGenres);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const videogameDetails = async (req, res) => {
    try {
        const { idVideogame } = req.params;
        //Diferencio entre videogames de API y DB porque los de DB tienen genres con otro formato
        if (isNaN(idVideogame)) {
            //es uno de mi DB, ya que yo uso un hash alfanumerico en el id
            const videogameDetails = await Videogame.findOne({
                where: { id: idVideogame },
                include: {
                    model: Genre,
                    attributes: ["name"], //el id lo trae solo
                    through: {
                        attributes: [],
                    },
                },
            });
            res.status(200).json(videogameDetails);
        } else {
            const detailsRequest = await axios.get(
                `https://api.rawg.io/api/games/${idVideogame}?key=75b3c28277a445df90ba2fa142bd65c0`
            );
            const videogameDetails = {
                name: detailsRequest.data.name,
                description: detailsRequest.data.description_raw,
                image: detailsRequest.data.background_image,
                platforms: detailsRequest.data.parent_platforms,
                genres: detailsRequest.data.genres.map((genre) => genre.name),
                rating: detailsRequest.data.rating,
                released: detailsRequest.data.released,
            };
            res.status(200).json(videogameDetails);
        }
    } catch (error) {
        res.status(404).send(error.message);
        //res.status(404).send(`There is no videogame with the id "${idVideogame}"`);
    }
};

const createVideogame = async (req, res) => {
    try {
        let { name, description, released, rating, platforms, image, createdInDb, genres } = req.body;
        released = released.replace("-", "/");
        if (!name || !description || !platforms[0] || !genres[0] || !rating || rating < 0 || rating > 5)
            throw new Error("Check data: name, description, rating(0-5), platforms and genres are required");

        const newVideogame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            image,
            createdInDb,
        });

        const videogameGenres = await Genre.findAll({
            where: { name: genres },
        });

        videogameGenres.forEach((genre) => {
            newVideogame.addGenre(genre);
        });

        res.status(200).send("Videogame created successfully");
        // res.status(201).json(newVideogame);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const deleteVideogame = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            //es uno de mi DB, ya que yo uso un hash alfanumerico en el id
            const deleteResponse = await Videogame.destroy({
                where: { id: id },
            });
            //actualizo mi DB:
            getAllVideogames();
            if (deleteResponse) {
                return res.status(200).json("Videogame deleted successfully");
            } else {
                return res.status(404).send("Videogame not found");
            }
        } else {
            return res.status(404).send("Invalid id");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};



module.exports = { videogameDetails, listGenres, createVideogame, listVideogames, listPlatforms, deleteVideogame,  } //nombreVideogame, updateVideogame


// const updateVideogame = async (req, res) => {
// try {
//     const {id, name, description, rating} = req.body;
//     console.log(id, name);
//     await Videogame.update(
//         {
//             name,
//             description,
//             rating,
//         },
//         {where: {name}}
//     );
//     res.status(200).send("Videogame updated")
// } catch (error) {
//     res.status(400).send(error.message)
// }
// }


// const nombreVideogame = async (req, res) => {
//     try {
//         const {name} = req.params;
//         const apiName = await axios.get(`https://api.rawg.io/api/games?key=75b3c28277a445df90ba2fa142bd65c0&search=${name}`);
//         let result
//         if (name) {
//         result = apiName.data.results.map((game) => ({
//                 id: game.id,
//                 image: game.background_image,
//                 genres: game.genres?.map((genre) => genre.name),
//                 rating: game.rating,
//             }))}
//             console.log(result)
//             res.status(201).send(result);
//     } catch (e) {
//         console.log(e)
//         res.status(404).send("no funciona")
//     }
// }