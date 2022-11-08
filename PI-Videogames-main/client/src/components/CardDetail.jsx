import { React, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, clearVideogameDetails } from "../actions";
import "./CardDetail.css"

const CardDetails = () => {
    const dispatch = useDispatch();
    const { idVideogame } = useParams(); //es el match.params.id del componente de clase
    const videogame = useSelector((state) => state.videogameDetails);

    useEffect(() => {
        dispatch(getDetails(idVideogame)); //cuando se monta
        return () => {dispatch(clearVideogameDetails())}
    }, [dispatch, idVideogame]);

    return videogame && videogame.image ? (

        <div className="conteiner">
            <div className="botonatras"><Link to="/home">
                <button className="goback">Go back</button>
            </Link></div>
            <div className="title">
                <h2>{videogame.name}</h2>
                <h4>{videogame.released}</h4>
            </div>
            <div className="title">
                <h3>{videogame.rating}/5 <img className="gifimage" src="http://25.media.tumblr.com/c7962f0a224f88f965e375a33953a8c5/tumblr_msh4mj2arL1scncwdo1_500.gif" alt="img nopt foung" /></h3>
            </div>
            <div className="imageAndDescription1">
                <img className="imagen" src={videogame.image} alt="videogame" width="400px" height="200px" />
            </div>
            <div className="imageAndDescription">
                <p className="descri">{videogame.description}</p>
                
            </div>
            <div>
                {videogame.platforms?.map((platform, index) => {
                    let parsedPlatform = platform;
                    if (!videogame.createdInDb) {
                        parsedPlatform = parsedPlatform.platform.name;
                    }
                    return (
                        <button className="videogames" name={parsedPlatform} key={index}>
                            {parsedPlatform}
                        </button>
                    );
                })}
            </div>

            <div>
                {videogame.genres?.map((genre, index) => {
                    let parsedGenre = genre;
                    if (videogame.createdInDb) {
                        parsedGenre = parsedGenre.name;
                    }
                    return (
                        <button className="genres" name={parsedGenre} key={index}>
                            {parsedGenre}
                        </button>
                    );
                })}
            </div>
        </div>
    ) : (
        <div>
            <img
                className="imge"
                src="https://popcorngame.fr/wp-content/uploads/2019/03/Test-gif-loading.gif"
                alt="not found"
            />
            <h1 className="title">Loading...</h1>
        </div>
    );
};

export default CardDetails;