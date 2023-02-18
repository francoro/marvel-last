import { Action, AnyAction } from "redux";
import { ICharacters } from "../models";

interface State {
  data: { data: { characters: ICharacters[] } };
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: { data: { characters: [] } },
  loading: false,
  error: null,
};

const reducer = (
  state = initialState,
  action: {
    data: { characters: ICharacters[] };
    type: string;
    error: string | null;
  }
) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action,
        loading: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
