import { useEffect, useMemo, useState } from "react";
import { Md5 } from "md5-typescript";

interface ICharacters {
  name: string;
  id: number;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface IParams {
  id?: string;
  offset?: number;
  sortOrder?: string;
}

//modified since date picker
//authentication

export const useFetchData = ({ id, offset, sortOrder }: IParams) => {
  const [characters, setCharacters] = useState<ICharacters[]>([]);

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
      url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=10`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setCharacters(data.data.results));
  }, [offset]);

  useMemo(() => {
    const charactersSorted =
      sortOrder === "asc"
        ? [...characters].sort((a, b) => a.name.localeCompare(b.name))
        : [...characters].sort((a, b) => b.name.localeCompare(a.name));

    setCharacters(charactersSorted);
  }, [sortOrder]);

  return { characters };
};
