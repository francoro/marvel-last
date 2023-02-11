import { useCallback, useState, lazy, Suspense } from "react";
import "../App.css";
import { useFetchData } from "../hooks/useFetchData";
//import  CharactersTable  from "./CharactersTable";
import { Counter } from "./Counter";
import { Pagination } from "./Pagination";
import { SearchInput } from "./SearchInput";
import { Sort } from "./Sort";

const loadLazyComponent: any = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("./CharactersTable"));
    }, 1000);
  });

const CharactersTable = lazy(loadLazyComponent);

export const CharactersList = () => {
  const [term, setTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [times, setTimes] = useState(0);

  const [sortOrder, setSortOrder] = useState("asc");

  const { characters } = useFetchData({ offset, sortOrder });

  const handleSearch = useCallback((term: string) => {
    setTerm(term);
  }, []);

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
        <SearchInput onSearch={handleSearch} />
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
      <Suspense fallback={<div style={{ background: "red" }}>Loading...</div>}>
        <CharactersTable characters={characters} term={term} />
      </Suspense>
    </div>
  );
};
