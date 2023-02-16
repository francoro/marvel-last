import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";

export const DetailPage = () => {
  let { id } = useParams();
  const { characters } = useFetchData({ id });

  return <p>{characters[0]?.name}</p>;
};
