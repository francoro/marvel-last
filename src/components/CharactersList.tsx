import { useCallback, useState, lazy, Suspense, useContext } from "react";
import "../App.css";
import { ICharacters, useFetchData } from "../hooks/useFetchData";
import { Counter } from "./Counter";
import { Pagination } from "./Pagination";
import { SearchInput } from "./SearchInput";
import { Sort } from "./Sort";
import { TodoList } from "./TodoList/TodoList";
import { ThemeContext } from "../App";

import { useSelector, useDispatch } from "react-redux";

const loadLazyComponent: any = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("./CharactersTable"));
    }, 1000);
  });

const CharactersTable = lazy(loadLazyComponent);

export const CharactersList = () => {
  //why does not re render toggleDarkMode the other components?
  //when you destructure the context value using the useContext hook,
  //only the properties that are destructure and the components that use them will be subscribed to updates
  //from the context provider, and any sibling components that do not use those properties will not be affected
  // and will not be re-rendered.
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
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

  const data = useSelector(
    (state: { data: { characters: ICharacters[] } }) => state.data.characters
  );
  return (
    <div className={darkMode ? "dark" : "light"}>
      <div>
        <SearchInput onSearch={handleSearch} />
        {/* Example of render props with useCallback maybe an overkill but wanted to have an example of render props ha */}
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

        <button onClick={toggleDarkMode} style={{ marginRight: "10px" }}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <Sort setSortOrder={onSort} sortOrder={sortOrder} />
      </div>

      <div>
        <Pagination
          currentPage={currentPage}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
        />
      </div>
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
