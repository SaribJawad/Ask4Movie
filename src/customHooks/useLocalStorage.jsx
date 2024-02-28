import { useState, useEffect } from "react";

export function useLocalStorage(initialState, key) {
  const [watched, setWatched] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(
    function () {
      // effectively in sync wihtout local storage
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  return {
    watched,
    setWatched,
  };
}
