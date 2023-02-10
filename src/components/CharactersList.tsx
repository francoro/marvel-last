import React from "react";
import { useCallback, useState } from "react";
import "../App.css";
import { useFetchData } from "../hooks/useFetchData";
import { CharactersTable } from "./CharactersTable";
import { Counter } from "./Counter";
import { Pagination } from "./Pagination";
import { Sort } from "./Sort";

export const CharactersList = () => {
  const [term, setTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [times, setTimes] = useState(0);

  const [sortOrder, setSortOrder] = useState("asc");

  const { characters } = useFetchData({ offset, sortOrder });

  const handleSearch = (term: string) => {
    setTerm(term);
  };

  const handleNextClick = useCallback(() => {
    setOffset((prevOffset) => prevOffset + 10);
    setCurrentPage((nextCurrentPage) => nextCurrentPage + 1);
  }, []);

  const handlePrevClick = useCallback(() => {
    if (offset === 0) return;
    setOffset((prevOffset) => prevOffset - 10);
    setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
  }, [offset]);

  const onCount = useCallback((times: number) => {
    setTimes(times);
  }, []);

  const onSort = useCallback((order: string) => {
    setSortOrder(order);
  }, []);

  return (
    <div>
      <div>
        <h3>Search</h3>
        <input type="text" onChange={(e) => handleSearch(e.target.value)} />
        <Counter times={times} onCount={onCount} />
        <Sort setSortOrder={onSort} sortOrder={sortOrder} />
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
        />
      </div>
      <CharactersTable characters={characters} term={term} />
    </div>
  );
};
