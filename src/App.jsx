import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import { useEffect, useState } from "react";
import NumResult from "./components/navbar/NumResults";
import Box from "./components/main/Box";
import WatchSummary from "./components/main/WatchSummary";
import WatchedMovieList from "./components/main/WatchedMovieList";
import Loader from "./components/loading/Loading";
import Error from "./components/loading/Error";
import SearchInput from "./components/navbar/SearchInput";
import MovieDetail from "./components/main/MovieDetail";
import MoviesList from "./components/main/MoviesList";
import { useMovies } from "./customHooks/useMovies";
import { useLocalStorage } from "./customHooks/useLocalStorage";

const key = "557ad651";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { watched, setWatched } = useLocalStorage([], "watched");

  const { movies, isLoading, isError } = useMovies(query, key);

  function handleSelecteMovie(id) {
    setSelectedId(selectedId === id ? null : id);
  }

  function handleCloseSelectedMovie() {
    setSelectedId(null);
  }

  function handleWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);

    localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function deleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <SearchInput query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !isError && (
            <MoviesList
              handleSelecteMovie={handleSelecteMovie}
              movies={movies}
            />
          )}
          {isError && <Error message={isError} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              onCloseMovie={handleCloseSelectedMovie}
              onAddWatched={handleWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={deleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
