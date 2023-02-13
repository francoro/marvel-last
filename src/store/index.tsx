import { applyMiddleware } from "@reduxjs/toolkit";
import reducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import { createStore } from "redux";

import { watchFetchCharacters } from "../sagas";

const sagaMiddleware = createSagaMiddleware();
const Store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchFetchCharacters);
export default Store;
