import React from "react";
import "./Paginado.css"

export default function paginated({ videoGamesPerPage, allVideoGames, paginated, currentPage, setCurrentPage }) {
    const pageNumbers = [];

    for (let i = 1; i < Math.ceil(allVideoGames / videoGamesPerPage); i++) {
        pageNumbers.push(i);
    }
    // function handleClick2(e) {
    //     e.preventDefault();
    //     if (e.target.innerHTML === "Next" && currentPage < pageNumbers.length) {
    //         setCurrentPage(currentPage + 1);
    //     }
    //     if (e.target.innerHTML === "Previous" && currentPage > 1) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // }
    return (
        <nav >
            <ul>
                {/* <ul className="prev">
                    <button className="buttonp" onClick={(e) => handleClick2(e)}>Previous</button>
                </ul> */}
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <ul key={number}>
                            <button className="nume" onClick={() => paginated(number)}>{number} </button>
                        </ul>
                    ))}
                {/* <ul className="next">
                    <button className="buttonp" onClick={(e) => handleClick2(e)}>Next</button>
                </ul> */}
            </ul>
        </nav>
    )
}