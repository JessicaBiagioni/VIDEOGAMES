import React from "react";
import { Link } from "react-router-dom";
import "./Card.css"

const Card = ({ name, genres, image, id }) => {
    //const dispatch = useDispatch();
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
        </div>
    );
};

export default Card;