import { useCallback, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { Counter } from "./Counter";
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

  const handleNextClick = () => {
    setOffset((prevOffset) => prevOffset + 10);
    setCurrentPage((nextCurrentPage) => nextCurrentPage + 1);
  };

  const handlePrevClick = () => {
    if (offset === 0) return;
    setOffset((prevOffset) => prevOffset - 10);
    setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
  };

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
        <button disabled={currentPage === 1} onClick={handlePrevClick}>
          Prev
          {currentPage}
        </button>
        <button onClick={handleNextClick}>
          Next
          {currentPage + 1}
        </button>
      </div>

      <table className="table-characters">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {characters
            .filter((item) => {
              if (term !== "") {
                return item.name.toLowerCase().includes(term);
              } else {
                return item;
              }
            })
            .map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <img
                      src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      alt="thumbnail"
                      width={"200px"}
                    />
                  </td>
                  <td>
                    <Link to={`/character/${item.id}`}>{item.name}</Link>
                  </td>
                  <td>
                    <p style={{ margin: 0 }}>{item.description}</p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
