import {
  FETCH_ARTISTS,
  FETCH_SALES,
  SET_ARTIST,
  UPDATE_DISPLAY_ARTIST,
  SET_SEARCH_TERM,
  SET_DISPLAY_ARTISTS,
  RESET_ARTIST_DISPLAY_STATE,
  FETCH_DISPLAY_ARTIST,
  ASYNC_START,
  FETCH_DISPLAY_SALE
} from "./types";

export function fetchArtists() {
  return dispatch => {
    dispatch({ type: ASYNC_START });
    return fetch("http://localhost:3000/api/v1/artists/")
      .then(res => res.json())
      .then(data => {
        dispatch({ type: FETCH_ARTISTS, artists: data });
      });
  };
}

export function fetchSales() {
  return dispatch => {
    dispatch({ type: ASYNC_START });
    return fetch("http://localhost:3000/api/v1/sales/")
      .then(res => res.json())
      .then(data => {
        dispatch({ type: FETCH_SALES, sales: data });
      });
  };
}

export function fetchDisplayArtist(id) {
  return dispatch => {
    dispatch({ type: ASYNC_START });
    return fetch(`http://localhost:3000/api/v1/artists/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: FETCH_DISPLAY_ARTIST, displayArtist: data });
      });
  };
}
export function fetchDisplaySale(id) {
  return dispatch => {
    dispatch({ type: ASYNC_START });
    return fetch(`http://localhost:3000/api/v1/sales/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: FETCH_DISPLAY_SALE, displaySale: data });
      });
  };
}

export function setArtist(value) {
  return dispatch => {
    return dispatch({ type: SET_ARTIST, value });
  };
}

export function updateDisplayArtist(value) {
  return dispatch => {
    return dispatch({ type: UPDATE_DISPLAY_ARTIST, value });
  };
}

export function resetArtistDisplayState() {
  return dispatch => {
    return dispatch({ type: RESET_ARTIST_DISPLAY_STATE });
  };
}

export function setSearchTerm(value) {
  return dispatch => {
    return dispatch({ type: SET_SEARCH_TERM, value });
  };
}

export function setDiplayArtists(value) {
  return dispatch => {
    return dispatch({ type: SET_DISPLAY_ARTISTS, value });
  };
}
