import React, { Component } from "react";
import ArtistLotList from "./ArtistLotList";
import { connect } from "react-redux";
import * as actions from "../../actions";

const Artist = props => {
  const setPropsArtist = () => {
    if (props.artists.length > 0) {
      props.setArtist(findArtist(getArtistId()));
    }
  };

  const getArtistId = () => {
    let url = window.location.href;
    return url.split("/").splice(4)[0];
  };

  const findArtist = newId => {
    let newArtist = props.artists.filter(
      artist => artist.id === parseInt(newId, 10)
    )[0];
    return newArtist;
  };

  return (
    <div>
      <button onClick={() => setPropsArtist()}>Load Artist</button>
      <h1>
        {props.artist &&
        props.artist.constructor === Object &&
        Object.keys(props.artist).length > 0
          ? props.artist.name
          : "Loading"}
      </h1>
      {props.artist &&
      props.artist.constructor === Object &&
      Object.keys(props.artist).length > 0 ? (
        <ArtistLotList lots={props.artist.lots} sales={props.sales} />
      ) : (
        "Loading"
      )}
    </div>
  );
};

const mapStateToProps = ({ artists, sales, artist }) => {
  return {
    artists,
    sales,
    artist
  };
};

export default connect(mapStateToProps, actions)(Artist);
