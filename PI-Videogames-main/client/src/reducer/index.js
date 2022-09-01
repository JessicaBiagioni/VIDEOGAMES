import { actionTypes } from "../actions";

const initialState = {
    immutableVideogames: [],
    videogames: [],
    genres: [],
    videogameDetails: [],
    platforms: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.getVideogames: {
            let videogames = action.payload;
            videogames.forEach((videogame) => {
                videogame.genres = videogame.createdInDb ? videogame.genres.map((genre) => genre.name) : videogame.genres;
            });
            return {
                ...state,
                videogames: action.payload,
                immutableVideogames: action.payload,
            };
        }
        case actionTypes.getGenres: {
            return {
                ...state,
                genres: action.payload,
            };
        }
        case actionTypes.getPlatforms: {
            return {
                ...state,
                platforms: action.payload,
            };
        }
        case actionTypes.getNameVideogame: {
            console.log(action.payload)
            const gameName = state.immutableVideogames
            let nameVi = gameName.filter(v => {
                return v.name.toLowerCase().trim().includes(action.payload.toLowerCase().trim())
            })
            if (nameVi.length > 0) {
                return {
                    ...state,
                    videogames: nameVi
                }
            } else {
                return {
                    ...state,
                    videogames:state.immutableVideogames
                }
            }
        }
        case actionTypes.filterByGenre: {
            const allVideogames = state.immutableVideogames;
            const videogamesByGenres = allVideogames.filter((videogame) => videogame.genres.includes(action.payload));
            return {
                ...state,
                videogames: videogamesByGenres, //immutableVideogames nunca lo modifico, lo uso como auxiliar
            };
        }
        case actionTypes.filterByCreator: {
            const allVideogames = state.immutableVideogames;
            const createdByUser = action.payload === "user" ? true : undefined; //los de la api no tienen la propiedad createdInDB, por eso el undefined
            const videogamesByCreator = allVideogames.filter((videogame) => videogame.createdInDb === createdByUser);
            return {
                ...state,
                videogames: videogamesByCreator,
            };
        }
        case actionTypes.orderByName: {
            //unifico las comparaciones ascendentes y descendentes por rating o name
            const sortType = action.payload[0];
            const compareProp = action.payload[1];
            const allVideogames = state.immutableVideogames; //videogames
            let sortedVideogames = [];
            if (sortType === "A-Z" || sortType === "0-5") {
                //Ascendente
                sortedVideogames = allVideogames.sort(function (a, b) {
                    if (a[compareProp] > b[compareProp]) {
                        return 1;
                    }
                    if (b[compareProp] > a[compareProp]) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                sortedVideogames = allVideogames.sort(function (a, b) {
                    if (a[compareProp] > b[compareProp]) {
                        return -1;
                    }
                    if (b[compareProp] > a[compareProp]) {
                        return 1;
                    }
                    return 0;
                });
            }
            return {
                ...state,
                videogames: sortedVideogames,
            };
        }
        case actionTypes.filterVideogamesByName: {
            const videogames = state.immutableVideogames;
            let videogamesFiltered = videogames.filter((videogame) => {
                return videogame.name.toLowerCase().includes(action.payload.toLowerCase());
            });
            videogamesFiltered = videogamesFiltered.slice(0, 15);
            return {
                ...state,
                videogames: videogamesFiltered,
            };
        }
        case actionTypes.getDetails: {
            return {
                ...state,
                videogameDetails: action.payload,
            };
        }
        case actionTypes.deleteVideogame: {
            return {
                ...state,
                videogames: action.payload,
            };
        }
        case actionTypes.clearVideogameDetails: {
            return {
                ...state,
                videogameDetails: [],
            };
        }
        default:
            return state;
    }
};


export default rootReducer;