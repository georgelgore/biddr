import React, { Component } from "react";
import ArtistList from "./ArtistList";
import { connect } from "react-redux";

class ArtistContainer extends Component {
  constructor() {
    super();

    this.state = {
      display: [],
      searchTerm: "",
      displayArtist: ""
    };
  }

  updateDisplayArtist = (history, artistId) => {
    console.log("IN UPDATE DISPLAY", history, artistId);
    history.push(`/artists/${artistId}`);
  };

  updateSearchTerm = event => {
    if (event.target.value.length === 0) {
      this.setState({ display: [], searchTerm: "" });
    } else {
      this.setState(
        { searchTerm: event.target.value },
        console.log("updating")
      );
      let toShow = this.props.artists.filter(artist =>
        artist.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      this.setState(
        { searchTerm: event.target.value, display: toShow.sort() },
        console.log("updating")
      );
    }
  };

  render() {
    console.log("artist container", this.state);
    return (
      <div className="ui container">
        <h1> Artists </h1>
        <ArtistList
          artistDisplay={this.state.display}
          updateSearchTerm={this.updateSearchTerm}
          searchTerm={this.state.searchTerm}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ artists, sales }) => {
  return {
    artists,
    sales
  };
};

export default connect(mapStateToProps)(ArtistContainer);
