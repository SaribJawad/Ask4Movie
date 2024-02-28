import { useState } from "react";
import Movie from "./Movie";

export default function MoviesList({ movies, handleSelecteMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          handleSelecteMovie={handleSelecteMovie}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
