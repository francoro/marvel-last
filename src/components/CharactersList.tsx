import { useCallback, useState, lazy, Suspense } from "react";
import "../App.css";
import { ICharacters, useFetchData } from "../hooks/useFetchData";
import { Counter } from "./Counter";
import { Pagination } from "./Pagination";
import { SearchInput } from "./SearchInput";
import { Sort } from "./Sort";
import { TodoList } from "./TodoList/TodoList";

import { useSelector, useDispatch } from "react-redux";

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

  const dispatch = useDispatch();

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

  // pass to component list of characters names saga check re renders in component
  // missing some fixes in types error in red files
  const data = useSelector((state: any) => state.data.characters);
  return (
    <div>
      <div>
        <SearchInput onSearch={handleSearch} />
        {/* Example of render props with useCallback maybe an overkill but wanted to have an example of render props XD */}
        <Counter
          onCount={onCount}
          render={useCallback(
            (times) => (
              <span style={{ padding: "0px 15px" }}>Counter: {times}</span>
            ),
            []
          )}
          times={times}
        />
        <Sort setSortOrder={onSort} sortOrder={sortOrder} />
      </div>

      <div>
        <Pagination
          currentPage={currentPage}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
        />
      </div>
      {/* add todo list CRUD */}
      <TodoList />

      <button onClick={() => dispatch({ type: "FETCH_REQUEST" })}>
        Get Characters Names By Redux Saga
      </button>
      <ul>
        {data?.map((item: ICharacters) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <Suspense fallback={<div style={{ background: "red" }}>Loading...</div>}>
        <CharactersTable characters={characters} term={term} />
      </Suspense>
    </div>
  );
};
