import { FETCH_ARTISTS, FETCH_SALES, SET_ARTIST } from "./types";

export function fetchArtists() {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/artists/")
      .then(res => res.json())
      .then(data => {
        dispatch({ type: FETCH_ARTISTS, artists: data });
      });
  };
}

export function fetchSales() {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/sales/")
      .then(res => res.json())
      .then(data => {
        dispatch({ type: FETCH_SALES, sales: data });
      });
  };
}

export function setArtist(value) {
  return dispatch => {
    return dispatch({ type: SET_ARTIST, value });
  };
}
