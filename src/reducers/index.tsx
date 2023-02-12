const initialState = {
  data: [],
  loading: false,
  error: null,
};

const reducer = (
  state = initialState,
  action: { type: string; error: any; payload: any }
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
