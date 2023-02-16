import {
  useCallback,
  useState,
  lazy,
  Suspense,
  useContext,
  ComponentType,
  useEffect,
} from "react";
import "../App.css";
import { ICharacters, useFetchData } from "../hooks/useFetchData";
import { Counter } from "./Counter";
import { Pagination } from "./Pagination";
import { SearchInput } from "./SearchInput";
import { Sort } from "./Sort";
import { TodoList } from "./TodoList/TodoList";
import { ThemeContext } from "../App";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useSelector, useDispatch } from "react-redux";
import { IParamsCharactersTable } from "./CharactersTable";

const loadLazyComponent = () =>
  new Promise<{ default: ComponentType<IParamsCharactersTable> }>((resolve) => {
    setTimeout(() => {
      resolve(import("./CharactersTable"));
    }, 1000);
  });

const CharactersTable = lazy(loadLazyComponent);

export const HomePage = () => {
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
        <Stack>
          <SearchInput onSearch={handleSearch} />
          {/* Example of render props with useCallback maybe an overkill but wanted to have an example of render props ha */}
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Counter
            onCount={onCount}
            render={useCallback(
              (times) => (
                <Typography variant="h6" mx={1}>
                  Times: {times}
                </Typography>
              ),
              []
            )}
            times={times}
          />
          <Box mr={0.8}>
            <Button size="small" variant="contained" onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </Box>
        </Stack>
      </div>

      <TodoList />

      <Button
        variant="outlined"
        onClick={() => dispatch({ type: "FETCH_REQUEST" })}
      >
        Get Characters Names By Redux Saga
      </Button>
      <ul>
        {data?.map((item: ICharacters) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <Sort setSortOrder={onSort} sortOrder={sortOrder} />
      <div>
        <Pagination
          currentPage={currentPage}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
        />
      </div>
      <Stack justifyContent={"center"} alignItems="center">
        <Suspense fallback={<div className="loading-spinner"></div>}>
          <CharactersTable characters={characters} term={term} />
        </Suspense>
      </Stack>
    </div>
  );
};
