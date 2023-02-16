import React from "react";
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
export interface IParamsCharactersTable {
  characters: ICharacters[];
  term: string;
}
const CharactersTable = ({ characters, term }: IParamsCharactersTable) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
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
