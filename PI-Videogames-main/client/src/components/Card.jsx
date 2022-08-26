import React from "react";
import { Link } from "react-router-dom";
import { deleteVideogame, getVideogames } from "../actions";
import { useDispatch } from "react-redux";
import "./Card.css"
import { useHistory } from "react-router-dom";

const Card = ({ name, genres, image, id, createdInDb }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    function handleDelete() {
        if (window.confirm("Do you really want to delete your game?")) {
            dispatch(deleteVideogame(id))
            dispatch(getVideogames())
            alert("GAME OVER")
        } else {
            alert("Ok, im watching, maybe next time!")
            dispatch(getVideogames())
            history.push("/home")
        }
    }

    return (
        <div className="container">
            <Link to={`/detail/${id}`}>

                <div className="card">
                    <div>
                        <img className="imag" src={image} alt="not found" />
                        <h3 className="name">{name}</h3>
                    </div>
                    <div >
                        {genres?.map((genre, index) => (
                            <button className="genresb" key={index}>{genre}</button>
                        ))}
                    </div>
                </div>
            </Link>
            {createdInDb ? <button className="deletebutton" onClick={() => handleDelete()}>
                GAME OVER
            </button> : false}
        </div>
    );
};

//<img src="https://33.media.tumblr.com/ac773145dc2c49b7fcf0f19f68c45d5c/tumblr_nbrno45IbJ1s1rd1xo1_250.gif"    />

export default Card;