import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogame } from "../actions"
import "./SearchBar.css"


const SearchBar = ({setCurrentPage}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        //console.log(name)
    }
    function handleSubmit(e) {
        e.preventDefault()
        if (!name) return alert("Write a videogame's name");
        dispatch(getNameVideogame(name));
        setName("")
        setCurrentPage(1)
    }
    
    return (
        <div className="style">
            <input
                className="input1"
                type="text"
                value={name}
                placeholder="SEARCH . . ."
                onChange={(e) => handleInputChange(e)}

            />

            <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="buttonbuscar"
            >
                <img
                className="imagenbutton"
                    width="50px"
                    height="50px"
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Original_PacMan.png"
                    alt="pokeball"
                />
            </button>
        </div>
    )
}

export default SearchBar;