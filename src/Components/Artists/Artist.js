import React, { Component } from "react";
import ArtistLotList from "./ArtistLotList";

class Artist extends Component {
  constructor() {
    super();

    this.state = {
      artists: {},
      artist: {},
      artistId: ""
    };
  }

  setArtistId = () => {
    let url = window.location.href;
    return url.split("/").splice(4)[0];
  };

  findArtist = () => {
    if (!!this.state.artistId && this.state.artists.length > 0) {
      let newArtist = this.state.artists.filter(
        artist => artist.id === parseInt(this.state.artistId, 10)
      )[0];
      return newArtist;
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        artists: nextProps.artists,
        artistId: this.setArtistId()
      },
      console.log("PROPS", this.props)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    prevProps.artists !== this.props.artists && this.props.artists.length > 0
      ? this.setState({
          artist: this.findArtist()
        })
      : null;
  }

  render() {
    console.log("in artist", this.state);

    return (
      <div>
        <h1>
          {this.state.artist.title_name
            ? this.state.artist.title_name
            : "Loading..."}
        </h1>
        <ArtistLotList lots={this.state.artist.lots} sales={this.props.sales} />
      </div>
    );
  }
}

export default Artist;
//
// {this.state.artist.title_name
//   ? this.state.artist.title_name
//   : "Loading"}
// <LotList lots={this.state.artist.lots} />
