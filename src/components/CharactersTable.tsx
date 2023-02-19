import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Box, TablePagination, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ICharacters } from "../models";
import { SelectsTable } from "./SelectsTable";
export interface IParamsCharactersTable {
  characters: ICharacters[];
  term: string;
  sortComponent: React.ReactElement;
  currentPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  rowsPerPage: number;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalPages: number | undefined;
}

const CharactersTable = React.memo(
  ({
    characters,
    term,
    sortComponent: SortComponent,
    currentPage,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    totalPages,
  }: IParamsCharactersTable) => {
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
      <>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Image</TableCell>
                <TableCell>{SortComponent}</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Series</TableCell>
                <TableCell>Events</TableCell>
                <TableCell>Stories</TableCell>
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
                          <Box sx={{ margin: 0 }}>
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
                          </Box>
                        </Stack>
                      </TableCell>
                      <SelectsTable />
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPages ?? 0}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    );
  }
);

export default React.memo(CharactersTable);
