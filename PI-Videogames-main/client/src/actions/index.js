import axios from "axios";

export const actionTypes = {
    getVideogames: "getVideogames",
    getGenres: "getGenres",
    filterByGenre: "filterByGenre",
    filterByCreator: "filterByCreator",
    orderByName: "orderByName",
    filterVideogamesByName: "filterVideogamesByName",
    createVideogame: "createVideogame",
    getDetails: "getDetails",
    getNameVideogame: "getNameVideogame",
    getPlatforms: "getPlatforms",
    deleteVideogame: "deleteVideogame",
    clearVideogameDetails: "clearVideogameDetails"
};

export const getVideogames = () => {
    return async function (dispatch) {
        var json = await axios.get(`/videogames`);
        return dispatch({
            type: actionTypes.getVideogames,
            payload: json.data,
        });
    };
};

export const getGenres = () => {
    return async function (dispatch) {
        var json = await axios.get(`/genres`);
        return dispatch({
            type: actionTypes.getGenres,
            payload: json.data,
        });
    };
};

export const getPlatforms = () => {
    return async function (dispatch) {
        var json = await axios.get(`/platforms`);
        return dispatch({
            type: actionTypes.getPlatforms,
            payload: json.data,
        })
    }
}

export const getNameVideogame = (name) => {
    return async function (dispatch) {
        try {
            return dispatch({
                type: actionTypes.getNameVideogame,
                payload: name
            })
        } catch (error) {
            return alert("Doesn't exist")
        }
    }
}

// La lógica la hago en el reducer o el componente, no acá
// payload puede ser cualquier genre
export const filterVideogamesByGenre = (genre) => {
    return {
        type: actionTypes.filterByGenre,
        payload: genre,
    };
};

export const filterVideogamesByCreator = (creator) => {
    return {
        type: actionTypes.filterByCreator,
        payload: creator,
    };
};


// Recibo un orderType, asc o desc y compareProp es la propiedad
// la cual voy a comparar, ya sea name o rating
export const orderByName = (orderType, compareProp) => {
    return {
        type: actionTypes.orderByName,
        payload: [orderType, compareProp],
    };
};

export const filterVideogamesByName = (name) => {
    return {
        type: actionTypes.filterVideogamesByName,
        payload: name,
    };
};


export function getDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/videogame/${id}`);
            return dispatch({
                type: actionTypes.getDetails,
                payload: json.data,
            });
        } catch (error) {
            return error.message;
        }
    };
}

export function createVideogame(payload) {
    return async function () {
        try {
            //console.log("intento hacer el post");
            const creado = await axios.post("/videogames", payload);
            //console.log("post realizado exitosamente");
            return creado;
        } catch (error) {
            console.log("mensaje del back:", error.message);
            throw new Error(error);
        }
    };
};

export function deleteVideogame(id) {
    return async function () {
        try {
            const eliminado = await axios.delete(`/videogame/delete/${id}`)
            return eliminado;
        } catch (error) {
            throw new Error(error)
        }
    }
};


export const clearVideogameDetails = () => {
    return {
        type: actionTypes.clearVideogameDetails
    }
}

