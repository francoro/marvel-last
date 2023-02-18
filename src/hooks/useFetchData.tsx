import { useEffect, useMemo, useState } from "react";
import { Md5 } from "md5-typescript";
import { ICharacters } from "../models";

interface IParamsFetchData {
  id?: string;
  offset?: number;
  sortOrder?: string;
  rowsPerPage?: number;
}

export const useFetchData = ({
  id,
  offset,
  sortOrder,
  rowsPerPage,
}: IParamsFetchData) => {
  const [characters, setCharacters] = useState<ICharacters[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  useEffect(() => {
    const publicKey = process.env.REACT_APP_PUBLIC_KEY;
    const privateKey = process.env.REACT_APP_PRIVATE_KEY ?? "";
    const ts = new Date().getTime();
    const stringToHash = ts + privateKey + publicKey;
    const hash = Md5.init(stringToHash);

    let url: string;

    if (id) {
      url = `http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    } else {
      url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=${rowsPerPage}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const totalCharacters = data.data.total;
        const totalPages = Math.ceil(totalCharacters / 10);
        setTotalPages(totalPages);
        setCharacters(data.data.results);
      });
  }, [offset, rowsPerPage]);

  useMemo(() => {
    const charactersSorted =
      sortOrder === "asc"
        ? [...characters].sort((a, b) => a.name.localeCompare(b.name))
        : [...characters].sort((a, b) => b.name.localeCompare(a.name));

    setCharacters(charactersSorted);
  }, [sortOrder]);

  return { characters, totalPages };
};
