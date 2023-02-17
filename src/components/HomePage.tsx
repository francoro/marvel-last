import {
  useCallback,
  useState,
  lazy,
  Suspense,
  useContext,
  ComponentType,
} from "react";
import "../App.css";
import { ICharacters, useFetchData } from "../hooks/useFetchData";
import { Counter } from "./Counter";
import { SearchInput } from "./SearchInput";
import { TodoList } from "./TodoList/TodoList";
import { ThemeContext } from "../App";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useSelector, useDispatch } from "react-redux";
import { IParamsCharactersTable } from "./CharactersTable";
import { SortTableHeader } from "./SortTableHeader";

const loadLazyComponent = () =>
  new Promise<{ default: ComponentType<IParamsCharactersTable> }>((resolve) => {
    setTimeout(() => {
      resolve(import("./CharactersTable"));
    }, 1000);
  });

const CharactersTable = lazy(loadLazyComponent);

export const HomePage = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>("asc");

  const [term, setTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [times, setTimes] = useState(0);

  const dispatch = useDispatch();

  const { characters, totalPages } = useFetchData({
    offset,
    sortOrder,
    rowsPerPage,
  });

  const handleSearch = useCallback((term: string) => {
    setTerm(term);
  }, []);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (currentPage === 0 && newPage === 0) return;
    if (currentPage > newPage) {
      setOffset((prevOffset) => prevOffset - rowsPerPage);
    } else {
      setOffset((prevOffset) => prevOffset + rowsPerPage);
    }
    setCurrentPage(newPage);
  };

  const onCount = useCallback((times: number) => {
    setTimes(times);
  }, []);

  const onSort = useCallback(
    (order: "asc" | "desc" | undefined) => {
      setSortOrder(order);
    },
    [sortOrder]
  );

  const data = useSelector(
    (state: { data: { characters: ICharacters[] } }) => state.data.characters
  );

  const SortTableHeaderComponent = (
    <SortTableHeader onSort={onSort} sortOrder={sortOrder} />
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
      <Stack justifyContent={"center"} alignItems="center">
        <Suspense fallback={<div className="loading-spinner"></div>}>
          <CharactersTable
            currentPage={currentPage}
            characters={characters}
            term={term}
            handleChangePage={handleChangePage}
            sortComponent={SortTableHeaderComponent}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            totalPages={totalPages}
          />
        </Suspense>
      </Stack>
    </div>
  );
};
