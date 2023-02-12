import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import reducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import { createStore } from "redux";

import { watchFetchCharacters } from "../sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const Store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchFetchCharacters);
export default Store;
