import { useState, useEffect } from "react";

export function useMovies(query, key) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchData() {
        try {
          setIsError("");
          setIsloading(true);
          const resp = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!resp.ok)
            throw new Error("Something went wrong while fetching the movies");

          const data = await resp.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setIsError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setIsError(err.message);
          }
        } finally {
          setIsloading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setIsError("");
        return;
      }

      fetchData();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, isError };
}
