import React from "react";
import { Link } from "react-router-dom";
import { ICharacters } from "../hooks/useFetchData";

export interface IParamsCharactersTable {
  characters: ICharacters[];
  term: string;
}
const CharactersTable = ({ characters, term }: IParamsCharactersTable) => {
  return (
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
  );
};

export default React.memo(CharactersTable);
