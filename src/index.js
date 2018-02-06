import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "semantic-ui-css/semantic.min.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import {
  FETCH_ARTISTS,
  FETCH_SALES,
  SET_ARTIST,
  UPDATE_DISPLAY_ARTIST,
  RESET_ARTIST_DISPLAY_STATE,
  SET_SEARCH_TERM,
  SET_DISPLAY_ARTISTS
} from "./actions/types";

const defaultState = {
  artists: [],
  loading: false,
  artist: {},
  display_artist: "",
  searchTerm: "",
  display_artists: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ASYNC_START":
      return {
        ...state,
        artists: [],
        loading: false,
        artist: {},
        display_artist: "",
        searchTerm: "",
        display_artists: []
      };
    case FETCH_ARTISTS:
      return {
        ...state,
        artists: action.artists.data.map(sale => sale.attributes),
        loading: false
      };
    case FETCH_SALES:
      return {
        ...state,
        sales: action.sales.data.map(sale => sale.attributes),
        loading: false
      };
    case SET_ARTIST:
      return {
        ...state,
        artist: action.value,
        loading: false
      };
    case UPDATE_DISPLAY_ARTIST:
      return {
        ...state,
        display_artist: action.value,
        loading: false
      };
    case RESET_ARTIST_DISPLAY_STATE:
      return {
        ...state,
        display_artist: [],
        searchTerm: "",
        loading: false
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.value
      };
    case SET_DISPLAY_ARTISTS:
      return {
        ...state,
        display_artists: action.value
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
