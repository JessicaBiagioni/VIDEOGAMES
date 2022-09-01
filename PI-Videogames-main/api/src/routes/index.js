const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const {  createVideogame, videogameDetails, listGenres, listVideogames, listPlatforms, deleteVideogame,  updateVideogame } = require("./service") 
//nombreVideogame,

router.get("/platforms", listPlatforms);
router.get("/videogame/:idVideogame", videogameDetails);
router.get("/videogames", listVideogames);
router.get("/genres", listGenres);

//router.get("/videogames/:name", nombreVideogame)

router.post("/videogames", createVideogame);

router.delete("/videogame/delete/:id", deleteVideogame);
router.put("/update", updateVideogame)

module.exports = router;
