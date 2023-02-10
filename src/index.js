import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { takeEvery, put, take } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";

//ROOT SAGA
function* rootSaga() {
  yield takeEvery("FETCH_CATEGORY", fetchCategory);
  yield takeEvery("ADD_CATEGORY", addCategory);
  yield takeEvery("FETCH_FAVORITE", fetchFavorite);
  yield takeEvery("ADD_FAVORITE", addFavorite);
}
//GET CATEGORY
function* fetchCategory() {
  try {
    const response = yield axios.get("/api/favorite");
    yield put({ type: "SHOW_GIFS", payload: response.data });
  } catch (error) {
    console.log("ERROR ON LINE 24,", error);
  }
}

//POST CATEGORY
function* addCategory(action){
  try{
    yield axios.post(`/api/favorite/test${action.payload}`);
  }catch(error){
    console.log("ERROR ON LINE 32", error)
  }
}

// GET FAVORITES

function* fetchFavorite() {
  try {
    const response = yield axios.get("/api/favorite");
    yield put({ type: "GET_FAVORITES", payload: response.data });
  } catch (error) {
    console.log("ERROR ON LINE 34", error);
  }
}

//POST FAVORITES
function* addFavorite(action) {
  try {
    yield axios.post(`/api/favorite/${action.payload}`);
    yield put({ type: "ADD_TO_FAVORITES" });
  } catch (error) {
    console.log("ERROR ON LINE 52", error);
  }
}

//SAGAMIDDLEWHERE
const sagaMiddleware = createSagaMiddleware();

const getFavorites = (state = [], action) => {
  switch (action.type) {
    case "GET_FAVORITES":
      return action.payload;
    case "ADD_TO_FAVORITES":
      return [...state, action.payload];
    default:
      return state;
  }
};

// IL5j1z69Qi7NTLTL7j

const displaySearch = (state = [], action) => {
  switch (action.type) {
    case "SHOW_GIFS":
      return action.payload;
    default:
      return state;
  }
};

const storeInstance = createStore(
  combineReducers({
    getFavorites,
    displaySearch,
  }),
  applyMiddleware(logger, sagaMiddleware)
);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById("root")
);
