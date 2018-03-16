import React from "react";
import {
  FETCH_ARTISTS,
  FETCH_SALES,
  SET_ARTIST,
  UPDATE_DISPLAY_ARTIST,
  RESET_ARTIST_DISPLAY_STATE,
  SET_SEARCH_TERM,
  SET_DISPLAY_ARTISTS,
  FETCH_DISPLAY_ARTIST,
  FETCH_DISPLAY_SALE
} from "../actions/types";

const defaultState = {
  artists: [],
  loading: false,
  artist: {},
  display_artist: "",
  displayArtist: {},
  searchTerm: "",
  display_artists: [],
  displaySale: {}
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ASYNC_START":
      return {
        ...state,
        loading: true
      };
    case FETCH_ARTISTS:
      return {
        ...state,
        artists: action.artists.data.map(sale => sale.attributes),
        loading: false
      };
    case FETCH_DISPLAY_ARTIST:
      return {
        ...state,
        displayArtist: action.displayArtist,
        loading: false
      };
    case FETCH_DISPLAY_SALE:
      return {
        ...state,
        displaySale: action.displaySale.data.attributes,
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
        searchTerm: action.value,
        loading: false
      };
    case SET_DISPLAY_ARTISTS:
      return {
        ...state,
        display_artists: action.value,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
