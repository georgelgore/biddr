import React, { Component } from "react";
import ArtistLotList from "./ArtistLotList";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

class Artist extends Component {
  getArtistId = () => {
    let url = window.location.href;
    return url.split("/").splice(4)[1];
  };

  findArtist = (newId, thisPropArtists) => {
    let newArtist = thisPropArtists.filter(
      artist => artist.id === parseInt(newId, 10)
    )[0];
    return newArtist;
  };

  findNextArtist = newId => {
    let newArtist = this.nextProps.artists.filter(
      artist => artist.id === parseInt(newId, 10)
    )[0];
    return newArtist;
  };

  makeData = lots => {
    const output = [];
    lots.map((lot, i) => output.push({ lot: `${i}`, price: lot.realized }));
    return output;
  };

  componentDidMount() {
    this.props.updateDisplayArtist(this.getArtistId()) &&
      this.props.setArtist(
        this.findArtist(this.props.display_artist, this.props.artists)
      );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      let artist = this.findArtist(nextProps.display_artist, nextProps.artists);
      nextProps.setArtist(artist);
      if (artist) {
        nextProps.fetchDisplayArtist(artist.id);
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.artist &&
        this.props.artist.constructor === Object &&
        Object.keys(this.props.artist).length > 0 ? (
          <div>
            <h1>{this.props.artist.name}</h1>
            <ArtistLotList />
          </div>
        ) : (
          <div className="ui active centered inline loader" />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ artists, artist, display_artist }) => {
  return {
    artists,
    artist,
    display_artist
  };
};
export default withRouter(connect(mapStateToProps, actions)(Artist));
