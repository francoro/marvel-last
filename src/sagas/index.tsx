import { takeEvery, call, put } from "redux-saga/effects";
import { Md5 } from "md5-typescript";

const fetchCharacters = async () => {
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;
  const privateKey = process.env.REACT_APP_PRIVATE_KEY ?? "";
  const ts = new Date().getTime();
  const stringToHash = ts + privateKey + publicKey;
  const hash = Md5.init(stringToHash);
  //showing example async/await for be able to use with saga
  try {
    const response = await fetch(
      `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=0&limit=10`
    );
    const data = await response.json();

    return data.data.results;
  } catch (error) {
    return error;
  }
};

function* fetchCharactersSaga() {
  try {
    const characters = yield call(fetchCharacters);
    yield put({ type: "FETCH_SUCCESS", characters });
  } catch (error) {
    yield put({ type: "FETCH_ERROR", error });
  }
}

export function* watchFetchCharacters() {
  yield takeEvery("FETCH_REQUEST", fetchCharactersSaga);
}
