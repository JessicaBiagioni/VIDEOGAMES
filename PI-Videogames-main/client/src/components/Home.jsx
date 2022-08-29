import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres, filterVideogamesByGenre, filterVideogamesByCreator, orderByName} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css"

const Home = () => {
    const dispatch = useDispatch();
    //useSelector funciona como el mapStateToProps
    const allVideogames = useSelector((state) => state.videogames);
    const allGenres = useSelector((state) => state.genres);
    // const [nameFilter, setNameFilter] = useState("");
    const [order, setOrder] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [videoGamesPerPage] = useState(15); //setVideoGamesPerPage
    const indexOfLastVideoGame = currentPage * videoGamesPerPage;
    const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPerPage;
    const currentVideoGames = allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame);

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    //Cuando mi componente se monte, quiero despachar las actions para que mi estado 
    //tenga los videogames y genres de la API y DB:

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    }, [dispatch]);

    function handleClickReload(e) {
        e.preventDefault();
        dispatch(getVideogames())
    }

    const handleFilterByGenre = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterVideogamesByGenre(e.target.value));
    };

    const handleFilterByCreator = (e) => {
        e.preventDefault();
        dispatch(filterVideogamesByCreator(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    };

    const handleOrderByName = (e) => {
        e.preventDefault();
        const value = e.target.value;
        if (value === "A-Z" || value === "Z-A") {
            dispatch(orderByName(value, "name"));
        } else {
            dispatch(orderByName(value, "rating"));
        }
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    };

    return (
        <div className="c1">
            <SearchBar setCurrentPage={setCurrentPage} />
            <div className="c2">
                <Link className="hpbot1" to="/create">CREATE VIDEOGAME</Link>
                <h1 className="titulo">VIDEOGAMES</h1>
                <button className="hpbot" onClick={(e) => { handleClickReload(e) }}>RELOAD GAMES</button>

                <div>
                    <select className="hpfilter" onChange={(e) => handleOrderByName(e)}>
                        <option selected disabled>
                            Order
                        </option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="0-5">0-5</option>
                        <option value="5-0">5-0</option>
                    </select>
                    <select className="hpfilter" onChange={(e) => handleFilterByGenre(e)}>
                        {allGenres.map((genre, index) => (
                            <option key={index} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                    <select className="hpfilter" onChange={(e) => handleFilterByCreator(e)}>
                        <option value="api">API games</option>
                        <option value="user">User games</option>
                    </select>
                </div>
                <div className="c4">
                    <Paginado
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        videoGamesPerPage={videoGamesPerPage}
                        allVideoGames={allVideogames.length}
                        paginated={paginated}
                    />
                </div>
                <div className="positions">
                    {currentVideoGames && currentVideoGames?.map((videogame, index) => {
                        console.log(index, videogame)
                        return (
                            <Card
                                createdInDb={videogame.createdInDb}
                                key={index}
                                name={videogame.name}
                                image={videogame.image}
                                genres={videogame.genres}
                                id={videogame.id}
                            />
                        );
                    })}</div>
            </div>
        </div>
    )

}

export default Home;