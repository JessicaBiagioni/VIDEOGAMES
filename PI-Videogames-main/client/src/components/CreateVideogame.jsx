import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getGenres, createVideogame, getPlatforms } from "../actions";
import "./CreateVideogame.css"


const CreateVideogame = () => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);
  const allPlatforms = useSelector((state)=> state.platforms);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms())
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    image:
      "https://img.freepik.com/premium-photo/outstanding-concept-glowing-gamepad-multiple-black-joysticks-background-3d-rendering_1379-4881.jpg?w=2000",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  });


  function handleSubmit(e) {
    e.preventDefault()
    let validacion = (
      validate(input)
    );
    setErrors(validacion)

    if (Object.keys(validacion).length > 0) {
      alert("Check data: name, description, rating(0-5), platforms and genres are required")
      return
    }
    dispatch(createVideogame(input))
    alert(`Videogame ${input.name} has been added`)
    setInput({
      name: "",
      image:
        "https://img.freepik.com/premium-photo/outstanding-concept-glowing-gamepad-multiple-black-joysticks-background-3d-rendering_1379-4881.jpg?w=2000",
      description: "",
      released: "",
      rating: "",
      platforms: [],
      genres: [],
    });
    history.push("/home")
    window.location.reload()

    function validate(input) {
      let errors = {};

      if (!/^[a-zA-Z\s]*$/.test(input.nombre)) {
        errors.name = "You can only use letters";
      } else if (!input.rating) {
        errors.rating = "Rating required"
      } else if (Number(input.rating) > 5 || Number(input.rating) < 1 || isNaN(Number(input.rating))) {
        errors.rating = "Rating 1 / 5"
      } else if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating)) {
        return alert("Rating should be a number between 1-5")
      } else if (!input.released) {
        errors.released = "Released date is Required"
      } else if (!input.description) {
        errors.description = "Description is Required"
      } else if (input.description.length < 10) {
        errors.description = "Your description is too short, get creative!"
      } else if (input.genres.length < 1) {
        errors.genres = "Select a genre"
      } else if (input.platforms.length < 1) {
        errors.platforms = "Select a Platform"
      } return errors;
    }
  }

  const handleFormChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };


  const handleGenres = (e) => {
    e.preventDefault();
    const genre = e.target.value;
    if (!input.genres.includes(genre)) {
      setInput({
        ...input,
        genres: [...input.genres, genre],
      });
    }
  };


  const handleRemoveGenre = (e) => {
    e.preventDefault();
    const genreToRemove = e.target.name;
    console.log("genres:", input.genres);
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== genreToRemove),
    });
    console.log("genres:", input.genres);
    alert(`Genre ${e.target.name} deleted`);
  };

  // const handleCheckbox = (e) => {
  //   if (e.target.checked) {
  //     setInput({
  //       ...input,
  //       platforms: [...input.platforms, e.target.name],
  //       //cambio su valor cada vez que toca la checkbox, luego solo me traigo los true al crear el videogame
  //     });
  //   } else {
  //     setInput({
  //       ...input,
  //       platforms: input.platforms?.filter((platform) => platform !== e.target.name),
  //       //cambio su valor cada vez que toca la checkbox, luego solo me traigo los true al crear el videogame
  //     });
  //   }
  // };

  return (
    <div className="fondoform">

      <Link to="/home">
        <button className="goback2">Go back</button>
      </Link>

      <h1 className="tituloform">Create videogame</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="name" className="letraslabel">Name</label>
          <input
            className="inputname"
            type="text"
            name="name"
            autoComplete="off"
            defaultValue={input.name}
            onChange={(e) => {
              return handleFormChange(e);
            }}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className="letraslabel">Description</label>
          <textarea
            className="inputdes"
            cols={30}
            rows={8}
            maxLength={400}
            placeholder="Describe your game, 300 characters max"
            type="text"
            name="description"
            autoComplete="off"
            defaultValue={input.description}
            onChange={(e) => handleFormChange(e)}
            required
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="released" className="letraslabel">Released date</label>
          <input
            className="inputda"
            type="date"
            name="released"
            autoComplete="off"
            defaultValue={input.released}
            onChange={(e) => handleFormChange(e)}
          />
          {errors.released && <p className="error">{errors.released}</p>}
        </div>
        <div>
          <label htmlFor="rating" className="letraslabel">Rating</label>
          <input
            className="inputda"
            type="number"
            name="rating"
            autoComplete="off"
            defaultValue={input.rating}
            onChange={(e) => handleFormChange(e)}
          />
          {errors.rating && <p className="error">{errors.rating}</p>}
        </div>

        {/* <div>
          <label htmlFor="platforms" className="letraslabel">Platforms</label>
          <div>
            {videogamesPlatforms.map((platform) => (
              <label htmlFor="accept" className="inputche" key={platform}>
                <input type="checkbox"
                className="inputche"
                  name={platform}
                  defaultValue={input.platforms}
                  onChange={(e) => handleCheckbox(e)} />
                {platform}
              </label>
            ))}
            {errors.platforms && <p className="error">{errors.platforms}</p>}
          </div>
        </div> */}
        <div>
          <select>
            <option selected disabled>
              Platforms
            </option>
            <option>
              {allPlatforms.map((platform) =>(
                <option
                key={platform}
                defaultValue={platform}> {platform} </option>
              ))}
            </option>
          </select>
        </div>

        <div>
          {/* <label htmlFor="genres" className="letraslabel">Genres</label> */}
          <select className="inputgenre" onChange={(e) => handleGenres(e)}>
            <option selected disabled>
              Genres
            </option>
            {allGenres.map((genre, index) => (
              <option
                key={index}
                defaultValue={genre}>
                {genre}
              </option>
            ))}
          </select>
          <ul >
            {input.genres?.map((genre, index) => (
              <li className="lista">
                <button className="goback1" key={index} name={genre} onClick={(e) => handleRemoveGenre(e)}>
                  {genre}
                </button>
              </li>
            ))}
            {errors.name && <p className="error">{errors.genres}</p>}
          </ul>
        </div>
        <button className="goback2" type="submit"
          onClick={(e) => handleSubmit(e)}>
          Create
        </button>
      </form>
    </div>
  )

};

export default CreateVideogame;