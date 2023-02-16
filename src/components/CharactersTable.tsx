import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICharacters } from "../hooks/useFetchData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
export interface IParamsCharactersTable {
  characters: ICharacters[];
  term: string;
}
const CharactersTable = ({ characters, term }: IParamsCharactersTable) => {
  const savedFavorites = localStorage.getItem("favorites");
  const initialFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

  const [favorites, setFavorites] = useState(initialFavorites);

  const handleFavoriteToggle = (itemId: number) => {
    const index = favorites.indexOf(itemId);
    if (index === -1) {
      setFavorites([...favorites, itemId]);
    } else {
      setFavorites(favorites.filter((id: number) => id !== itemId));
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
                <TableRow key={item.id}>
                  <TableCell>
                    {favorites.includes(item.id) ? (
                      <FavoriteIcon
                        onClick={() => handleFavoriteToggle(item.id)}
                        color={"error"}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        onClick={() => handleFavoriteToggle(item.id)}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <img
                      src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      alt="thumbnail"
                      width={"200px"}
                    />
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Stack>
                      <Link to={`/character/${item.id}`}>{item.name}</Link>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Stack>
                      <Typography style={{ margin: 0 }}>
                        {item.description === "" ? (
                          <Typography
                            variant="body1"
                            sx={{ fontStyle: "italic", color: "grey" }}
                          >
                            No description
                          </Typography>
                        ) : (
                          item.description
                        )}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(CharactersTable);
